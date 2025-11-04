// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ✅ MySQL Database Connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "tickets_user",
  password: "AppPass123!",
  database: "tickets",
  port: 3306
});

db.connect(err => {
  if (err) console.error("❌ DB connection failed:", err.message);
  else console.log("✅ MySQL Connected!");
});

// ✅ POST route — create new event with seats
app.post("/api/events", (req, res) => {
  const { eventName, patternName, seatPrices, seats } = req.body;

  if (!eventName || !patternName || !seats) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Generate a BIGINT timestamp ID
  const eventId = Date.now(); // e.g. 1762217669171

  const insertEvent = "INSERT INTO events (id, name, pattern_name) VALUES (?, ?, ?)";
  db.query(insertEvent, [eventId, eventName, patternName], (err) => {
    if (err) return res.status(500).json({ message: "DB error inserting event" });

    // Flatten seats and prepare bulk insert
    const seatValues = [];
    seats.forEach((row, rowIndex) => {
      row.forEach((seat, colIndex) => {
        let seatColor = "blue";
        if (seat.type === "VIP") seatColor = "yellow";
        else if (seat.type === "Reserved") seatColor = "red";

        seatValues.push([
          eventId, // use custom BIGINT ID here
          rowIndex,
          colIndex,
          seat.label,
          seat.type || "Standard",
          seat.price || 0,
          seat.status || "available",
          seatColor
        ]);
      });
    });

    const insertSeats = `
      INSERT INTO seats
      (event_id, row_index, col_index, seat_label, type, price, status, color)
      VALUES ?
    `;
    db.query(insertSeats, [seatValues], err2 => {
      if (err2) return res.status(500).json({ message: "DB error inserting seats" });
      res.status(201).json({ message: "Event and seats saved!", eventId });
    });
  });
});

// ✅ GET route — fetch a specific event with seats
app.get("/api/events/:id", (req, res) => {
  const eventId = req.params.id;

  const eventQuery = "SELECT * FROM events WHERE id = ?";
  db.query(eventQuery, [eventId], (err, eventResult) => {
    if (err) return res.status(500).json({ message: "DB error fetching event" });
    if (eventResult.length === 0) return res.status(404).json({ message: "Event not found" });

    const event = eventResult[0];

    const seatsQuery = "SELECT * FROM seats WHERE event_id = ? ORDER BY row_index, col_index";
    db.query(seatsQuery, [eventId], (err2, seatsResult) => {
      if (err2) return res.status(500).json({ message: "DB error fetching seats" });

      // Convert to 2D array by row_index
      const seats2D = [];
      seatsResult.forEach(seat => {
        if (!seats2D[seat.row_index]) seats2D[seat.row_index] = [];
        seats2D[seat.row_index][seat.col_index] = {
          label: seat.seat_label,
          type: seat.type,
          price: seat.price,
          status: seat.status,
          color: seat.color
        };
      });

      res.json({
        eventName: event.name,
        patternName: event.pattern_name,
        seats: seats2D
      });
    });
  });
});

// ✅ GET all events (optional)
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) return res.status(500).json({ message: "DB error fetching events" });
    res.json(result);
  });
});

// Start server
const port = 5000;
app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));
