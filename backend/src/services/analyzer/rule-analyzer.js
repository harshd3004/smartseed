
const registry = require("../generators");

// Deterministic field-name rules.
// More specific names should be checked before broader patterns.
const STRING_RULES = [
    {
        generator: "internet.email",
        names: ["email", "emailaddress", "useremail"]
    },
    {
        generator: "internet.username",
        names: ["username", "userid", "login"]
    },
    {
        generator: "internet.password",
        names: ["password", "passwd"]
    },
    {
        generator: "internet.url",
        names: ["url", "website", "weburl"]
    },
    {
        generator: "internet.ipv4",
        names: ["ip", "ipv4", "ipaddress"]
    },
    {
        generator: "internet.userAgent",
        names: ["useragent", "browseruseragent"]
    },
    {
        generator: "person.firstName",
        names: ["firstname", "givenname"]
    },
    {
        generator: "person.lastName",
        names: ["lastname", "surname", "familyname"]
    },
    {
        generator: "person.middleName",
        names: ["middlename"]
    },
    {
        generator: "person.fullName",
        names: ["name", "fullname", "personname", "displayname"]
    },
    {
        generator: "person.prefix",
        names: ["nameprefix", "titleprefix"]
    },
    {
        generator: "person.suffix",
        names: ["namesuffix"]
    },
    {
        generator: "person.jobTitle",
        names: ["jobtitle", "occupation"]
    },
    {
        generator: "company.name",
        names: ["company", "companyname", "organization", "organizationname"]
    },
    {
        generator: "company.department",
        names: ["department", "departmentname"]
    },
    {
        generator: "commerce.productName",
        names: ["productname", "itemname"]
    },
    {
        generator: "commerce.product",
        names: ["productdescription"]
    },
    {
        generator: "commerce.department",
        names: ["productdepartment", "commercedepartment"]
    },
    {
        generator: "commerce.isbn",
        names: ["isbn"]
    },
    {
        generator: "location.city",
        names: ["city", "cityname"]
    },
    {
        generator: "location.countryCode",
        names: ["countrycode", "countryiso"]
    },
    {
        generator: "location.country",
        names: ["country", "countryname"]
    },
    {
        generator: "location.state",
        names: ["state", "statename", "province"]
    },
    {
        generator: "location.street",
        names: ["street", "streetaddress", "address"]
    },
    {
        generator: "location.zipCode",
        names: ["zipcode", "postalcode", "postcode"]
    },
    {
        generator: "lorem.paragraph",
        names: ["bio", "biography", "longdescription"]
    },
    {
        generator: "lorem.sentence",
        names: ["description", "summary", "comment", "review"]
    },
    {
        generator: "lorem.words",
        names: ["tags", "keywords"]
    },
    {
        generator: "lorem.word",
        names: ["word"]
    }
];

const INTEGER_FIELD_NAMES = new Set([
    "age",
    "count",
    "quantity",
    "qty",
    "score",
    "rank",
    "rating",
    "year",
    "years",
    "number",
    "index",
    "pages",
    "stock",
    "population",
    "capacity",
    "priceincents"
]);

const FLOAT_FIELD_RULES = [
    {
        generator: "location.latitude",
        names: ["latitude", "lat"]
    },
    {
        generator: "location.longitude",
        names: ["longitude", "lng", "lon"]
    },
    {
        generator: "commerce.price",
        names: ["price", "amount", "cost", "salary", "balance"]
    }
];

