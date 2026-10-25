const multer = require("multer");
const path = require("path");
const fs = require("fs");

const MAX_FILES = 10;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const modelsDir = path.resolve(
      process.cwd(),
      "temp",
      req.sessionId,
      "models"
    );

    try {
      fs.mkdirSync(modelsDir, { recursive: true });
      cb(null, modelsDir);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const safeName = path.basename(originalName);

    if (
      !safeName ||
      safeName !== originalName ||
      safeName === "." ||
      safeName === ".."
    ) {
      return cb(new Error("Invalid filename."));
    }

    cb(null, safeName);
  },
});


const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (extension !== ".js") {
    return cb(new Error("Only .js model files are allowed."));
  }

  if (file.mimetype !== "application/javascript" &&
      file.mimetype !== "text/javascript" &&
      file.mimetype !== "application/x-javascript") {
    return cb(new Error("Unsupported file MIME type."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: MAX_FILES,
    fileSize: MAX_FILE_SIZE,
  },
});

module.exports = upload.array("models", MAX_FILES);
