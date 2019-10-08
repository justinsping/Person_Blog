var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host: "192.168.3.103",
        port: "3306",
        user: "root",
        password: "zhang123",
        database: "my_blog"
    });
    return connection;
}

module.exports = {createConnection:createConnection}