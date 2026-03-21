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

// 3. The Contact Route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    
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
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));