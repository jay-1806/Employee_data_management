const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const querystring = require('querystring');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'Employee'
});

app.get('/', (req, res) => {
    res.send(`Welcome to Jay's employee management system!!!`);
});

app.get('/employees', (req, res) => {
    pool.query('SELECT * FROM Employees', (error, results) => {
        if (error)
            res.send('There is an error');
        res.json(results);
    });
    // res.send('<h1> This is the employee page!!!</h1>');
});

app.post('/employees', (req, res) => {
    const { name, email, city, department } = req.body || req.query;
    pool.query('INSERT INTO Employees(emp_name,mail,city,department) VALUES (?,?,?,?)', [name, email, city, department], (error, results) => {
        if (error) {
            console.log('There is an error inserting the employee:', error);
            return res.status(500).json({ error: 'An internal server error occurred' });
        }
        res.status(201).json({ message: 'Employee added successfully!' });
    });
});

app.post('/employees', (req, res) => {
    const { name, email, mobile } = req.body;
    pool.query('INSERT INTO Employees(emp_name,mail,mobile) VALUES (?,?,?)', [name, email, mobile], (error, results) => {
        if (error) {
            console.log('There is an error inserting the employee:', error);
            return res.status(500).json({ error: 'An internal server error occurred' });
        }
        res.status(201).json({ message: 'Employee added successfully!' });
    });
});

app.put('/employees/:id', (req, res) => {
    const { name, email, mobile, salary, city, department } = req.body;
    const { id } = req.params;
    pool.query('UPDATE Employees SET emp_name = ?, mail = ?, mobile = ?,salary = ?,city = ?,department = ? WHERE emp_id = ?', [name, email, mobile, salary, city, department, id], (error, results) => {
        if (error) {
            console.log('There is an error updating the employee information:', error);
            return res.status(500).json({ error: 'An internal server error occurred' });
        }
        res.send('Employee information updated successfully!');
    });
});

app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM Employees WHERE emp_id = ?', [id], (error, results) => {
        if (error) {
            console.log('There is an error deleting the employee:', error);
            return res.status(500).json({ error: 'An internal server error occurred' });
        }
        res.send('Employee deleted successfully!');
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})