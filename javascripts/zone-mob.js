/**
 * Created by lenovo on 2017/1/13.
 */
$(document).ready(function () {
    $('#settings').on('click',function () {
        $('#logout').toggle(300);
        if($('#add').css('background-color') == 'rgb(66, 139, 202)') {
            $('#add').css({'background-color': '#D63932', 'border-color': '#D63932'});
            $('#add-img').animate({maxWidth:145},{step:function (now) {
                $('#add-img').css('transform','rotate('+(now-100)+'deg)')
            },duration:'fast'},'swing')
        }
        else if($('#add').css('background-color') == 'rgb(214, 57, 50)') {
            $('#add').css({'background-color': 'rgb(66, 139, 202)', 'border-color': 'rgb(66, 139, 202)'});
            $('#add-img').animate({maxWidth:190},{step:function (now) {
                $('#add-img').css('transform','rotate('+(now-100)+'deg)')
            },duration:'fast'},'swing')
        }
    });
});