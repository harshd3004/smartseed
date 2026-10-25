const express = require("express");

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


module.exports = app;