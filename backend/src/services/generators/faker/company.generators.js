const { faker } = require("@faker-js/faker");

module.exports = [
    {
        name: "company.name",
        category: "company",
        outputType: "String",
        description: "Generates a company name",
        generate: () => faker.company.name()
    },
    {
        name: "company.department",
        category: "company",
        outputType: "String",
        description: "Generates a company department",
        generate: () => faker.commerce.department()
    },
    {
        name: "company.catchPhrase",
        category: "company",
        outputType: "String",
        description: "Generates a company catchphrase",
        generate: () => faker.company.catchPhrase()
    },
    {
        name: "company.buzzPhrase",
        category: "company",
        outputType: "String",
        description: "Generates a company buzz phrase",
        generate: () => faker.company.buzzPhrase()
    }
];