const { faker } = require("@faker-js/faker");

module.exports = [
    {
        name: "commerce.productName",
        category: "commerce",
        outputType: "String",
        description: "Generates a product name",
        generate: () => faker.commerce.productName()
    },
    {
        name: "commerce.product",
        category: "commerce",
        outputType: "String",
        description: "Generates a product description",
        generate: () => faker.commerce.product()
    },
    {
        name: "commerce.price",
        category: "commerce",
        outputType: "Number",
        description: "Generates a product price",
        generate: (options = {}) => {
            const min = options.min ?? 1;
            const max = options.max ?? 1000;
            const decimals = options.decimals ?? 2;

            if (
                !Number.isFinite(min) ||
                !Number.isFinite(max) ||
                min > max ||
                !Number.isInteger(decimals) ||
                decimals < 0 ||
                decimals > 10
            ) {
                throw new Error("Invalid commerce.price options.");
            }

            const factor = 10 ** decimals;
            const low = Math.ceil(min * factor);
            const high = Math.floor(max * factor);

            if (low > high) {
                throw new Error(
                    "Price range contains no valid value for the requested decimals."
                );
            }

            return faker.number.int({
                min: low,
                max: high
            }) / factor;
        }
    },
    {
        name: "commerce.department",
        category: "commerce",
        outputType: "String",
        description: "Generates a commerce department",
        generate: () => faker.commerce.department()
    },
    {
        name: "commerce.isbn",
        category: "commerce",
        outputType: "String",
        description: "Generates an ISBN",
        generate: () => faker.commerce.isbn()
    }
];