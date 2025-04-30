const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Lecture du fichier JSON centralisé
const getData = () => {
  const filePath = path.join(__dirname, "../api/data.json");
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

// GET /api/tasks - toutes les tâches
router.get("/tasks", (req, res) => {
  try {
    const data = getData();
    res.json(data.tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lecture des tâches", error: err.message });
  }
});

// GET /api/tasks/:id - tâche par ID
router.get("/tasks/:id", (req, res) => {
  try {
    const data = getData();
    const task = data.tasks.find((t) => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// GET /api/lists - toutes les listes
router.get("/lists", (req, res) => {
  try {
    const data = getData();
    res.json(data.lists);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lecture des listes", error: err.message });
  }
});

// GET /api/lists/:id - liste par ID
router.get("/lists/:id", (req, res) => {
  try {
    const data = getData();
    const list = data.lists.find((l) => l.id === req.params.id);
    if (!list) return res.status(404).json({ message: "Liste introuvable" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
