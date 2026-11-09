const registry = require("../generators");

const VALID_FIELD_TYPES = new Set([
    "String",
    "Number",
    "Boolean",
    "Date",
    "ObjectId",
    "Array",
    "Buffer",
    "Mixed"
]);

/**
 * Checks whether a value is a plain JSON-compatible object.
 */
function isPlainObject(value) {
    if (
        value === null ||
        typeof value !== "object" ||
        Array.isArray(value)
    ) {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);

    return prototype === Object.prototype || prototype === null;
}

/**
 * Creates a consistent unresolved field result.
 */
function createUnresolvedField(field, reason) {
    return {
        name: field.name,
        sourceType: field.type,
        ...preserveFieldMetadata(field),
        generator: null,
        options: {},
        source: "ai",
        status: "unresolved",
        reason
    };
}

/**
 * Preserves original Mongoose schema metadata.
 */
function preserveFieldMetadata(field) {
    const metadata = {};

    for (const key of [
        "required",
        "unique",
        "default",
        "min",
        "max",
        "enum",
        "ref"
    ]) {
        if (field[key] !== undefined) {
            metadata[key] = field[key];
        }
    }

    return metadata;
}

/**
 * Validates basic schema constraints.
 */
function validateFieldConstraints(field, options) {
    if (field.ref !== undefined) {
        return {
            valid: false,
            reason: "Relationship-aware generation is not supported yet."
        };
    }

    if (field.enum !== undefined) {
        if (
            !Array.isArray(field.enum) ||
            field.enum.length === 0
        ) {
            return {
                valid: false,
                reason: "The original field contains an invalid enum."
            };
        }

        if (
            options.values !== undefined &&
            JSON.stringify(options.values) !== JSON.stringify(field.enum)
        ) {
            return {
                valid: false,
                reason: "AI cannot modify the original enum values."
            };
        }

        // Always use the original enum values.
        options.values = field.enum;
    }

    if (field.type === "Number") {
        if (
            field.min !== undefined &&
            typeof field.min !== "number"
        ) {
            return {
                valid: false,
                reason: "The original minimum constraint is invalid."
            };
        }

        if (
            field.max !== undefined &&
            typeof field.max !== "number"
        ) {
            return {
                valid: false,
                reason: "The original maximum constraint is invalid."
            };
        }

        if (
            field.min !== undefined &&
            field.max !== undefined &&
            field.min > field.max
        ) {
            return {
                valid: false,
                reason: "The original minimum cannot exceed maximum."
            };
        }

        if (
            options.min !== undefined &&
            options.min < (field.min ?? -Infinity)
        ) {
            return {
                valid: false,
                reason: "AI cannot generate values below the original minimum."
            };
        }

        if (
            options.max !== undefined &&
            options.max > (field.max ?? Infinity)
        ) {
            return {
                valid: false,
                reason: "AI cannot generate values above the original maximum."
            };
        }

        // Preserve original numeric bounds.
        if (field.min !== undefined) {
            options.min = field.min;
        }

        if (field.max !== undefined) {
            options.max = field.max;
        }
    }

    return { valid: true };
}

/**
 * Validates a single AI generator assignment.
 */
function validateAssignment(assignment, model, field) {
    if (
        !assignment ||
        typeof assignment !== "object" ||
        Array.isArray(assignment)
    ) {
        return {
            valid: false,
            reason: "AI assignment must be an object."
        };
    }

    if (assignment.generator === null) {
        return {
            valid: false,
            reason:
                typeof assignment.reason === "string" &&
                assignment.reason.trim()
                    ? assignment.reason
                    : "AI could not determine a suitable generator."
        };
    }

    if (
        typeof assignment.generator !== "string" ||
        !registry.has(assignment.generator)
    ) {
        return {
            valid: false,
            reason: `Unknown generator "${assignment.generator}".`
        };
    }

    const generator = registry.get(assignment.generator);

    if (
        generator.outputType !== "Any" &&
        generator.outputType !== field.type
    ) {
        return {
            valid: false,
            reason:
                `Generator "${assignment.generator}" produces ` +
                `"${generator.outputType}", but field "${field.name}" ` +
                `requires "${field.type}".`
        };
    }

    if (
        assignment.options !== undefined &&
        !isPlainObject(assignment.options)
    ) {
        return {
            valid: false,
            reason: "Generator options must be a plain object."
        };
    }

    const options = {
        ...(assignment.options || {})
    };

    const constraintResult = validateFieldConstraints(field, options);

    if (!constraintResult.valid) {
        return constraintResult;
    }

    return {
        valid: true,
        result: {
            name: field.name,
            sourceType: field.type,
            ...preserveFieldMetadata(field),
            generator: assignment.generator,
            options,
            source: "ai",
            status: "resolved"
        }
    };
}

