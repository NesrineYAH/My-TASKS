const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  name: {
    _id: string,
    type: String,
    required: true,
    trim: true,
  },
  description: String,
});

module.exports = mongoose.model("TaskList", taskListSchema);
