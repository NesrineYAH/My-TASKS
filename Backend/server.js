const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskListRoutes = require("./routes/taskList.routes");
const taskRoutes = require("./routes/task.routes");
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
app.use("/api/lists", taskListRoutes);

const listRoutes = require("./routes/list.routes");
app.use("/api/lists", listRoutes);
app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
