require("dotenv").config();

const GeminiProvider = require("../src/services/analyzer/providers/gemini.provider");

async function testProvider() {
    try {
        const provider = new GeminiProvider();

        const result = await provider.generate(
            "Reply with exactly: Provider implementation successful."
        );

        console.log("Provider:", result.provider);
        console.log("Model:", result.model);
        console.log("Response:", result.text);

    } catch (error) {
        console.error("Provider test failed:");
        console.error(error.message);
    }
}

testProvider();