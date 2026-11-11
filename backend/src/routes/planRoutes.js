const router = require('express').Router();
const planControllers = require('../controllers/planControllers')

router.post("/:sessionId", planControllers.generatePlan)

router.get("/:sessionId", planControllers.getPlan)

module.exports = router;