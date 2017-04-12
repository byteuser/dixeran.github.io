/**
 * Created by Dixeran on 2017/3/31.
 */

var app = new Vue({
    el:'#right-panel',
    data:{
        city:'',
        code:'',
        date:'',
        items:[

        ],
        markers:[

        ],
        router: 1
    },
    methods:{
        showCircle:function (item) {
            //var target = $(event.target).attr('index');
            //console.log(target);
            //var item = Nodes.items[target];
            nodesCircle.setCenter(item.location);
            nodesCircle.setRadius((20 - map.getZoom()) * 200);
            nodesCircle.show();
        },
        hideCircle:function () {
            nodesCircle.hide();
        },
        deleteNode:function (item) {
            var target = item.index;
            console.log(app.items[target].location.toString() +'/'+app.markers[target].getPosition().toString());
            app.items.splice(target, 1);
            app.markers[target].hide();
            app.markers.splice(target, 1);
            nodesCircle.hide();
            setTimeout(function () {
                $('#save-btn').click();
            }, 90);//修改体现到DOM上有延迟

        }
    }
});