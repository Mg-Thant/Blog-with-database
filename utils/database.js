const mysql = require("mysql2");
const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    database : "ejs_blog",
    password : "1234567"
})

module.exports = pool.promise();