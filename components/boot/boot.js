'use strict';

var menu = require('menu'),
    footer = require('footer'),
    logger = console;

/* 定义页面和模块对应关系 */
var views = {
    '404': 'pages/404',
    'index': 'pages/index'
};

var project_id = 0;

/* 渲染页面 */
exports.render = function(dom) {

    var proj_reg = /projectId=\d+/,
        proj_str = location.href.match(proj_reg);

    if (proj_str != null) {
        project_id = proj_str[0].split('=')[1];
        localStorage.project_id = project_id;
    }

    // 渲染页面结构
    var tpl = __inline('framework.handlebars');
    dom.innerHTML = tpl(menu.data);

    // 加载顶部菜单
    menu.render($('.navbar'));

    // 加载页面底部
    footer.render($('.footer'));

    // 渲染首屏内容
    require.async('pages/index', function(page) {
        $('#indexpage').html(page.getTpl());
    });

    page('*', function(ctx) {

        var path_str = ctx.pathname;

        // 隐藏其他tab
        $('.main-tab').addClass('hidden');

        // 如果是首页
        if (path_str == '/') {
            require.async('pages/index', function(page) {
                $('#indexpage').removeClass('hidden');
            });
        }

        // 如果是其他tab页面
        if (path_str.match(/admin\/[\w\W]+/) != null) {

            var path = path_str.split(/admin\//)[1];

            require.async('pages/' + path, function(page) {
                $('.' + path + '-tab').removeClass('hidden');
                // 首次加载
                if ($('.' + path + '-tab').attr('data-load') == "false") {
                    $('.' + path + '-tab').html(page.getTpl());
                    $('.' + path + '-tab').attr('data-load', 'true');
                    project_id = localStorage.project_id;
                    page.loadMsg(project_id);
                }

            });
        }
    });

    page();
};