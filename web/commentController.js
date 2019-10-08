var commentDao = require("../dao/CommentDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");

var path = new Map();

function addComment(request, response) {
        var params = url.parse(request.url, true).query;
        console.log(params);
        commentDao.insertComment(parseInt(params.bid),params.parent,params.name,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        })
};
path.set("/addComment", addComment)

function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "添加成功", img));
    response.end()
}
path.set("/queryRandomCode",queryRandomCode)

module.exports.path = path;