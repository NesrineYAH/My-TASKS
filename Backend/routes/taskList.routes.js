const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const listsFilePath = path.join(__dirname, "../api/lists.json");

// 👉 Fonction utilitaire : Lire les listes
function readLists() {
  const data = fs.readFileSync(listsFilePath, "utf8");
  return JSON.parse(data).lists;
}

// 👉 Fonction utilitaire : Écrire les listes
function writeLists(lists) {
  fs.writeFileSync(listsFilePath, JSON.stringify({ lists }, null, 2));
}

// 👉 Route : GET /api/lists => récupère toutes les listes
router.get("/", (req, res) => {
  const { name } = req.query;
  let lists = readLists();

  if (name) {
    lists = lists.filter((list) =>
      list.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(lists);
});

// 👉 Route : GET /api/lists/:id => récupère une liste par ID
router.get("/:id", (req, res) => {
  const lists = readLists();
  const list = lists.find((l) => l.id === parseInt(req.params.id));

  if (!list) {
    return res.status(404).json({ error: "Liste non trouvée" });
  }

  res.json(list);
});

// 👉 Route : POST /api/lists => créer une nouvelle liste
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Le nom est requis" });
  }

  const lists = readLists();
  const newList = {
    id: lists.length > 0 ? lists[lists.length - 1].id + 1 : 1, // auto-incrément
    name,
  };

  lists.push(newList);
  writeLists(lists);

  res.status(201).json(newList);
});

// 👉 Route : DELETE /api/lists/:id => supprimer une liste
router.delete("/:id", (req, res) => {
  let lists = readLists();
  const id = parseInt(req.params.id);

  const listIndex = lists.findIndex((l) => l.id === id);
  if (listIndex === -1) {
    return res.status(404).json({ error: "Liste non trouvée" });
  }

  lists.splice(listIndex, 1); // supprime l'élément
  writeLists(lists);

  res.json({ message: "Liste supprimée avec succès" });
});

// 👉 Route : PUT /api/lists/:id => modifier une liste
router.put("/:id", (req, res) => {
  const { name } = req.body;
  const id = parseInt(req.params.id);

  let lists = readLists();
  const list = lists.find((l) => l.id === id);

  if (!list) {
    return res.status(404).json({ error: "Liste non trouvée" });
  }

  if (!name) {
    return res.status(400).json({ error: "Le nom est requis" });
  }

  list.name = name; // met à jour le nom
  writeLists(lists);

  res.json(list);
});

module.exports = router;

/**
 * fs est le module File System (système de fichiers) de Node.js.
 * En gros, fs te permet de :
Lire des fichiers (fs.readFile)
Écrire/modifier des fichiers (fs.writeFile)
Supprimer des fichiers (fs.unlink)
 */
