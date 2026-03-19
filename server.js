<<<<<<< HEAD
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'tigersgb', // <--- TYPE YOUR MYSQL PASSWORD HERE
    database: 'portfolio_db'
});

db.connect(err => {
    if (err) return console.error("DB Error: " + err.message);
    console.log("Connected to MySQL Database!");
});

// Route to save form data
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(query, [name, email, message], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ status: "Success", message: "Message saved!" });
    });
});

=======
const express = require('express');
// load .env file if present to configure email credentials
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'tigersgb', // <--- TYPE YOUR MYSQL PASSWORD HERE
    database: 'portfolio_db'
});

db.connect(err => {
    if (err) return console.error("DB Error: " + err.message);
    console.log("Connected to MySQL Database!");
});

// create mail transporter (requires EMAIL_USER and EMAIL_PASS env vars)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to save form data and send notification email
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(query, [name, email, message], (err) => {
        if (err) return res.status(500).send(err);
        // after saving to db, send an email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            // always send form submissions to the student email
            to: '25dtsa58@kristujayanti.com',
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
        };
        transporter.sendMail(mailOptions, (mailErr) => {
            if (mailErr) {
                console.error('Mail error:', mailErr);
                // still return success for db insert but indicate email problem
                return res.status(500).send({ status: "Saved", message: "Saved to DB but email failed." });
            }
            res.send({ status: "Success", message: "Message saved and email sent!" });
        });
    });
});

>>>>>>> 6651750 (Verified linting and testing-ready for hosting)
app.listen(5000, () => console.log("Server running on http://localhost:5000"));