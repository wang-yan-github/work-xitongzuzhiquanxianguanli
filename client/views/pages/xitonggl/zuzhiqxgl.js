var zuzhiqxglxxLength = 0;
Template.zuzhiqxgl.onCreated(function () {
    // 原始-组织权限管理
    this.yuanshi_zuzhiqxglxx = new ReactiveVar(0);
    // 组织权限管理
    this.zuzhiqxglxx = new ReactiveVar(0);

    handle = this.subscribe("xitongguanli_zuzhuqxgl");
    /*订阅并获取数据*/
    Tracker.autorun(function () {
        Template.instance().yuanshi_zuzhiqxglxx.set(ts_gc_zuzhijg.find({}));
        Template.instance().zuzhiqxglxx.set(Template.instance().yuanshi_zuzhiqxglxx.get());
    });


});

Template.zuzhiqxgl.onRendered(function () {
    Tracker.autorun(function () {
        var zuzhiqxglxx = ts_gc_zuzhijg.find({}).fetch();
        if (handle.ready()){
            Tracker.afterFlush(function () {

                /*添加部门列表数据*/
                // 获取机构id,作为唯一键.
                // 获取机构名称显示
                //var jigouxx = _.pluck(zuzhiqxglxx, 'jigoumc','jigoubh');
                //debugger;
                for(var i in zuzhiqxglxx){
                    $("#xinzengbmjg").append("<option value='"+zuzhiqxglxx[i]._id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");
                }

                /*添加人员列表数据*/
                // 获取机构id,作为唯一键.
                // 获取机构名称显示
                // 获取部门列表显示

                for(var i in zuzhiqxglxx){
                    $("#xinzengryjg").append("<option value='"+zuzhiqxglxx[i]._id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");
                    for(var j in zuzhiqxglxx[i].bumenxx){
                        $("#xinzengrybm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='zuzhiqxglxx"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");
                        // 初始化的时候隐藏部门
                        $('.zuzhiqxglxx'+[i]).hide();
                    }
                }

                zuzhiqxglxxLength = zuzhiqxglxx.length;

                /*// 二级联动 根据机构获取部门列表信息
                $("#xinzengryjg").change(function(){
                    for(var i =0; i < zuzhiqxglxx.length; i ++){
                        $('.zuzhiqxglxx'+index).hide();
                    }
                    var index = $(this).get(0).selectedIndex;
                    //$('.zuzhiqxglxx'+index).hide().eq(index).show();
                    $('.zuzhiqxglxx'+index).show();
                    console.log($(this).get(0).selectedIndex);
                });*/



                var fanhui_zuzhiqxglxx = new Array();
                // 组织结构信息
                for(var i in zuzhiqxglxx){
                    var obj = {};

                    obj.id = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i];
                    obj.text = zuzhiqxglxx[i].jigoumc;
                    obj.parent = '#';
                    fanhui_zuzhiqxglxx.push(obj);
                    // 部门信息
                    for(var j in zuzhiqxglxx[i].bumenxx){
                        var obj = {};
                        obj.id = zuzhiqxglxx[i].bumenxx[j].bumenbh + 'zuzhiqxglxx' + [i] + 'bumenxx' +[j];
                        obj.text = zuzhiqxglxx[i].bumenxx[j].bumenmc;
                        obj.parent = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i];
                        fanhui_zuzhiqxglxx.push(obj);

                        // 人员信息
                        for(var k in zuzhiqxglxx[i].bumenxx[j].renyuanxx){
                            var obj = {};
                            obj.id = zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].zhanghaobh + [i] + 'bumenxx' +[j] + 'renyuanxx' + [k];
                            obj.text = zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming;
                            obj.parent = zuzhiqxglxx[i].bumenxx[j].bumenbh + 'zuzhiqxglxx' + [i] + 'bumenxx' +[j];
                            fanhui_zuzhiqxglxx.push(obj);
                        }
                    }
                }

                var demo = [
                    { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
                    { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
                    { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
                    { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
                ];

                console.log(fanhui_zuzhiqxglxx);
                console.log(demo);

                $("#plugins1").jstree({
                    "checkbox" : {
                        "keep_selected_style" : false,
                        "three_state": false
                    },
                    "types" : {
                        'default' : {
                            'icon' : 'fa fa-folder'
                        },
                    },
                    "contextmenu": {
                        "items": function ($node) {
                            var tree = $("#tree").jstree(true);
                            return {
                                "Create": {
                                    "separator_before": false,
                                    "separator_after": false,
                                    "label": "新增",
                                },
                                "Edit": {
                                    "separator_before": false,
                                    "separator_after": false,
                                    "label": "编辑",
                                },
                            };
                        }
                    },

                    "plugins" : [ "checkbox","types", "contextmenu" ],
                    'core' : {
                        'data': fanhui_zuzhiqxglxx
                    }
                });
            });
        }
    })
    //树形目录
    $(document).ready(function(){


        $("#plugins2").jstree({
            "checkbox" : {
                "keep_selected_style" : false,
                "three_state": false
            },
            "types" : {
                'default' : {
                    'icon' : 'fa fa-folder'
                },
            },
            "plugins" : [ "checkbox","types" ]

        });
        $("#plugins3").jstree({
            "checkbox" : {
                "keep_selected_style" : false,
                "three_state": false
            },
            "types" : {
                'default' : {
                    'icon' : 'fa fa-folder'
                },
                'html' : {
                    'icon' : 'fa fa-file-code-o'
                },
                'svg' : {
                    'icon' : 'fa fa-file-picture-o'
                },
                'css' : {
                    'icon' : 'fa fa-file-code-o'
                },
                'img' : {
                    'icon' : 'fa fa-file-image-o'
                },
                'js' : {
                    'icon' : 'fa fa-file-text-o'
                }
            },
            "plugins" : [ "checkbox","types"]

        });

        $('.demo1').click(function () {
            swal({
                title: "确定保存?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "保存",
                closeOnConfirm: false
            }, function () {
                swal("保存成功!","success");
            });
        });

    });
});


Template.zuzhiqxgl.helpers({
    shuju_zuzhiqxglxx:function () {
        return Template.instance().zuzhiqxglxx.get();
    }
});

Template.zuzhiqxgl.events({
    // 二级联动 根据机构获取部门列表信息
    'change #xinzengryjg':function (event) {
        console.log(event);
        for(var i =0; i < zuzhiqxglxxLength; i ++){
            $('.zuzhiqxglxx'+index).hide();
        }

        var index = event.currentTarget.selectedIndex;
        //alert(event.currentTarget.selectedIndex);
        $('.zuzhiqxglxx'+index).show();
    },
    // model-新增-按钮-获取页面数据-向数据库添加数据-关闭模态框
    'click #xinzengjgan':function (event) {
        var zuzhiqxglxx = {
            jigoubh: $('#xinzengjgjgbh').val(),
            jigoumc: $('#xinzengjgjgmc').val()
        };
        console.log(zuzhiqxglxx);

        ts_gc_zuzhijg.insert(zuzhiqxglxx);
        $('#xinzengjgmodel').modal('hide');
    },
    'click #xinzengbman':function (event) {

        var bumenxx = {
            bumenbh: $('#xinzengbmbh').val(),
            bumenmc: $('#xinzengbmmc').val()
        };
        var id = $('#xinzengbmjg').val();

        // $push 向数组中添加元素
        ts_gc_zuzhijg.update({_id:id},{$push:{'bumenxx':bumenxx}});
        $('#xinzengbmmodel').modal('hide');
    },
    'click #xinzengryan':function (event) {
        var bumenxx = {
            bumenbh: $('#xinzengbmbh').val(),
            bumenmc: $('#xinzengbmmc').val()
        };
        var id = $('#xinzengbmjg').val();

        // $push 向数组中添加元素
        ts_gc_zuzhijg.update({_id:id},{$push:{'bumenxx':bumenxx}});
        $('#xinzengbmmodel').modal('hide');
    },
    'click #xinzengryan':function (event) {
        debugger;
        var renyuanxx = {
            xingming: $('#xinzengryxm').val(),
            zhanghaobh: $('#xinzengrybh').val(),
            zhanghaomc: $('#xinzengrymc').val(),
            mima: $('#xinzengrymm').val()
        };
        var id = $('#xinzengryjg').val();
        var bumenmc = $('#xinzengrybm').val();

        // $push 向数组中添加元素 TODO mongodb 更新语句
        ts_gc_zuzhijg.update({_id:id},{'bumenxx.bumenmc':bumenmc},{$push:{'bumenxx.renyuanxx':renyuanxx}});
        $('#xinzengbmmodel').modal('hide');
    },
});


Template.zuzhiqxgl.onDestroyed(function () {

});