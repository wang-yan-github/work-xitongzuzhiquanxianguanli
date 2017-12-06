Template.zuzhiqxgl.onCreated(function () {
    // 原始-组织权限管理
    this.yuanshi_zuzhiqxglxx = new ReactiveVar(0);
    // 组织权限管理
    this.zuzhiqxglxx = new ReactiveVar(0);

    handle = this.subscribe("xitongguanli_zuzhuqxgl");
    /*订阅并获取数据*/
    Tracker.autorun(function (computation) {
        if (handle.ready()){
            Session.set('zuzhiqxglxx',ts_gc_zuzhijg.find({}).fetch());
            computation.stop();
        }
    });


});

Template.zuzhiqxgl.onRendered(function () {
    Tracker.autorun(function () {
        //zuzhiqxglxx = ts_gc_zuzhijg.find({}).fetch();
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        if (handle.ready()){
            // 重新生成
            //$('#plugins1').jstree(true).refresh();
            // 销毁
            $('#plugins1').jstree("destroy");
            // 清空select 内容
            $("#xinzengbmjg").empty();
            $("#bianjijg").empty();
            $("#xinzengryjg").empty();
            $("#bianjibmjg").empty();
            $("#bianjiryjg").empty();
            $("#xinzengrybm").empty();
            $("#bianjibmbm").empty();
            $("#bianjirybm").empty();
            $("#bianjiryry").empty();

            /*document.getElementById("xinzengbmjg").options.length=0;
            document.getElementById("bianjijg").options.length=0;
            document.getElementById("xinzengryjg").options.length=0;
            document.getElementById("bianjibmjg").options.length=0;
            document.getElementById("bianjiryjg").options.length=0;
            document.getElementById("xinzengrybm").options.length=0;
            document.getElementById("bianjibmbm").options.length=0;
            document.getElementById("bianjirybm").options.length=0;
            document.getElementById("bianjiryry").options.length=0;*/

            /*添加部门列表数据*/
            // 获取机构id,作为唯一键.
            // 获取机构名称显示
            //var jigouxx = _.pluck(zuzhiqxglxx, 'jigoumc','jigoubh');
            //debugger;
            for(var i in zuzhiqxglxx){
                $("#xinzengbmjg").append("<option value='"+zuzhiqxglxx[i]._id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");
                $("#bianjijg").append("<option value='"+zuzhiqxglxx[i]._id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");
            }

            /*添加人员列表数据*/
            // 获取机构id,作为唯一键.
            // 获取机构名称显示
            // 获取部门列表显示
            for(var i in zuzhiqxglxx){
                // 新增人员
                $("#xinzengryjg").append("<option value='"+zuzhiqxglxx[i]._id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");
                // 编辑部门
                $("#bianjibmjg").append("<option value='"+zuzhiqxglxx[i]._id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");
                // 编辑人员
                $("#bianjiryjg").append("<option value='"+zuzhiqxglxx[i]._id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");

                for(var j in zuzhiqxglxx[i].bumenxx){
                    // // 新增人员
                    $("#xinzengrybm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='xinzengrybm"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");
                    // 初始化的时候隐藏部门
                    $('.xinzengrybm'+[i]).hide();

                    // 编辑部门
                    $("#bianjibmbm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='bianjibmbm"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");
                    // 初始化的时候隐藏部门
                    $('.bianjibmbm'+[i]).hide();

                    // 编辑人员
                    $("#bianjirybm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='bianjirybm"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");
                    // 初始化的时候隐藏部门
                    $('.bianjirybm'+[i]).hide();
                    for(var k in zuzhiqxglxx[i].bumenxx[j].renyuanxx){
                        $("#bianjiryry").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].zhanghaobh+"' class='bianjiryry"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming+"</option>");
                        // 初始化的时候隐藏人员
                        $('.bianjiryry'+[i]).hide();
                    }
                }
            }

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

            //console.log(fanhui_zuzhiqxglxx);
            //console.log(demo);



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
                /*"contextmenu": {
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
                },*/

                /*"plugins" : [ "checkbox","types", "contextmenu" ],*/
                'plugins' : [ 'types', 'dnd' ],
                'core' : {
                    'data': fanhui_zuzhiqxglxx
                }
            });

            Tracker.afterFlush(function () {



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

});

Template.zuzhiqxgl.events({
    // 二级联动 隐藏显示功能 取消选中功能 新增人员机构 select
    'change #xinzengryjg':function (event) {
        for(var i =0; i < Session.get('zuzhiqxglxx').length; i ++){
            $('.xinzengrybm'+[i]).hide();
        }
        $('#xinzengrybm').val('');

        var index = event.currentTarget.selectedIndex;
        $('.xinzengrybm'+index).show();
    },
    // 二级联动 隐藏显示功能 取消选中功能 编辑部门机构 select
    'change #bianjibmjg':function (event) {
        for(var i =0; i < Session.get('zuzhiqxglxx').length; i ++){
            $('.bianjibmbm'+[i]).hide();
        }
        $('#bianjibmbm').val('');

        var index = event.currentTarget.selectedIndex;
        $('.bianjibmbm'+index).show();
    },
    // 三级联动 隐藏显示功能 取消选中功能 编辑人员机构 select
    'change #bianjiryjg':function (event) {
        for(var i =0; i < Session.get('zuzhiqxglxx').length; i ++){
            $('.bianjirybm'+[i]).hide();
            $('.bianjiryry'+[i]).hide();
        }
        $('#bianjirybm').val('');
        $('#bianjiryry').val('');

        var index = event.currentTarget.selectedIndex;
        $('.bianjirybm'+index).show();
    },
    // 三级联动 隐藏显示功能 取消选中功能 编辑人员部门 select
    'change #bianjirybm':function (event) {
        for(var i =0; i < Session.get('zuzhiqxglxx').length; i ++){
            $('.bianjiryry'+[i]).hide();
        }
        $('#bianjiryry').val('');

        var index = event.currentTarget.selectedIndex;
        $('.bianjiryry'+index).show();
    },
    // model-新增-按钮-获取页面数据-向数据库添加数据-关闭模态框-新增机构
    'click #xinzengjgan':function (event) {
        var fanhui_zuzhiqxglxx = Session.get('zuzhiqxglxx');
        fanhui_zuzhiqxglxx.push({jigoubh: $('#xinzengjgjgbh').val(),jigoumc: $('#xinzengjgjgmc').val()});
        //Session.set('zuzhiqxglxx',fanhui_zuzhiqxglxx);

        ts_gc_zuzhijg.insert({jigoubh: $('#xinzengjgjgbh').val(),jigoumc: $('#xinzengjgjgmc').val()});
        Session.set('zuzhiqxglxx',ts_gc_zuzhijg.find().fetch()); // 获取ID
        $('input').val('');
        $('#xinzengjgmodel').modal('hide');
    },
    // model-新增-按钮-获取页面数据-向数据库添加数据-关闭模态框-新增部门
    'click #xinzengbman':function (event) {
        debugger;
        var bumenxx = {
            bumenbh: $('#xinzengbmbh').val(),
            bumenmc: $('#xinzengbmmc').val()
        };
        var id = $('#xinzengbmjg').val();

        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        for(var i in zuzhiqxglxx){
            if(String(zuzhiqxglxx[i]._id).indexOf(id) !=  -1){


                if(zuzhiqxglxx[i].bumenxx){
                    // 更新插入
                    var obj = new Object();
                    obj.bumenbh = $('#xinzengbmbh').val();
                    obj.bumenmc = $('#xinzengbmmc').val()
                    zuzhiqxglxx[i].bumenxx.push(obj);
                }else{
                    // 第一次新增
                    var fanhui_bumenxx = new Array();
                    var obj = new Object();
                    obj.bumenbh = $('#xinzengbmbh').val();
                    obj.bumenmc = $('#xinzengbmmc').val()
                    fanhui_bumenxx.push(obj);
                    zuzhiqxglxx[i].bumenxx = fanhui_bumenxx;

                }

            }
        }

        Session.set('zuzhiqxglxx',zuzhiqxglxx);

        // $push 向数组中添加元素
        ts_gc_zuzhijg.update({_id:id},{$push:{'bumenxx':bumenxx}});
        $('input').val('');
        $('#xinzengbmmodel').modal('hide');
    },
    // model-新增-按钮-获取页面数据-向数据库添加数据-关闭模态框-新增人员
    'click #xinzengryan':function (event) {
        var id = $('#xinzengryjg').val();
        var bumenbh = $('#xinzengrybm').val();

        debugger;
        var gengxin_zuzhiqxglxx = _.findWhere(Session.get('zuzhiqxglxx'),{_id:id});
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        for(var i in zuzhiqxglxx){
            if(String(zuzhiqxglxx[i]._id).indexOf(id) !=  -1){

                for(var j in zuzhiqxglxx[i].bumenxx){
                    if(String(zuzhiqxglxx[i].bumenxx[j].bumenbh).indexOf(bumenbh) !=  -1){
                        if(zuzhiqxglxx[i].bumenxx[j].renyuanxx){
                            // 更新插入
                            var obj = new Object();
                            obj.xingming = $('#xinzengryxm').val();
                            obj.zhanghaobh = $('#xinzengrybh').val();
                            obj.zhanghaomc = $('#xinzengrymc').val();
                            obj.mima = $('#xinzengrymm').val();
                            gengxin_zuzhiqxglxx.bumenxx[j].renyuanxx.push(obj);
                            zuzhiqxglxx[i].bumenxx[j].renyuanxx.push(obj);
                        }else{
                            // 第一次新增
                            var fanhui_bumenxx = new Array();
                            var obj = new Object();
                            obj.xingming = $('#xinzengryxm').val();
                            obj.zhanghaobh = $('#xinzengrybh').val();
                            obj.zhanghaomc = $('#xinzengrymc').val();
                            obj.mima = $('#xinzengrymm').val()
                            fanhui_bumenxx.push(obj);
                            gengxin_zuzhiqxglxx.bumenxx[j].renyuanxx = fanhui_bumenxx;
                            zuzhiqxglxx[i].bumenxx[j].renyuanxx = fanhui_bumenxx;
                        }
                    }
                }
            }
        }


        Session.set('zuzhiqxglxx',zuzhiqxglxx);

        //zuzhiqxglxx.id = id;
        // $push 向数组中添加元素
        ts_gc_zuzhijg.update({_id:gengxin_zuzhiqxglxx._id},{$set:gengxin_zuzhiqxglxx});
        //ts_gc_zuzhijg.update({$set:zuzhiqxglxx});
        //ts_gc_zuzhijg.save({$set:zuzhiqxglxx});
        //ts_gc_zuzhijg.insert({$set:zuzhiqxglxx});
        $('input').val('');
        $('#xinzengrmmodel').modal('hide');
    },
    // model-编辑-按钮-获取页面数据-向数据库添加数据-关闭模态框-编辑机构
    'click #bianjijgan':function (event) {
        debugger;
        var jigoubh = $('#bianjijgjgbh').val();
        var jigoumc = $('#bianjijgmc').val();

        var where_id = $('#bianjijg').val();

        var gengxin_zuzhiqxglxx = _.findWhere(Session.get('zuzhiqxglxx'),{_id:where_id});
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        for(var i in zuzhiqxglxx){
            if(String(zuzhiqxglxx[i]._id).indexOf(where_id) !=  -1){

                zuzhiqxglxx[i].jigoubh = jigoubh;
                zuzhiqxglxx[i].jigoumc = jigoumc;
                gengxin_zuzhiqxglxx.jigoubh = jigoubh;
                gengxin_zuzhiqxglxx.jigoumc = jigoumc;

            }
        }

        $('input').val('');
        Session.set('zuzhiqxglxx',zuzhiqxglxx);
        ts_gc_zuzhijg.update({_id:gengxin_zuzhiqxglxx._id},{$set:gengxin_zuzhiqxglxx});
        $('#bianjijgmodel').modal('hide');
    },
    // model-编辑-按钮-获取页面数据-向数据库添加数据-关闭模态框-编辑部门
    'click #bianjibman':function (event) {
        debugger;
        var jigoubh = $('#bianjijgjgbh').val();
        var jiegoumc = $('#bianjijgmc').val();

        var where_id = $('#bianjijg').val();

        var gengxin_zuzhiqxglxx = _.findWhere(Session.get('zuzhiqxglxx'),{_id:where_id});
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        for(var i in zuzhiqxglxx){
            if(String(zuzhiqxglxx[i]._id).indexOf(where_id) !=  -1){


                if(zuzhiqxglxx[i].bumenxx){
                    // 更新插入
                    var obj = new Object();
                    obj.bumenbh = $('#xinzengbmbh').val();
                    obj.bumenmc = $('#xinzengbmmc').val()
                    zuzhiqxglxx[i].bumenxx.push(obj);
                }else{
                    // 第一次新增
                    var fanhui_bumenxx = new Array();
                    var obj = new Object();
                    obj.bumenbh = $('#xinzengbmbh').val();
                    obj.bumenmc = $('#xinzengbmmc').val()
                    fanhui_bumenxx.push(obj);
                    zuzhiqxglxx[i].bumenxx = fanhui_bumenxx;

                }

            }
        }

        //TODO mongodb 更新语句
        //ts_gc_zuzhijg.update({_id:id},{$set:{'jigoubh':jigoubh,'jigoumc':jigoumc}});
        $('#bianjijgmodel').modal('hide');
    },
    'click #bianjiryman':function (event) {
        debugger;
        var xingming = $('#bianjiryxm').val();
        var zhanghaobh = $('#bianjirybh').val();
        var zhanghaomc = $('#bianjirymc').val();
        var mima = $('#bianjirymm').val()

        var where_id = $('#bianjiryjg').val();
        var where_bumenmc = $('#bianjirybm').val();
        var where_xingming = $('#bianjiryry').val();

        //TODO mongodb 更新语句
        //ts_gc_zuzhijg.update({_id:id},{$set:{'jigoubh':jigoubh,'jigoumc':jigoumc}});
        $('#bianjirymodel').modal('hide');
    },
});


Template.zuzhiqxgl.onDestroyed(function () {

});