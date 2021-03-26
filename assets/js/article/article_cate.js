$(function () {
    // 初始化表格数据
    initTableList()
    function initTableList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexadd = null
    // 通过模板引擎的html快速搭建结构，将数据导入到content
    $('#btnAddCate').on('click', function () {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '在线调试'
            , content: $('#dialog-add').html()
        })
    })
    // 通过代理的方式将form-add的表单数据提交后渲染页面
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加类别失败')
                }
                initTableList()
                layui.layer.msg('添加类别成功')
                layui.layer.close(indexadd)
            }
        })
    })
    var indexEdit = null
    var form = layui.form
    // 为编辑按钮绑定点击事件
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '在线调试'
            , content: $('#dialog-edit').html()
        })
        // 为编辑的表单赋值
        var id = $(this).attr('data-edit')
        console.log(id);
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
        // 把编辑好后的表单重新提交然后重新渲染页面
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault()
            $.ajax({
                method: "POST",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('更新分类信息失败')
                    }
                    layui.layer.msg('更新分类信息成功')
                    layui.layer.close(indexEdit)
                    initTableList()
                }
            })
        })
    })



    // 通过代理的方式将动态的form-edit的表单数据提交后渲染页面
    $('tbody').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('编辑类别失败')
                }
                initTableList()
                layui.layer.msg('编辑类别成功')
                layui.layer.close(indexEdit)
            }
        })
    })

    // 删除分类
    var indexDelete = null
    // 给分类按钮绑定动态的点击事件然后渲染出弹出层页面
    $('body').on('click', '#btn-delete', function () {
        var id = $(this).attr('data-delete')
        layer.confirm('确定是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除分类信息失败')
                    }
                    layui.layer.msg('删除分类信息成功')
                    layer.close(index);
                    initTableList()
                }
            })
        })
    })

})