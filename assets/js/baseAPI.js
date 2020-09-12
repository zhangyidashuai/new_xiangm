//由于每次调用 $.gei() post() ajax()之前的都会统一根路径，都会调用ajaxPrefilter这个函数 那么在这个函数中就会拿到我们给ajax配置的对象options
//调用ajax配置的参数对象
$.ajaxPrefilter(function(options) {
    //console.log(options.url);    //控制台打印出来了请求的url
    //在发起真正的ajax请求之前，拼接统一的请求根路径 
    options.url = 'http://ajax.frontend.itheima.net' + options.url //在这设置统一根路径为了防止以后根路径发生变化要一个个修改 在这设置可以一次修改全局变化
    console.log(options.url)

    //统一为有权限的接口 设置hraders请求头
    //用if判断请求头是否是带/my/开头 是的话执行下列统一权限代码
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载complete函数
    options.complete = function(res) {
        //console.log('执行了complete回调函数');
        //console.log(res);
        //在complete回调函数中 可以通过res.responseJSON拿到服务器响应回来的数据
        //if判断条件
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败! ') {
            //1.强制清空token
            localStorage.removeItem('token')

            //2.强制跳转登录页面
            location.href = '/login.html'
        }
    }
})