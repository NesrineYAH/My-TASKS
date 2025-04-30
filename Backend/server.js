// Importation des modules nécessaires
const http = require("http");
const app = require("./app"); // Appelle ton fichier 'app.js' où tu définis les routes et middleware
const dotenv = require("dotenv").config(); // Charge les variables d'environnement depuis un fichier .env
const db = require("./DB"); // Le chemin doit être relatif à la structure des dossiers

// Fonction pour normaliser le port
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val; // Si le port n'est pas un nombre, on retourne directement la valeur
  }
  if (port >= 0) {
    return port; // Retourne un port valide
  }
  return false; // Retourne faux si le port est invalide
};

// Défini le port à partir des variables d'environnement ou un port par défaut
const port = normalizePort(process.env.PORT || 3000);
app.set("port", port); // Définit le port sur ton application Express

// Gestion des erreurs de serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1); // Quitte le processus si on a des problèmes de permission
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1); // Quitte si le port est déjà utilisé
      break;
    default:
      throw error; // Lance une erreur si autre chose se produit
  }
};

// Création du serveur HTTP avec ton app Express
const server = http.createServer(app);

// Gestion des événements sur le serveur
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind); // Affiche un message quand le serveur écoute
});

// Lancer le serveur
server.listen(port);
