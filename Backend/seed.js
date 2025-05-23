const fs = require("fs");
const path = require("path");
const mongoose = require("./mongoDB/DB"); // ton fichier de connexion
const Task = require("./models/Task");
const TaskList = require("./models/taskList"); // modèle correct
const Project = require("./models/Project");

// Connexion à MongoDB
/*
mongoose
  .connect("mongodb://localhost:27017/TasksDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB:", err);
    process.exit(1);
  });
*/
// Lecture du fichier JSON
const dataPath = path.join(__dirname, "api", "Data.json");

const rawData = fs.readFileSync(dataPath);
const { tasks, lists, projects } = JSON.parse(rawData); // <<<<<< CORRIGÉ : rawData au lieu de rowData

async function seedDatabase() {
  try {
    // Suppression des anciennes données
    await Task.deleteMany({});
    await TaskList.deleteMany({});
    await Project.deleteMany({});

    // Insertion des listes
    const createdLists = await TaskList.insertMany(
      lists.map((list) => ({ name: list.name }))
    );

    // Mapping entre anciens ID et nouveaux _id MongoDB
    const listIdMap = {};
    lists.forEach((list, index) => {
      listIdMap[list.id] = createdLists[index]._id;
    });

    // Conversion des listId dans les tâches
    const tasksWithConvertedListId = tasks
      .filter((task) => task.listId) // ne garde que les tâches avec une liste valide
      .map((task) => ({
        title: task.title,
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        listId: listIdMap[task.listId], // conversion ici
        category: task.category || "",
        reminder: task.reminder || false,
        dueDate: task.dueDate || null,
      }));
    await Task.insertMany(tasksWithConvertedListId);

    // ✅ Insertion des projets
    if (projects && projects.length > 0) {
      const formattedProjects = projects.map((proj) => ({
        name: proj.name,
        description: proj.description || "",
        category: proj.category || "",
        createdAt: proj.createdAt || new Date(),
      }));
      await Project.insertMany(formattedProjects);
    }

    console.log("Données importées avec succès !");
    process.exit(0);
  } catch (err) {
    console.error(" Erreur lors de l'import :", err);
    process.exit(1);
  }
}

seedDatabase();
