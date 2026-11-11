const mongoose = require("mongoose");

function loadModel(modelPath) {
    const resolvedPath = require.resolve(modelPath);
    
    delete require.cache[resolvedPath];

    const model = require(resolvedPath);

    if (!model || !model.schema) {
        throw new Error(
            `File "${modelPath}" did not export a valid Mongoose model.`
        );
    }

    return model;
}

function unloadModel(model, modelPath) {
    // Remove the model from Mongoose's registry
    if (model?.modelName) {
        mongoose.deleteModel(model.modelName);
    }

    // Remove the file from Node's module cache
    const resolvedPath = require.resolve(modelPath);
    delete require.cache[resolvedPath];
}

module.exports = {
    loadModel,
    unloadModel
};