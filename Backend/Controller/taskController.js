const Task = require("../models/Task");

exports.getTasksByListId = async (req, res) => {
  const listId = req.params.listId;
  try {
    const tasks = await Task.find({ listId }); // filtre  par listId
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
