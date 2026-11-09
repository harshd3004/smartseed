require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

async function testGeminiConnection() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is missing from .env");
        }

        const ai = new GoogleGenAI({ apiKey });

        console.log(`Testing Gemini model: ${model}`);

        const response = await ai.models.generateContent({
            model,
            contents: "Reply with exactly: Gemini connection successful."
        });

        console.log("\nGemini response:");
        console.log(response.text);

    } catch (error) {
        console.error("\nGemini connection failed:");
        console.error(error.message);
    }
}

testGeminiConnection();