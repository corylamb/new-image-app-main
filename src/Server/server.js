const express = require('express');
const app = express();
const mssql = require('mssql');
const ejs = require('ejs');

// Connect to the database
const connectionString = Server=ssi_server1; Database=Advanded; User ID=CORP\cory.lamb; Password=Sh33p1485;

const pool = new mssql.ConnectionPool(connectionString);

// Create a search function
function search() {
    const searchTerm = document.getElementById('searchTerm').value;
    const query = `SELECT * FROM dbo.AT_orders, WHERE ID, LIKE "%${searchTerm}%"`;



    pool.query(query, (err, row) => {
        if (err) {
            console.lof(err);
            return;
        }
 // Populate the results in the HTML input forms
    const results = rows.map(row => {
        return
        <input type="number" id="patientnumber" value="${row.Patientnum}" />, 
        <input type="text"  id="name" value="${row.PateintName}" />,
        <input type="date"  id="dos" value="${row.Created}" />
       }) ;

       document.getElementById('results').innerHTML = results.join('');
    });
}
