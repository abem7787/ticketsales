import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",   // 👈 replace with your MySQL password
  database: "ticketsales_db"
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected!");
});

export default db;
