const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const Task = require("../models/Task"); // modèle Mongoose
const TaskList = require("../models/taskList");
const Project = require("../models/Project");

// Lecture du fichier JSON centralisé (pour les listes uniquement)
const getData = () => {
  const filePath = path.join(__dirname, "../api/Data.json");
  const rawData = fs.readFileSync(filePath);
  const writeData = fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return JSON.parse(rawData);
};
// toute les routes de Tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find(); // depuis MongoDB
  //    const tasks = await Task.findById(req.params.id);

  res.json(tasks);
});

// GET /api/tasks/:id - tâche unique par ID MongoDB
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
//  POST /api/tasks - ajouter une tâche
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

//  PUT /api/tasks/:id - modifier une tâche
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

//  DELETE /api/tasks/:id - supprimer une tâche
router.delete("/tasks/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Tâche introuvable" });
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
// toute les routes de Lists
//  GET /api/lists - depuis le fichier JSON
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

//  GET /api/lists/:id - liste par ID (JSON local)
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
    const list = new TaskList(req.body); // Crée une nouvelle instance du modèle TaskList avec les données reçues
    // Enregistre dans MongoDB
    await list.save();
    // Retourne la liste créée avec un code HTTP 201
    res.status(201).json(list);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: err.message });
  }
});

// PUT /api/lists/:id - modifier une liste
router.put("/lists/:id", async (req, res) => {
  try {
    const updatedList = await TaskList.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedList)
      return res.status(404).json({ message: "Liste introuvable" });
    res.json(updatedList);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
});

// ✅ DELETE /api/lists/:id - supprimer une liste
router.delete("/lists/:id", async (req, res) => {
  try {
    const result = await TaskList.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Liste introuvable" });
    res.json({ message: "Liste supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create a new project
router.post("/", async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT Update a project
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELELTE a project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.body.id);
    res.json({ message: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
