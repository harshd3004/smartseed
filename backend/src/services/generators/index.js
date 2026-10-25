const GeneratorRegistry = require("./registry/generator-registry");
const generatorDefinitions = require("./registry/generator-definitions");

const registry = new GeneratorRegistry();

for (const generator of generatorDefinitions) {
    registry.register(generator);
}

module.exports = registry;