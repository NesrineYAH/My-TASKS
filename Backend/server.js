require("dotenv").config(); // Charger les variables d'environnement
const app = require("./app"); // Charger l'application Express
const http = require("http");
const express = require("express");
const path = require("path");

//const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// 1. Sert tous les fichiers statiques (HTML, CSS, JS, images…) dans /public
app.use(express.static(path.join(__dirname, "./public")));

// 2. Si la route n’est pas trouvée (pour un SPA type React),

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api/data.json`);
});
