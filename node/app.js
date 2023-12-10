const express = require('express');
const mysql = require('mysql2')

const app = express();
const port = 3000;

const databaseConfig = {
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'database'
}

const conn = mysql.createConnection(databaseConfig)
conn.query("CREATE TABLE IF NOT EXISTS PEOPLE (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);")


app.get('/', (req, res) => {

    res.set('Content-Type', 'text/html')
    let html = `<h1>Full Cycle Rocks!!!!</h1>`

    conn.query("INSERT INTO PEOPLE(name) VALUES('Bobby');")
    conn.query("SELECT name FROM PEOPLE;", (err, result) => {

        html += `<ul>`

        result.forEach(person => {
            html += `<li>${person.name}</li>`
        })

        html += `</ul>`

        res.send(html)
    })
});

app.listen(port, () => {
    console.log(`I am listening!`);
});
