const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["todo", "in_progress", "done"],
    default: "todo",
  },
  dueDate: Date,

  reminder: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// 👉 Middleware pour mettre à jour updatedAt avant chaque save
taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
module.exports = mongoose.model("Task", taskSchema);
