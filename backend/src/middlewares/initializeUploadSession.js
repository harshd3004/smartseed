const crypto = require("crypto");

const initializeUploadSession = (req, res, next) => {
  req.sessionId = crypto.randomUUID();

  next();
};

module.exports = initializeUploadSession;