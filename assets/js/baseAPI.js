//由于每次调用 $.gei() post() ajax()之前的都会统一根路径，都会调用ajaxPrefilter这个函数 那么在这个函数中就会拿到我们给ajax配置的对象options
//调用ajax配置的参数对象
$.ajaxPrefilter(function(options) {
    //console.log(options.url);    //控制台打印出来了请求的url
    //在发起真正的ajax请求之前，拼接统一的请求根路径 
    options.url = 'http://ajax.frontend.itheima.net' + options.url //在这设置统一根路径为了防止以后根路径发生变化要一个个修改 在这设置可以一次修改全局变化
    console.log(options.url)
})