/**
 * Created by lenovo on 2017/1/4.
 */

$(document).ready(function () {
    var inname = $.cookie('name');
    var inpsd = $.cookie('password');
    $.post("https://python-dixeran.rhcloud.com/",{ method:'in',username:inname, password:inpsd},function (data) {
        alert(data);
        if(data == '登陆成功')
        {
            window.location.href = 'zone-mob.html';
        }
    });


    $('#sign-in-button').on('click',function () {
        var name = $("#sign-in-name").val();
        var password = $("#sign-in-password").val();
        $.post("https://python-dixeran.rhcloud.com/",{method:'in',username:name, password:password},function (data) {
            alert(data);
            if(data == '登陆成功')
            {
                $.post("https://python-dixeran.rhcloud.com/",{method:'code',username:name, password:password},function (decode) {
                    $.cookie('name',name,{expires:7});
                    $.cookie('password',password,{expires:7});
                    $.cookie('code',decode,{expires:7});
                    window.location.href = 'zone-mob.html'
                })
            }
        });
    });
    $('#sign-up-button').on('click',function () {
        var name = $("#sign-up-name").val();
        var password = $("#sign-up-password").val();
        $.post("https://python-dixeran.rhcloud.com/",{method:'up',username:name, password:password},function (data) {
            alert(data+'\n阔以登陆啦');
        });
    })
});