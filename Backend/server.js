const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // important !

// ✅ ROUTES CUSTOM POUR /api/data.json -> extraire les listes
app.get("/api/lists", (req, res) => {
  const data = require("./api/data.json");
  const { name } = req.query;
  let lists = data.lists;

  if (name) {
    lists = lists.filter((list) =>
      list.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(lists);
});

app.get("/api/lists/:id", (req, res) => {
  const data = require("./api/data.json");
  const list = data.lists.find((l) => l.id === parseInt(req.params.id));
  if (list) {
    res.json(list);
  } else {
    res.status(404).json({ error: "Liste non trouvée" });
  }
});

// Tu peux faire pareil pour les tâches (facultatif pour l’instant)

// 🔁 Servir les fichiers statiques Angular (prod uniquement)
app.use(express.static(path.join(__dirname, "dist/frontend-name")));

// Dernière route catch-all
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/frontend-name/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
