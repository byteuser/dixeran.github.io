/**
 * Created by lenovo on 2017/1/4.
 */

$(document).ready(function () {
    $('#sign-in-button').on('click',function () {
        var name = $("#sign-in-name").val();
        var password = $("#sign-in-password").val();
        $.post("https://python-dixeran.rhcloud.com/",{method:'in',username:name, password:password},function (data) {
            alert(data);
        });
    });
    $('#sign-up-button').on('click',function () {
        var name = $("#sign-up-name").val();
        var password = $("#sign-up-password").val();
        $.post("https://python-dixeran.rhcloud.com/",{method:'up',username:name, password:password},function (data) {
            alert(data);
        });
    })
});