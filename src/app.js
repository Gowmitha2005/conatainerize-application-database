const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Node.js + Express + MySQL API"
  });
});

app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1 AS result");

    res.status(200).json({
      status: "UP",
      database: "CONNECTED"
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(503).json({
      status: "DOWN",
      database: "DISCONNECTED"
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, created_at FROM users ORDER BY id"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch users"
    });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch user"
    });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "name and email are required"
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Email already exists"
      });
    }

    res.status(500).json({
      error: "Failed to create user"
    });
  }
});

module.exports = app;