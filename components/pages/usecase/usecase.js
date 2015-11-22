'use strict';

var logger = console;

var req_url = window.backendServerDomain + '/app/api/case.php';
var sync_url = window.backendServerDomain + '/app/api/syncAPIdatafromRAP.php';
var testdata_url = window.backendServerDomain + '/app/api/testdata.php';
var num;

var page_size = 15,
    page_start = 1,
    first_render = true;

//一键同步RAP接口数据
$(document).on('click', '.usecase-addfromrap-btn', function() {
    var project_id = localStorage.project_id;
    $.ajax({
        url: sync_url,
        data: {
            'projectid': project_id
        },
        type: 'get',
        //dataType: 'json',
        success: function(data) {
            console.log(data);
            loadMsg(localStorage.project_id);
            alert("同步API数据成功！");
        },
        error: function() {
            console.log("同步API出错。");
        }
    });

    loadMsg(project_id);
});

// 添加按钮
$(document).on('click', '.usecase-add-btn', function() {
    $('.ui.usecase-add-modal').modal('show');
});

// 添加数据
$(document).on('click', '.usecase-add-data', function() {
    var name = $('#usecase-add-name').val();
    var tag = $('#usecase-add-tag').val();
    var path = $('#usecase-add-path').val();
    var parameter = $('#usecase-add-parameter').val();
    var project_id = localStorage.project_id;
    addMsg(name, tag, path, parameter, project_id);
});

