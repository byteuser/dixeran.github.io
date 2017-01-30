/**
 * Created by lenovo on 2016/12/16.
 */

$(document).ready(function() {
    var inname = $.cookie('name');
    var inpsd = $.cookie('password');
    $.post("https://python-dixeran.rhcloud.com/",{method:'in',username:inname, password:inpsd},function (data) {
        alert(data);
        if(data == '登陆成功')
        {
            window.location.href = 'zone-mob.html';
        }
    });

    var today = new Date();
    var hour = today.getHours();
    var num = Math.floor(hour/4) + 1;
    $('#mid-panel-left').attr('src',"image/mid-panel ("+ num + ").jpg");
    $('#mid-panel-right').attr('src',"image/mid-panel ("+ num + ").jpg");
    $('#mid-panel-container').css('backgroundImage','url("./image/mid-panel('+ num + ')-bk.jpg")');

    $("#sign-in-button").on("click", function () {
        $("#left-sign-up-container").fadeIn(100);
        $("#right-sign-up-container").fadeIn(100);
    });
    $("#left-sign-up-container").on("mouseover",function () {
        $(".padding-right").animate({opacity:"0"},150);
    });
    $("#right-sign-up-container").on("mouseover",function () {
        $(".padding-left").animate({opacity:"0"},150);
    });
    $("img").on("mouseover",function () {
        $(".padding-left").animate({opacity:"1"},150);
        $(".padding-right").animate({opacity:"1"},150);
        $("#sign-in-button").css({"backgroundColor":"steelblue","color":"#ffffff"});

    });
    $('#sign-in-button').on("mouseover",function () {
        $("#sign-in-button").css({"backgroundColor":"#ffffff","color":"steelblue"});
    });
    $("#sign-in-button").on("mouseout",function () {
        $("#sign-in-button").animate({opacity:"1"},150);
    });
    $(".button").on("mouseover",function () {
        $(".button").css({"backgroundColor":"#ffffff","color":"#ff3c45"});

    });
    $(".button").on("mouseout",function () {
        $(".button").css({"backgroundColor":"#ff3c45","color":"#fff"});
    });

    $("#left-sign-up").on("click",function () {
        var name = $("#sign-up-name").val();
        var password = $("#sign-up-password").val();
        $.post("https://python-dixeran.rhcloud.com/",{method:'up',username:name, password:password},function (data) {
            alert(data+'\n阔以登陆啦');
        });
    });

    $("#right-sign-in").on("click",function () {
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

});
