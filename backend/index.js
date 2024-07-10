const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: '120.26.81.229',
    user: 'root',
    password: 'Yuanqiyiliao2024!',
    database: 'yuanqiyiliao'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Handle user registration
app.post('/register', (req, res) => {
    const user = req.body;
    const query = 'INSERT INTO register_info SET ?';
    db.query(query, user, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User registered successfully');
    });
});

// Fetch all users (for admin page)
app.get('/admin', (req, res) => {
    const query = 'SELECT * FROM register_info';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.delete('/delete-all', (req, res) => {
    const query = 'DELETE FROM register_info';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error deleting rows:', err);
            return res.status(500).send('Error deleting rows');
        }
        res.send('All rows deleted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
