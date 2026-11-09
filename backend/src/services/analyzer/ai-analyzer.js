const { analyzeIR } = require("./rule-analyzer");
const registry = require("../generators");

const {
    validateAIResponse
} = require("./ai-response-validator");

const GeminiProvider = require("./providers/gemini.provider");

/**
 * Creates the AI provider based on environment configuration.
 */
function createProvider() {
    const providerName = process.env.AI_PROVIDER;
    

    switch (providerName) {
        case "gemini":
            return new GeminiProvider();

        default:
            throw new Error(
                `Unsupported AI provider "${providerName}".`
            );
    }
}

/**
 * Builds a restricted generator catalogue for the AI.
 * Internal generate() functions are never sent to the AI.
 */
function getGeneratorCatalogue() {
    return registry.list().map(generator => ({
        name: generator.name,
        category: generator.category,
        outputType: generator.outputType,
        description: generator.description
    }));
}

/**
 * Creates the prompt for semantic field analysis.
 */
function buildPrompt(unresolvedFields, generatorCatalogue) {
    return `
You are a schema analysis assistant for SmartSeed.

Your task is to recommend suitable generators for unresolved
Mongoose schema fields.

IMPORTANT RULES:

1. Only use generator names from the provided generator catalogue.
2. Never invent generator names.
3. Match the generator outputType with the field type.
4. Do not modify or invent schema constraints.
5. If no suitable generator exists, return generator as null.
6. Do not generate JavaScript code or executable functions.
7. Return only valid JSON matching the required structure.
8. Analyze only the supplied unresolved fields.

GENERATOR CATALOGUE:
${JSON.stringify(generatorCatalogue, null, 2)}

UNRESOLVED FIELDS:
${JSON.stringify(unresolvedFields, null, 2)}

REQUIRED JSON FORMAT:

{
  "fields": [
    {
      "model": "ModelName",
      "field": "fieldName",
      "generator": "registered.generator",
      "options": {}
    },
    {
      "model": "ModelName",
      "field": "anotherField",
      "generator": null,
      "options": {},
      "reason": "Explanation"
    }
  ]
}

Return exactly one assignment for each supplied field.
Do not include Markdown fences or additional text.
`;
}

/**
 * Parses the provider's JSON response.
 */
function parseAIResponse(responseText) {
    try {
        return JSON.parse(responseText);
    } catch (error) {
        throw new Error(
            `AI returned invalid JSON: ${error.message}`
        );
    }
}

/**
 * Main AI-assisted analysis function.
 *
 * @param {Object} ir - SmartSeed Intermediate Representation.
 * @param {Object} options - Optional provider configuration.
 */
async function analyzeWithAI(ir, options = {}) {
    // Step 1: Run deterministic analysis.
    const ruleAnalysis = analyzeIR(ir);

    // Step 2: Identify unresolved fields.
    const unresolvedFields = ruleAnalysis.unresolvedFields;

    // No AI request is needed if all fields are resolved.
    if (unresolvedFields.length === 0) {
        return ruleAnalysis;
    }

    // Step 3: Prepare AI input.
    const generatorCatalogue = getGeneratorCatalogue();

    const prompt = buildPrompt(
        unresolvedFields,
        generatorCatalogue
    );

    // Step 4: Select provider.
    const provider = options.provider || createProvider();

    // Step 5: Request AI analysis.
    const response = await provider.generate(prompt);

    if (
        !response ||
        typeof response.text !== "string" ||
        !response.text.trim()
    ) {
        throw new Error("AI provider returned an empty response.");
    }

    // Step 6: Parse response.
    const aiResponse = parseAIResponse(response.text);

    // Step 7: Validate assignments and merge.
    return validateAIResponse(
        ir,
        ruleAnalysis,
        aiResponse
    );
}

module.exports = {
    analyzeWithAI,
    getGeneratorCatalogue,
    buildPrompt
};