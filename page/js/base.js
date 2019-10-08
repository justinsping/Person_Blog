var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed:{
        randomColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize: function () {
            return function () {
                var size = (Math.random() * 10 + 12) + "px";
                return  size;
            }
        }
    },
    created: function () {
        axios({
            method: 'get',
            url: '/queryRandomTags'
        }).then(function (res) {
            var result = []
            for (var i = 0; i < res.data.data.length; i++) {
                result.push(res.data.data[i].tag)
            }
            randomTags.tags = result
        })
    }
});

var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [
            {title: "文章链接", link: "http://www.baidu.com"},
            {title: "文章链接", link: "http://www.baidu.com"},
            {title: "文章链接", link: "http://www.baidu.com"},
            {title: "文章链接", link: "http://www.baidu.com"},
        ]
    },
    created: function () {
        axios({
            method: 'get',
            url: '/queryNewHot'
        }).then(function (res) {
            console.log(res)
            let list = []
            let result = res.data.data;
            for (var i = 0; i < result.length; i++) {
                var temp = {};
                temp.title = result[i].title;
                temp.link = "/blog_detail.html?bid=" + result[i].id
                list.push(temp)
            }
            newHot.titleList = list
        })
    }
});

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: [
            {
                user: "冬雪",
                date: "2018-8-9",
                comment: "我想交换友链"
            }
        ]
    }
});