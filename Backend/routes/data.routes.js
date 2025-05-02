const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const Task = require("../models/Task"); // modèle Mongoose
const TaskList = require("../models/taskList");

// Lecture du fichier JSON centralisé (pour les listes uniquement)
const getData = () => {
  const filePath = path.join(__dirname, "../api/Data.json");
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

// ✅ GET /api/tasks - toutes les tâches depuis MongoDB
/* changé 03/05 router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(); // récupère toutes les tâches
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur MongoDB", error: err.message });
  }
});
*/
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find(); // depuis MongoDB
  res.json(tasks);
});

// ✅ GET /api/tasks/:id - tâche unique par ID MongoDB
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // recherche par ID MongoDB
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// ✅ GET /api/lists - depuis le fichier JSON
router.get("/lists", async (req, res) => {
  try {
    const lists = await TaskList.find();
    res.json(lists);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lecture des listes", error: err.message });
  }
});

// ✅ GET /api/lists/:id - liste par ID (JSON local)
router.get("/lists/:id", async (req, res) => {
  try {
    const list = await TaskList.findById(req.params.id);
    if (!list) return res.status(404).json({ message: "Liste introuvable" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
