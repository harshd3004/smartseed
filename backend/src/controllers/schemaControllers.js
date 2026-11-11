const fs = require('fs').promises;
const path = require('path');
const { loadModel } = require('../services/schema/schema-runner');
const { extractSchemaData } = require('../services/schema/extractor');
const { buildIR } = require('../services/schema/ir-builder');

const uploadModels = (req, res, next) => {
  try {
    const sessionId = req.sessionId;
    const files = req.files || [];

    // Handle missing files
    if (files.length === 0) {
      res.status(400);
      throw new Error("No files were uploaded. Please upload at least one Mongoose model file.");
    }

    // Get the filenames saved by Multer
    const uploadedFiles = files.map((file) => file.filename);

    return res.status(201).json({
      success: true,
      sessionId,
      status: "uploaded",
      files: uploadedFiles,
    });
  } catch (error) {
      next(error);
  }
};

const extractModels = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;

    // Validate sessionId
    if (!sessionId) {
      res.status(400);
      throw new Error("Session ID is required for model extraction.");
    }

    const sessionFolderPath = path.join(__dirname, "../..", "temp", sessionId);

    // check if seesion folder exists
    try {
      await fs.access(sessionFolderPath);
    } catch (err) {
      res.status(404);
      throw new Error("Invalid session ID. Please upload your models first.");
    }

    const modelsPath = path.join(
        sessionFolderPath,
        'models'
    )

    const items = await fs.readdir(modelsPath, { withFileTypes: true });

    const modelFiles = items
        .filter(item => item.isFile() && item.name.endsWith(".js"))
        .map(item => path.join(modelsPath, item.name));

    if (modelFiles.length === 0) {
        res.status(404);
        throw new Error("No model files found in the session folder.");
    }

    // Extract metadata from every model
    const extractedModels = [];

    for (const modelFilePath of modelFiles) {
        const model = loadModel(modelFilePath);

        const schemaData = extractSchemaData(model);

        extractedModels.push(schemaData);
    }

    const ir = buildIR(extractedModels);

    const irFilePath = path.join(sessionFolderPath, 'ir.json');

    await fs.writeFile(irFilePath, JSON.stringify(ir, null, 2));

    return res.status(200).json({
      success: true,
      message: "Model extraction and IR generation completed successfully."
    });
    
  } catch (error) {
    next(error);
  }
}

const getIR = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;

    // Validate sessionId
    if (!sessionId) {
      res.status(400);
      throw new Error("Session ID is required to fetch the IR.");
    }

    const sessionFolderPath = path.join(__dirname, "../..", "temp", sessionId);

    // check if seesion folder exists
    try {
      await fs.access(sessionFolderPath);
    } catch (err) {
      res.status(404);
      throw new Error("Invalid session ID. Please upload your models first.");
    }

    const irFilePath = path.join(sessionFolderPath, 'ir.json');

    // check if IR file exists
    try {
      await fs.access(irFilePath);
    } catch (err) {
      res.status(404);
      throw new Error("IR file not found for the given session.");
    }

    const irData = await fs.readFile(irFilePath, 'utf8');

    return res.status(200).json({
      success: true,
      ir: JSON.parse(irData)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
    uploadModels,
    extractModels,
    getIR
};