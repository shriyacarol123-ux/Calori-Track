require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection using your .env values
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("DB Connection Error: " + err.message);
        return;
    }
    console.log("Connected to MySQL Database via Environment Variables!");
});

// 2. NutriTrack Meal Logging Route
// In your server.js
app.post('/log-meal', (req, res) => {
    const { name, meal, calories } = req.body;

    // This is the EXACT place where the "Addition" logic lives
    const sql = `
        INSERT INTO meals (user_name, food_name, calories) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        calories = calories + VALUES(calories),
        food_name = VALUES(food_name)`;

    db.query(sql, [name, meal, calories], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database Sync Failed" });
        }
        
        console.log(`Data processed for: ${name}`);
        res.status(200).json({ message: "Success! Calories merged in MySQL." });
    });
});
// 3. Start Server on Port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
