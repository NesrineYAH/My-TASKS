const express = require("express");
const router = express.Router();
const TaskList = require("../models/taskList.model");

// 👉 Route : GET /api/lists => récupère toutes les listes (avec filtre optionnel)
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: new RegExp(name, "i") } : {};
    const lists = await TaskList.find(filter);
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 👉 Route : GET /api/lists/:id => récupère UNE liste par son ID
router.get("/:id", async (req, res) => {
  try {
    const list = await TaskList.findById(req.params.id);
    if (!list) return res.status(404).json({ error: "Liste non trouvée" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 👉 Route : POST /api/lists => créer une nouvelle liste
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Le nom est requis" });
    }
    const newList = await TaskList.create({ name });
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
