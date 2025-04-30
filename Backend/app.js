const express = require("express");
const cors = require("cors");
const mongoose = require("./mongoDB/DB"); // Connexion à MongoDB
const app = express();
const dataRoutes = require("./routes/data.routes");

// Middlewares
app.use(cors());
app.use(express.json()); // Pour parser les JSON

// Routes
app.use("./api", dataRoutes);
module.exports = app;
