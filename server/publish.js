/*
Meteor.startup(function () {
    Meteor.publish('zijinbofu_gongdanxx', function () {
        return tb_gc_zijinbflcxx.find({}/*,{fields:{
            'shenpidbh':true,
            'shoukuandw':true,
            'fuwulxbh':true,
            'fuwulxmc':true,
            'xiangmubh':true,
            'xiangmumc':true,
            'gongchengxz':true,
            'hetongje':true,
            'hetongqdj':true,
            'zhishangqljbfzj':true,
            'dangqiangdzt':true,
            'dangqianclzt':true,
        }});
    });
});*/

Meteor.startup(function () {
    Meteor.publish('xitongguanli_rizhixx', function () {
        return ts_gc_rizhixx.find({});
    });
    Meteor.publish('xitongguanli_mabiaoxx', function () {
        return ts_gc_mabiaoxx.find({});
    });
    // 发布-系统管理-组织机构管理
    Meteor.publish('xitongguanli_zuzhuqxgl', function () {
        return ts_gc_zuzhijg.find({});
    });
    Meteor.publish('zijinbofu_gongdanxx', function () {
        return tb_gc_zijinbflcxx.find({}/*,{fields:{
            'shenpidbh':true,
            'shoukuandw':true,
            'fuwulxbh':true,
            'fuwulxmc':true,
            'xiangmubh':true,
            'xiangmumc':true,
            'gongchengxz':true,
            'hetongje':true,
            'hetongqdj':true,
            'zhishangqljbfzj':true,
            'dangqiangdzt':true,
            'dangqianclzt':true,
        }}*/);
    });
    Meteor.publish('zijinbofu_xiangmuk', function () {
        return tb_gc_xiangmuk.find({}/*,{fields:{
            'shenpidbh':true,
            'shoukuandw':true,
            'fuwulxbh':true,
            'fuwulxmc':true,
            'xiangmubh':true,
            'xiangmumc':true,
            'gongchengxz':true,
            'hetongje':true,
            'hetongqdj':true,
            'zhishangqljbfzj':true,
            'dangqiangdzt':true,
            'dangqianclzt':true,
        }}*/);
    });
});





