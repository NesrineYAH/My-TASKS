const express = require("express");
const cors = require("cors");
const mongoose = require("./mongoDB/DB"); // Connexion à MongoDB
const app = express();
const dataRoutes = require("./routes/data.routes");

// Middlewares
// app.use(cors());
app.use(express.json()); // Pour parser les JSON
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

/*
app.get('/api/tasks/lists/projects/:id', (req, res) => {
  // retourne bien du JSON !
  res.json([...]);
});
*/
// Routes
app.use("/api/", dataRoutes);

module.exports = app;
