const { faker } = require("@faker-js/faker");

function validDate(value, optionName) {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        throw new Error(`${optionName} must be a valid date.`);
    }

    return date;
}

function between(start, end) {
    if (start > end) {
        throw new Error("Date start must be earlier than or equal to end.");
    }

    return faker.date.between({
        from: start,
        to: end
    });
}

module.exports = [
    {
        name: "date.past",
        category: "date",
        outputType: "Date",
        description: "Generates a date in the past",
        generate: (options = {}) => {
            const refDate = validDate(
                options.refDate ?? new Date(),
                "refDate"
            );
            const years = options.years ?? 1;

            if (!Number.isFinite(years) || years < 0) {
                throw new Error("years must be a non-negative number.");
            }

            const start = new Date(refDate);
            start.setFullYear(start.getFullYear() - years);

            return between(start, refDate);
        }
    },
    {
        name: "date.future",
        category: "date",
        outputType: "Date",
        description: "Generates a date in the future",
        generate: (options = {}) => {
            const refDate = validDate(
                options.refDate ?? new Date(),
                "refDate"
            );
            const years = options.years ?? 1;

            if (!Number.isFinite(years) || years < 0) {
                throw new Error("years must be a non-negative number.");
            }

            const end = new Date(refDate);
            end.setFullYear(end.getFullYear() + years);

            return between(refDate, end);
        }
    },
    {
        name: "date.recent",
        category: "date",
        outputType: "Date",
        description: "Generates a recent date",
        generate: (options = {}) => {
            const days = options.days ?? 7;

            if (!Number.isFinite(days) || days < 0) {
                throw new Error("days must be a non-negative number.");
            }

            const to = validDate(
                options.refDate ?? new Date(),
                "refDate"
            );
            const from = new Date(
                to.getTime() - days * 24 * 60 * 60 * 1000
            );

            return between(from, to);
        }
    },
    {
        name: "date.any",
        category: "date",
        outputType: "Date",
        description: "Generates a date within a specified range",
        generate: (options = {}) => {
            const from = validDate(
                options.from ?? "2000-01-01",
                "from"
            );
            const to = validDate(
                options.to ?? new Date(),
                "to"
            );

            return between(from, to);
        }
    }
];