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
                    <Menu active-name="1" theme="dark" width="auto">
                        <div class="layout-logo-left"></div>
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            <span class="layout-text">支出管理</span>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-pulse-strong"></Icon>
                            <span class="layout-text">报表中心</span>
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-settings-strong"></Icon>
                            <span class="layout-text">系统中心</span>
                        </MenuItem>
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
