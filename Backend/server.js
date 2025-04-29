const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

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
const taskRoutes = require("./routes/task.routes");
const taskListRoutes = require("./routes/taskList.routes");

app.use("./api/tasks.json", taskRoutes); // pour tasks.json dans /api
app.use("./api/tasks.json", taskListRoutes); // pour lists.json dans /api

// Pour le déploiement Angular (optionnel pour prod)
app.use(express.static(path.join(__dirname, "dist/frontend-name")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/frontend-name/index.html"));
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
