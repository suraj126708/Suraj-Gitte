const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://suraj-gitte-portfolio.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "POST, GET, OPTIONS",
    allowedHeaders: ["Content-Type"],
  })
);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
console.log("Connecting to MongoDB...");
mongoose
  .connect(mongoURI)
  .then(() => {})
  .catch((err) => {});

// Mongoose Schema and Model
const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  })
);

// POST /api/contact - Add debugging for incoming requests and errors
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.error("Validation Error: Missing required fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  const newContact = new Contact({
    name,
    email,
    message,
  });

  try {
    const savedContact = await newContact.save();
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/test", (req, res) => {
  console.log("GET request received at /test");
  res.send("Hello from server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
