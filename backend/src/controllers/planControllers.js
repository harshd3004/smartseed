const fs = require('fs').promises;
const path = require('path');
const { analyzeWithAI } = require('../services/analyzer/ai-analyzer');
const generatePlan = async (req, res, next) => {
    try {
        const { sessionId } = req.params;

        const sessionFolderPath = path.join(__dirname, "../..", "temp", sessionId);

        try {
        await fs.access(sessionFolderPath);
        } catch (err) {
        res.status(404);
        throw new Error("Invalid session ID. Please upload your models first.");
        }

        const irFilePath = path.join(sessionFolderPath, 'ir.json');

        let irObject;
        try {
            const irData = await fs.readFile(irFilePath, 'utf8');
            irObject = JSON.parse(irData);
        } catch (err) {
            if (err.code === 'ENOENT') {
                res.status(404);
                throw new Error("IR file not found for the given session.");
            }
            throw err; 
        }

        const plan = await analyzeWithAI(irObject);

        const planFilePath = path.join(sessionFolderPath, 'plan.json');
        await fs.writeFile(planFilePath, JSON.stringify(plan, null, 2));

        return res.status(200).json({
            success: true,
            message: "Plan generation completed successfully.",
        });
    } catch (error) {
        next(error);
    }
}

const getPlan = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const sessionFolderPath = path.join(__dirname, "../..", "temp", sessionId);

        try {
            await fs.access(sessionFolderPath);
        } catch (err) {
            res.status(404);
            throw new Error("Invalid session ID. Please upload your models first.");
        }

        const planFilePath = path.join(sessionFolderPath, 'plan.json');

        let plan;
        try {
            const planData = await fs.readFile(planFilePath, 'utf8');
            plan = JSON.parse(planData);
        } catch (err) {
            if (err.code === 'ENOENT') {
                res.status(404);
                throw new Error("Plan file not found for the given session.");
            }
            throw err;
        }

        return res.status(200).json({
            success: true,
            plan,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    generatePlan,
    getPlan
}