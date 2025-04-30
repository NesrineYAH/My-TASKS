const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ✅ GET toutes les tâches
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // 🟢 Ajout de "await"
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PATCH une tâche spécifique
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }); // 🟢 Ajout de "await"

    if (!task) {
      return res.status(404).json({ error: "Tâche introuvable" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});

module.exports = router;
