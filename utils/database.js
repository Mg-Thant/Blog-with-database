const Sequelize = require("sequelize");

const sequelize = new Sequelize("ejs_blog", "root", "1234567", {
    host : "localhost",
    dialect : "mysql"
});

module.exports = sequelize;