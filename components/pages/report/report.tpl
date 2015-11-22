<div class="ui container">
  <div class="ui breadcrumb">
    <div class="active section">首页</div>
    <div class="divider"> / </div>
    <div class="active section">测试报告</div>
  </div>
  <div class="ui divider"></div>
  <div class="toolbar">

    <div class="ui form toolbar-left">
      <div class="inline field"><label>测试任务：</label>
        <select class="ui dropdown" id='report-search-task'></select>

        <label>执行时间：从</label> &nbsp;&nbsp;
        <input type="text" id="report-fromdate" placeholder="开始时间"> &nbsp;&nbsp;
        <label>到</label>
        &nbsp;&nbsp;
        <input type="text" id="report-todate" placeholder="结束时间">
      </div>
    </div>

    <div class="ui button mini teal search-btn report-search-btn">查询</div>
  </div>
  <table class="ui table report-table">
    <thead>
      <tr>
        <th>执行版本号</th>
        <th>版本名称</th>
        <th>测试任务名称</th>
        <th>结果</th>
        <th  style="display:none;">taskId</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <div class="page_wrap">
    <div class="ui borderless pagination menu report-page">
      <a class="item active">1</a>
    </div>
  </div>
</div>


<!-- 查看详情模态框开始 -->
<div class="ui modal report-detail-modal" style="max-height:510px; overflow:auto;">
  <i class="close icon"></i>
  <div class="header">详细测试报告</div>
  <div class="image content">
    <form class="ui form">
      <div class="header">
        <label>项目名称:&nbsp;&nbsp;
          <span class="report-projectName" style="color:blue;"></span>
        </label>
      </div>
      <div class="header">
        <label>测试通过率:&nbsp;&nbsp;
          <span class="report-successrate"></span>
        </label>
      </div>
      <div class="ui divider"></div>
      <table class="ui table report-detail-table">
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
  <!-- 查看详情模态框结束 -->
