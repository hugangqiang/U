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
import clipboard from 'clipboard';
import 'iview/dist/styles/iview.css';
import './components/style/common.css';


Vue.use(VueRouter);
Vue.use(iView);

/*axios绑定vue原型上,再vue组件中直接可以this.$ajax调用*/
Vue.prototype.$ajax = Util.ajax;
/*jwt绑定到vue原型*/
Vue.prototype.$jwt = jwt;
/*echarts绑定到vue原型*/
Vue.prototype.$echarts = echarts;
/*文字复制绑定到vue原型*/
Vue.prototype.$copy = clipboard;

/*设置获取cookie绑定到vue原型*/
function getCookie(name){
    let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
Vue.prototype.$setCookie = function(name,value){
    let Days = 30;
    document.cookie = name + "="+ escape (value) + ";" ;
}
Vue.prototype.$getCookie = function(name){
    let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
Vue.prototype.$delCookie = function(name){
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}



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
    
    if(!to.matched.some(res => res.meta.requireAuth)){
        /*判断是否登录*/
        if(getCookie("token") != null){
            next();
            return;
        }else{
            /*没有登录跳到登录页面*/
            next({
                path: '/auth/login',
                query: {redirect: to.fullPath}
            })
            return;
        }
    }
    
    if(getCookie("token")){
        if(to.matched.some(res => res.meta.isAuth)){
            /*没有登录跳到登录页面*/
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
            return;
        }
    }
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