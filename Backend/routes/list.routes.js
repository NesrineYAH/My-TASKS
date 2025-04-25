const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// GET /api/lists
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../lists.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lecture fichier JSON:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.lists);
    } catch (parseErr) {
      console.error("Erreur parsing JSON:", parseErr);
      res.status(500).json({ error: "Erreur parsing JSON" });
    }
  });
});

module.exports = router;
