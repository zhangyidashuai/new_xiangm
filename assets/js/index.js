//封装入口函数
$(function() {
    //调用getUserInfo()来获取用户信息
    getUserInfo()

    var layer = layui.layer //12行代码的调用

    //点击按钮实现退出功能    35行代码的退出功能  绑定点击事件
    $('#btnLogout').on('click', function() {
        //console.log('OK');
        //提示用户是确认退出
        layer.confirm('确定退出登录吗?亲', { icon: 3, title: '提示' }, function(index) {
            //do something

            //1.清空本地存储中的token
            localStorage.removeItem('token')

            //2.重新跳转到登录页面
            location.href = '/login.html'

            //关闭 confirm询问框
            layer.close(index);
        });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        //提供一个请求的header配置对象
        // headers: {
        //因为url请求路径是/my  而且/my有访问权限  需要带上Authorization身份认证才能访问成功
        //从localStorage中取值交给Authorization  用getItem 取到token这个键
        //Authorization: localStorage.getItem('token') || ''
        //},

        //添加success回调函数  来检查用户信息是否注册成功 成功会返回一个信息对象res
        success: function(res) {
            //console.log(res);
            //if判断
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvater专门渲染用户头像   res data传递
            renderAvatar(res.data)
        }, //这里一定要加, 不然下面函数会报错


        //判断用户是否登录 如果没登录则强制退出到登录界面  无论成功还是失败 都调用complete回调函数  见basewpi.js
        //complete: function(res) {
        //console.log('执行了complete回调函数');
        //console.log(res);
        //在complete回调函数中 可以通过res.responseJSON拿到服务器响应回来的数据
        //if判断条件
        //if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //1.强制清空token
        //localStorage.removeItem('token')

        //2.强制跳转登录页面
        //location.href = '/login.html'


    })
}

//渲染用户头像    user来接收
function renderAvatar(user) {
    //获取用户名称  定义一个变量
    var name = user.nickname || user.username

    //通过id获取  设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //按照需求渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()

        //获取字符串第一个数字0   同时用toUpperCase来接收first同时转成大写形式 用户第一个首字母为头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}