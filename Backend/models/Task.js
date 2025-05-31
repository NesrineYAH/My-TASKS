const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
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
      ref: "TaskList",
      //  required: true,
      //  type: String,
      required: false,
    },
    category: String,
    reminder: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt automatiquement
  }
);

module.exports = mongoose.model("Task", taskSchema);
