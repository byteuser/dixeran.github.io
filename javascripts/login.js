/**
 * Created by lenovo on 2016/12/16.
 */

$(document).ready(function() {
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
            alert(data);
            alert('Still working on it...');
        });
    });

    $("#right-sign-in").on("click",function () {
        var name = $("#sign-in-name").val();
        var password = $("#sign-in-password").val();
        $.post("https://python-dixeran.rhcloud.com/",{method:'in',username:name, password:password},function (data) {
            alert(data);
        });
    });

});
