const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Debugging CORS configuration
const corsOptions = {
  origin: "https://suraj-gitte-portfolio.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
console.log("CORS Configuration:", corsOptions);

app.use(cors(corsOptions));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
console.log("Connecting to MongoDB...");
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

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
  console.log("Incoming POST request to /api/contact");
  console.log("Request Body:", req.body);

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
    console.log("Contact saved to MongoDB:", savedContact);
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
