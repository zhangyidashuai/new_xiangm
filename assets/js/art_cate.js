//封装入口函数
$(function() {
    //引入layer
    var layer = layui.layer


    gitCateList() //调用第10行代码

    //获取文章类别
    function gitCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            //success回调函数
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                //使用模板引擎渲染页面
                //数据统一个对象
                var tableHtml = template('tpl-table', res)
                $('tbody').html(tableHtml)
            }
        })
    }

    //给添加文章类别 添加点击事件
    var indexAdd = null //添加弹出框自动关闭事件
    $('#btnAddCate').on('click', function() {
        //使用open方法
        indexAdd = layer.open({ //调用indexAdd自动关闭
            type: 1, //建成和文档一样的弹窗 
            area: ['500px', '400px'], //把32行代码添加px值把盒子撑大
            title: '添加文章分类',
            content: $('#dialog-add').html() //调用html页面66行代码 ad选择器
        })
    })


    //添加文章分类  为body绑定submit 给form-add  添加一个事件对象e
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault() //阻止默认提交行为
            //console.log('1');
        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            //请求体用data代替  通过this快速获取
            data: $(this).serialize(),
            //success成功回调函数
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败')
                }
                gitCateList() //调用第10行代码获取文章类别
                layer.msg('新增文章分类成功')

                //这是根据索引关闭弹出层  29行代码
                layer.close(indexAdd)
            }
        })
    })
})