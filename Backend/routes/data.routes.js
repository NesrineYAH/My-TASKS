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
// toute les routes de Tasks
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
    //  console.log("✅ Requête GET /tasks reçue"); // debug
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
// ✅ POST /api/tasks - ajouter une tâche
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: err.message });
  }
});

// ✅ PUT /api/tasks/:id - modifier une tâche
router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    res.json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
});

// ✅ DELETE /api/tasks/:id - supprimer une tâche
router.delete("/tasks/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Tâche introuvable" });
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
// toute les routes de Tasks
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
    console.log("✅ Requête GET /list reçue"); // debug
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
// ajouter une liste
router.post("/lists", async (req, res) => {
  try {
    const list = new TaskList(req.body);
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: err.message });
  }
});

module.exports = router;
