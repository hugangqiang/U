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
                                <!-- <router-link to="/file" class="menu-box">资料下载</router-link> -->
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
            <div class="banner-text">
                <h1>U行政</h1>
                <p>做真正懂你的行政助手</p>
                <p>国内首家行政类服务平台</p>
                <button class="btn" @click="test">立即体验</button>
            </div>
        </div>
        <div class="u-content-box">
            <div class="layout">
                <Row>
                    <Col span="10">
                        <div class="u-content-text">
                            <h3>新增支出</h3>
                            <p>添加公司支出，省去excel表哥</p>
                            <p>记账不再麻烦</p>
                            <h3>精确记录</h3>
                            <p>精确记录部门及个人支出</p>
                            <p>支出明细一目了然</p>
                            <h3>个性化</h3>
                            <p>个性化程度高，满足行政每一项支出</p>
                        </div>
                    </Col>
                    <Col span="14">
                        <div class="u-content-img">
                            <img src="../images/content-img01.png" alt="">
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="u-content-box">
            <div class="layout">
                <Row>
                    <Col span="14">
                        <div class="u-content-img">
                            <img src="../images/content-img02.png" alt="">
                        </div>
                    </Col>
                    <Col span="10">
                        <div class="u-content-text">
                            <h3>统计中心</h3>
                            <p>“按支出项”、“按部门”，“按个人”</p>
                            <p>多维度查看统计数据/p>
                            <h3>时间灵活</h3>
                            <p>可分别按自由的时间段、及固定时间周期</p>
                            <p>查询支出统计</p>
                            <h3>筛选统计</h3>
                            <p>多个筛选项进行支出明细的统计和管理</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="u-content-box">
            <div class="layout">
                <Row>
                    <Col span="10">
                        <div class="u-content-text">
                            <h3>资料下载</h3>
                            <p>行政人事工作文件模板应有尽有</p>
                            <p>一键下载，方便使用</p>
                            <h3>完全免费</h3>
                            <p>所有文件，全部免费</p>
                        </div>
                    </Col>
                    <Col span="14">
                        <div class="u-content-img">
                            <img src="../images/content-img03.png" alt="">
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="u-content-more u-height">
            <div class="u-content-text">
                <h3>OPEN</h3>
                <div class="text">
                    <span>SOON</span>
                    <span>更多功能  敬请期待</span>
                </div>
            </div>
        </div>
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
           test(){
                this.$ajax({
                    url: "/login",
                    method: "POST",
                    params: {
                        phone: '17521015175',
                        password: '123123123'
                    }
                })
                .then((res) => {
                    let code = res.data.meta.code;
                    if( code === 200 ){
                        /*加密得到的信息token*/
                        let token = this.$jwt.sign(res.data.data, 'u', {
                            expiresIn: "1days"
                        })
                        this.$store.commit('SAVE_USER', res.data.data);
                        this.$setCookie("token",token);
                        this.$router.push({path:'/sass'});
                    }
                })
           },
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
            background: url("../images/banner01.png");
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
        .u-content-more{
            background: url("../images/content-img04.png");
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            position: relative;
            .u-content-text{
                text-align: center;
                width: 100%;
                height: 150px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                h3{
                    display: inline-block;
                    font-size: 85px;
                    color: #fff;
                }
                .text{
                    display: inline-block;
                    span{
                        display: block;
                        font-size: 30px;
                        line-height: 37px;
                        color: #fff;
                        text-align: left;
                    }
                }
            }
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