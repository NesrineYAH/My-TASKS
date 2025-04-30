// models/TaskList.js
const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("TaskList", taskListSchema);
