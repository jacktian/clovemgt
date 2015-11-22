'use strict';

var menu = require('./menuData.js');

$(document).on('click', '.menu-item', function() {
    $('.menu-item').removeClass('active');
    $(this).addClass('active');
})

module.exports = {
    render: function(dom) {

        var tpl = __inline('menu.handlebars');
        var tpl_data = tpl(menu.data);
        $(dom).append(tpl_data);
    },
    data: menu.data
};