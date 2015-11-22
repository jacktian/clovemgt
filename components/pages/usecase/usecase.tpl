<div class="ui container">
  <div class="ui breadcrumb">
    <div class="active section">首页</div>
    <div class="divider"> / </div>
    <div class="active section">用例管理</div>
  </div>
  <div class="ui divider"></div>
  <div class="toolbar">
    <div class="ui data-num">
      <i class="browser icon"></i> 数据量 :&nbsp;&nbsp;&nbsp;
      <span class="ui label circular usecase-data-num">0</span>
    </div>
    <div class="ui button mini teal add-btn usecase-add-btn">添加</div>
    <div class="ui button mini teal add-btn usecase-addfromrap-btn">同步RAP接口数据</div>
  </div>

  <table class="ui padded table usecase-table">
    <thead>
      <tr>
        <th>id</th>
        <th>名称</th>
        <th>Tag</th>
        <th>请求路径</th>
        <th>创建时间</th>
        <th>状态</th>
        <th style="display:none;">参数串</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="usecase-list">
    </tbody>
  </table>
  <div class="page_wrap">
    <div class="ui borderless pagination menu usecase-page">
      <a class="item active">1</a>
    </div>
  </div>
</div>


<!-- 添加模态框开始 -->
<div class="ui modal usecase-add-modal">
  <i class="close icon"></i>
  <div class="header">
    添加数据
  </div>
  <div class="image content">
    <form class="ui form">
      <div class="field">
        <label>名称</label>
        <input type="text" placeholder="用例名称" id='usecase-add-name'>
      </div>
      <div class="field">
        <label>标签</label>
        <input type="text" placeholder="用例的标签，方便日后查询，如：俄罗斯视频业务API" id='usecase-add-tag'>
      </div>
      <div class="field">
        <label>请求路径</label>
        <input type="text" placeholder="如：mobile/page/index/1.1.1" id='usecase-add-path'>
      </div>
      <div class="field">
        <label>请求参数串（
          <font color=blue>Tips:默认测试数据，如需录入多组测试数据，请在列表页进入“测试数据”进行设置</font>）</label>
        <input type="text" placeholder="如：stype=5&id=12844&platform=1" id='usecase-add-parameter'>
      </div>
    </form>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      取消
    </div>
    <div class="ui positive right labeled icon button usecase-add-data">
      确定添加
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>

<!-- 修改模态框开始 -->
<div class="ui modal usecase-edit-modal">
  <i class="close icon"></i>
  <div class="header">
    修改数据
  </div>
  <div class="image content">
    <form class="ui form">
      <div class="field">
        <label>ID</label>
        <input type="text" placeholder="v_id" id='usecase-edit-id' disabled="disabled">
      </div>
      <div class="field">
        <label>名称</label>
        <input type="text" placeholder="用例名称" id='usecase-edit-name'>
      </div>
      <div class="field">
        <label>标签</label>
        <input type="text" placeholder="用例的标签，方便日后查询，如：俄罗斯视频业务API" id='usecase-edit-tag'>
      </div>
      <div class="field">
        <label>请求路径</label>
        <input type="text" placeholder="如：mobile/page/index/1.1.1" id='usecase-edit-path'>
      </div>
      <div class="field">
        <label>请求参数串（
          <font color=blue>默认测试数据，如需录入多组测试数据，请在列表页进入“测试数据”进行设置</font>）</label>
        <input type="text" placeholder="如：stype=5&id=12844&platform=1" id='usecase-edit-parameter'>
      </div>
      <div class="field">
        <label>状态</label>
        <div class="field">
          <select class="ui fluid search dropdown" id='usecase-edit-status'>
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
    <div class="ui positive right labeled icon button usecase-edit-data">
      保存
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>

<!-- 测试数据详情模态框开始 -->
<div class="ui long modal usecase-detail-modal scrolling">
  <i class="close icon"></i>
  <div class="header">
    测试数据管理
  </div>
  <div class=" content">
    <form class="ui form" style="max-height:310px; overflow:auto;">
      <input type="hidden" id="usecase-apiId-input">
      <div class="field">
        <label>请求参数串
          <br>
          <font color=blue>Tips:如果需要设置可变参数，将对应参数的值用花括号代替，如id={id}&size={size}&sources=ivi</font>
        </label>
        <input type="text" placeholder="" id='usecase-parameter-input'>
      </div>
      <div class="field">
        <label>可变参数个数</label>
        <input type="text" placeholder="可变参数个数" id='usecase-param-num'>
        <input type='button' id='usecase-confirm' value="确定">
      </div>
      <label>
        <font color=blue><b>Tips:第一行填写可变参数的键值，为了方便阅读，建议使用与字段同名。第二行开始填写对应的测试数据。</b></font>
      </label>
      <table class="ui padded table usecase-detail-table">
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody id="usecase-detail-list">
        </tbody>
      </table>

    </form>
  </div>
  <div class="actions">
    <div class="ui black deny button usecase-detail-close">
      关闭
    </div>
    <div class="ui right labeled icon button usecase-add-row">
      添加一行
    </div>
    <div class="ui positive right labeled icon button usecase-detail-add">
      保存
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>
