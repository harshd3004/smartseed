const router = require('express').Router();
const schemaControllers = require('../controllers/schemaControllers')

router.post("/upload",schemaControllers.uploadModels)

module.exports = router;