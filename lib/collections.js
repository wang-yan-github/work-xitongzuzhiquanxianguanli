//业务表-项目库
tb_gc_xiangmuk = new Mongo.Collection('tb_gc_xiangmuk');
//业务表-文件库
tb_gc_wenjiank = new Mongo.Collection('tb_gc_wenjiank');
//业务表-资金拨付流程信息
tb_gc_zijinbflcxx = new Mongo.Collection('tb_gc_zijinbflcxx');
tb_gc_zijinbflcxx.allow({
    insert: function() {
        return true;
    },
    update: function () {
        return true;
    }
});
//系统表-组织结构
ts_gc_zuzhijg = new Mongo.Collection('ts_gc_zuzhijg');
ts_gc_zuzhijg.allow({
    insert: function() {
        return true;
    },
    update: function () {
        return true;
    },
    delete: function () {
        return true;
    },
});
//系统表-角色权限信息
ts_gc_jiaoseqxxx = new Mongo.Collection('ts_gc_jiaoseqxxx');
//系统表-日志信息
ts_gc_rizhixx = new Mongo.Collection('ts_gc_rizhixx');
//系统表-即时通讯
ts_gc_jishitx = new Mongo.Collection('ts_gc_jishitx');
//系统表-码表
ts_gc_mabiaoxx = new Mongo.Collection('ts_gc_mabiaoxx');
ts_gc_mabiaoxx.allow({
    update: function () {
        return true;
    }
});