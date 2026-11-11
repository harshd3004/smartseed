function buildIR(modelsMetadata) {
    return {
        models: modelsMetadata.map(modelMetadata => ({
            name: modelMetadata.name,
            collection: modelMetadata.collection,
            fields: modelMetadata.fields
        }))
    };
}

module.exports = {
    buildIR
};