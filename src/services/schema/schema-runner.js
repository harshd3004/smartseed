function loadModel(modelPath) {
    const model = require(modelPath);

    if(!model || !model.schema) {
        console.error(`Model at ${modelPath} does not have a schema defined.`);
        return null;
    }

    return model;
}

module.exports = {
    loadModel
};