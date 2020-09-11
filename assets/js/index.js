//封装入口函数
$(function() {
    // 获取用户信息
    getUserInfo()

    function getUserInfo() { //调用
        $.ajax({
            url: '/my/userinfo',
            menter: 'get',
        })
    }






    // 2.渲染用户头像及其名字
    function render(user) {

    }
})