require("dotenv").config(); // Charger les variables d'environnement
const app = require("./app"); // Charger l'application Express
const http = require("http");
const express = require("express");
const path = require("path");
const mongoose = require("./mongoDB/DB"); // ou chemin correct
const cors = require("cors");

//const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // indispensable pour POST/PUT

// 1. Sert tous les fichiers statiques (HTML, CSS, JS, images…) dans /public
app.use(express.static(path.join(__dirname, "./public")));
// 2. Si la route n’est pas trouvée (pour un SPA type React),
const taskRoutes = require("./routes/data.routes");
app.use("/tasks", taskRoutes);

const listRoutes = require("./routes/data.routes");
app.use("/lists", listRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api/data.json`);
});
