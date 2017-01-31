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
    });
    var myList = myApp.virtualList('.list-block.virtual-list', {
        // Array with plain HTML items
        items: [
            {
                item:'Item1'
            }
        ],
        renderItem: function (index,item) {
            return '<li class="item-content">' +
                '<div class="item-inner">' +
                '<div class="item-title">'+ index + item.item + '</div>' +
                '</div>'

        }
    });
    $('#add').on('click',function () {
        myList.appendItem(
            {
                item:'test'
            }
        );
    });
    $('#remove').on('click',function () {
        var cache = myList.currentToIndex;
        myList.deleteItem(cache);
    })

});

myApp.onPageAfterAnimation('zone',function (page) {

});

