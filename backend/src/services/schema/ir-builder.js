function buildIR(modelMetadata) {
    return {
        models: [
            {
                name: modelMetadata.name,
                collection: modelMetadata.collection,
                fields: modelMetadata.fields
            }
        ]
    };
}

module.exports = {
    buildIR
};