const path = require('path');
const { loadModel } = require('./services/schema/schema-runner');
const { extractSchemaData } = require('./services/schema/extractor');

const modelPath = path.resolve(
    __dirname,
    '../test/sample-models/',
    'user.js'
)

try {
    // 1. Load Mongoose model
    const model = loadModel(modelPath);

    // 2. Extract Mongoose metadata
    const schemadata = extractSchemaData(model);
    console.log(`Extracted schema data: ${JSON.stringify(schemadata)}`);

    // 3. Convert metadata into SmartSeed IR
    // const ir = buildIR(metadata);

} catch (error) {
    console.error("SmartSeed pipeline failed:");
    console.error(error.message);
}