/**
 * Validates Gemini/provider output against the original IR
 * and unresolved fields from rule-based analysis.
 *
 * @param {Object} ir - Original SmartSeed IR.
 * @param {Object} ruleAnalysis - Output from analyzeIR().
 * @param {Object} aiResponse - Parsed AI response object.
 */
function validateAIResponse(ir, ruleAnalysis, aiResponse) {
    if (
        !ir ||
        !Array.isArray(ir.models) ||
        !Array.isArray(ruleAnalysis?.models)
    ) {
        throw new TypeError("Invalid IR or rule analysis.");
    }

    if (
        !aiResponse ||
        !Array.isArray(aiResponse.fields)
    ) {
        throw new TypeError(
            'Invalid AI response: expected a "fields" array.'
        );
    }

    const originalFields = new Map();
    const unresolvedFields = new Map();

    // Index original IR fields.
    for (const model of ir.models) {
        for (const field of model.fields) {
            const key = `${model.name}.${field.name}`;

            if (originalFields.has(key)) {
                throw new Error(`Duplicate IR field "${key}".`);
            }

            originalFields.set(key, {
                model,
                field
            });
        }
    }

    // Index only fields that the rule analyzer could not resolve.
    for (const model of ruleAnalysis.models) {
        for (const field of model.fields) {
            if (field.status !== "unresolved") {
                continue;
            }

            const key = `${model.name}.${field.name}`;

            if (!originalFields.has(key)) {
                throw new Error(
                    `Rule analysis contains an unknown field "${key}".`
                );
            }

            unresolvedFields.set(key, {
                model,
                field
            });
        }
    }

    const assignments = new Map();
    const warnings = [];

    // Validate AI assignments.
    for (const assignment of aiResponse.fields) {
        if (
            !assignment ||
            typeof assignment.model !== "string" ||
            typeof assignment.field !== "string"
        ) {
            warnings.push(
                "Ignored an AI assignment with invalid field identity."
            );
            continue;
        }

        const key = `${assignment.model}.${assignment.field}`;

        if (!unresolvedFields.has(key)) {
            warnings.push(
                `Ignored AI assignment for "${key}": ` +
                "field is not unresolved or does not exist."
            );
            continue;
        }

        if (assignments.has(key)) {
            warnings.push(
                `Duplicate AI assignment for "${key}" was ignored.`
            );
            continue;
        }

        const original = originalFields.get(key);
        const validation = validateAssignment(
            assignment,
            original.model,
            original.field
        );

        assignments.set(key, validation);
    }

    const remainingUnresolved = [];
    const models = ruleAnalysis.models.map(model => {
        const originalModel = ir.models.find(
            item => item.name === model.name
        );

        const fields = model.fields.map(analyzedField => {
            // Never modify successful rule-based assignments.
            if (analyzedField.status !== "unresolved") {
                return analyzedField;
            }

            const key = `${model.name}.${analyzedField.name}`;
            const original = originalFields.get(key);
            const validation = assignments.get(key);

            if (!validation || !validation.valid) {
                const reason = validation
                    ? validation.reason
                    : "AI did not provide an assignment.";

                const unresolved = createUnresolvedField(
                    original.field,
                    reason
                );

                remainingUnresolved.push({
                    model: model.name,
                    collection: model.collection,
                    field: original.field.name,
                    reason
                });

                return unresolved;
            }

            return validation.result;
        });

        return {
            name: model.name,
            collection: model.collection,
            fields
        };
    });

    if (remainingUnresolved.length > 0) {
        warnings.push(
            `${remainingUnresolved.length} field(s) remain unresolved after AI analysis.`
        );
    }

    return {
        status:
            remainingUnresolved.length === 0
                ? "plan_generated"
                : "completed_with_unresolved_fields",
        models,
        warnings,
        unresolvedFields: remainingUnresolved
    };
}

module.exports = {
    validateAIResponse
};