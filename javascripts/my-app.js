var myApp = new Framework7({
    material:true
});

var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main',{
    domCache: true
});

myApp.onPageBeforeInit('zone',function (page) {
    $('#sign-out').on('click',function () {
        $.cookie('name',null,{expires:7});
        $.cookie('password',null,{expires:7});
        $.cookie('code',null,{expires:7});
        mainView.router.loadPage('index-mob.html');
    })
});


