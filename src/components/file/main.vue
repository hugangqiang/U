<template>
    <div class="u-file">
        <div class="u-header">
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
                        <span class="reg-btn" v-if="$store.state.userinfo.nickname === ''">{{$store.state.userinfo.phone}}</span>
                        <span class="reg-btn" v-else>{{$store.state.userinfo.nickname}}</span>
                        <span class="sep"></span>
                        <span class="login-btn" @click="logout">退出</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="u-content">
            <router-view></router-view>
        </div>
        <div class="u-footer">
            <div class="layout">
                <Row>
                    <Col span="12">
                        <div class="left">
                            <div class="logo">
                                <img src="../images/logo.png" alt="">
                            </div>
                            <div class="contact">
                                <div class="title">联系我们</div>
                                <p>服务电话：17602192829</p>
                                <p>客服QQ：1031514657</p>
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="copyright">
                            <p>沪ICP备17015887号</p>
                            <p>Copyright ©  U行政 www.uxingzheng.com  All rights reserved</p>
                        </div>
                    </Col>
                </Row>
            </div>
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

        },
        methods: {
           logout(){
				/** 
				 * 退出登录
				 **/
                this.$store.commit('SAVE_USER', {});
                localStorage.removeItem('expenditure');
                this.$delCookie("token");
                this.$router.push({path:'/'});
        	}
        }
    }
</script>
<style lang="less">
    .u-file{
        .u-header{
            position: relative;
            width: 100%;
            .header-top{
                height: 60px;
                background: #202023;
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

        .u-footer{
            width: 100%;
            padding: 55px 0;
            background: #202023;
            color: #999;
            font-size: 14px;
            .left{
                display: flex;
                flex-flow: row nowrap;
                .contact{
                    margin-left: 40px;
                    padding-left: 40px;
                    border-left: 1px solid #4d4d4d;
                    .title{
                        font-size: 18px;
                        margin-bottom: 15px;
                    }
                }
            }
            .copyright{
                text-align: right;
                padding-top: 40px;
            }
        }
        .ivu-back-top-inner {
            background-color: #0e9939;
        }
    }
    
</style>