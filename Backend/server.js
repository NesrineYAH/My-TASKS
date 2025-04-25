const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const taskListRoutes = require("./routes/taskList.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect("mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connecté à MongoDB");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB:", err);
  });

// Routes API
app.use("/api/lists", taskListRoutes);
app.use("/api/tasks", taskRoutes);

// Pour le déploiement Angular (optionnel pour prod)
app.use(express.static(path.join(__dirname, "dist/frontend-name")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/frontend-name/index.html"));
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
