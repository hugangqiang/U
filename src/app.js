import Vue from 'vue';
import iView from 'iview';

import VueRouter from 'vue-router';
import Routers from './router/index.js';

//vuex配置文件 
import store from './vuex/store.js';

import Util from './libs/util';
import main from './components/main.vue';

import jwt from 'jsonwebtoken';
import echarts from 'echarts';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(iView);

/*axios绑定vue原型上,再vue组件中直接可以this.$ajax调用*/
Vue.prototype.$ajax = Util.ajax;
/*jwt绑定到vue原型*/
Vue.prototype.$jwt = jwt;
/*echarts绑定到vue原型*/
Vue.prototype.$echarts = echarts;



// 路由配置
const RouterConfig = {
/*    mode: 'history',*/
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    /*设置标题*/
    Util.title(to.meta.title);

    /*
    * 路由拦截
    * 需要登录,是否需要登录权限
    */
    // if(!to.matched.some(res => res.meta.requireAuth)){
    //     /*判断是否登录*/
    //     if(sessionStorage.getItem('token')){
    //         /*判断是否进入选择角色页面*/
    //         if(!to.matched.some(res => res.meta.roleAuth)){
    //             if(sessionStorage.getItem('role')){
    //                 /*没有选择角色跳到选择角色页面*/
    //                 next({
    //                     path: '/role',
    //                     query: {redirect: to.fullPath}
    //                 })
    //             }else{
    //                 next()    
    //             }
    //         }else{
    //             next()
    //         }
            
    //     }else{
    //         /*没有登录跳到登录页面*/
    //         next({
    //             path: '/login',
    //             query: {redirect: to.fullPath}
    //         })
    //     }
    // }
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(main)
});