const express = require("express");
const errorMiddleware = require('./middlewares/errorMiddleware');
const app = express();
const cors = require("cors");

//cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

//middlewares
app.use(express.json());


//routes
const schemaRoutes = require("./routes/schemaRoutes");
const planRoutes = require("./routes/planRoutes");
app.get("/", (req, res) => {
    res.send("Welcome to the SmartSeed API || The server is running successfully");
});
app.use("/api/schema", schemaRoutes);
app.use("/api/plan", planRoutes);

//err handler
app.use(errorMiddleware);

module.exports = app;