function normalizeName(name) {
    return name
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

function isCompatible(generatorName, fieldType) {
    if (!registry.has(generatorName)) {
        return false;
    }

    const generator = registry.get(generatorName);

    return (
        generator.outputType === "Any" ||
        generator.outputType === fieldType
    );
}

function unresolved(reason) {
    return {
        generator: null,
        options: {},
        source: "rule",
        status: "unresolved",
        reason
    };
}

function selectStringGenerator(fieldName) {
    for (const rule of STRING_RULES) {
        if (rule.names.includes(fieldName)) {
            return rule.generator;
        }
    }

    return null;
}

function selectNumberGenerator(fieldName, field) {
    // Known floating-point concepts take priority over generic bounds.
    for (const rule of FLOAT_FIELD_RULES) {
        if (rule.names.includes(fieldName)) {
            return rule.generator;
        }
    }

    // The IR only identifies Number, not integer vs floating-point.
    // Use integer generation for recognized count-like field names.
    if (INTEGER_FIELD_NAMES.has(fieldName)) {
        return "number.integer";
    }

    // Bounds alone do not prove that a field should be an integer.
    // Do not silently make that assumption.
    if (field.min !== undefined || field.max !== undefined) {
        return null;
    }

    return null;
}

function validateNumericBounds(field, generatorName) {
    const options = {};

    if (field.min !== undefined) {
        options.min = field.min;
    }

    if (field.max !== undefined) {
        options.max = field.max;
    }

    if (
        options.min !== undefined &&
        (typeof options.min !== "number" ||
            !Number.isFinite(options.min))
    ) {
        return {
            valid: false,
            reason: "The minimum must be a finite number."
        };
    }

    if (
        options.max !== undefined &&
        (typeof options.max !== "number" ||
            !Number.isFinite(options.max))
    ) {
        return {
            valid: false,
            reason: "The maximum must be a finite number."
        };
    }

    if (
        options.min !== undefined &&
        options.max !== undefined &&
        options.min > options.max
    ) {
        return {
            valid: false,
            reason: "The minimum cannot exceed the maximum."
        };
    }

    if (generatorName === "number.integer") {
        for (const key of ["min", "max"]) {
            if (
                options[key] !== undefined &&
                !Number.isSafeInteger(options[key])
            ) {
                return {
                    valid: false,
                    reason: `The ${key} for number.integer must be a safe integer.`
                };
            }
        }
    }

    return { valid: true, options };
}

function validateEnum(field) {
    if (!Array.isArray(field.enum) || field.enum.length === 0) {
        return {
            valid: false,
            reason: "The enum must be a non-empty array."
        };
    }

    // This version supports primitive enum values.
    // Complex values need explicit serialization and validation rules.
    const primitiveTypes = new Set([
        "string",
        "number",
        "boolean"
    ]);

    for (const value of field.enum) {
        if (
            value === null ||
            !primitiveTypes.has(typeof value) ||
            (typeof value === "number" && !Number.isFinite(value))
        ) {
            return {
                valid: false,
                reason: "Enum values must be strings, finite numbers, or booleans."
            };
        }

        if (
            field.type === "String" && typeof value !== "string" ||
            field.type === "Number" && typeof value !== "number" ||
            field.type === "Boolean" && typeof value !== "boolean"
        ) {
            return {
                valid: false,
                reason: `Enum values are incompatible with field type ${field.type}.`
            };
        }
    }

    return {
        valid: true,
        options: { values: field.enum }
    };
}

function selectGenerator(field) {
    const fieldName = normalizeName(field.name);

    // Explicit enum constraints take precedence over semantic rules.
    if (field.enum !== undefined) {
        const result = validateEnum(field);

        if (!result.valid) {
            return unresolved(result.reason);
        }

        if (!isCompatible("custom.enum", field.type)) {
            return unresolved(
                "The registry does not contain a compatible custom.enum generator."
            );
        }

        return {
            generator: "custom.enum",
            options: result.options,
            source: "rule",
            status: "resolved"
        };
    }

    // References need relationship-aware generation.
    if (field.ref !== undefined) {
        return unresolved(
            `Reference to "${field.ref}" requires relationship-aware generation.`
        );
    }

    // Do not replace a declared default with a constant automatically.
    // Defaults are preserved as metadata in the plan.
    let generatorName = null;

    switch (field.type) {
        case "String":
            generatorName = selectStringGenerator(fieldName);
            break;

        case "Number":
            generatorName = selectNumberGenerator(fieldName, field);
            break;

        case "Boolean":
            generatorName = "custom.boolean";
            break;

        case "Date":
            if (
                ["dateofbirth", "birthdate", "birthday", "dob"].includes(
                    fieldName
                )
            ) {
                generatorName = "date.past";
            } else if (
                ["createdat", "updatedat", "joinedat", "publishedat"].includes(
                    fieldName
                )
            ) {
                generatorName = "date.past";
            } else if (
                ["expiresat", "expirationdate", "futuredate"].includes(
                    fieldName
                )
            ) {
                generatorName = "date.future";
            } else if (
                ["recentdate", "lastlogin", "lastactiveat"].includes(
                    fieldName
                )
            ) {
                generatorName = "date.recent";
            }
            break;

        case "ObjectId":
            generatorName = "custom.objectId";
            break;

        case "Array":
            // custom.array requires an itemGenerator function.
            // A function cannot be stored in a JSON-serializable plan.
            return unresolved(
                "Array generation needs a serializable nested-generator plan."
            );

        default:
            return unresolved(
                `Unsupported or unrecognized field type "${field.type}".`
            );
    }

    if (!generatorName) {
        return unresolved(
            `No unambiguous rule exists for field "${field.name}" of type "${field.type}".`
        );
    }

    if (!isCompatible(generatorName, field.type)) {
        return unresolved(
            `Generator "${generatorName}" is incompatible with type "${field.type}".`
        );
    }

    let options = {};

    if (
        field.type === "Number" &&
        ["number.integer", "number.float"].includes(generatorName)
    ) {
        const result = validateNumericBounds(field, generatorName);

        if (!result.valid) {
            return unresolved(result.reason);
        }

        options = result.options;
    }

    return {
        generator: generatorName,
        options,
        source: "rule",
        status: "resolved"
    };
}

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

function analyzeField(field) {
    if (
        !field ||
        typeof field.name !== "string" ||
        !field.name.trim() ||
        typeof field.type !== "string" ||
        !field.type.trim()
    ) {
        throw new TypeError(
            "Each IR field must have a non-empty name and type."
        );
    }

    const selection = selectGenerator(field);

    return {
        name: field.name,
        sourceType: field.type,
        ...preserveFieldMetadata(field),
        ...selection
    };
}

function analyzeIR(ir) {
    if (!ir || !Array.isArray(ir.models) || ir.models.length === 0) {
        throw new TypeError(
            'Invalid IR: expected a non-empty "models" array.'
        );
    }

    const unresolvedFields = [];
    const warnings = [];

    const models = ir.models.map((model) => {
        if (
            !model ||
            typeof model.name !== "string" ||
            !model.name.trim() ||
            typeof model.collection !== "string" ||
            !model.collection.trim() ||
            !Array.isArray(model.fields)
        ) {
            throw new TypeError(
                "Each IR model must have a name, collection, and fields array."
            );
        }

        const fields = model.fields.map((field) => {
            const analyzedField = analyzeField(field);

            if (analyzedField.status === "unresolved") {
                unresolvedFields.push({
                    model: model.name,
                    collection: model.collection,
                    field: analyzedField.name,
                    reason: analyzedField.reason
                });
            }

            return analyzedField;
        });

        return {
            name: model.name,
            collection: model.collection,
            fields
        };
    });

    if (unresolvedFields.length > 0) {
        warnings.push(
            `${unresolvedFields.length} field(s) need manual review or AI-assisted analysis.`
        );
    }

    return {
        status:
            unresolvedFields.length === 0
                ? "plan_generated"
                : "completed_with_unresolved_fields",
        models,
        warnings,
        unresolvedFields
    };
}

module.exports = {
    analyzeIR
};
