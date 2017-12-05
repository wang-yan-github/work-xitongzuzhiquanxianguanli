
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
                    $("#xinzengbmjg").append("<option value=''"+zuzhiqxglxx[i].id+"'>"+zuzhiqxglxx[i].jigoumc+"</option>");
                }


                var fanhui_zuzhiqxglxx = new Array();
                // 组织结构信息
                for(var i in zuzhiqxglxx){
                    var obj = {};

                    obj.id = zuzhiqxglxx[i].jigoubh + [i];
                    obj.text = zuzhiqxglxx[i].jigoumc;
                    obj.parent = '#';
                    fanhui_zuzhiqxglxx.push(obj);
                    // 部门信息
                    for(var j in zuzhiqxglxx[i].bumenxx){
                        var obj = {};
                        obj.id = zuzhiqxglxx[i].bumenxx[j].bumenbh + [i][j];
                        obj.text = zuzhiqxglxx[i].bumenxx[j].bumenmc;
                        obj.parent = zuzhiqxglxx[i].jigoubh + [i];
                        fanhui_zuzhiqxglxx.push(obj);
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
    // model-新增-按钮-获取页面数据-向数据库添加数据-关闭模态框
    'click #xinzengjgan':function (event) {
        debugger;
        var jigoubh = $('#xinzengjgjgbh').val();
        var jigoumc = $('#xinzengjgjgmc').val();

        var zuzhiqxglxx = {
            jigoubh: $('#xinzengjgjgbh').val(),
            jigoumc: $('#xinzengjgjgmc').val()
        };
        console.log(zuzhiqxglxx);

        ts_gc_zuzhijg.insert(zuzhiqxglxx);
        $('#xinzengjgmodel').modal('hide');
    },
    'click #mabiao_zhihuib':function (event) {
        Session.set('mabiaoxx',_.findWhere(Session.get('yuanshi_mabiaoxx'),{mabiaomc: "指挥部"}).mabiaoxx);
        dangqianym = '指挥部';
    },
    'click #mabiao_gongchengzt':function (event) {
        Session.set('mabiaoxx',_.findWhere(Session.get('yuanshi_mabiaoxx'),{mabiaomc: "工程状态"}).mabiaoxx);
        dangqianym = '工程状态';
    },
    'click #mabiao_xiangmufl':function (event) {
        Session.set('mabiaoxx',_.findWhere(Session.get('yuanshi_mabiaoxx'),{mabiaomc: "项目分类"}).mabiaoxx);
        dangqianym = '项目分类';
    },
    'click #mabiao_fuwulx':function (event) {
        Session.set('mabiaoxx',_.findWhere(Session.get('yuanshi_mabiaoxx'),{mabiaomc: "服务类型"}).mabiaoxx);
        dangqianym = '服务类型';
    },

    'click #xinzengbc':function (event) {
        var xinzengbh = $('#xinzengbh').val();
        var xinzengmz = $('#xinzengmz').val();
        var mabiao = _.findWhere(Session.get('yuanshi_mabiaoxx'),{mabiaomc:dangqianym});
        mabiao.mabiaoxx.push({bianhao:xinzengbh,mazhi:xinzengmz});
        Session.set('mabiaoxx',mabiao.mabiaoxx);
        ts_gc_mabiaoxx.update({_id:mabiao._id},{$set:mabiao});
        $('input').val('');
        $('#myModal').modal('hide');
    },

    'click #mazhisc':function (event) {
        var mabiao = _.findWhere(Session.get('yuanshi_mabiaoxx'),{mabiaomc:dangqianym});
        mabiao.mabiaoxx = _.without(mabiao.mabiaoxx,_.findWhere(mabiao.mabiaoxx,{bianhao:event.target.name}));
        Session.set('mabiaoxx',mabiao.mabiaoxx);
        ts_gc_mabiaoxx.update({_id:mabiao._id},{$set:mabiao});

    },

    'click #mazhibj':function (event) {
        var mabiao = _.findWhere(Session.get('yuanshi_mabiaoxx'), {mabiaomc: dangqianym});
        var dangqian = _.findWhere(mabiao.mabiaoxx,{bianhao:event.target.name});
        $('#bianjibh').val( dangqian.bianhao);
        $('#bianjimz').val( dangqian.mazhi);
        dangqianbjxb = mabiao.mabiaoxx.indexOf(dangqian);
    },

    'click #bianjibc':function (event) {
        var bianjibh = $('#bianjibh').val();
        var bianjimz = $('#bianjimz').val();
        var mabiao = _.findWhere(Session.get('yuanshi_mabiaoxx'),{mabiaomc:dangqianym});
        mabiao.mabiaoxx[dangqianbjxb].bianhao = bianjibh;
        mabiao.mabiaoxx[dangqianbjxb].mazhi = bianjimz;
        Session.set('mabiaoxx',mabiao.mabiaoxx);
        ts_gc_mabiaoxx.update({_id:mabiao._id},{$set:mabiao});
        $('#myModal1').modal('hide');
    }

});


Template.zuzhiqxgl.onDestroyed(function () {

});