const { GoogleGenAI } = require("@google/genai");
const AIProvider = require("./ai-provider");

class GeminiProvider extends AIProvider {
    constructor() {
        super("gemini");

        const apiKey = process.env.GEMINI_API_KEY;
        const model = process.env.GEMINI_MODEL;

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is missing from environment variables.");
        }

        if (!model) {
            throw new Error("GEMINI_MODEL is missing from environment variables.");
        }

        this.ai = new GoogleGenAI({ apiKey });
        this.model = model;
    }

    async generate(prompt, options = {}) {
        if (typeof prompt !== "string" || !prompt.trim()) {
            throw new Error("Prompt must be a non-empty string.");
        }

        const response = await this.ai.models.generateContent({
            model: this.model,
            contents: prompt,
            config: options.config || {}
        });

        return {
            provider: this.providerName,
            model: this.model,
            text: response.text
        };
    }
}

module.exports = GeminiProvider;