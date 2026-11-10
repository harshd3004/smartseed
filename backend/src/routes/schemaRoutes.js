const router = require('express').Router();
const schemaControllers = require('../controllers/schemaControllers')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const initializeSession = require('../middlewares/initializeUploadSession')

router.post("/upload", initializeSession, uploadMiddleware, schemaControllers.uploadModels)

router.post("/:sessionId/extract", schemaControllers.extractModels)

module.exports = router;