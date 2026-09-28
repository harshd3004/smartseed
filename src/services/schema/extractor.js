function extractSchemaData(model) {
   const schema = model.schema;
   const fields = [];
   
   
   return {
    name: model.modelName,
    collection: model.collection.name,
    fields
   }
}

module.exports = {
    extractSchemaData
};