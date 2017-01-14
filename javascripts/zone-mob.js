/**
 * Created by lenovo on 2017/1/13.
 */
$(document).ready(function () {
    $('#settings').on('click',function () {
        $('#logout').toggle(300);
        $('#add').css({'background-color':'#D63932','border-color':'#D63932'});
    });
});