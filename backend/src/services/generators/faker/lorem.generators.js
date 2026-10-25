const { faker } = require("@faker-js/faker");

function validateCount(count) {
    if (!Number.isInteger(count) || count < 1 || count > 1000) {
        throw new Error("count must be an integer between 1 and 1000.");
    }

    return count;
}

module.exports = [
    {
        name: "lorem.word",
        category: "lorem",
        outputType: "String",
        description: "Generates a word",
        generate: () => faker.lorem.word()
    },
    {
        name: "lorem.words",
        category: "lorem",
        outputType: "String",
        description: "Generates multiple words",
        generate: (options = {}) => {
            const count = validateCount(options.count ?? 3);
            return faker.lorem.words(count);
        }
    },
    {
        name: "lorem.sentence",
        category: "lorem",
        outputType: "String",
        description: "Generates a sentence",
        generate: (options = {}) => {
            const min = options.min ?? 5;
            const max = options.max ?? 12;

            if (
                !Number.isInteger(min) ||
                !Number.isInteger(max) ||
                min < 1 ||
                max < min
            ) {
                throw new Error("Invalid sentence word-count options.");
            }

            return faker.lorem.sentence({
                min,
                max
            });
        }
    },
    {
        name: "lorem.sentences",
        category: "lorem",
        outputType: "String",
        description: "Generates multiple sentences",
        generate: (options = {}) => {
            const count = validateCount(options.count ?? 3);
            return faker.lorem.sentences(count);
        }
    },
    {
        name: "lorem.paragraph",
        category: "lorem",
        outputType: "String",
        description: "Generates a paragraph",
        generate: () => faker.lorem.paragraph()
    },
    {
        name: "lorem.paragraphs",
        category: "lorem",
        outputType: "String",
        description: "Generates multiple paragraphs",
        generate: (options = {}) => {
            const count = validateCount(options.count ?? 2);
            return faker.lorem.paragraphs(count);
        }
    }
];