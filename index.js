var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");

var app = new express();

app.use(express.static("./page/"));

// 每日一句编辑
app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

// 博客编辑
app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));

//添加评论
app.get("/addComment", loader.get("/addComment"));
app.get("/queryRandomCode", loader.get('/queryRandomCode'))

// 获取标签
app.get("/queryRandomTags",loader.get("/queryRandomTags"))

// 最近热门
app.get("/queryNewHot", loader.get("/queryNewHot"))

app.listen(globalConfig.port, function () {
    console.log("服务已启动");
});