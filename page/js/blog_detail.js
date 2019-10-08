var blogDetail = new Vue({
    el: '#blog_detail',
    data: {
           title: '',
           tags: '',
           views: '',
           content: '',
           ctime: '',
    },
    computed: {

    },
    methods: {

    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"): "";
        if (searchUrlParams == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1])
                }catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (res) {
            console.log(res);
            var result = res.data.data[0];
            blogDetail.title = result.title;
            blogDetail.tags = result.tags;
            blogDetail.ctime = result.ctime;
            blogDetail.views = result.views;
            blogDetail.content = result.content;
        }).catch(function (res) {
            console.log("请求失败");
        });
    }
});

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: '',
        rightCode: ''
    },
    computed: {
        changeCode: function() {
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(function (res) {
                    console.log(res);
                    sendComment.vcode = res.data.data.data;
                    sendComment.rightCode = res.data.data.text;
                })
            }
        },

        sendComment: function () {
            return function () {
                var code = document.getElementById('comment_code').value;
                if (code != sendComment.rightCode) {
                    alert("验证码有误");
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"): "";
                if (searchUrlParams == "") {
                    return;
                }
                var bid = -1;
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searchUrlParams[i].split("=")[1])
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }

                var reply = document.getElementById('comment_reply').value;
                var name = document.getElementById('comment_name').value;
                var email = document.getElementById('comment_email').value;
                var content = document.getElementById('comment_content').value;
                // var code = document.getElementById('comment_code');
                axios({
                    method: 'get',
                    url: '/addComment?bid=' + bid + '&parent='+ reply + '&name=' + name + '&email=' + email + '&content=' + content
                }).then(function (res) {
                    // console.log(res)
                    alert("提交成功")
                })

            }
        }
    },
    created: function () {
      this.changeCode()
    }
})