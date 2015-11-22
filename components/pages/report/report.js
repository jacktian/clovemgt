'use strict';

var logger = console;
var result_url = window.backendServerDomain + '/app/api/search_result.php';
var condition_url = window.backendServerDomain + '/app/api/search_condition.php';
var report_url = window.backendServerDomain + '/app/api/report.php';

var page_size = 15,
    page_start = 1,
    first_render = true;

$.ajax({
    url: condition_url,
    type: 'GET',
    dataType: 'json',
    data: {
        project_id: window.localStorage['project_id']
    },
    success: function(json) {
        if (json.data && json.data.length) {
            var html = [];
            html.push('<option value="">全部<\/option>');
            json.data.forEach(function(item) {
                html.push('<option value="' + item.taskId + '">' + item.name + "--" + item.runtime + '<\/option>');
            });

            $('#report-search-task').append(html.join(''));
        } else {
            //alert(json.msg);
        }
    }
});
//查列表
$(document).on('click', '.report-search-btn', function() {
    loadMsg(localStorage.project_id);
});

// 点击分页功能
$(document).on('click', '.report-page a', function() {
    $('.report-page a').removeClass('active');
    $(this).addClass("active");

    var page = $(this).html()
    page_start = (parseInt(page) - parseInt(1)) * parseInt(page_size) + parseInt(1);
    loadMsg(localStorage.project_id);
});

//查看详细测试报告
$(document).on('click', '.report-detail-btn', function() {
    var test_ver = $(this).parent().siblings().eq(0).html();
    var taskId = $(this).parent().siblings().eq(4).html();
    $.ajax({
        url: report_url,
        data: {
            'taskId': taskId,
            'test_ver': test_ver
        },
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            //console.log(JSON.stringify(data));
            var successrate = data.successrate;
            var successratehtml = "";
            if (data.successrate >= 90) {
                successratehtml = "<font color=green>" + successrate + "%</font>";
            } else {
                successratehtml = "<font color=red>" + successrate + "%</font>";
            }
            var tpl = __inline('reportdetailTpl.tpl'),
                html = juicer(tpl, data);
            $('.report-successrate').html(successratehtml);
            $('.report-projectName').text(localStorage.projectName);
            $('.report-detail-table tbody').html(html);
        },
        error: function() {
            console.log("加载错误");
        }
    });

    $('.ui.report-detail-modal').modal('show');
});

var loadMsg = function(project_id) {
    // 注册日期事件
    $('#report-fromdate').datetimepicker({
        lang: 'ch'
    });
    $('#report-todate').datetimepicker({
        lang: 'ch'
    });

    $.ajax({
        url: result_url,
        data: {
            'project_id': project_id,
            'taskId': $('#report-search-task').val(),
            'fromdate': $('#report-fromdate').val(),
            'todate': $('#report-todate').val(),
            'type': "select",
            'start': page_start,
            'size': page_size
        },
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            var tpl = __inline('msgTpl.tpl'),
                html = juicer(tpl, data);
            //$('.report-data-num').text(data.data.length);
            $('.report-table tbody').html(html);

            // 如果是首次渲染，则添加分页功能
            if (first_render) {

                first_render = false;

                var pgnTpl = '',
                    count = data.count / page_size;

                for (var i = 1; i < count; i++) {
                    var p = parseInt(1) + parseInt(i);
                    pgnTpl += '<a class="item">' + p + '</a>';
                }
                $('.report-page').append(pgnTpl);
            }


        },
        error: function() {
            console.log("加载错误");
        }
    });
};
exports.loadMsg = loadMsg;

exports.getTpl = function() {
    return __inline('report.tpl');
};