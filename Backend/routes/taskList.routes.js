const express = require("express");
const router = express.Router();
const db = require("../models");
const TaskList = require("../models/taskList.model");

// Get all lists
router.get("/", async (req, res) => {
  try {
    const { name } = req.query; // /api/lists?name=course
    const filter = name ? { name: new RegExp(name, "i") } : {};
    const lists = await TaskList.find(filter);
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Create a new list
router.post("/", async (req, res) => {
  const { name } = req.body;
  const newList = await TaskList.create({ name });
  res.status(201).json(newList);
});

module.exports = router;
