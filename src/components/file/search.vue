<template>
    <div class="u-index">
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
                    <div class="btns" v-if="typeof $store.state.userinfo.phone === 'undefined'">
                        <router-link to="/auth/register">
                            <span class="reg-btn">注册</span>
                        </router-link>
                        <span class="sep"></span>
                        <router-link to="/auth/login">
                            <span class="login-btn">登录</span>
                        </router-link>
                    </div>
                    <div class="btns" v-else>
                        <span class="reg-btn">{{$store.state.userinfo.phone}}</span>
                        <span class="sep"></span>
                        <span class="login-btn" @click="logout">退出</span>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div class="u-footer">
            <div class="logo">
                <img src="../images/logo.png" alt="">
            </div>
            <p>联系我们：17602192829  |  客服QQ：1031514657</p>
            <p>沪ICP备17015887号</p>
            <p>Copyright ©  U行政 www.uxingzheng.com  All rights reserved</p>
        </div>
        <BackTop></BackTop>
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
            let _this = this;
            let uH = document.querySelectorAll('.u-height');
            for(let i=0; i<uH.length; i++){
                uH[i].style.height = document.documentElement.clientHeight + 'px';
            }
        },
        methods: {
           logout(){
				/** 
				 * 退出登录
				 **/
        		this.$store.commit('SAVE_USER', {});
                this.$delCookie("token");
                this.$router.push({path:'/'});
        	}
        }
    }
</script>
<style lang="less">
    .u-index{
        .u-header{
            position: relative;
            width: 100%;
            background: url("../images/banner01.jpg");
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
            .banner-text{
                position: absolute;
                right: 10%;
                top: 50%;
                margin-top: -155px;
                height: 310px;
                color: #fff;
                h1{
                    font-size: 48px;
                    line-height: 80px;
                }
                p{
                    font-size: 34px;
                    line-height: 65px;
                }
                .btn{
                    height: 68px;
                    width: 195px;
                    padding: 0;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    line-height: 68px;
                    font-size: 30px;
                    background: rgba(0,0,0,0);
                    color: #fff;
                    margin-top: 30px;
                    cursor: pointer;
                }
            }
        }
        .u-content-box{
            background: #fff;
            padding: 120px 0;
            .u-content-text{
                h3{
                    font-size: 34px;
                    color: #333;
                    margin-top: 30px;
                }
                p{
                    color: #999;
                    font-size: 24px;
                    line-height: 43px;
                }
            }
            .u-content-img{
                img{
                    max-width: 100%;
                }
            }
        }
        .u-content-box:nth-of-type(3){
            background: #f0f0f0;
        }
        
        .u-footer{
            width: 100%;
            height: 450px;
            background: #202023;
            text-align: center;
            padding: 70px 0 50px;
            .logo{
                margin-bottom: 60px;
            }
            p{
                font-size: 20px;
                line-height: 45px;
                color: #fff;
            }
        }
        .ivu-back-top-inner {
            background-color: #0e9939;
        }
    }
    
</style>