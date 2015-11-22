<div class="ui container">
  <div class="ui breadcrumb">
    <div class="active section">首页</div>
    <div class="divider"> / </div>
    <div class="active section">测试环境管理</div>
  </div>
  <div class="ui divider"></div>
  <div class="toolbar">
    <div class="ui data-num">
      <i class="browser icon"></i> 数据量 :&nbsp;&nbsp;&nbsp;
      <span class="ui label circular test-data-num">0</span>
    </div>
    <div class="ui button mini teal add-btn test-add-btn">添加</div>
  </div>
  <table class="ui table test-table">
    <thead>
      <tr>
        <th>id</th>
        <th>名称</th>
        <th>URL</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>


<!-- 添加模态框开始 -->
<div class="ui modal test-add-modal">
  <i class="close icon"></i>
  <div class="header">
    添加数据
  </div>
  <div class="image content">
    <form class="ui form">
      <div class="field">
        <label>名称</label>
        <input type="text" placeholder="测试环境名称" id='test-add-name'>
      </div>
      <div class="field">
        <label>URL</label>
        <input type="text" placeholder="测试服务器域名，如http://" id='test-add-url'>
      </div>
    </form>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      取消
    </div>
    <div class="ui positive right labeled icon button test-add-data">
      确定添加
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>

  <!-- 修改模态框开始 -->
  <div class="ui modal test-edit-modal">
    <i class="close icon"></i>
    <div class="header">
      修改数据
    </div>
    <div class="image content">
      <form class="ui form">
        <div class="field">
          <label>id</label>
          <input type="text" placeholder="testserver_id" id='test-edit-testserver_id' disabled="disabled">
        </div>
        <div class="field">
          <label>名称</label>
          <input type="text" placeholder="名称" id='test-edit-name'>
        </div>
        <div class="field">
          <label>URL</label>
          <input type="text" placeholder="URL" id='test-edit-url'>
        </div>        
        <div class="field">
          <label>状态</label>
          <div class="field">
            <select class="ui fluid search dropdown" id='test-edit-available'>
              <option value="1">可用</option>
              <option value="0">停用</option>
            </select>
          </div>
        </div>

      </form>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        取消
      </div>
      <div class="ui positive right labeled icon button test-edit-data">
        保存
        <i class="checkmark icon"></i>
      </div>
    </div>
</div>