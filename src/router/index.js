const routers = [
    {
        path: '/',
        meta: {
            title: '首页',
            requireAuth: true
        },
        component: resolve => require(['../components/home/index.vue'], resolve)
    },
    {
        path: '/protocol',
        meta: {
            title: '用户协议',
            requireAuth: true,
            isAuth: true
        },
        component: resolve => require(['../components/home/protocol.vue'], resolve)
    },
    {
        path: '/auth',
        meta: {
            title: '登录',
            requireAuth: true,
            isAuth: true
        },
        component: resolve => require(['../components/auth/main.vue'], resolve),
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                meta: {
                    title: '登录',
                    requireAuth: true,
                    isAuth: true
                },
                component: resolve => require(['../components/auth/login.vue'], resolve)
            },
            {
                path: 'register',
                meta: {
                    title: '注册',
                    requireAuth: true,
                    isAuth: true
                },
                component: resolve => require(['../components/auth/register.vue'], resolve)
            },
            {
                path: 'register',
                meta: {
                    title: '注册',
                    requireAuth: true,
                    isAuth: true
                },
                component: resolve => require(['../components/auth/register.vue'], resolve)
            },
            {
                path: 'findpassword',
                meta: {
                    title: '找回密码',
                    requireAuth: true,
                    isAuth: true
                },
                component: resolve => require(['../components/auth/findpassword.vue'], resolve)
            }
        ]
    },
    {
        path: '/file',
        meta: {
            title: '资料下载',
            requireAuth: true
        },
        component: resolve => require(['../components/file/main.vue'], resolve),
        redirect: '/file/list',
        children: [
            {
                path: 'list',
                meta: {
                    title: '资料列表',
                    requireAuth: true
                },
                component: resolve => require(['../components/file/list.vue'], resolve),
                redirect: '/file/list/index',
                children: [
                    {
                        path: 'index',
                        meta: {
                            title: '资料下载',
                            requireAuth: true
                        },
                        component: resolve => require(['../components/file/index.vue'], resolve)
                    },
                    {
                        path: 'search',
                        meta: {
                            title: '搜索列表',
                            requireAuth: true
                        },
                        component: resolve => require(['../components/file/search.vue'], resolve)
                    },
                    {
                        path: 'collection',
                        meta: {
                            title: '我的收藏'
                        },
                        component: resolve => require(['../components/file/collection.vue'], resolve)
                    },
                    {
                        path: 'publish',
                        meta: {
                            title: '我的发布'
                        },
                        component: resolve => require(['../components/file/publish.vue'], resolve)
                    },
                    {
                        path: 'view',
                        meta: {
                            title: '文件预览'
                        },
                        component: resolve => require(['../components/file/view.vue'], resolve)
                    }
                ]
            },
            {
                path: 'list',
                meta: {
                    title: '搜索列表',
                    requireAuth: true
                },
                component: resolve => require(['../components/file/list.vue'], resolve)
            }
        ]
    },
    {
        path: '/sass',
        //依赖部分
        component: resolve => require(['../components/sass/main.vue'], resolve),
        //默认跳转
        redirect: '/sass/expenditure/form',
        //以下部分为主页的子模块
        children: [
            {
                path: 'index',
                meta: {
                    title: '首页'
                },
                component: resolve => require(['../components/sass/index.vue'], resolve)
            },
            {
                path: 'expenditure',
                meta: {
                    title: '支出管理'
                },
                //默认跳转
                redirect: '/sass/expenditure/list',
                component: resolve => require(['../components/sass/expenditure/main.vue'], resolve),
                //以下部分为主页的子模块
                children: [
                    {
                        path: 'form',
                        meta: {
                            title: '支付报表'
                        },
                        component: resolve => require(['../components/sass/expenditure/form.vue'], resolve)
                    },
                    {
                        path: 'list',
                        meta: {
                            title: '支出列表'
                        },
                        component: resolve => require(['../components/sass/expenditure/list.vue'], resolve)
                    },
                    {
                        path: 'add',
                        meta: {
                            title: '新增支出'
                        },
                        component: resolve => require(['../components/sass/expenditure/add.vue'], resolve)
                    }
                ]
                
            },
            {
                path: '/sass/user',
                meta: {
                    title: '个人中心'
                },
                //默认跳转
                redirect: '/sass/user/set',
                component: resolve => require(['../components/sass/user/main.vue'], resolve),
                //以下部分为主页的子模块
                children: [
                    {
                        path: 'set',
                        meta: {
                            title: '个人设置'
                        },
                        component: resolve => require(['../components/sass/user/set.vue'], resolve)
                    },
                    {
                        path: 'supplier',
                        meta: {
                            title: '供应商管理'
                        },
                        component: resolve => require(['../components/sass/user/supplier.vue'], resolve)
                    },
                    {
                        path: 'department',
                        meta: {
                            title: '部门人员管理'
                        },
                        component: resolve => require(['../components/sass/user/department.vue'], resolve)
                    },
                    {
                        path: 'category',
                        meta: {
                            title: '类目管理'
                        },
                        component: resolve => require(['../components/sass/user/category.vue'], resolve)
                    }
                ]
                
            }
        ]
    }
];
export default routers;


