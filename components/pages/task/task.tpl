<div class="ui container">
  <div class="ui breadcrumb">
    <div class="active section">首页</div>
    <div class="divider"> / </div>
    <div class="active section">测试任务管理</div>
  </div>
  <div class="ui divider"></div>
  <div class="toolbar">
    <div class="ui data-num">
      <i class="browser icon"></i> 数据量 :&nbsp;&nbsp;&nbsp;
      <span class="ui label circular task-data-num">0</span>
    </div>&nbsp;&nbsp;&nbsp;
    任务状态：
    <select  id='task-search-versionname'>
      <option value="0">未开始</option>
      <option value="1">执行中</option>
      <option value="2">执行完毕</option>
      <option value="3">执行出错</option>
    </select>&nbsp;&nbsp;&nbsp;
    执行日期：从<input type="text"  id='task-search-fromdate'>
    到<input type="text"  id='task-search-todate'>
    <div class="ui button mini teal tsearch-btn task-searcch-btn">查询</div>

    <div class="ui button mini teal add-btn task-add-btn">添加</div>
  </div>
  <table class="ui table task-table">
    <thead>
      <tr>
        <th>id</th>
        <th>任务名称</th>
        <th>版本名称</th>
        <th>计划执行时间</th>
        <th>状态</th>
        <th  style="display:none;">versionId</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <div class="page_wrap">
    <div class="ui borderless pagination menu task-page">
      <a class="item active">1</a>
    </div>
  </div>
</div>


<!-- 添加模态框开始 -->
<div class="ui modal task-add-modal">
  <i class="close icon"></i>
  <div class="header">
    添加数据
  </div>
  <div class="image content">
    <form class="ui form">
      <div class="field">
        <label>任务名称</label>
        <input type="text" placeholder="测试任务名称" id='task-add-name'>
      </div>
      <div class="field">
        <label>版本名称</label>
        <div class="field">
          <select class="ui fluid search dropdown" id='task-add-versionname'></select>
        </div>
      </div>
      <div class="field">
        <label>执行时间</label>
        <input type="text" placeholder="精确到分钟" id='task-add-runtime'>
      </div>
    </form>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      取消
    </div>
    <div class="ui positive right labeled icon button task-add-data">
      确定添加
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>

  <!-- 修改模态框开始 -->
  <div class="ui modal task-edit-modal">
    <i class="close icon"></i>
    <div class="header">
      修改数据
    </div>
    <div class="image content">
      <form class="ui form">
        <div class="field">
          <label>id</label>
          <input type="text" placeholder="task_id" id='task-edit-task_id' disabled="disabled">
        </div>
        <div class="field">
          <label>任务名称</label>
          <input type="text" placeholder="名称" id='task-edit-name'>
        </div>
        <div class="field">
          <label>版本名称</label>
          <div class="field">
            <select class="ui fluid search dropdown" id='task-edit-versionname'></select>
          </div>
        </div>
        <div class="field">
          <label>执行时间</label>
          <input type="text" placeholder="" id='task-edit-runtime'>
        </div>

      </form>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        取消
      </div>
      <div class="ui positive right labeled icon button task-edit-data">
        保存
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>

<!-- 查看详情模态框开始 -->
<div class="ui modal task-report-detail-modal">
  <i class="close icon"></i>
  <div class="header">
    详细测试报告</div>
  <div class="image content">
    <form class="ui form">
      <div class="active section">
        <label>项目名称:&nbsp;&nbsp;
          <span class="report-projectName" style="color:blue;"></span>
        </label>
      </div>
      <div class="active section">
        <label>测试通过率:&nbsp;&nbsp;
          <span class="report-successrate"></span>
        </label>
      </div>
      <div class="ui divider"></div>
      <table class="ui table task-report-detail-table">
        <thead>
          <tr>
            <th>测试版本</th>
            <th>接口名称</th>
            <th>测试URL</th>
            <th>测试结果</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
         </tbody>
      </table>
    </form>

  </div>
  <div class="actions" align="right">
    <div class="ui black deny button">
      关闭
    </div>
  </div>
  </div>
