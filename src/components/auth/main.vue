<template>
    <div class="u-auth">
        <div class="u-header u-height">
            <div class="header-top">
                <div class="layout">
                    <div>
                        <router-link to="/"><div class="logo"></div></router-link>
                        <div class="menu">
                            <nav>
                                <router-link to="/" class="menu-box">首页</router-link>
                                <router-link to="/sass" class="menu-box">行政工具</router-link>
                                <router-link to="/file" class="menu-box">资料下载</router-link>
                            </nav>
                        </div>
                    </div>
                    <div class="btns">
                        <router-link to="/auth/register">
                            <span class="reg-btn">注册</span>
                        </router-link>
                        <span class="sep"></span>
                        <router-link to="/auth/login">
                            <span class="login-btn">登录</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="auth-content">
                <router-view></router-view>
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
        mounted(){

        },
        methods: {
            
        }
    }
</script>
<style lang="less">
    .u-auth{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        .u-header{
            position: relative;
            width: 100%;
            height: 100%;
            background: url("../images/banner02.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            .header-top{
                height: 60px;
                background: rgba(0,0,0,.5);
                .layout{
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    .logo{
                        display: inline-block;
                        width: 120px;
                        height: 30px;
                        background: url("../images/logo.png");
                        background-size: contain;
                        background-repeat: no-repeat;
                        margin-top: 15px;
                    }
                    .menu{
                        display: inline-block;
                        position: relative;
                        top: -8px;
                        left: 25px;
                        .menu-box{
                            font-size: 16px;
                            color: #f0f0f0;
                            margin: 0 25px;
                        }
                    }
                    .btns{
                        line-height: 60px;
                        .login-btn,
                        .reg-btn{
                            color: #f0f0f0;
                            font-size: 16px;
                            cursor: pointer;
                            margin: 0 15px;
                        }
                        .sep{
                            width: 2px;
                            height: 16px;
                            background: #fff;
                            display: inline-block;
                            position: relative;
                            top: 2px;
                        }
                    }
                }
            }
        }
        .auth-content{
            width: 380px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }
</style>
