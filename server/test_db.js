const { connect } = require("http2");
var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "my-product"
})

// pool.connect();

var name = 'P';
var email = 'peter.p@gmail.com';

pool.query("SELECT * FROM users WHERE first_name = ? AND last_name = ?", ['John', 'Wick'], (error, results, fields) => {
    if (error) throw error;

    console.log(results);
})

// connection.end();