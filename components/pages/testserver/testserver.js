'use strict';

var logger = console;

//var req_url = '/ata/app/api/testserver.php';
var req_url = window.backendServerDomain + "/app/api/testserver.php";

// 添加按钮
$(document).on('click', '.test-add-btn', function() {
  $('.ui.test-add-modal').modal('show');
});

// 添加数据
$(document).on('click', '.test-add-data', function() {
  var name = $('#test-add-name').val();
  var url = $('#test-add-url').val();
  var project_id = localStorage.project_id;
  //console.log(project_id);
  addMsg(name,url,project_id);
});

// 修改按钮
$(document).on('click', '.test-edit-btn', function() {

  // 取得表单输入值
  var testserver_id = $(this).parent().siblings().eq(0).html(),
    name = $(this).parent().siblings().eq(1).html(),
    url = $(this).parent().siblings().eq(2).html(),
    available = $(this).parent().siblings().eq(3).attr("datavalue");

  // 设置值
  $('#test-edit-testserver_id').val(testserver_id);
  $('#test-edit-name').val(name);
  $('#test-edit-url').val(url);

  if (available=="1"){
     $('#test-edit-available option:first').attr('selected','selected');
  } else {
     $("#test-edit-available option:last").attr('selected','selected');
  }

  $('.ui.test-edit-modal').modal('show');
});

// 修改数据
$(document).on('click', '.test-edit-data', function() {
  var testserver_id = $('#test-edit-testserver_id').val(),
      name = $('#test-edit-name').val(),
      url = $('#test-edit-url').val(),
      available = $('#test-edit-available').val();
  var project_id = localStorage.project_id;
  modMsg(testserver_id,project_id,name,available,url);
});

var loadMsg = function(project_id) {
   console.log("project_id:" + project_id);
   //console.log("req_url:" + req_url);
  $.ajax({
    url: req_url,
    data: {
      'project_id': project_id,
      'type': "select"
    },
    type: 'post',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      var tpl = __inline('msgTpl.tpl'),
        html = juicer(tpl, data);
      $('.test-data-num').text(data.data.length);
      $('.test-table tbody').html(html);
    },
    error: function() {
      console.log("加载错误");
    }
  });
};
exports.loadMsg = loadMsg;

var addMsg = function(name, url, project_id) {
  $.ajax({
    url: req_url,
    data: {
      'name': name,
      'project_id': project_id,
      'url': url,
      'type': 'add'
    },
    type: 'post',
    dataType: 'json',
    success: function(data) {
      loadMsg(localStorage.project_id);
      $('#test-add-name').val("");
      $('#test-add-url').val("");
    },
    error: function() {
      console.log("添加错误");
    }
  });
}
exports.addMsg = addMsg;

var modMsg = function(testserver_id, project_id, name, available, url) {
  $.ajax({
    url: req_url,
    data: {
      'name': name,
      'testserver_id': testserver_id,
      'project_id': project_id,
      'available': available,
      'url': url,
      'type': 'mod'
    },
    type: 'post',
    dataType: 'json',
    success: function(data) {
      loadMsg(localStorage.project_id);
     /*
     var tpl = __inline('msgTpl.tpl'),
        html = juicer(tpl, data);
      $('.test-data-num').text(data.data.length);
      $('.test-table tbody').html(html);*/
    },
    error: function() {
      console.log("修改错误");
    }
  });
}
exports.modMsg = modMsg;

exports.getTpl = function() {
  return __inline('testserver.tpl');
};
