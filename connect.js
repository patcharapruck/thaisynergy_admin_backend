var mysql = require('mysql');
var config = require('./nodemon');

//local mysql db connection
var connection = mysql.createConnection({
    host: config.env.HOST,
 //   port: config.env.PORT,
    user: config.env.USER,
    password: config.env.PW,
    database: config.env.DB
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