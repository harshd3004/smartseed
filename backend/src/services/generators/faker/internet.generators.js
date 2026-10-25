const { faker } = require("@faker-js/faker");

module.exports = [
    {
        name: "internet.email",
        category: "internet",
        outputType: "String",
        description: "Generates an email address",
        generate: () => faker.internet.email()
    },
    {
        name: "internet.username",
        category: "internet",
        outputType: "String",
        description: "Generates a username",
        generate: () => faker.internet.username()
    },
    {
        name: "internet.password",
        category: "internet",
        outputType: "String",
        description: "Generates a password",
        generate: (options = {}) => {
            const minLength = options.minLength ?? 8;
            const maxLength = options.maxLength ?? 16;

            if (
                !Number.isInteger(minLength) ||
                !Number.isInteger(maxLength) ||
                minLength < 1 ||
                maxLength < minLength
            ) {
                throw new Error(
                    "password requires valid minLength and maxLength."
                );
            }

            return faker.internet.password({
                length: minLength === maxLength
                    ? minLength
                    : faker.number.int({
                        min: minLength,
                        max: maxLength
                    })
            });
        }
    },
    {
        name: "internet.url",
        category: "internet",
        outputType: "String",
        description: "Generates a URL",
        generate: () => faker.internet.url()
    },
    {
        name: "internet.ipv4",
        category: "internet",
        outputType: "String",
        description: "Generates an IPv4 address",
        generate: () => faker.internet.ipv4()
    },
    {
        name: "internet.userAgent",
        category: "internet",
        outputType: "String",
        description: "Generates a browser user agent",
        generate: () => faker.internet.userAgent()
    }
];