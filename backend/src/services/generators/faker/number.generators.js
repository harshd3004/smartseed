const { faker } = require("@faker-js/faker");

module.exports = [
    {
        name: "number.integer",
        category: "number",
        outputType: "Number",
        description: "Generates a random integer",
        generate: (options = {}) => {
            const min = options.min ?? 0;
            const max = options.max ?? 100;

            if (
                !Number.isSafeInteger(min) ||
                !Number.isSafeInteger(max) ||
                min > max
            ) {
                throw new Error(
                    "number.integer requires safe integer min and max, with min <= max."
                );
            }

            return faker.number.int({ min, max });
        }
    },
    {
        name: "number.float",
        category: "number",
        outputType: "Number",
        description: "Generates a random floating-point number",
        generate: (options = {}) => {
            const min = options.min ?? 0;
            const max = options.max ?? 100;
            const fractionDigits = options.fractionDigits ?? 2;

            if (
                !Number.isFinite(min) ||
                !Number.isFinite(max) ||
                min > max ||
                !Number.isInteger(fractionDigits) ||
                fractionDigits < 0 ||
                fractionDigits > 10
            ) {
                throw new Error("Invalid number.float options.");
            }

            const factor = 10 ** fractionDigits;
            const low = Math.ceil(min * factor);
            const high = Math.floor(max * factor);

            if (low > high) {
                throw new Error(
                    "The number range contains no value at the requested precision."
                );
            }

            return faker.number.int({
                min: low,
                max: high
            }) / factor;
        }
    },
    {
        name: "number.boolean",
        category: "number",
        outputType: "Boolean",
        description: "Generates a random boolean",
        generate: (options = {}) => {
            const probability = options.probability ?? 0.5;

            if (
                !Number.isFinite(probability) ||
                probability < 0 ||
                probability > 1
            ) {
                throw new Error(
                    "number.boolean probability must be between 0 and 1."
                );
            }

            return faker.number.float() < probability;
        }
    }
];