let currentTotal = 0; // The counter starts at zero when the page loads
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'tigersgb', 
    database: 'nutritrack_db'
});

db.connect(err => {
    if (err) return console.error("DB Error: " + err.message);
    console.log("Connected to MySQL Database!");
});

// 2. Email Transporter (Ensure .env file has EMAIL_USER and EMAIL_PASS)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
    db.query(query, [name, email, message], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send({ status: "Error", message: "Database failure" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: '25dtsa58@kristujayanti.com',
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
        };

        transporter.sendMail(mailOptions, (mailErr) => {
            if (mailErr) {
                console.error('Mail error:', mailErr);
                // Return 200 so the user knows the data was at least saved to MySQL
                return res.status(200).send({ status: "Saved", message: "Saved to DB but email failed." });
            }
            res.send({ status: "Success", message: "✨ Thank you! Message saved to MySQL and Email sent! ✨" });
        });
    });
// --- REPLACE YOUR LOG-MEAL ROUTE WITH THIS ---

app.post('/log-meal', (req, res) => {
    const { meal, calories } = req.body;
    
    // Using placeholders (?) prevents SQL Injection - Great for the demo!
    const sql = 'INSERT INTO meals (food_name, calories) VALUES (?, ?)';
    
    db.query(sql, [meal, calories], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "DB sync failed" });
        }
        
        console.log("Data committed to MySQL. ID:", result.insertId);
        res.status(200).json({ 
            status: "Success", 
            message: "Nutritional data synced to local vault." 
        });
    });
});

// --- MAKE SURE THIS IS AT THE VERY BOTTOM ---
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
app.listen(5000, () => console.log("Server running on http://localhost:5000"));