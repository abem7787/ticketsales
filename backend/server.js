const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise"); // use promise-based API

dotenv.config();

// Initialize database
async function initDatabase() {
  try {
    // Connect without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "Blueray87$",
      port: process.env.DB_PORT || 3306,
    });

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "Tickets"}\``);
    console.log(`Database '${process.env.DB_NAME || "Tickets"}' is ready.`);

    await connection.end();

    // Now create a pool connected to the database
    const pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "Blueray87$",
      database: process.env.DB_NAME || "Tickets",
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // --- CREATE USERS TABLE ---
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Users table is ready.");

    return pool;
  } catch (err) {
    console.error("Database initialization error:", err);
    process.exit(1);
  }
}

(async () => {
  const db = await initDatabase();

  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // JWT helpers
  function signAuthToken(userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
  }

  function requireAuth(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
      req.userId = payload.sub;
      next();
    } catch {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }

  // Registration endpoint
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const emailLower = email.toLowerCase().trim();

    try {
      // Check if email already exists
      const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [emailLower]);
      if (rows.length > 0) return res.status(409).json({ error: "Email already registered." });

      const passwordHash = await bcrypt.hash(password, 12);

      const [results] = await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name.trim(), emailLower, passwordHash]
      );

      const id = results.insertId;
      const token = signAuthToken(id);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.status(201).json({ user: { id, name: name.trim(), email: emailLower } });
    } catch (err) {
      console.error("MySQL insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
  });

  // Get current user
  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT id, name, email FROM users WHERE id = ?", [req.userId]);
      if (rows.length === 0) return res.status(404).json({ error: "User not found" });
      res.json({ user: rows[0] });
    } catch (err) {
      console.error("MySQL select error:", err);
      res.status(500).json({ error: "Database error" });
    }
  });

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
  });
})();
