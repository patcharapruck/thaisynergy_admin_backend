var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PW,
    database: process.env.DB
});

connection.connect(function(err) {
    if (err){
        console.log(err);
    }
    else{
        console.log('Mysql Connected...');
    }
});

module.exports = connection;