function extractField(pathName, schemaType) {
    const field = {
        name: pathName,
        type: schemaType.instance
    };

    const options = schemaType.options;

    // Required
    if (options.required !== undefined) {
        field.required = Boolean(options.required);
    }

    if (options.unique !== undefined) {
        field.unique = Boolean(options.unique);
    }

    if (options.default !== undefined) {
        field.default = options.default;
    }

    if (options.enum !== undefined) {
        field.enum = options.enum;
    }

    if (options.min !== undefined) {
        field.min = options.min;
    }

    if (options.max !== undefined) {
        field.max = options.max;
    }

    // Reference
    if (options.ref !== undefined) {
        field.ref = options.ref;
    }

    return field;
}

function extractSchemaData(model) {
   const schema = model.schema;
   const fields = [];
   console.log(`Schema : ${JSON.stringify(schema)}`);

   for (const [pathName, schemaType] of Object.entries(schema.paths)) {

        // Ignore Mongoose's automatically generated _id field
        if (pathName === "_id") {
            continue;
        }

        const field = extractField(pathName, schemaType);

        fields.push(field);
    }
   
   return {
    name: model.modelName,
    collection: model.collection.name,
    fields
   }
}

module.exports = {
    extractSchemaData
};