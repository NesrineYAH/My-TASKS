const express = require("express");
const app = express();
const taskRoutes = require("./routes/task.routes");
const taskListRoutes = require("./routes/taskList.routes");

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("./mongoDB/DB");
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS :
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  next();
});
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("./api/tasks", taskRoutes);
app.use("./api/lists", taskListRoutes);
//app.use("/images", express.static(__dirname + "/images"));

module.exports = app;
