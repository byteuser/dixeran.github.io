var myApp = new Framework7({
    material:true
});

var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main',{
    domCache: true
});

myApp.onPageBeforeInit('zone',function (page) {
    function refresh() {
        myList.deleteAllItems();
        var code = $.cookie('code');
        $.post("https://python-dixeran.rhcloud.com/fetch",{code:code},function (listData) {
            var list = $.parseJSON(listData);
            for(var i = 0;i<list.length;i++)
            {
                myList.appendItem(
                    {
                        item:list[i][3],
                        pagenow:list[i][5],
                        pageall:list[i][6]
                    }
                )
            }
        });
    }

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
                item:'List is empty!',
                pageall:'0',
                pagenow:'0'
            }
        ],
        renderItem: function (index,item) {
            return '<li class="accordion-item">' +
                        '<a href="#" class="item-content item-link">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">' + item.item + '</div>' +
                            '</div>' +
                        '</a>' +
                        '<div class="accordion-item-content">' +
                            '<p>Page' + item.pagenow + 'of' +item.pageall + '</p>' +
                        '</div>' +
                    '</li>'

        }
    });
    refresh();

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
    });

    $$('#bookstate').on('click',function () {
        $$('#bookpagenow').toggleClass('disabled')
    });

    $('#add-button').on('click',function () {
        $('#bookname').val(null);
        $('#bookpageall').val(null);
        $('#bookpagenow').val(null);
    });

    $('#book-add-submit').on('click',function () {
        var code = $.cookie('code');
        var bookname = $('#bookname').val();
        var bookpageall = $('#bookpageall').val();
        var bookpagenow = $('#bookpagenow').val();
        if(bookname && bookpagenow) {
            $.post("https://python-dixeran.rhcloud.com/insert",
                {code: code, bookname: bookname, bookpageall: bookpageall, bookpagenow: bookpagenow}, function () {
                    myApp.closeModal('.popover');
                    refresh();
                });
        }
    });
    /* var code = $.cookie('code');
    $.post("https://python-dixeran.rhcloud.com/fetch",{code:code},function (listData) {
        var list = $.parseJSON(listData);
        for(var i = 0;i<list.length;i++)
        {
            myList.appendItem(
                {
                    item:list[i][3]
                }
            )
        }
    }); */
    $$('.pull-to-refresh-content').on('refresh',function (data) {
        refresh();
        setTimeout(function () {
            myApp.pullToRefreshDone('.pull-to-refresh-content');
        },2000);
    });
});

