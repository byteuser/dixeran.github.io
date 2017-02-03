/**
 * Created by lenovo on 2017/1/4.
 */

$(document).ready(function () {
    var inname = $.cookie('name');
    var inpsd = $.cookie('password');
    if(inname != null) {
        myApp.addNotification({
            message:'Checking login state..'
        });
        $.post("https://python-dixeran.rhcloud.com/", {
            method: 'in',
            username: inname,
            password: inpsd
        }, function (data) {
            myApp.closeNotification('.notification-item');
            if (data == 'Sign in successful') {
                myApp.alert(data, '登陆消息');
                mainView.router.loadPage('zone-mob.html');
            }
        });
    }

    $('#sign-in-button').on('click',function () {
        var name = $("#sign-in-name").val();
        var password = $("#sign-in-password").val();
        myApp.showProgressbar('#sign-in-button');
        $.post("https://python-dixeran.rhcloud.com/",{method:'in',username:name, password:password},function (data) {
            myApp.alert(data,'登录消息',function () {
                myApp.hideProgressbar('#sign-in-button');
            });
            if(data == 'Sign in successful')
            {
                $.post("https://python-dixeran.rhcloud.com/",{method:'code',username:name, password:password},function (decode) {
                    $.cookie('name',name,{expires:7});
                    $.cookie('password',password,{expires:7});
                    $.cookie('code',decode,{expires:7});
                    mainView.router.loadPage('zone-mob.html');
                })
            }
        });
    });
    $('#sign-up-button').on('click',function () {
        var name = $("#sign-up-name").val();
        var password = $("#sign-up-password").val();
        myApp.showProgressbar('#sign-up-button');
        $.post("https://python-dixeran.rhcloud.com/",{method:'up',username:name, password:password},function (data) {
            myApp.alert(data,'登陆消息',function () {
                myApp.hideProgressbar('#sign-up-button');
            });
        });
    });
});