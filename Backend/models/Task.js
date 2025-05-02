const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      _id: ObjectId,
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskList", // Assure-toi que tu as ce modèle
      required: true,
    },
    category: String,
    reminder: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt automatiquement
  }
);

module.exports = mongoose.model("Task", taskSchema);
