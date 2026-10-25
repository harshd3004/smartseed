const personGenerators = require("./person.generators");
const internetGenerators = require("./internet.generators");
const companyGenerators = require("./company.generators");
const commerceGenerators = require("./commerce.generators");
const numberGenerators = require("./number.generators");
const dateGenerators = require("./date.generators");
const locationGenerators = require("./location.generators");
const loremGenerators = require("./lorem.generators");

module.exports = [
    ...personGenerators,
    ...internetGenerators,
    ...companyGenerators,
    ...commerceGenerators,
    ...numberGenerators,
    ...dateGenerators,
    ...locationGenerators,
    ...loremGenerators
];