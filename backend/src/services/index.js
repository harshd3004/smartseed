const path = require('path');
const { loadModel } = require('./schema/schema-runner');
const { extractSchemaData } = require('./schema/extractor');
const { buildIR } = require('./schema/ir-builder');
const { analyzeIR } = require('./analyzer/rule-analyzer');

const modelPath = path.resolve(
    __dirname,
    '../../test/sample-models/',
    'user.js'
)

try {
    // 1. Load Mongoose model
    const model = loadModel(modelPath);

    // 2. Extract Mongoose metadata
    const schemadata = extractSchemaData(model);
    console.log(`Extracted schema data: ${JSON.stringify(schemadata)}`);

    // 3. Convert metadata into SmartSeed IR
    const ir = buildIR(schemadata);
    console.log(`\n\nGenerated IR: ${JSON.stringify(ir)}`);

    // 4. Analyze the generated IR
    const analysis = analyzeIR(ir);
    console.log(`\n\nAnalysis: ${JSON.stringify(analysis)}`);
    
} catch (error) {
    console.error("SmartSeed pipeline failed:");
    console.error(error.message);
}