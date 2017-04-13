/**
 * Created by Dixeran on 2017/3/31.
 */

var app = new Vue({
    el:'#right-panel',
    data:{
        city:'',
        code:'',
        date:'',
        router: 1,
        items:[

        ],
        markers:[

        ],
        paths:[

        ],
        color:[ '#D2527F', '#27AE60',  '#E67E22', '#87D37C', '#F1C40F', '#E26A6A', '#16A085',
        '#1ABC9C', '#8E44AD', '#019875','#9B59B6', '#2ECC71', '#D35400', '#F39C12',  '#2C3E50', '#34495E']
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

        },
        getPath:function () {
            nodesLine.hide();
            for(var t = 0; t<app.paths.length; t++){
                app.paths[t].clear();
            }
            app.paths.splice(0, app.paths.length);
            for(var i = 0; i<app.items.length-1; i++) {
                var transfer = new AMap.Transfer({
                    city: app.city,
                    map: map,
                    panel: 'path' + (i + 1),
                    outlineColor:app.color[i]
                });
                app.paths.push(transfer);
                transfer.search(app.items[i].location, app.items[i+1].location);
            }
        }
    }
});