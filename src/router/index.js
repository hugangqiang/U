const routers = [
    {
        path: '/login',
        meta: {
            title: '登录',
            requireAuth: true
        },
        component: resolve => require(['../components/login.vue'], resolve)
    },
    {
        path: '/',
        //依赖部分
        component: resolve => require(['../components/index.vue'], resolve),
        //默认跳转
        redirect: '/home',
        //以下部分为主页的子模块
        children: [
            {
                path: '/home',
                meta: {
                    title: '首页'
                },
                component: resolve => require(['../components/home/index.vue'], resolve)
            }
        ]
    }
];
export default routers;


