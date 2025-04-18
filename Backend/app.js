const express = require("express");
const app = express();
const cors = require("cors");
const taskRoutes = require("./api/tasks"); // adapte le chemin

app.use(express.static(path.join(__dirname, "dist/frontend-name")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/frontend-name/index.html"));
});
module.exports = app;
