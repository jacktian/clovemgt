/* 
 * @Author: boxizen
 * @Date:   2015-11-22 23:20:18
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-24 14:17:22
 */

var verName = "root",
    verPass = "clove1234";

// 注销按钮
$(document).on('click', '#loginReset', function() {
    localStorage.clear();
    $('#loginMenu').html('登陆');
    alert("注销成功");
});


// 点击登陆
$(document).on('click', '#loginSubmit', function() {
    var name = $('#username').val();
    var password = $('#password').val();
    if (name == verName && password == verPass) {
        localStorage.name = name;
        localStorage.password = password;
        window.location.href = "#!/admin/info";
        $('#loginMenu').html('管理员');
    } else {
        alert("用户名或密码错误");
    }
});

var verify = function() {
    if (localStorage.name && localStorage.password && localStorage.name == "root" && localStorage.password == "clove1234");
    else {
        localStorage.clear();
    }
}
exports.verify = verify;

var loadMsg = function() {


}
exports.loadMsg = loadMsg;

exports.getTpl = function() {
    return __inline('login.tpl');
};