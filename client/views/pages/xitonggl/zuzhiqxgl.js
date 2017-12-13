Template.zuzhiqxgl.onCreated(function () {
    // 原始-组织权限管理
    this.yuanshi_zuzhiqxglxx = new ReactiveVar(0);
    // 组织权限管理
    this.zuzhiqxglxx = new ReactiveVar(0);

    handle_mabiaoxx = this.subscribe("xitongguanli_mabiaoxx");
    handle = this.subscribe("xitongguanli_zuzhuqxgl");
    /*订阅并获取数据*/
    Tracker.autorun(function (computation) {
        if (handle.ready()){
            Session.set('zuzhiqxglxx',ts_gc_zuzhijg.find({}).fetch());
            Session.set('yuanshi_mabiaoxx',ts_gc_mabiaoxx.find({}).fetch());
            Session.set('mabiaoxx',_.findWhere(ts_gc_mabiaoxx.find({}).fetch(),{'mabiaomc': '项目分类'}).mabiaoxx);
            computation.stop();
        }
    });


});

Template.zuzhiqxgl.onRendered(function () {
    Tracker.autorun(function () {
        //zuzhiqxglxx = ts_gc_zuzhijg.find({}).fetch();
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        var mabiaoxx = Session.get('mabiaoxx');

        if (handle.ready()){

            var xiangmuflhtml = '';
            for(var i in mabiaoxx){
                xiangmuflhtml += '<div class="i-checks"><label> <input type="checkbox" name="cbox" value="'+mabiaoxx[i].mazhi+'"> <i></i> ' + mabiaoxx[i].mazhi + ' </label></div>';
            }

            document.getElementById("xiangmufl").innerHTML= xiangmuflhtml;

            // Initialize i-check plugin
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green'
            });
            
            // 重新生成
            //$('#plugins1').jstree(true).refresh();
            // 销毁
            $('#plugins1').jstree("destroy");
            $('#plugins2').jstree("destroy");
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
                    $('.xinzengrybm0').show();

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

                    // 新增角色-归属部门
                    $("#xinzengjsbm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='xinzengjsbm"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");
                    // 新增账号-归属部门
                    $("#xinzengzhbm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='xinzengzhbm"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");
                    // 编辑角色-归属部门
                    $("#bianjijsbm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='bianjijsbm"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");
                    // 编辑账号-归属部门
                    $("#bianjizhbm").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].bumenbh+"' class='bianjizhbm"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].bumenmc+"</option>");

                    for(var k in zuzhiqxglxx[i].bumenxx[j].juesexx){
                        // 新增账号-归属角色
                        $("#xinzengzhjs").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].zhanghaobh+"' class='xinzengzhjs"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming+"</option>");
                        // 编辑角色-编辑角色
                        $("#bianjijsjs").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].zhanghaobh+"' class='bianjijsjs"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming+"</option>");
                        // 编辑账号-归属角色
                        $("#biajizhjs").append("<option value='"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].zhanghaobh+"' class='biajizhjs"+[i]+"'>"+zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming+"</option>");

                        // 初始化的时候隐藏
                        $('.xinzengzhjs'+[i]).hide();
                        $('.bianjijsjs'+[i]).hide();
                        $('.biajizhjs'+[i]).hide();

                    }
                }
            }

            var fanhui_zuzhiqxglxx = new Array();
            var fanhui_jiaosexx = new Array();
            // 组织结构信息
            for(var i in zuzhiqxglxx){
                var obj = {};

                obj.id = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']';
                obj.text = zuzhiqxglxx[i].jigoumc;

                obj.parent = '#';
                fanhui_zuzhiqxglxx.push(obj);
                // 部门信息
                for(var j in zuzhiqxglxx[i].bumenxx){
                    var obj = {};
                    obj.id = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']';
                    obj.text = zuzhiqxglxx[i].bumenxx[j].bumenmc;
                    obj.parent = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']';
                    fanhui_zuzhiqxglxx.push(obj);

                    // 人员信息
                    for(var k in zuzhiqxglxx[i].bumenxx[j].renyuanxx){
                        var obj = {};
                        obj.id = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']' + 'renyuanxx' + [k] + '[' + k + ']';
                        obj.text = zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming;
                        obj.parent = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']';
                        fanhui_zuzhiqxglxx.push(obj);
                    }

                    // 角色部门信息
                    var obj = {};
                    obj.id = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']';
                    obj.text = zuzhiqxglxx[i].bumenxx[j].bumenmc;
                    obj.parent = '#';
                    fanhui_jiaosexx.push(obj);
                    // 角色信息
                    for(var k in zuzhiqxglxx[i].bumenxx[j].juesexx){
                        var obj = {};
                        obj.id = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']' + 'juesexx' + [k] + '[' + k + ']';
                        obj.text = zuzhiqxglxx[i].bumenxx[j].juesexx[k].juesemc;
                        obj.parent = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']';
                        fanhui_jiaosexx.push(obj);

                        // 账号信息
                        for(var l in zuzhiqxglxx[i].bumenxx[j].juesexx[k].zhanghaoxx){
                            var obj = {};
                            obj.id = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']' + 'juesexx' + [k] + '[' + k + ']' + 'zhanghaoxx' + [l] + '[' + [l] + ']';
                            obj.text = zuzhiqxglxx[i].bumenxx[j].juesexx[k].zhanghaoxx[l].zhanghaomc;
                            obj.parent = zuzhiqxglxx[i].jigoubh + 'zuzhiqxglxx' + [i] + '[' +zuzhiqxglxx[i]._id + ']' + [i] + 'bumenxx' +[j] + '[' + j + ']' + 'juesexx' + [k] + '[' + k + ']';
                            fanhui_jiaosexx.push(obj);
                        }
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
                "contextmenu": {
                    "items": function ($node) {
                        var tree = $("#tree").jstree(true);
                        return {
                            "Edit": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "编辑",
                                "action": function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);

                                    /*var d = "1[ddd]sfdsaf[ccc]fdsaf[bbbb]";
                                    var patt = /\[[^\]]+\]/g;
                                    d.match(patt)
                                    //返回数组 ["[ddd]", "[ccc]", "[bbbb]"]
                                    //如果你想得到["ddd","ccc","bbbb"]请循环数组每一项再替换 .replace(/\[/g,'').replace(/\]/g,'')*/
                                    var index = 0;
                                    var patt = /\[[^\]]+\]/g;
                                    var Identification = obj.id.match(patt);

                                    for(var i in Identification){
                                        Identification[i] = Identification[i].replace(/\[/g,'').replace(/\]/g,'');
                                    }

                                    if(Identification.length == 1){
                                        index = 1;
                                    }
                                    if(Identification.length == 2){
                                        index = 2;
                                    }
                                    if(Identification.length == 3){
                                        index = 3;
                                    }

                                    // 需要编辑的内容
                                    var bianjinr;

                                    // 编辑机构
                                    if(index == 1){
                                        var id = Identification[0];
                                        var bianjinr = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                                        // 手动打开模态框,将数据传到模态框内
                                        $('#bianjijgmodel').modal('show');
                                        $('#bianjijg').val(bianjinr._id);
                                        $('#bianjijgjgbh').val(bianjinr.jigoubh);
                                        $('#bianjijgjgmc').val(bianjinr.jigoumc);
                                    }

                                    // 编辑部门
                                    if(index == 2){
                                        var id = Identification[0];
                                        var bumenIndex = Identification[1];
                                        var bianjinr = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                                        // 手动打开模态框,将数据传到模态框内
                                        $('#bianjibmmodel').modal('show');
                                        $('#bianjibmjg').val(bianjinr._id);
                                        $('#bianjibmbm').val(bumenIndex);
                                        $('#bianjibmbmbh').val(bianjinr.bumenxx[bumenIndex].bumenbh);
                                        $('#bianjibmbmmc').val(bianjinr.bumenxx[bumenIndex].bumenmc);
                                    }

                                    // 编辑人员
                                    if(index == 3){
                                        var id = Identification[0];
                                        var bumenIndex = Identification[1];
                                        var renyuanIndex = Identification[2];
                                        var bianjinr = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                                        // 手动打开模态框,将数据传到模态框内
                                        $('#bianjirymodel').modal('show');
                                        $('#bianjiryjg').val(bianjinr._id);
                                        $('#bianjirybm').val(bumenIndex);
                                        $('#bianjiryry').val(renyuanIndex);
                                        $('#bianjiryxm').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].xingming);
                                        $("#bianjiryzhlx").find("option[value='"+bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].zhanghaolx+"']").attr("selected",true);
                                        $('#bianjirybh').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].zhanghaobh);
                                        $('#bianjirymc').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].zhanghaomc);
                                        $('#bianjirymm').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].mima);
                                    }

                                    /*console.log(bianjinr);
                                    console.table(Identification);
                                    console.table(obj);*/
                                    inst.edit(obj);
                                }
                            },
                            "delete": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "删除",
                                "action": function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);

                                    var index = 0;
                                    var patt = /\[[^\]]+\]/g;
                                    var Identification = obj.id.match(patt);

                                    for(var i in Identification){
                                        Identification[i] = Identification[i].replace(/\[/g,'').replace(/\]/g,'');
                                    }

                                    if(Identification.length == 1){
                                        index = 1;
                                    }
                                    if(Identification.length == 2){
                                        index = 2;
                                    }
                                    if(Identification.length == 3){
                                        index = 3;
                                    }

                                    // 删除机构
                                    if(index == 1){
                                        var id = Identification[0];
                                        var zuzhiqxglxx = Session.get('zuzhiqxglxx');

                                        for(var i in zuzhiqxglxx){
                                            if(String(zuzhiqxglxx[i]._id).indexOf(id) !=  -1){
                                                zuzhiqxglxx.splice(i,1);
                                            }
                                        }

                                        Session.set('zuzhiqxglxx',zuzhiqxglxx);
                                        ts_gc_zuzhijg.remove({_id:id});
                                    }

                                    // 编辑删除部门
                                    if(index == 2){
                                        var id = Identification[0];
                                        var bumenIndex = Identification[1];
                                        var bianjinr = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                                        var zuzhiqxglxx = Session.get('zuzhiqxglxx');

                                        for(var i in zuzhiqxglxx){
                                            if(String(zuzhiqxglxx[i]._id).indexOf(id) !=  -1){
                                                zuzhiqxglxx[i].bumenxx.splice(bumenIndex,1);
                                                bianjinr.bumenxx.splice(bumenIndex,1);
                                            }
                                        }

                                        Session.set('zuzhiqxglxx',zuzhiqxglxx);
                                        ts_gc_zuzhijg.update({_id:bianjinr._id},{$set:bianjinr});
                                    }

                                    // 编辑删除人员
                                    if(index == 3){
                                        var id = Identification[0];
                                        var bumenIndex = Identification[1];
                                        var renyuanIndex = Identification[2];
                                        var bianjinr = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                                        var zuzhiqxglxx = Session.get('zuzhiqxglxx');

                                        for(var i in zuzhiqxglxx){
                                            if(String(zuzhiqxglxx[i]._id).indexOf(id) !=  -1){
                                                zuzhiqxglxx[i].bumenxx[bumenIndex].renyuanxx.splice(renyuanIndex,1);
                                                bianjinr.bumenxx[bumenIndex].renyuanxx.splice(renyuanIndex,1);
                                            }
                                        }

                                        Session.set('zuzhiqxglxx',zuzhiqxglxx);
                                        ts_gc_zuzhijg.update({_id:bianjinr._id},{$set:bianjinr});
                                    }

                                    inst.edit(obj);
                                }
                            },
                        };
                    }
                },
                "plugins" : ["types", "contextmenu" ],
                /*'plugins' : [ 'types', 'dnd' ],*/
                'core' : {
                    'data': fanhui_zuzhiqxglxx
                }
            });

            // jsTree 点击节点事件
            $('#plugins1').bind("activate_node.jstree", function (obj, e) {
                // 获取当前节点
                var currentNode = e.node;

                var index = 0;
                var patt = /\[[^\]]+\]/g;
                var Identification = currentNode.id.match(patt);
                var zuzhiqxglxx = Session.get('zuzhiqxglxx');

                for(var i in Identification){
                    Identification[i] = Identification[i].replace(/\[/g,'').replace(/\]/g,'');
                }

                if(Identification.length == 3){
                    index = 3;
                }

                // 人员权限信息详情
                if(index == 3){
                    var id = Identification[0];
                    var bumenIndex = Identification[1];
                    var renyuanIndex = Identification[2];
                    var zuzhiqxglxx = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                    var xiangmuflhtml = '';
                    var mabiaombxxbh = new Array();

                    // 标题姓名
                    document.getElementById("xingmingtitle").innerHTML= zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].xingming;
                    // 有权限信息数组
                    if(zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx){
                        // 清空
                        document.getElementById("xiangmufl").innerHTML= '';


                        // 循环权限信息
                        // 判断是否有权限
                        // 设置前端页面 checkbox 选中
                        debugger;
                        for(var i in mabiaoxx){

                            var flag = false; // 开关
                            for(var j in zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx){

                                if(zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx[j].quanxianzt == 1){

                                    if(mabiaoxx[i].mazhi == zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx[j].quanxianmc){
                                        flag = true;
                                    }
                                }
                            }

                            if(flag){
                                mabiaombxxbh.push(mabiaoxx[i].bianhao);
                                xiangmuflhtml += '<div class="i-checks"><label> <input type="checkbox" name="cbox" value="'+mabiaoxx[i].mazhi+'" checked=""> <i></i> ' + mabiaoxx[i].mazhi + ' </label></div>';
                            }else{
                                mabiaombxxbh.push(mabiaoxx[i].bianhao);
                                xiangmuflhtml += '<div class="i-checks"><label> <input type="checkbox" name="cbox" value="'+mabiaoxx[i].mazhi+'"> <i></i> ' + mabiaoxx[i].mazhi + ' </label></div>';
                            }

                        }

                        // 人员权限信息保存修改定位-权限id-部门数组下标-人员数据下标
                        xiangmuflhtml += '<input type="hidden" id="Identification" value="'+Identification+'">';
                        // 码表编号
                        xiangmuflhtml += '<input type="hidden" id="mabiaombxxbh" value="'+mabiaombxxbh+'">';

                        document.getElementById("xiangmufl").innerHTML= xiangmuflhtml;
                        // 重新初始化 checkbox
                        $('.i-checks').iCheck({
                            checkboxClass: 'icheckbox_square-green',
                            radioClass: 'iradio_square-green'
                        });
                    }else{
                        for(var i in mabiaoxx){
                            mabiaombxxbh.push(mabiaoxx[i].bianhao);
                            xiangmuflhtml += '<div class="i-checks"><label> <input type="checkbox" name="cbox" value="'+mabiaoxx[i].mazhi+'"> <i></i> ' + mabiaoxx[i].mazhi + ' </label></div>';
                        }

                        // 人员权限信息保存修改定位-权限id-部门数组下标-人员数据下标
                        xiangmuflhtml += '<input type="hidden" id="Identification" value="'+Identification+'">';
                        // 码表编号
                        xiangmuflhtml += '<input type="hidden" id="mabiaombxxbh" value="'+mabiaombxxbh+'">';
                        document.getElementById("xiangmufl").innerHTML= xiangmuflhtml;
                        // 重新初始化 checkbox
                        $('.i-checks').iCheck({
                            checkboxClass: 'icheckbox_square-green',
                            radioClass: 'iradio_square-green'
                        });
                    }

                }

            });

            /*$("#plugins2").jstree({
                "checkbox" : {
                    "keep_selected_style" : false,
                    "three_state": false
                },
                "types" : {
                    'default' : {
                        'icon' : 'fa fa-folder'
                    },
                },
                /!*"plugins" : [ "checkbox","types" ]*!/
                "contextmenu": {
                    "items": function ($node) {
                        var tree = $("#tree").jstree(true);
                        return {
                            "Edit": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "编辑",
                                "action": function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);

                                    /!*var d = "1[ddd]sfdsaf[ccc]fdsaf[bbbb]";
                                    var patt = /\[[^\]]+\]/g;
                                    d.match(patt)
                                    //返回数组 ["[ddd]", "[ccc]", "[bbbb]"]
                                    //如果你想得到["ddd","ccc","bbbb"]请循环数组每一项再替换 .replace(/\[/g,'').replace(/\]/g,'')*!/
                                    var index = 0;
                                    var patt = /\[[^\]]+\]/g;
                                    var Identification = obj.id.match(patt);
                                    var zuzhiqxglxx = Session.get('zuzhiqxglxx');

                                    for(var i in Identification){
                                        Identification[i] = Identification[i].replace(/\[/g,'').replace(/\]/g,'');
                                    }

                                    if(Identification.length == 2){
                                        index = 1; // 编辑部门
                                    }
                                    if(Identification.length == 3){
                                        index = 2; // 编辑角色
                                    }
                                    if(Identification.length == 4){
                                        index = 3; // 编辑账号
                                    }

                                    // 需要编辑的内容
                                    var bianjinr;

                                    // 编辑部门
                                    if(index == 1){
                                        var id = Identification[0];
                                        var bumenIndex = Identification[1];
                                        var bianjinr = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                                        // 手动打开模态框,将数据传到模态框内
                                        $('#bianjijsbmbmmodel').modal('show');
                                        $('#bianjijsbmjg').val(bianjinr._id);
                                        $('#bianjijsbmbm').val(bumenIndex);
                                        $('#bianjijsbmbmbh').val(bianjinr.bumenxx[bumenIndex].bumenbh);
                                        $('#bianjijsbmbmmc').val(bianjinr.bumenxx[bumenIndex].bumenmc);
                                    }

                                    // 编辑人员
                                    if(index == 6){
                                        var id = Identification[0];
                                        var bumenIndex = Identification[1];
                                        var renyuanIndex = Identification[2];
                                        var bianjinr = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});
                                        // 手动打开模态框,将数据传到模态框内
                                        $('#bianjirymodel').modal('show');
                                        $('#bianjiryjg').val(bianjinr._id);
                                        $('#bianjirybm').val(bumenIndex);
                                        $('#bianjiryry').val(renyuanIndex);
                                        $('#bianjiryxm').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].xingming);
                                        $('#bianjirybh').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].zhanghaobh);
                                        $('#bianjirymc').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].zhanghaomc);
                                        $('#bianjirymm').val(bianjinr.bumenxx[bumenIndex].renyuanxx[renyuanIndex].mima);
                                    }

                                    /!*console.log(bianjinr);
                                    console.table(Identification);
                                    console.table(obj);*!/
                                    inst.edit(obj);
                                }
                            },
                        };
                    }
                },
                "plugins" : ["types", "contextmenu" ],
                'core' : {
                    'data': fanhui_jiaosexx
                }
            });*/

        }
    })
    //树形目录
    $(document).ready(function(){

        /*$("#plugins3").jstree({
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
        });*/

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
        //$('#bianjiryry').val('');

        var index = event.currentTarget.selectedIndex;
        $('.bianjiryry'+index).show();
    },
    // model-新增-按钮-获取页面数据-向数据库添加数据-关闭模态框-新增机构
    'click #xinzengjgan':function (event) {
        var fanhui_zuzhiqxglxx = Session.get('zuzhiqxglxx');
        fanhui_zuzhiqxglxx.push({jigoubh: $('#xinzengjgjgbh').val(),jigoumc: $('#xinzengjgjgmc').val()});

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
                            obj.zhanghaolx = $('#xinzengryzhlx').val();
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
                            obj.zhanghaolx = $('#xinzengryzhlx').val();
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
        var jigoumc = $('#bianjijgjgmc').val();

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
        var bumenbh = $('#bianjibmbmbh').val();
        var bumenmc = $('#bianjibmbmmc').val();

        var where_id = $('#bianjibmjg').val();
        var where_bumenbh = $('#bianjibmbm').val();

        var gengxin_zuzhiqxglxx = _.findWhere(Session.get('zuzhiqxglxx'),{_id:where_id});
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        for(var i in zuzhiqxglxx){
            if(String(zuzhiqxglxx[i]._id).indexOf(where_id) !=  -1){

                zuzhiqxglxx[i].bumenxx[where_bumenbh].bumenbh = bumenbh;
                zuzhiqxglxx[i].bumenxx[where_bumenbh].bumenmc = bumenmc;
                gengxin_zuzhiqxglxx.bumenxx[where_bumenbh].bumenbh = bumenbh;
                gengxin_zuzhiqxglxx.bumenxx[where_bumenbh].bumenmc = bumenmc;

                /*for(var j in zuzhiqxglxx[i].bumenxx){
                    if(String(zuzhiqxglxx[i].bumenxx[j].bumenbh).indexOf(where_bumenbh) !=  -1){

                        zuzhiqxglxx[i].bumenxx[j].bumenbh = bumenbh;
                        zuzhiqxglxx[i].bumenxx[j].bumenmc = bumenmc;
                        gengxin_zuzhiqxglxx.bumenxx[j].bumenbh = bumenbh;
                        gengxin_zuzhiqxglxx.bumenxx[j].bumenmc = bumenmc;

                    }
                }*/

            }
        }

        $('input').val('');
        Session.set('zuzhiqxglxx',zuzhiqxglxx);
        ts_gc_zuzhijg.update({_id:gengxin_zuzhiqxglxx._id},{$set:gengxin_zuzhiqxglxx});
        $('#bianjibmmodel').modal('hide');
    },
    // model-编辑-按钮-获取页面数据-向数据库添加数据-关闭模态框-编辑人员
    'click #bianjiryman':function (event) {
        debugger;

        var where_id = $('#bianjiryjg').val();
        var where_bumen = $('#bianjirybm').val();
        var where_renyuan = $('#bianjiryry').val();

        var gengxin_zuzhiqxglxx = _.findWhere(Session.get('zuzhiqxglxx'),{_id:where_id});
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');
        for(var i in zuzhiqxglxx){
            if(String(zuzhiqxglxx[i]._id).indexOf(where_id) !=  -1){

                zuzhiqxglxx[i].bumenxx[where_bumen].renyuanxx[where_renyuan].xingming = $('#bianjiryxm').val();
                zuzhiqxglxx[i].bumenxx[where_bumen].renyuanxx[where_renyuan].zhanghaolx = $('#bianjiryzhlx').val();
                zuzhiqxglxx[i].bumenxx[where_bumen].renyuanxx[where_renyuan].zhanghaobh = $('#bianjirybh').val();
                zuzhiqxglxx[i].bumenxx[where_bumen].renyuanxx[where_renyuan].zhanghaomc = $('#bianjirymc').val();
                zuzhiqxglxx[i].bumenxx[where_bumen].renyuanxx[where_renyuan].mima = $('#bianjirymm').val();

                gengxin_zuzhiqxglxx.bumenxx[where_bumen].renyuanxx[where_renyuan].xingming = $('#bianjiryxm').val();
                gengxin_zuzhiqxglxx.bumenxx[where_bumen].renyuanxx[where_renyuan].zhanghaolx = $('#bianjiryzhlx').val();
                gengxin_zuzhiqxglxx.bumenxx[where_bumen].renyuanxx[where_renyuan].zhanghaobh = $('#bianjirybh').val();
                gengxin_zuzhiqxglxx.bumenxx[where_bumen].renyuanxx[where_renyuan].zhanghaomc = $('#bianjirymc').val();
                gengxin_zuzhiqxglxx.bumenxx[where_bumen].renyuanxx[where_renyuan].mima = $('#bianjirymm').val();

                /*for(var j in zuzhiqxglxx[i].bumenxx){
                    if(String(zuzhiqxglxx[i].bumenxx[j].bumenbh).indexOf(where_bumen) !=  -1){

                        for(var k in zuzhiqxglxx[i].bumenxx[j].renyuanxx){
                            if(String(zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming).indexOf(where_renyuan) != -1){

                                zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].xingming = $('#bianjiryxm').val();
                                zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].zhanghaobh = $('#bianjirybh').val();
                                zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].zhanghaomc = $('#bianjirymc').val();
                                zuzhiqxglxx[i].bumenxx[j].renyuanxx[k].mima = $('#bianjirymm').val();

                                gengxin_zuzhiqxglxx.bumenxx[j].renyuanxx[k].xingming = $('#bianjiryxm').val();
                                gengxin_zuzhiqxglxx.bumenxx[j].renyuanxx[k].zhanghaobh = $('#bianjirybh').val();
                                gengxin_zuzhiqxglxx.bumenxx[j].renyuanxx[k].zhanghaomc = $('#bianjirymc').val();
                                gengxin_zuzhiqxglxx.bumenxx[j].renyuanxx[k].mima = $('#bianjirymm').val();
                            }
                        }

                    }
                }*/
            }
        }

        $('input').val('');
        Session.set('zuzhiqxglxx',zuzhiqxglxx);
        ts_gc_zuzhijg.update({_id:gengxin_zuzhiqxglxx._id},{$set:gengxin_zuzhiqxglxx});
        $('#bianjirymodel').modal('hide');
    },
    // model-新增-按钮-获取页面数据-向数据库添加数据-关闭模态框-新增角色
    'click #xinzengjsan':function (event) {
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');

        //$('input').val('');
        //Session.set('zuzhiqxglxx',zuzhiqxglxx);
        //ts_gc_zuzhijg.update({_id:gengxin_zuzhiqxglxx._id},{$set:gengxin_zuzhiqxglxx});
        $('#xinzengjsmodel').modal('hide');
    },
    // 权限信息按钮-可以实现权保存/修改功能
    // 获取checkbox 选中内容 
    'click #quanxianxxan':function (event) {
        var zuzhiqxglxx = Session.get('zuzhiqxglxx');

        var checkboxValue= new Array();
        var checkboxText= new Array();
        var checkboxStr=document.getElementsByName("cbox");
        for(var i=0; i<checkboxStr.length; i++){
            if(checkboxStr[i].checked){
                //alert(checkboxStr[i].value+","+checkboxStr[i].nextSibling.nodeValue);
                checkboxValue.push(checkboxStr[i].value);
                checkboxText.push(checkboxStr[i].nextSibling.nodeValue);
            }
        }
        //输出值和文本
        //alert("checkboxValue:"+checkboxValue);
        //alert("checkboxText:"+checkboxText);
        //把获得的数据转换为字符串传递到后台
        //checkboxValue=checkboxValue.toString();
        //checkboxText=checkboxText.toString();

        var Identification = $('#Identification').val().split(",");
        var mabiaombxxbh = $('#mabiaombxxbh').val().split(",");
        console.log(mabiaombxxbh);
        var id = Identification[0];
        var bumenIndex = Identification[1];
        var renyuanIndex = Identification[2];
        var fanhui_zuzhiqxglxx = _.findWhere(Session.get('zuzhiqxglxx'),{_id:Identification[0]});

        //清空数组
        if(fanhui_zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx){
            fanhui_zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx.length = 0;
        }

        debugger;
        // Session 响应式
        for(var i in zuzhiqxglxx){
            if(String(zuzhiqxglxx[i]._id).indexOf(id) !=  -1){

                //清空数组
                if(zuzhiqxglxx[i].bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx){
                    zuzhiqxglxx[i].bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx.length = 0;
                }

                for(var j in checkboxValue){

                    if(fanhui_zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx){
                        //
                        // 编辑
                        var obj = new Object();
                        obj.quanxianzt = '1';
                        obj.quanxianmc = checkboxValue[j];
                        obj.quanxianbh = mabiaombxxbh[j];
                        fanhui_zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx.push(obj);
                        zuzhiqxglxx[i].bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx.push(obj);
                    }else{
                        // 第一次新增
                        var fanhui_quanxianxx = new Array();
                        var obj = new Object();
                        obj.quanxianzt = '1';
                        obj.quanxianmc = checkboxValue[j];
                        obj.quanxianbh = mabiaombxxbh[j];
                        fanhui_quanxianxx.push(obj);
                        fanhui_zuzhiqxglxx.bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx = fanhui_quanxianxx;
                        zuzhiqxglxx[i].bumenxx[bumenIndex].renyuanxx[renyuanIndex].quanxianxx = fanhui_quanxianxx;
                    }
                }
            }
        }

        // 清空人员姓名标题
        $('#xingmingtitle').empty();
        Session.set('zuzhiqxglxx',zuzhiqxglxx)
        ts_gc_zuzhijg.update({_id:fanhui_zuzhiqxglxx._id},{$set:fanhui_zuzhiqxglxx});
    },


});


Template.zuzhiqxgl.onDestroyed(function () {

});