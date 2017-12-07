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
            },
            {
                path: '/expenditure',
                meta: {
                    title: '支出管理'
                },
                //默认跳转
                redirect: '/expenditure/list',
                component: resolve => require(['../components/expenditure/index.vue'], resolve),
                //以下部分为主页的子模块
                children: [
                    {
                        path: 'form',
                        meta: {
                            title: '支付报表'
                        },
                        component: resolve => require(['../components/expenditure/form.vue'], resolve)
                    },
                    {
                        path: 'list',
                        meta: {
                            title: '支出列表'
                        },
                        component: resolve => require(['../components/expenditure/list.vue'], resolve)
                    },
                    {
                        path: 'add',
                        meta: {
                            title: '新增支出'
                        },
                        component: resolve => require(['../components/expenditure/add.vue'], resolve)
                    }
                ]
                
            },
            {
                path: '/user',
                meta: {
                    title: '个人中心'
                },
                //默认跳转
                redirect: '/user/set',
                component: resolve => require(['../components/user/index.vue'], resolve),
                //以下部分为主页的子模块
                children: [
                    {
                        path: 'set',
                        meta: {
                            title: '个人设置'
                        },
                        component: resolve => require(['../components/user/set.vue'], resolve)
                    },
                    {
                        path: 'supplier',
                        meta: {
                            title: '供应商管理'
                        },
                        component: resolve => require(['../components/user/supplier.vue'], resolve)
                    },
                    {
                        path: 'department',
                        meta: {
                            title: '部门人员管理'
                        },
                        component: resolve => require(['../components/user/department.vue'], resolve)
                    },
                    {
                        path: 'category',
                        meta: {
                            title: '类目管理'
                        },
                        component: resolve => require(['../components/user/category.vue'], resolve)
                    }
                ]
                
            }
        ]
    }
];
export default routers;


