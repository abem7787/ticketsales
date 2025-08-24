const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// In-memory user store for demo (swap with DB later)
const users = []; // { id, name, email, passwordHash }

function signAuthToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  const emailLower = String(email).toLowerCase().trim();
  const exists = users.find((u) => u.email === emailLower);
  if (exists) return res.status(409).json({ error: "Email already registered." });

  const passwordHash = await bcrypt.hash(password, 12);
  const id = String(users.length + 1);
  const user = { id, name: String(name).trim(), email: emailLower, passwordHash };
  users.push(user);

  const token = signAuthToken(id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  return res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email },
  });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  const me = users.find((u) => u.id === req.userId);
  if (!me) return res.status(404).json({ error: "User not found" });
  res.json({ user: { id: me.id, name: me.name, email: me.email } });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
