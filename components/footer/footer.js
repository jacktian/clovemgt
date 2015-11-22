'use strict';

module.exports = {
    render: function (dom) {
        var tpl = __inline('footer.tpl');
        $(dom).html(tpl);
    }
};
