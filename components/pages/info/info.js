/* 
 * @Author: boxizen
 * @Date:   2015-11-22 15:21:48
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-24 14:09:46
 */

'use strict';


var addArticleApi = 'http://sunyanmi.com/articleaction/addarticle';
var getArticleApi = 'http://sunyanmi.com/articleaction/getarticle';
var delArticleApi = 'http://sunyanmi.com/articleaction/delarticle';

// 添加按钮
$(document).on('click', '.info-add-btn', function() {
    $('.info-add-modal').modal('show');
});

// info-add-data
$(document).on('click', '.info-add-data', function() {

    $.ajax({
        url: addArticleApi,
        data: {
            'title': $('#postTitle').val(),
            'picurl': $('#picUrl').val(),
            'url': $('#postUrl').val(),
            'description': $('#description').val(),
            'prioty': $('#prioty').val(),
            'type': $('#postType').val()
        },
        type: 'get',
        dataType: "jsonp",
        success: function(data) {
            // 渲染数据
            var tpl = __inline('msgTpl.tpl'),
                html = juicer(tpl, data);
            $('#info-list').html(html);
            $('.info-num').html(data.data.length);
        },
        error: function() {
            console.log("同步API出错。");
        }
    });
});

// info-add-data
$(document).on('click', '.info-del-btn', function() {

    var r = confirm("确定删除？删除后将不可恢复数据")
    if (r == false) {
        return ;
    } 

    $.ajax({
        url: delArticleApi,
        data: {
            'id': $(this).attr('data-id')
        },
        type: 'get',
        dataType: "jsonp",
        success: function(data) {
            // 渲染数据
            var tpl = __inline('msgTpl.tpl'),
                html = juicer(tpl, data);
            $('#info-list').html(html);
            $('.info-num').html(data.data.length);
        },
        error: function() {
            console.log("同步API出错。");
        }
    });
});

var verify = function() {
    if (localStorage.name && localStorage.password && localStorage.name == "root" && localStorage.password == "clove1234");
    else {
        window.location.href = "#!/admin/login";
    }
}
exports.verify = verify;

function loadMsg() {

    $.ajax({
        url: getArticleApi,
        type: 'get',
        dataType: 'jsonp',
        async: false,
        success: function(data) {
            // 渲染数据
            var tpl = __inline('msgTpl.tpl'),
                html = juicer(tpl, data);
            $('#info-list').html(html);
            $('.info-num').html(data.data.length);
        },
        error: function() {
            console.log("loadMsg加载错误");
        }
    });
};
exports.loadMsg = loadMsg;

exports.getTpl = function() {
    return __inline('info.tpl');
};