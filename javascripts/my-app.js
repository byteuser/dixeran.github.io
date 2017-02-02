var myApp = new Framework7({
    material:true
});

var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main',{
    domCache: true
});

var listBody;

myApp.onPageBeforeInit('zone',function (page) {
    function showList(listData) {
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
        for(var t = 0;t<list.length;t++)
        {
            if(list[t][2] == 1)
            {
                var pagenow = list[t][5];
                var pageall = list[t][6];
                var progress = (pagenow/pageall)*100;
                myApp.showProgressbar('#processbar' + t,progress);
            }
            else
            {
                $('#readprocess' + t).css('display','none');
                $('#processbar' + t).html("<span class='readprocess'>Haven't started</span>");
            }
        }
        listBody = list;
    }

    function refresh() {
        myList.deleteAllItems();
        var code = $.cookie('code');
        $.post("https://python-dixeran.rhcloud.com/fetch",{code:code},function (data) {
            showList(data);
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
            return '<li class="accordion-item swipeout">' +
                        '<a href="#" class="item-content item-link">' +
                            '<div class="item-inner">' +
                                '<div class="item-title"><span class="bookname">' + item.item + '</span>' +
                                '<span class="readprocess" id="readprocess' + index + '">&nbsp;Page&nbsp;' + item.pagenow + '&nbsp;of&nbsp;' +item.pageall + '</span>' +
                                '<p id="processbar'+ index +'"><span></span></p>' +
                            '</div>' +
                            '</div>' +
                        '</a>' +
                        '<div class="accordion-item-content">' +
                        '<a href="#" class="swipeout-delete button color-red" index="' + index + '">Delete</a>' +
                        '</div>' +
                    '</li>'

        }
    });
    refresh();

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
        var state = 0;
        if($('#bookstateHidden').prop('checked')){
            state = 1;
        }
        if(bookname && bookpageall) {
            $.post("https://python-dixeran.rhcloud.com/insert",
                {code: code, state:state, bookname: bookname, bookpageall: bookpageall, bookpagenow: bookpagenow}, function () {
                    myApp.closeModal('.popover');
                    refresh();
                });
        }
    });

    $(document).on('click','.swipeout-delete',function (e) {
        var target = e.target;
        var index = target.getAttribute('index');
        $.post("https://python-dixeran.rhcloud.com/delete",
            {code:$.cookie('code'), bookname:listBody[index][3]},function (data) {
                myApp.addNotification({
                    message:data,
                    hold:3000
                });
            }
        );
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

