// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Ton modèle Mongoose

// GET toutes les tâches
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks); // <= Envoie le JSON ici
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
