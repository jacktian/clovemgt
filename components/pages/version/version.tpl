<style>
#cases-list label,
#cases-list-edit label
 {
    display: block;

    font-size: 13px;
}

#cases-list label:hover,
#cases-list-edit label:hover {
  background-color: #f9f9f9;
}

#cases-list label input,
#cases-list-edit label input {
  position: relative;
    top: 3px;
    margin-right: 4px;
}

#cases-all{background-color: #f9f9f9;font-size: 13px; margin-bottom: 6px;}
#cases-all input{position: relative; top:3px;}
</style>


<div class="ui container">
  <div class="ui breadcrumb">
    <div class="active section">首页</div>
    <div class="divider"> / </div>
    <div class="active section">版本管理</div>
  </div>
  <div class="ui divider"></div>
  <div class="toolbar">
    <div class="ui data-num">
      <i class="browser icon"></i> 数据量 :&nbsp;&nbsp;&nbsp;
      <span class="ui label circular vs-data-num">0</span>
    </div>
    <div class="ui button mini teal add-btn version-add-btn">添加</div>
  </div>
  <table class="ui table version-table">
    <thead>
      <tr>
        <th>ver_id</th>
        <th>版本名称</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <div class="page_wrap">
    <div class="ui borderless pagination menu version-page">
      <a class="item active">1</a>
    </div>
  </div>
</div>


<!-- 添加模态框开始 -->
<div class="ui modal version-add-modal">
  <i class="close icon"></i>
  <div class="header">
    添加数据
  </div>
  <div class="image content">
    <form class="ui form">
      <div class="field">
        <label>版本名称</label>
        <input type="text" placeholder="版本名称" id='vs-add-name'>
      </div>
      <div class="field">
        <label>缓存</label>
        <div class="field">
          <select class="ui fluid search dropdown" id='vs-add-cache'>
            <option value="1">缓存</option>
            <option value="0">不缓存</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>状态</label>
        <div class="field">
          <select class="ui fluid search dropdown" id='vs-add-status'>
            <option value="1">可用</option>
            <option value="0">停用</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label>测试环境</label>
        <div class="field">
          <select class="ui fluid search dropdown" id='vs-add-env'></select>
        </div>
      </div>

      <div class="field">
        <label>测试用例</label>
        <div class="field">
          <div class="cases-box" id="cases-box">
            <div id="cases-all"><label><input value="0" type="checkbox" id="cases-selectall"> 全选</label></div>
            <div id="cases-list"></div>
          </div>
        </div>
      </div>

    </form>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      取消
    </div>
    <div class="ui positive right labeled icon button vs-add-data">
      确定添加
      <i class="checkmark icon"></i>
    </div>
  </div>
  </div>

  <!-- 修改模态框开始 -->
  <div class="ui modal version-edit-modal">
    <i class="close icon"></i>
    <div class="header">
      修改数据
    </div>
    <div class="image content">
      <form class="ui form">
        <input type="hidden" value="" id="project_id_edit">
        <input type="hidden" value="" id="ver_id_edit">
        <div class="field">
          <label>版本名称</label>
          <input type="text" placeholder="版本名称" id='vs-edit-name'>
        </div>
        <div class="field">
          <label>缓存</label>
          <div class="field">
            <select class="ui fluid search dropdown" id='vs-edit-cache'>
              <option value="1">缓存</option>
              <option value="0">不缓存</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>状态</label>
          <div class="field">
            <select class="ui fluid search dropdown" id='vs-edit-status'>
              <option value="1">可用</option>
              <option value="0">停用</option>
            </select>
          </div>
        </div>

      <div class="field">
        <label>测试环境</label>
        <div class="field">
          <select class="ui fluid search dropdown" id='vs-edit-env'></select>
        </div>
      </div>

      <div class="field">
        <label>测试用例</label>
        <div class="field">
          <div class="cases-box" id="cases-box">
            <div id="cases-all"><label><input value="0" type="checkbox" id="cases-selectall-edit"> 全选</label></div>
            <div id="cases-list-edit"></div>
          </div>
        </div>
      </div>

      </form>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        取消
      </div>
      <div class="ui positive right labeled icon button vs-edit-data">
        保存
        <i class="checkmark icon"></i>
      </div>
    </div>
</div>
