//添加入口函数
$(function() {
    var layer = layui.layer
    var form = layui.form

    initCate()

    // 初始化富文本编辑器
    initEditor()

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // 一定要记得调用 form.render() 方法
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function(e) {
        // 获取到文件的列表数组
        var files = e.target.files
            // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])

        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 定义文章的发布状态 state
    var art_state = '已发布'

    //为存为草稿按钮 添加点击事件处理函数
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })

    //为表单添加submit事件  html22行代码
    $('#form-pub').on('submit', function(e) {
        //阻止表单默认提交行为
        e.preventDefault()

        //基于form表单  快速创建一个formdata对象
        var fd = new FormData($(this)[0])

        //将文章发布状态添加到fd中
        fd.append('state', art_state)

        //打印看数据能否处理成功
        // fd.forEach(function(v, k) {
        //     console.log(v, k);
        // })

        //将裁剪过后的图片 输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                    //发起ajax请求
                publshArticle(fd)
            })
    })

    //发布文章请求
    function publshArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'post',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processDate: false,
            //success成功回调函数
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('文章发布成功')
                location.href = '/art_list.html'
            }
        })
    }
})