const uploadModels = (req, res, next) => {
  try {
    const sessionId = req.sessionId;
    const files = req.files || [];

    // Handle missing files
    if (files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No model files were uploaded.",
      });
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


module.exports = {
    uploadModels
};