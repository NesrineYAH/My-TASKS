const express = require("express");
const router = express.Router();
const db = require("../models");
const TaskList = db.TaskList;

// Get all lists
router.get("/", async (req, res) => {
  const lists = await TaskList.findAll();
  res.json(lists);
});

// Create a new list
router.post("/", async (req, res) => {
  const { name } = req.body;
  const newList = await TaskList.create({ name });
  res.status(201).json(newList);
});

module.exports = router;
