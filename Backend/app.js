const express = require("express");
const cors = require("cors");
const connectDB = require("./DB"); // Connexion à MongoDB
const app = express();
const dataRoutes = require("./data/routes");


connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Pour parser les JSON

// Routes
app.use("/api/data.json", dataRoutes);

// Export de l'application
module.exports = app;
