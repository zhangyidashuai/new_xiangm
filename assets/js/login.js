//入口函数
$(function() { //点击隐藏与显示  登录和注册切换
    // 点击去注册账号
    //点击注册事件
    $("#link_reg").on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录账号
    //点击注册事件
    $("#link_login").on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //自定义表单验证规则
    //从layui中获取form对象  从导入的layui中获取
    var form = layui.form

    //通过form.verify()函数自定义校验规则   结合html里面第75行代码lay-verify="required|pwd"后面|加个pwd
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //再次验证密码   校验两侧密码是否一致的规则
        repwd: function(value) { //value 就是指使用了这个规则的表单中的属性值
            //1.内部的规则 实际上就是判断密码以及确认
            //2.已经
            //3.
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '您输入的密码不一致'
            }
        }
    })

})