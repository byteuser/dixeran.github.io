/**
 * Created by lenovo on 2016/12/16.
 */

$(document).ready(function() {
    $("#sign-in-button").on("click", function () {
        $("#left-sign-up-container").fadeIn(100);
        $("#right-sign-up-container").fadeIn(100);
    });
    $("#left-sign-up-container").on("mouseover",function () {
        $("#right-sign-up-container").animate({opacity:"0.3"},150);
    })
    $("#right-sign-up-container").on("mouseover",function () {
        $("#left-sign-up-container").animate({opacity:"0.3"},150);
    })
    $("img").on("mouseover",function () {
        $("#left-sign-up-container").animate({opacity:"1"},150);
        $("#right-sign-up-container").animate({opacity:"1"},150);

    })
    $('#sign-in-button').on("mouseover",function () {
        $("#sign-in-button").animate({opacity:"0.8"},100)
    })
    $("#sign-in-button").on("mouseout",function () {
        $("#sign-in-button").animate({opacity:"1"},150);
    });
});
