
FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/denglu');
    }
});
/*项目库管理模块*/

/*工程资金拨付模块*/
FlowRouter.route('/gongchengzjbf', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'gongchengzjbf'});
    }
});
/*综合查询统计模块*/
//工程资金拨付统计
FlowRouter.route('/gongchengzjbftj', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'gongchengzjbftj'});
    }
});
//工程资金拨付明细
FlowRouter.route('/gongchengzjbfmx', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'gongchengzjbfmx'});
    }
});
//工程资金拨付汇总
FlowRouter.route('/gongchengzjbfhz', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'gongchengzjbfhz'});
    }
});
/*系统管理模块*/
//日志管理
FlowRouter.route('/rizhigl', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'rizhigl'});
    }
});
//码表管理
FlowRouter.route('/mabiaogl', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'mabiaogl'});
    }
});
//权限管理
FlowRouter.route('/zuzhiqxgl', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'zuzhiqxgl'});
    }
});

/*通用功能模块*/
FlowRouter.route('/denglu', {
    name:'denglu',
    action: function() {
        BlazeLayout.render('blankLayout', {content: 'denglu'});
    }
});
/*404页面*/
FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('blankLayout', {content: 'error404'});
    }
};
/*全局触发器*/
/*
FlowRouter.triggers.enter([function() {
    if(Session.get('user') === undefined){
        FlowRouter.go('/denglu');
    }
}], {except: ['denglu']});
*/
