require("dotenv").config(); // Charger les variables d'environnement
const app = require("./app"); // Charger l'application Express
const http = require("http");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
