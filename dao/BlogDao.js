var dbutil = require("./DBUtil");

function insertBlog(title, content, views, tags, ctime, utime, success) {
    var insertSql = "insert into blog (title, content, views, tags, ctime, utime) values (?, ?, ?, ?, ?, ?)";
    var params = [title, content, views, tags, ctime, utime];
    
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

function queryBlogByPage(page, pageSize, success) {
    var querySql = "select * from blog order by id desc limit ?, ?;";
    var params = [page * pageSize, pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
};

function queryBlogByViews(Size, success) {
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [Size];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
};

function queryBlogById(id, success) {
    var querySql = "select * from blog where id=?;";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
};

function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog;";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
};

function addViews(id,success) {
    var insertSql = "update blog set views = views + 1 where id = ?;";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params , function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    });
    connection.end();
};

module.exports = {
    insertBlog: insertBlog,
    queryBlogByPage: queryBlogByPage,
    queryBlogCount: queryBlogCount,
    queryBlogById: queryBlogById,
    addViews: addViews,
    queryBlogByViews: queryBlogByViews
};