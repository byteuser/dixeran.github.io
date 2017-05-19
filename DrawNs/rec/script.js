/**
 * Created by lenovo on 2017/5/18.
 */
var app = new Vue({
    el:'#root',
    data:{
        totalWidth:480
    },
    methods:{
        switchState:function (event) {
            var target = event.target;
            var Jtarget = $(target);
            if(target.tagName == "TD"){
                if(!target.state || target.state != 1){
                    target.style.backgroundColor = "#34495E";
                    Jtarget.addClass("selected");
                    target.state = 1;
                }
                else{
                    target.style.backgroundColor = "#ffffff";
                    target.state = 0;
                    Jtarget.removeClass("selected");
                }
            }
        },
        addSequential:function (event) {
            var targetList = $('.selected');
            if(targetList.length == 0){
                new $.zui.Messager('需要指定一个目标框', {
                    type: 'danger' // 定义颜色主题
                }).show();
            }
            else {
                //console.log(targetList.parents('table'));
                var parent = targetList.parent();
                //console.log(parent[0]);
                var sisters = targetList.prevAll('td');
                //console.log(sisters.length);
                if(sisters.length == 0){
                    parent.after('<tr>' +
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>' +
                        '</tr>');
                }
                else {
                    parent.after('<tr>' +
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td> <td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>' +
                        '</tr>');
                }
                if(targetList.nextAll('td').length != 0){
                    //console.log(targetList.nextAll('td').length);
                    parent.next('tr').append('<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>');
                }
                targetList.removeClass("selected");
                targetList.css("background-color", "#ffffff");
                targetList[0].state = 0;
            }
        },
        addAlternative:function (event) {
            var targetList = $('.selected');
            if(targetList.length == 0){
                new $.zui.Messager('需要指定一个目标框', {
                    type: 'danger' // 定义颜色主题
                }).show();
            }
            else{
                var parent = targetList.parent('tr');
                var sisters = targetList.prevAll('td');
                console.log(sisters);
                if(sisters.length == 0){
                    parent.after('<tr>'+
                        '<td class="ifSentence"><input type="text" placeholder="if..."></td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>'+
                        '<table class="table table-bordered">'+
                        '<tr>'+
                        '<td>Y</td>'+
                        '<td>N</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>'+
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>'+
                        '</tr>'+
                        '</table>' +
                        '</td>'+
                        '</tr>');
                }
                else if(sisters.length == 1){
                    parent.after('<tr>'+
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td> <td class="ifSentence"><input type="text" placeholder="if..."></td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>' +
                        '<td>'+
                        '<table class="table table-bordered">'+
                        '<tr>'+
                        '<td>Y</td>'+
                        '<td>N</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>'+
                        '<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>'+
                        '</tr>'+
                        '</table>' +
                        '</td>'+
                        '</tr>');
                }
                if(targetList.nextAll('td').length != 0){
                    //console.log(targetList.nextAll('td').length);
                    parent.next('tr').append('<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>');
                }
                targetList.removeClass("selected");
                targetList.css("background-color", "#ffffff");
                targetList[0].state = 0;
            }
        },
        addLoop:function (event) {
            var targetList = $('.selected');
            if(targetList.length == 0){
                new $.zui.Messager('需要指定一个目标框', {
                    type: 'danger' // 定义颜色主题
                }).show();
            }
            else {
                var parent = targetList.parent('tr');
                var sisters = targetList.prevAll('td');
                if (sisters.length == 0) {
                    parent.after('<tr>' +
                        '<td class="while"><input type="text" placeholder="while..."></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>' +
                        '<table class="table table-bordered">' +
                        '<tr><td rowspan="100"></td>' +
                        '<td>&nbsp;</td></tr>' +
                        '<tr>' +
                        '<td><input type="text" placeholder="do..."></td>' +
                        '</tr>' +
                        '</tr>' + '</table>' +
                        '</td>');
                }
                else{
                    parent.after('<tr>' +
                        '<td><input type="text" placeholder="  "></td><td class="while"><input type="text" placeholder="while..."></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td><input type="text" placeholder=""></td><td>' +
                        '<table class="table table-bordered">' +
                        '<tr><td rowspan="100"></td>' +
                        '<td>&nbsp;</td></tr>' +
                        '<tr>' +
                        '<td><input type="text" placeholder="do..."></td>' +
                        '</tr>' +
                        '</tr>' + '</table>' +
                        '</td>');
                }
                if(targetList.nextAll('td').length != 0){
                    //console.log(targetList.nextAll('td').length);
                    parent.next('tr').append('<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>');
                    parent.next('tr').next('tr').append('<td><input type="text" placeholder="&nbsp;&nbsp;&nbsp;"></td>');
                }
                targetList.removeClass("selected");
                targetList.css("background-color", "#ffffff");
                targetList[0].state = 0;
            }
        },
        PtrSc:function () {
            var container = $('#MainCanvas');
            var image = document.getElementById('image');
            image.setAttribute('height', container.height());
            image.setAttribute('width', container.width());
            var context = image.getContext("2d");//获得上下文

            var viewHeight = $(window).height();
            var scrollPre = 0;
            var scrollNow = 0;
            var currentHeight = container.height();
            var containerNt = document.getElementById('MainCanvas');
            draw();
            /*绘图*/
            function draw() {
                html2canvas(containerNt).then(function (canvas) {
                    context.drawImage(canvas,0 , scrollNow);
                    document.body.appendChild(canvas);
                });

                if(currentHeight >= 0){
                    setTimeout(function () {
                        scrollPre += viewHeight;
                        $(window).scrollTop(scrollPre);
                        scrollNow = $(window).scrollTop();
                        currentHeight -= viewHeight;
                        draw();
                    }, 5000);
                }
                else{
                    setTimeout(function () {
                        var imagePNG = image.toDataURL("image/png");
                        window.open(imagePNG);
                    }, 500);
                }
            }
        }
    }
});

$(document).ready(function () {
    function checkUA() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    if(!checkUA()){
        $('#ControlTab').css({
            "position":"inherit",
            "margin":"0 auto",
            "width":$(window).width()
        });
        app.totalWidth = $(window).width();
    }
});