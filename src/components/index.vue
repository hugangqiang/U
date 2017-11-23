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
                    <Menu theme="dark" :open-names="['1']" accordion width="auto">
                        <div class="menuToggle" @click="toggleMenu">
                            <Icon type="navicon"></Icon>
                        </div>
                        <Submenu name="1">
                            <template slot="title">
                                <span class="layout-text"><Icon type="ios-paper"></Icon>
                                内容管理</span>
                            </template>
                            <Menu-item name="1-1">
                                <Icon type="clipboard"></Icon>
                                <span class="layout-text">文章管理</span>
                            </Menu-item>
                            <Menu-item name="1-2">
                                <Icon type="compose"></Icon>
                                <span class="layout-text">评论管理</span>
                            </Menu-item>
                            <Menu-item name="1-3">
                                <Icon type="ios-lightbulb"></Icon>
                                <span class="layout-text">举报管理</span>
                            </Menu-item>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <span class="layout-text"><Icon type="android-person"></Icon>
                                用户管理</span>
                            </template>
                            <Menu-item name="2-1">
                                <Icon type="person-add"></Icon>
                                <span class="layout-text">新增用户</span>
                            </Menu-item>
                            <Menu-item name="2-2">
                                <Icon type="person-stalker"></Icon>
                                <span class="layout-text">活跃用户</span>
                            </Menu-item>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <span class="layout-text"><Icon type="stats-bars"></Icon>
                                统计分析</span>                            
                            </template>
                            <Menu-item name="3-1">
                                <Icon type="fork-repo"></Icon>
                                <span class="layout-text">新增和启动</span>
                            </Menu-item>
                            <Menu-item name="3-2">
                                <Icon type="stats-bars"></Icon>
                                <span class="layout-text">活跃分析</span>
                            </Menu-item>
                            <Menu-item name="3-3">
                                <Icon type="ios-pulse"></Icon>
                                <span class="layout-text">时段分析</span>
                            </Menu-item>
                            <Menu-item name="3-4">
                                <Icon type="coffee"></Icon>
                                <span class="layout-text">用户留存</span>
                            </Menu-item>
                            <Menu-item name="3-5">
                                <Icon type="flash"></Icon>
                                <span class="layout-text">流失用户</span>
                            </Menu-item>
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
                background: #fff;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                .item{
                    line-height: 60px;
                    color: #333333;
                    font-size: 16px;
                    padding: 0 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
