const { app } = require('electron');
const sql = require('mssql');



app.post('/search', (req, res) => {
    const config = {
        user:'cory.lamb',
        password:'Sh33p1485',
        server:'ssi_server1',
        database:'Advanced',
        options: {
            encript: true
        }
    };

    const searchTerm = req.body.searchTerm;
    let sqlQuery = `SELECT * FROM dbo.AT_Orders = '${searchTerm}'`;

    sql.connect(config, err => {
        if(err) console.log(err);

        const request = new sql.Request();

        request.query(sqlQuery, (err, result) => {
            if (err) console.log(err);

            res.send(result);
        });
    });
});