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
            if(list[t][2] == 1 && list[t][5]<list[t][6])
            {
                var pagenow = list[t][5];
                var pageall = list[t][6];
                var progress = (pagenow/pageall)*100;
                myApp.showProgressbar('#processbar' + t,progress);
                $('#startButton'+ t).css('display','none');
            }
            else if(list[t][2] == 1 && list[t][5] >= list[t][6])
            {
                $('#readprocess' + t).css('display','none');
                $('#list-content' + t).css('display','none');
                $('#processbar' + t).html("<span class='readprocess'>Finished! " + '<i class="material-icons">check_box</i></span>');
                $('#startButton'+ t).css('display','none');
            }
            else
            {
                $('#readprocess' + t).css('display','none');
                $('#list-content' + t).css('display','none');
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
                                '<div class="item-title list-holder"><div class="bookname">' + item.item + '</div>' +
                                '<span class="readprocess" id="readprocess' + index + '">' + item.pagenow + '&nbsp;of&nbsp;' +item.pageall + '</span>' +
                                '<p id="processbar'+ index +'"><span></span></p>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                        '<div class="accordion-item-content">' +
                            '<div class="list-block" id="list-content' + index +'">' +
                                '<ul><li>' +
                                    '<div class="item-content">' +
                                        '<div class="item-inner">' +
                                            '<div class="item-input input-field" style="width: 70%">' +
                                                '<input type="text" placeholder="Today you read.." id="pageaddNum' + index + '">'  +
                                            '</div>' +
                                            '<p class="buttons-row"><a href="#" class="button button-fill button-raised pageadd" index="' + index + '">Update</a></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</li></ul>' +
                            '</div>' +
                            '<a href="#" class="button color-blue start-button" index="' + index + '" id="startButton' + index +'">Start it</a>' +
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
        myApp.showProgressbar('.popover-add');
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
                    refresh();
                    myApp.hideProgressbar('.popover-add');
                    myApp.closeModal('.popover');
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

    $(document).on('click', '.pageadd',function (e) {
        var target = e.target;
        var index = target.getAttribute('index');
        var pageAdd = parseInt($('#pageaddNum' + index).val());
        if(isNaN(pageAdd)){
            $('#pageaddNum' + index).val(null);
            alert('Accept Numbers only');
            return;
        }
        var pageLast = listBody[index][5];
        pageLast = pageLast + pageAdd;
        var process = (pageLast / listBody[index][6])*100;
        myApp.setProgressbar('#processbar' + index,process,1000);
        myApp.accordionClose('.accordion-item');
        $('#readprocess' + index).html(pageLast + '&nbsp;of&nbsp;' + listBody[index][6]);
        $.post("https://python-dixeran.rhcloud.com/update",{
            code:$.cookie('code'),
            bookname: listBody[index][3],
            bookpagenow: pageAdd
        },function (data) {
            myApp.addNotification({
                message:data,
                hold:2000
            });
            if(process >= 100)
            {
                refresh();
            }
        });
    });

    $(document).on('click','.start-button',function (e) {
        var target = e.target;
        var index = target.getAttribute('index');
        alert(index);
        $.post("https://python-dixeran.rhcloud.com/start",{
            code:$.cookie('code'),
            bookname:listBody[index][3]
        },function (data) {
            refresh();
        });
    });

    $$('.pull-to-refresh-content').on('refresh',function (data) {
        refresh();
        setTimeout(function () {
            myApp.pullToRefreshDone('.pull-to-refresh-content');
        },2000);
    });

    $('#scanto').on('click',function () {
        document.getElementById('scanf').click();
    });


    $('#scanf').on('change',function (e) {
        myApp.showProgressbar('.popover-add');
        var img = e.target.files[0];
        var reader = new FileReader();
        var data;
        reader.readAsDataURL(img);
        reader.onloadend = function () {
            data = reader.result;
            Quagga.decodeSingle({
                decoder: {
                    readers: ["ean_reader"] // List of active readers
                },
                locate: true, // try to locate the barcode in the image
                src: data // or 'data:image/jpg;base64,' + data
            }, function(result){
                if(result.codeResult) {
                    $.post("https://python-dixeran.rhcloud.com/decode",{ISBN:result.codeResult.code},function (Bookdata) {
                        var Bookinfo = $.parseJSON(Bookdata);
                        $('#bookname').val(Bookinfo[0]);
                        $('#bookpageall').val(Bookinfo[3]);
                        myApp.hideProgressbar('.popover-add');
                    })
                } else {
                    console.log("not detected");
                }
            });
        };
    });
});

