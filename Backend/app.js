const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
//const bodyParser = require("body-parser");
const mongoose = require("./mongoDB/DB");
//const dotenv = require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dataRoutes = require("./routes/data.routes");
app.use("/api", dataRoutes);
//app.use("/images", express.static(__dirname + "/images"));

module.exports = app;
