const express = require("express");
const { db } = require("./database");
const router = express.Router();

// Get all tasks
router.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks";
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error." });
      return;
    }
    res.json(rows);
  });
});

// Create a new task
router.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  const query = `
    INSERT INTO tasks (title, description, completed)
    VALUES (?, ?, ?)
  `;
  db.run(query, [title, description, completed], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error." });
      return;
    }
    res.json({ message: "Task created successfully." });
  });
});

// Update a task
router.put("/tasks/:id", (req, res) => {
  const { title, description, completed } = req.body;
  const { id } = req.params;
  const query = `
      UPDATE tasks
      SET title = ?,
          description = ?,
          completed = ?
      WHERE id = ?
    `;
  db.run(query, [title, description, completed, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error." });
      return;
    }
    res.json({ message: "Task updated successfully." });
  });
});

// Delete a task
router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const query = `
      DELETE FROM tasks
      WHERE id = ?
    `;
  db.run(query, [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error." });
      return;
    }
    res.json({ message: "Task deleted successfully." });
  });
});

// Filter tasks by completion status
router.get("/tasks/:completed", (req, res) => {
  const { completed } = req.params;
  console.log(completed);
  let query = "SELECT * FROM tasks";

  // If completed query parameter is present, filter by completed status
  if (completed !== undefined) {
    query += ` WHERE completed = ${completed}`;
  }
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error." });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