// 测试数据管理
$(document).on('click', '.usecase-testdata-btn', function() {
    $('.ui.usecase-detail-modal').modal({
        onHidden: function() {
            $('#usecase-parameter-input').val("");
            $('.usecase-detail-table thead tr').html("");
            $('.usecase-detail-table tbody').html("");
        }
    }).modal('show');
    var parameter = $(this).parent().siblings().eq(6).text();
    var apiId = $(this).parent().siblings().eq(0).html();
    $('#usecase-parameter-input').val(parameter);
    $('#usecase-apiId-input').val(apiId);
    //回显已有的测试数据
    $.ajax({
        url: testdata_url,
        data: {
            'apiId': apiId,
            'type': 'select'
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {
            //console.log(data.data);
            //console.log(data.keys);
            $('#usecase-param-num').val(data.keys.length);
            var values = data.data;
            var keys = data.keys;
            var keysize = data.keys.length;
            var headhtml = '';
            var html = '';
            if (keysize > 0) {
                //构造表头
                for (var i = 0; i < keysize; i++) {
                    headhtml += '<td><input type="text" class="usecase-param-input" id="key" value="' + keys[i] + '"></td>';
                }
                headhtml += '<td>操作</td>';

                //构造数据
                html += '<tr>';
                var k = 1;
                for (var j = 0; j < values.length; j++) {
                    html += '<td><input type="text" class="usecase-param-input" value="' + values[j].pvalue + '"></td>';
                    if (k == keysize) {
                        html += '<td><input type="button" class="usecase-detail-del-btn" value="删除"></td></tr>';
                        k = 1;
                        continue;
                    }
                    k++;
                }
                //console.log(headhtml);
                //console.log(html);
                $('.usecase-detail-table thead tr').html(headhtml);
                $('.usecase-detail-table tbody').append(html);
            }
        },
        error: function() {
            console.log("加载测试数据错误！");
        }
    });


});

// 动态更改表格列表
$(document).on('click', '#usecase-confirm', function() {
    num = $('#usecase-param-num').val();
    try {
        var col = parseInt(num);
        num = parseInt(num);
        var html = '';
        for (var i = 0; i < col; i++) {
            html += '<td><input type="text" class="usecase-param-input" id="key"></td>';
        }
        html += '<td>操作</td>';
        $('.usecase-detail-table thead tr').html(html);
    } catch (err) {
        console.log(err);
    }
});

// 动态添加一行
$(document).on('click', '.usecase-add-row', function() {
    num = $('#usecase-param-num').val();
    if (typeof(num) != 'undefined') {
        var html = '';
        html += '<tr>';
        for (var i = 0; i < num; i++) {
            html += '<td><input type="text" class="usecase-param-input"></td>';
        }
        html += '<td><input type="button" class="usecase-detail-del-btn" value="删除"></td></tr>';
        $('.usecase-detail-table tbody').append(html);
    }
});

// 动态删除一行
$(document).on('click', '.usecase-detail-del-btn', function() {
    $(this).parent().parent().remove();
});

//保存测试数据
$(document).on('click', '.usecase-detail-add', function() {
    var keys = new Array();
    var values = new Array();
    var i = 0;
    $('.usecase-detail-table tr').each(function(rowindex, item) {
        var j = 0;
        var pvalues = new Array();
        $(item).find('.usecase-param-input').each(function(colindex, colitem) {
            if (i == 0) {
                keys[j] = colitem.value;
            } else {
                pvalues[j] = colitem.value;
            }
            j++;
        });
        if (i != 0) {
            values[i - 1] = pvalues;
        }
        i++;
    });
    //console.log(keys);
    //console.log(values);

    var apiId = $('#usecase-apiId-input').val();
    var parameter = $('#usecase-parameter-input').val();
    var testdatas = new Object();
    testdatas.keys = keys;
    testdatas.values = values;

    $.ajax({
        url: testdata_url,
        data: {
            //'cases': JSON.stringify(cases),
            'testdatas': testdatas,
            'apiId': apiId,
            'parameter': parameter,
            'type': 'mod'
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            loadMsg(localStorage.project_id);
            $('#usecase-parameter-input').val("");
            $('.usecase-detail-table thead tr').html("");
            $('.usecase-detail-table tbody').html("");
            alert("测试数据保存成功！");
        },
        error: function() {
            console.log("addMsg错误");
        }
    });

});

//关闭测试数据窗口
$(document).on('click', '.usecase-detail-close', function() {
    $('#usecase-parameter-input').val("");
    $('.usecase-detail-table thead tr').html("");
    $('.usecase-detail-table tbody').html("");
});

// 修改按钮
$(document).on('click', '.usecase-edit-btn', function() {

    // 取得表单输入值
    var id = $(this).parent().siblings().eq(0).html(),
        name = $(this).parent().siblings().eq(1).html(),
        tag = $(this).parent().siblings().eq(2).html(),
        path = $(this).parent().siblings().eq(3).html(),
        status = $(this).parent().siblings().eq(5).attr("datavalue"),
        parameter = $(this).parent().siblings().eq(6).text();
    // 设置值
    $('#usecase-edit-id').val(id);
    $('#usecase-edit-name').val(name);
    $('#usecase-edit-tag').val(tag);
    $('#usecase-edit-path').val(path);
    //$('#usecase-edit-status').val(status);
    $('#usecase-edit-parameter').val(parameter);
    //alert(status);
    if (status == "1") {
        $('#usecase-edit-status option:first').attr('selected', 'selected');
    } else {
        $("#usecase-edit-status option:last").attr('selected', 'selected');
    }

    $('.ui.usecase-edit-modal').modal('show');
});

// 修改数据
$(document).on('click', '.usecase-edit-data', function() {
    var id = $('#usecase-edit-id').val(),
        name = $('#usecase-edit-name').val(),
        tag = $('#usecase-edit-tag').val(),
        path = $('#usecase-edit-path').val(),
        status = $('#usecase-edit-status').val(),
        parameter = $('#usecase-edit-parameter').val();
    var project_id = localStorage.project_id;
    modMsg(id, name, tag, path, status, parameter, project_id);
});

// 点击分页功能
$(document).on('click', '.usecase-page a', function() {
    $('.usecase-page a').removeClass('active');
    $(this).addClass("active");

    var page = $(this).html()
    page_start = (parseInt(page) - parseInt(1)) * parseInt(page_size) + parseInt(1);
    loadMsg(localStorage.project_id);
});

var loadMsg = function(project_id) {

    $.ajax({
        url: req_url,
        data: {
            'project_id': project_id,
            'type': 'select',
            'start': page_start,
            'size': page_size
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {

            // 渲染数据
            var tpl = __inline('msgTpl.tpl'),
                html = juicer(tpl, data);
            $('.usecase-data-num').text(data.data.length);
            $('#usecase-list').html(html);

            // 如果是首次渲染，则添加分页功能
            if (first_render) {

                first_render = false;

                var pgnTpl = '',
                    count = data.count / page_size;

                for (var i = 1; i < count; i++) {
                    var p = parseInt(1) + parseInt(i);
                    pgnTpl += '<a class="item">' + p + '</a>';
                }
                $('.usecase-page').append(pgnTpl);
            }

        },
        error: function() {
            console.log("loadMsg加载错误");
        }
    });
};
exports.loadMsg = loadMsg;

var addMsg = function(name, tag, path, parameter, project_id) {
    var cases = new Array();
    var caseobj = new Object();
    caseobj.parameter = parameter;
    caseobj.title = name;
    caseobj.path = path;
    cases[0] = caseobj;

    //cases[0] =
    $.ajax({
        url: req_url,
        data: {
            //'cases': JSON.stringify(cases),
            'cases': cases,
            'project_id': project_id,
            'tag': tag,
            'type': 'add'
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            loadMsg(localStorage.project_id);
            $('#usecase-add-name').val("");
            $('#usecase-add-tag').val("");
            $('#usecase-add-path').val("");
            $('#usecase-add-parameter').val("");
        },
        error: function() {
            console.log("addMsg错误");
        }
    });
}
exports.addMsg = addMsg;

var modMsg = function(id, name, tag, path, status, parameter, project_id) {
    //console.log("status:" + status);
    $.ajax({
        url: req_url,
        data: {
            'case_id': id,
            'title': name,
            'tag': tag,
            'path': path,
            'project_id': project_id,
            'status': status,
            'parameter': parameter,
            'type': 'mod'
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {
            loadMsg(localStorage.project_id);
        },
        error: function() {
            console.log("modMsg错误");
        }
    });
}
exports.modMsg = modMsg;

exports.getTpl = function() {
    return __inline('usecase.tpl');
};