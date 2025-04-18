const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskmanager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/tasks", taskRoutes); // <= Ton endpoint

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const taskRoutes = require("./routes/tasks"); // adapte le chemin si nécessaire
app.use("/api/tasks", taskRoutes);
