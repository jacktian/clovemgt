/* 
 * @Author: boxizen
 * @Date:   2015-11-22 23:20:18
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-23 00:17:16
 */

var verName = "root",
	verPass = "clove1234";

// 注销按钮
$(document).on('click', '#loginReset', function() {
    localStorage.clear();
});

var verify = function() {
	$('#loginSubmit').click(function() {
        var name = $('#username').val();
        var password = $('#password').val();
        if (name == verName && password == verPass) {
            localStorage.name = name;
            localStorage.password = password;
            window.location.href = "#!/admin/info";
            $('#loginMenu').html('管理员');
        }
        else {
        	alert("用户名或密码错误");
        }
    })
}
exports.verify = verify;

var loadMsg = function() {

    
}
exports.loadMsg = loadMsg;

exports.getTpl = function() {
    return __inline('login.tpl');
};