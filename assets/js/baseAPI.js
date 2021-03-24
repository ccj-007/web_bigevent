// 调用$.get() post() ajax()会调用这个函数并自动拼接url
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})