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
// PATCH /tasks/:id
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date(); // Met à jour le timestamp
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!task) return res.status(404).send({ error: "Tâche introuvable" });
    res.send(task);
  } catch (err) {
    res.status(500).send({ error: "Erreur lors de la mise à jour" });
  }
});

module.exports = router;
