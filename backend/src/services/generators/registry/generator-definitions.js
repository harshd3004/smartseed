const fakerGenerators = require("../faker");
const customGenerators = require("../custom/custom.generators");

module.exports = [
    ...fakerGenerators,
    ...customGenerators
];