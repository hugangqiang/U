<template>
    <div>
        <div class="u-layout">
            <div class="u-layout-left">
                <router-link to="/">
                    <div class="logo">
                        <img src="./images/logo.png" alt="">                    
                    </div>
                </router-link>
                <div class="u-left-menu">
                    <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
                        <Submenu v-for="(items,indexs) in menus" :key="items.id" :name="indexs+1">
                            <template slot="title">
                                <Icon :type="items.icon"></Icon>
                                <span class="text">{{items.title}}</span>
                            </template>
                            <router-link v-for="(item, index) in items.children" :key="item.id" :to="item.href">
                                <MenuItem :name="indexs+1 + '-' + index+1">
                                    <Icon :type="item.icon"></Icon>
                                    <span class="text">{{ item.subtitle }}</span>
                                </MenuItem>
                            </router-link>
                        </Submenu>
                    </Menu>
                </div>
            </div>
            <div class="u-layout-right">
                <div class="u-top-menu">
                    <div class="item">
                        <Icon type="ios-bell"></Icon>
                        <span>消息</span>
                    </div>
                    <div class="item">
                        <Icon type="gear-b"></Icon>
                        <span>设置</span>
                    </div>
                    <div class="item">
                        <Icon type="ios-calendar-outline"></Icon>
                        <span>签到</span>
                    </div>
                    <div class="item">
                        <Icon type="person"></Icon>
                        <span>用户</span>
                    </div>
                </div>
                <div class="u-body">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                menus: [
                    {
                        title: "支出管理",
                        icon: 'ios-navigate',
                        children: [
                            {
                                subtitle: '支出列表',
                                icon: 'ios-compose',
                                href: '/expenditure/list'
                            },
                            {
                                subtitle: '新增支出',
                                icon: 'ios-compose',
                                href: '/expenditure/add'
                            }
                        ]
                    },
                    {
                        title: "报表中心",
                        icon: 'ios-pulse-strong',
                        children: [
                            {
                                subtitle: '支出列表',
                                icon: 'ios-compose',
                                href: '/expenditure/list'
                            },
                            {
                                subtitle: '新增支出',
                                icon: 'ios-compose',
                                href: '/expenditure/add'
                            }
                        ]
                    },
                    {
                        title: "个人中心",
                        icon: 'ios-settings-strong',
                        children: [
                            {
                                subtitle: '个人设置',
                                icon: 'ios-compose',
                                href: '/user/set'
                            },
                            {
                                subtitle: '供应商管理',
                                icon: 'ios-compose',
                                href: '/user/supplier'
                            },
                            {
                                subtitle: '部门人员管理',
                                icon: 'ios-compose',
                                href: '/user/department'
                            },
                            {
                                subtitle: '类目设置',
                                icon: 'ios-compose',
                                href: '/user/category'
                            }
                        ]
                    }
                ]
            }
        },
        created(){
            
        },
        methods: {
            toggleMenu(){

            }
        }
    }
</script>
<style lang="less">
    .u-layout{
        display: flex;
        flex-flow: row nowrap;
        .u-layout-left{
            width: 200px;
            background: #424f63;
            min-height: 1000px;
            .logo{
                height: 60px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                img{
                    width: 100px;
                    height: 35px;
                    margin-top: 12.5px;
                }
            }
            .ivu-menu{
                background: #424f63;
            }
            .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
                padding-left: 35px;
            }
        }
        .u-layout-right{
            width: 100%;
            .u-top-menu{
                height: 60px;
                background: #424f63;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                .item{
                    line-height: 60px;
                    color: #fff;
                    font-size: 16px;
                    padding: 0 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
