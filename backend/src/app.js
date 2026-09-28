const express = require("express");

const app = express();

//cors

//middlewares
app.use(express.json());


//routes
app.get("/", (req, res) => {
    res.send("Welcome to the SmartSeed API || The server is running successfully");
});

//err handler


module.exports = app;