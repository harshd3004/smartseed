class AIProvider {
    constructor(providerName) {
        if (new.target === AIProvider) {
            throw new Error("AIProvider is an abstract class and cannot be instantiated directly.");
        }

        this.providerName = providerName;
    }

    async generate(prompt, options = {}) {
        throw new Error(
            `${this.providerName} provider must implement generate()`
        );
    }
}

module.exports = AIProvider;