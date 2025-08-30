// server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Allow requests from React frontend
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    credentials: true,
  })
);

// In-memory "database" for demo
const users = [];

// JWT helper
const JWT_SECRET = "supersecret";
function signAuthToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" });
}

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

  const exists = users.find(u => u.email === email.toLowerCase());
  if (exists) return res.status(409).json({ error: "Email already exists" });

  const hashed = await bcrypt.hash(password, 12);
  const user = { id: users.length + 1, name, email: email.toLowerCase(), password: hashed };
  users.push(user);

  const token = signAuthToken(user.id);
  res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
  res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
});

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const user = users.find(u => u.email === email.toLowerCase());
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid email or password" });

  const token = signAuthToken(user.id);
  res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

const port = 5000;
app.listen(port, () => console.log(`API running at http://localhost:${port}`));
