const express = require("express");
const errorMiddleware = require('./middlewares/errorMiddleware');
const app = express();

//cors

//middlewares
app.use(express.json());


//routes
const schemaRoutes = require("./routes/schemaRoutes");
app.get("/", (req, res) => {
    res.send("Welcome to the SmartSeed API || The server is running successfully");
});
app.use("/api/schema", schemaRoutes);

//err handler
app.use(errorMiddleware);

module.exports = app;