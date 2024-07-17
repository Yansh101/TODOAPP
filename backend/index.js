import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Task from "./models/task.js"; // Ensure correct path to the Task model
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Route to create a new task
app.post("/createtodo", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Could not create todo" });
  }
});

app.get("/gettodo", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, todos: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not get todo" });
  }
});

// Updated delete route
app.delete("/deletetodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Could not delete todo" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
