const { faker } = require("@faker-js/faker");

module.exports = [
    {
        name: "person.fullName",
        category: "person",
        outputType: "String",
        description: "Generates a person's full name",
        generate: (options = {}) => faker.person.fullName(options)
    },
    {
        name: "person.firstName",
        category: "person",
        outputType: "String",
        description: "Generates a person's first name",
        generate: (options = {}) => faker.person.firstName(options.sex)
    },
    {
        name: "person.lastName",
        category: "person",
        outputType: "String",
        description: "Generates a person's last name",
        generate: (options = {}) => faker.person.lastName(options.sex)
    },
    {
        name: "person.middleName",
        category: "person",
        outputType: "String",
        description: "Generates a person's middle name",
        generate: () => faker.person.middleName()
    },
    {
        name: "person.jobTitle",
        category: "person",
        outputType: "String",
        description: "Generates a person's job title",
        generate: () => faker.person.jobTitle()
    },
    {
        name: "person.prefix",
        category: "person",
        outputType: "String",
        description: "Generates a person's name prefix",
        generate: () => faker.person.prefix()
    },
    {
        name: "person.suffix",
        category: "person",
        outputType: "String",
        description: "Generates a person's name suffix",
        generate: () => faker.person.suffix()
    }
];