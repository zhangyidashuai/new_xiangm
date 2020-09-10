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
    var form = layui.form

    //从layui中获取form对象  从layui.layer导入中获取  第18行代码的实现
    var layer = layui.layer

    //通过form.verify()函数自定义校验规则   结合html里面第75行代码lay-verify="required|pwd"后面|加个pwd
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        //再次验证密码   校验两侧密码是否一致的规则
        repwd: function(value) { //value 就是指使用了这个规则的表单中的属性值
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '您输入的密码不一致'
            }
        }
    })

    //监听注册表单的提交事件 正确性
    $('#form_reg').on('submit', function(e) { //添加submit事件   事件对象e
        //阻止表单默认提交行为
        e.preventDefault()

        //发起ajax的post请求  添加username password两个参数请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }

        $.post('/api/reguser', data, function(res) { //res接收回调函数拿回来的数据
            //if判断
            if (res.status !== 0) {
                return layer.msg(res.message) //使用layer.msg方法进行消息的提示注册是否成功 从第21行代码导入即可使用layer.msg方法
            }
            layer.msg('注册成功，请登录！')

            //模拟人的点击行为 当注册成功以后，自动跳转到登录界面
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) { //事件对象e
        //阻止表单的默认提交事件
        e.preventDefault()

        //发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST', //提交的方式
            //快速获取表单中的数据  thsi是获取#form_login数据
            data: $(this).serialize(), //提交的数据

            //指定sucssent 成功回调
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')

                //将登录成功得到的token 字符串存储到 localStorage   token是有权限的数据接口，必须存储到localStorage
                //           存数据            存的值
                localStorage.setItem('token', res.token)

                //console.log(res.token) //打印登录成功得到的token字符串

                //跳转到后台主页
                location.href = "/index.html"
            }
        })
    })
})