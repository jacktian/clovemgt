'use strict';

var logger = console;
var report_url = window.backendServerDomain + '/app/api/report.php';
var req_url = window.backendServerDomain + "/app/api/task.php";

var page_size = 15,
  page_start = 1,
  first_render = true;

$.ajax({
  url : window.backendServerDomain + '/app/api/ver.php',
  type : 'GET',
  dataType : 'json',
  data : { project_id : window.localStorage['project_id'], type : 'select' },
  success : function(json){
    if(json.data && json.data.length){
      var html = [];
      json.data.forEach(function(item){
        html.push('<option value="' + item.ver_id + '">' + item.name + '<\/option>');
      });

      $('#task-add-versionname').append(html.join(''));
      $('#task-edit-versionname').append(html.join(''));
    } else {
      alert(json.msg);
    }
  }
});

// 点击分页功能
$(document).on('click', '.task-page a', function() {
  $('.task-page a').removeClass('active');
  $(this).addClass("active");

  var page = $(this).html()
  page_start = (parseInt(page) - parseInt(1)) * parseInt(page_size) + parseInt(1);
  loadMsg(localStorage.project_id);
});

// 条件搜索按钮
$(document).on('click', '.task-searcch-btn', function() {
  loadMsg(localStorage.project_id);
});

// 删除按钮
$(document).on('click', '.task-delete-btn', function() {
  var r=confirm("真的要删除该测试任务吗？");
  if (r==true){
    var task_id = $(this).parent().siblings().eq(0).html();
      $.ajax({
      url: req_url,
      data: {
        'task_id': task_id,
        'type': 'del'
      },
      type: 'post',
      dataType: 'json',
      success: function(data) {
        loadMsg(localStorage.project_id);

      },
      error: function() {
        console.log("删除错误");
      }
    });
  }
});

//查看详细测试报告按钮
$(document).on('click', '.task-report-detail-btn', function() {
    var task_id = $(this).parent().siblings().eq(0).html();
    //console.log("task_id:" + task_id);
      $.ajax({
      url: report_url,
      data: {
        'taskId': task_id
      },
      type: 'get',
      dataType: 'json',
      success: function(data) {
        //console.log("task-report:" + data);
        var successrate = data.successrate;
        var successratehtml ="";
        if (data.successrate >=90){
          successratehtml = "<font color=green>" + successrate + "%</font>";
        } else {
          successratehtml = "<font color=red>" + successrate + "%</font>";
        }

        var tpl = __inline('../report/reportdetailTpl.tpl'),
        html = juicer(tpl, data);
        $('.report-successrate').html(successratehtml);
        $('.report-projectName').text(localStorage.projectName);
        $('.task-report-detail-table tbody').html(html);
      },
      error: function() {
        console.log("查看测试报告错误");
      }
    });
    $('.ui.task-report-detail-modal').modal('show');
});

// 添加按钮
$(document).on('click', '.task-add-btn', function() {
  $('.ui.task-add-modal').modal('show');
});

// 添加数据
$(document).on('click', '.task-add-data', function() {
  var name = $('#task-add-name').val();
  var runtime = $('#task-add-runtime').val();
  var versionId = $('#task-add-versionname').val();
  var project_id = localStorage.project_id;

  addMsg(name,runtime,versionId,project_id);
});

// 修改按钮
$(document).on('click', '.task-edit-btn', function() {

  // 取得表单输入值
  var task_id = $(this).parent().siblings().eq(0).html(),
    name = $(this).parent().siblings().eq(1).html(),
    runtime = $(this).parent().siblings().eq(3).html();
  var versionId = $(this).parent().siblings().eq(5).html();

  // 设置值
  $('#task-edit-task_id').val(task_id);
  $('#task-edit-name').val(name);
  $('#task-edit-runtime').val(runtime);
  $("#task-edit-versionname").val(versionId);

  $('.ui.task-edit-modal').modal('show');
});

// 修改数据
$(document).on('click', '.task-edit-data', function() {
  var task_id = $('#task-edit-task_id').val(),
      name = $('#task-edit-name').val(),
      runtime = $('#task-edit-runtime').val();
  var versionId = $('#task-edit-versionname').val();
  var project_id = localStorage.project_id;
  modMsg(task_id,project_id,name,runtime,versionId);
});

var loadMsg = function(project_id) {
     // 注册日期事件
   $('#task-search-fromdate').datetimepicker({lang:'ch'});
   $('#task-search-todate').datetimepicker({lang:'ch'});
   $('#task-add-runtime').datetimepicker({lang:'ch'});
   $('#task-edit-runtime').datetimepicker({lang:'ch'});

  //console.log($('#task-search-fromdate').val());
  $.ajax({
    url: req_url,
    data: {
      'project_id': project_id,
      'status' : $('#task-search-versionname').val(),
      'fromdate' : $('#task-search-fromdate').val(),
      'todate' : $('#task-search-todate').val(),
      'type': "select",
      'start': page_start,
      'size': page_size
    },
    type: 'post',
    dataType: 'json',
    success: function(data) {
      //console.log(data);
      var tpl = __inline('msgTpl.tpl'),
        html = juicer(tpl, data);
      $('.task-data-num').text(data.data.length);
      $('.task-table tbody').html(html);

      // 如果是首次渲染，则添加分页功能
      if (first_render) {

        first_render = false;

        var pgnTpl = '',
          count = data.count / page_size;

        for (var i = 1; i < count; i++) {
          var p = parseInt(1) + parseInt(i);
          pgnTpl += '<a class="item">' + p + '</a>';
        }
        $('.task-page').append(pgnTpl);
      }

    },
    error: function() {
      console.log("加载错误");
    }
  });
};
exports.loadMsg = loadMsg;

var addMsg = function(name,runtime,versionId,project_id) {
  $.ajax({
    url: req_url,
    data: {
      'name': name,
      'project_id': project_id,
      'runtime': runtime,
      'versionId': versionId,
      'type': 'add'
    },
    type: 'post',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      loadMsg(localStorage.project_id);
      $('#task-add-name').val("");
      $('#task-add-runtime').val("");
    },
    error: function() {
      console.log("添加错误");
    }
  });
}
exports.addMsg = addMsg;

var modMsg = function(task_id,project_id,name,runtime,versionId) {
  $.ajax({
    url: req_url,
    data: {
      'name': name,
      'task_id': task_id,
      'project_id': project_id,
      'runtime': runtime,
      'versionId': versionId,
      'type': 'mod'
    },
    type: 'post',
    dataType: 'json',
    success: function(data) {
      loadMsg(localStorage.project_id);

    },
    error: function() {
      console.log("修改错误");
    }
  });
}
exports.modMsg = modMsg;

exports.getTpl = function() {
  return __inline('task.tpl');
};
