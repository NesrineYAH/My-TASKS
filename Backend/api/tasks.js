const express = require("express");
 const router = express.Router();
 const Task = require("../models/Task");

// //** Get all tasks
 router.get("./", async (req, res) => {
   const tasks = await Task.find();
   res.json(tasks);
 });

// //** POST new task
 router.post("/", async (req, res) => {
   const newTask = new Task(req.body);
   await newTask.save();
   res.status(201).json(newTask);
});

// //** */ PATCH unpdate task
 router.patch("./:id", async (req, res) => {
   try {
     const task = await Task.findByIdAndUpdate(
       req.params.id,
       { ...req.body, updateAt: new Date() },
       { new: true }
     );
     res.json(task);
   } catch (err) {
     res.status(500), json({ error: "Task not found or failed to update" });
   }
 });
// // DELETE task
 router.delete("/:id", async (req, res) => {
   await Task.findByIdAndDelete(req.params.id);
   res.status(204).end();
 });
 module.exports = router;
