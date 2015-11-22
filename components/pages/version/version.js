'use strict';

var logger = console;

var req_url = window.backendServerDomain + '/app/api/ver.php';

var page_size = 8,
  page_start = 1,
  first_render = true;

// 添加按钮
$(document).on('click', '.version-add-btn', function() {
  $('.ui.version-add-modal').modal('show');
});

// 添加数据
$(document).on('click', '.vs-add-data', function() {
  var name = $('#vs-add-name').val();
  var cache = $('#vs-add-cache').val();
  var status = $('#vs-add-status').val();
  var env = $('#vs-add-env').val();
  var casesId = [];

  $('.cases-item:checked').each(function(index, item){
    casesId.push(item.value);
  });

  addMsg(name,cache,status, env, casesId.join(','));
});


// 修改按钮
$(document).on('click', '.version-edit-btn', function() {
  // 取得表单输入值
  var json = $(this).data('json');

  // 设置值
  $('#project_id_edit').val(json.project_id);
  $('#ver_id_edit').val(json.ver_id);
  $("#vs-edit-name").val(json.name);
  $("#vs-edit-cache").val(json.cached);
  $("#vs-edit-status").val(json.status);
  $("#vs-edit-env").val(json.testserverId);

  var api_ids = json.api_ids;

  $(".cases-item-edit").removeAttr('checked');


  $.ajax({
    url : window.backendServerDomain + '/app/api/case.php',
    type : 'POST',
    dataType : 'json',
    data : { project_id : window.localStorage['project_id'] , type : "select" },
    success : function(json){
      if(json.data && json.data.length){
        var html = [];
        json.data.forEach(function(item){
          html.push('<label><input type="checkbox" class="cases-item-edit" value="' + item.case_id + '">' + item.name + " : " + item.path + '  ('+ item.tag + ')</label>');
        });

        $('#cases-list-edit').html(html.join(''));

        api_ids.split(',').forEach(function(item){
          $('.cases-item-edit[value="' + item + '"]').prop('checked', 'checked');
        });


        $('.ui.version-edit-modal').modal('show');

      } else {
        //alert(json.msg);
      }
    }
  });

});

// 修改数据
$(document).on('click', '.vs-edit-data', function() {
  var ver_id = $('#ver_id_edit').val(),
      name = $('#vs-edit-name').val(),
      status = $('#vs-edit-status').val(),
      cache = $('#vs-edit-cache').val(),
      testserverId = $('#vs-edit-env').val();

  var casesId = [];

  $('.cases-item-edit:checked').each(function(index, item){
    casesId.push(item.value);
  });

  modMsg(ver_id, name, cache, status, casesId.join(','), testserverId);
});

// 点击分页功能
$(document).on('click', '.version-page a', function() {
  $('.version-page a').removeClass('active');
  $(this).addClass("active");

  var page = $(this).html()
  page_start = (parseInt(page) - parseInt(1)) * parseInt(page_size) + parseInt(1);
  loadMsg(localStorage.project_id);
});



$.ajax({
  url : window.backendServerDomain + '/app/api/testserver.php',
  type : 'POST',
  dataType : 'json',
  data : { project_id : window.localStorage['project_id'], type : 'select' },
  success : function(json){
    if(json.data && json.data.length){
      var html = [];
      json.data.forEach(function(item){
        html.push('<option value="' + item.testserver_id + '">' + item.name + '<\/option>');
      });

      $('#vs-add-env').append(html.join(''));
      $('#vs-edit-env').append(html.join(''));
    } else {
      //alert(json.msg);
    }
  }
});


$.ajax({
  url : window.backendServerDomain + '/app/api/case.php',
  type : 'POST',
  dataType : 'json',
  data : { project_id : window.localStorage['project_id'] , type : "select" },
  success : function(json){
    if(json.data && json.data.length){
      var html = [];
      json.data.forEach(function(item){
        html.push('<label><input type="checkbox" class="cases-item" value="' + item.case_id + '">' + item.name + " : " + item.path + '  ('+ item.tag + ')</label>');
      });

      $('#cases-list').append(html.join(''));
    } else {
      //alert(json.msg);
    }
  }
});

$(document).on('click', '#cases-selectall', function(e) {
  if(this.checked){
    $(".cases-item").prop('checked', 'checked');
  } else {
    $('.cases-item').removeAttr('checked');
  }
});

$(document).on('click', '#cases-selectall-edit', function(e) {
  if(this.checked){
    $(".cases-item-edit").prop('checked', 'checked');
  } else {
    $('.cases-item-edit').removeAttr('checked');
  }
});

var loadMsg = function(proj_id) {
  $.ajax({
    url: req_url,
    data: {
      'project_id': proj_id,
      'type': 'select',
      'start': page_start,
      'size': page_size
    },
    type: 'get',
    dataType: 'json',
    success: function(data) {
      var tojson = function(data){
        return JSON.stringify(data);
      }

      juicer.register('tojson', tojson); //注册自定义函数


      var tpl = __inline('msgTpl.tpl'),
        html = juicer(tpl, data);
      $('.vs-data-num').text(data.data.length);
      $('.version-table tbody').html(html);

      // 如果是首次渲染，则添加分页功能
      if (first_render) {

        first_render = false;

        var pgnTpl = '',
          count = data.count / page_size;

        for (var i = 1; i < count; i++) {
          var p = parseInt(1) + parseInt(i);
          pgnTpl += '<a class="item">' + p + '</a>';
        }
        $('.version-page').append(pgnTpl);
      }

    },
    error: function() {
      console.log("加载错误");
    }
  });
};
exports.loadMsg = loadMsg;

var addMsg = function(name, cache, status, env, casesId) {
  $.ajax({
    url: req_url,
    data: {
      'name': name,
      'status' : status,
      'project_id': window.localStorage['project_id'],
      'cached': cache,
      'type': 'add',
      'api_ids' : casesId,
      'testserver_id' : env
    },
    type: 'get',
    dataType: 'json',
    success: function(data) {
      //alert(data.msg);
      window.location.reload(true);
    },
    error: function() {
      console.log("添加错误");
    }
  });
}
exports.addMsg = addMsg;

var modMsg = function(ver_id, name, cache, status, api_ids, testserverId) {
  $.ajax({
    url: req_url,
    data: {
      'project_id': window.localStorage['project_id'],
      'ver_id': ver_id,
      'name': name,
      'cached': cache,
      'status': status,
      'type': 'mod',
      'api_ids' : api_ids,
      'testserver_id' : testserverId
    },
    type: 'get',
    dataType: 'json',
    success: function(data) {
      //alert(data.msg);
      window.location.reload(true);
    },
    error: function() {
      console.log("添加错误");
    }
  });
}
exports.modMsg = modMsg;

exports.getTpl = function() {
  return __inline('version.tpl');
};
