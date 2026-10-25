const { Types } = require("mongoose");

module.exports = [
    {
        name: "custom.enum",
        category: "custom",
        outputType: "Any",
        description: "Selects a random value from an allowed list",
        generate: (options = {}) => {
            const values = options.values;

            if (!Array.isArray(values) || values.length === 0) {
                throw new Error(
                    "custom.enum requires a non-empty values array."
                );
            }

            return values[
                Math.floor(Math.random() * values.length)
            ];
        }
    },
    {
        name: "custom.constant",
        category: "custom",
        outputType: "Any",
        description: "Returns a configured constant value",
        generate: (options = {}) => {
            if (!Object.prototype.hasOwnProperty.call(options, "value")) {
                throw new Error(
                    "custom.constant requires a value option."
                );
            }

            return options.value;
        }
    },
    {
        name: "custom.boolean",
        category: "custom",
        outputType: "Boolean",
        description: "Generates a boolean using a probability",
        generate: (options = {}) => {
            const probability = options.probability ?? 0.5;

            if (
                !Number.isFinite(probability) ||
                probability < 0 ||
                probability > 1
            ) {
                throw new Error(
                    "probability must be between 0 and 1."
                );
            }

            return Math.random() < probability;
        }
    },
    {
        name: "custom.objectId",
        category: "custom",
        outputType: "ObjectId",
        description: "Generates a MongoDB ObjectId",
        generate: () => new Types.ObjectId()
    },
    {
        name: "custom.array",
        category: "custom",
        outputType: "Array",
        description: "Generates an array using a supplied generator",
        generate: (options = {}) => {
            const count = options.count ?? 3;
            const itemGenerator = options.itemGenerator;

            if (!Number.isInteger(count) || count < 0 || count > 10000) {
                throw new Error(
                    "custom.array count must be an integer from 0 to 10000."
                );
            }

            if (typeof itemGenerator !== "function") {
                throw new Error(
                    "custom.array requires an itemGenerator function."
                );
            }

            return Array.from(
                { length: count },
                (_, index) => itemGenerator(index)
            );
        }
    }
];