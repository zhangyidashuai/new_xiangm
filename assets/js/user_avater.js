//调用jquery入口函数
$(function() {
    var layer = layui.layer //导入第32行代码

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项有以下两个属性
    const options = {
        // 纵横比
        aspectRatio: 1, //此处是裁剪框更改
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域  配置项传入 之后调用插件实现裁剪
    $image.cropper(options)

    //触发上传图片 点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    //上传图片 绑定change事件
    $('#file').on('change', function(e) {
        //console.log(e) //事件对象e 可以获取用户上传的那些文件

        //获取用户上传的图片  通过e.target
        var filelist = e.target.files

        //if判断用户有没有上传图片   控制台查看有没有上传的lenght为1 0是没有上传
        if (filelist.lenght === 0) {
            return layer.msg('请上传图片！')
        }

        //拿到用户选择的文件
        var file = e.target.files[0]

        //将文件转换为路径
        var imgURL = URL.createObjectURL(file)

        //重新初始化裁剪区
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    //给确定按钮添加点击事件 获取裁剪后的图片上传到服务器
    $('#btnUpload').on('click', function() {
        //拿到用户裁剪后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })

        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            //console.log(dataURL)


        //调用接口 将图片上传到服务器  发起ajax请求
        $.ajax({
            url: '/my/update/avatar',
            method: 'post',
            data: {
                avatar: dataURL //调用52行代码用户裁剪后得到的图片
            },
            //调用success回调函数
            success: function(res) {
                //if判断
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')

                //window获取裁剪后图片确定  parent是父级意思  调用父元素的方法
                window.parent.getUserInfo()
            }
        })
    })
})