<div class="ui container">
  <div class="ui breadcrumb">
    <div class="active section">首页</div>
    <div class="divider"> / </div>
    <div class="active section">资讯管理</div>
  </div>
  <div class="ui divider"></div>
  <div class="toolbar">
    <div class="ui data-num">
      <i class="browser icon"></i>资讯数量&nbsp;&nbsp;
      <span class="ui label circular info-num">0</span>
    </div>
    <div class="ui button mini teal add-btn info-add-btn">添加</div>
  </div>  
  <table class="ui table" id="infoTable">
    <thead>
      <tr>
        <th>类型</th>
        <th>标题</th>
        <th>描述</th>
        <th>图片链接</th>
        <th>文章链接</th>
        <th>优先级</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="info-list">
    </tbody>
  </table>
</div>

<!-- 添加模态框开始 -->
<div class="ui modal info-add-modal">
  <i class="close icon"></i>
  <div class="header">
    添加数据
  </div>
  <div class="image content">
    <form class="ui form">
      <div class="field">
        <label>类型</label><!-- 
        <input type="text" id='postType' placeholder="1表示实用资讯，2表示博士观点">
 -->
        <select name="skills" class="ui fluid dropdown" id='postType'>
  <option value="1">实用资讯</option>
<option value="2">博士观点</option>
</select>

      </div>
      <div class="field">
        <label>标题</label>
        <input type="text" id='postTitle' placeholder="文章标题">
      </div>
      <div class="field">
        <label>描述</label>
        <input type="text" id='description' placeholder="文章简单概述">
      </div>
      <div class="field">
        <label>图片链接</label>
        <input type="text" id='picUrl' placeholder="文章缩略图链接">
      </div>
      <div class="field">
        <label>文章链接</label>
        <input type="text" id='postUrl' placeholder="文章链接">
      </div>
      <div class="field">
        <label>优先级</label>
        <select name="skills" class="ui fluid dropdown" id='prioty'>
  <option value="1">高</option>
<option value="2">中</option>
<option value="3">低</option>
</select>

      </div>

    </form>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      取消
    </div>
    <div class="ui positive right labeled icon button info-add-data">
      确定添加
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>