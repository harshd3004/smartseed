const path = require('path');
const { loadModel } = require('./schema/schema-runner');
const { extractSchemaData } = require('./schema/extractor');
const { buildIR } = require('./schema/ir-builder');
const { analyzeIR } = require('./analyzer/rule-analyzer');
const { analyzeWithAI } = require('./analyzer/ai-analyzer');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const modelPath = path.resolve(
    __dirname,
    '../../test/sample-models/',
    'Content.js'
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
    const RuleAnalysis = analyzeIR(ir);
    console.log(`\n\nRule Analysis: ${JSON.stringify(RuleAnalysis)}`);

    analyzeWithAI(ir)
        .then((AIAnalysis) => {
            console.log(`\n\nAI Analysis: ${JSON.stringify(AIAnalysis)}`);
        });
} catch (error) {
    console.error("SmartSeed pipeline failed:");
    console.error(error.message);
}