const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const configUser = process.env.CONFIG_USER;
const configPassword = process.env.CONFIG_PASSWORD;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Stoppe le serveur si erreur
  }
};

module.exports = connectDB;
