var dbutil = require("./DBUtil");

function insertComment(blog_id, parent, user_name, email, comments, ctime, utime, success) {
    var insertSql = "insert into comments (blog_id, parent, user_name, email, comments, ctime, utime) values (?, ?,?, ?, ?, ?, ?)";
    var params = [blog_id, parent, user_name, email, comments, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
};



module.exports = {
    insertComment: insertComment,
};