//入口函数
$(function() {
    var layer = layui.layer


    //定义一个查询参数对象q 将来请求数据的时候
    //需要将请求提交到服务器
    var q = {
        pagenum: 1, //当前的页码值
        pagesize: 2, //默认每页显示2条
        cate_id: '', //文章分类的id
        state: '' //文章的状态，可选值有：已发布、草稿
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }



    //获取文章列表
    initTable() //调用 40行代码

    // 初始化文章分类的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)

                // 通过 layui 重新渲染表单区域的UI结构
                form.render(res.total)
            }
        })
    }
})