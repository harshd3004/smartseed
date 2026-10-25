const { faker } = require("@faker-js/faker");

module.exports = [
    {
        name: "location.city",
        category: "location",
        outputType: "String",
        description: "Generates a city name",
        generate: () => faker.location.city()
    },
    {
        name: "location.country",
        category: "location",
        outputType: "String",
        description: "Generates a country name",
        generate: () => faker.location.country()
    },
    {
        name: "location.countryCode",
        category: "location",
        outputType: "String",
        description: "Generates a country code",
        generate: () => faker.location.countryCode()
    },
    {
        name: "location.state",
        category: "location",
        outputType: "String",
        description: "Generates a state name",
        generate: () => faker.location.state()
    },
    {
        name: "location.street",
        category: "location",
        outputType: "String",
        description: "Generates a street address",
        generate: () => faker.location.streetAddress()
    },
    {
        name: "location.zipCode",
        category: "location",
        outputType: "String",
        description: "Generates a postal code",
        generate: () => faker.location.zipCode()
    },
    {
        name: "location.latitude",
        category: "location",
        outputType: "Number",
        description: "Generates a latitude",
        generate: (options = {}) => {
            const min = options.min ?? -90;
            const max = options.max ?? 90;

            if (
                !Number.isFinite(min) ||
                !Number.isFinite(max) ||
                min < -90 ||
                max > 90 ||
                min > max
            ) {
                throw new Error("Latitude must be between -90 and 90.");
            }

            return faker.number.float({
                min,
                max,
                fractionDigits: options.fractionDigits ?? 6
            });
        }
    },
    {
        name: "location.longitude",
        category: "location",
        outputType: "Number",
        description: "Generates a longitude",
        generate: (options = {}) => {
            const min = options.min ?? -180;
            const max = options.max ?? 180;

            if (
                !Number.isFinite(min) ||
                !Number.isFinite(max) ||
                min < -180 ||
                max > 180 ||
                min > max
            ) {
                throw new Error("Longitude must be between -180 and 180.");
            }

            return faker.number.float({
                min,
                max,
                fractionDigits: options.fractionDigits ?? 6
            });
        }
    }
];