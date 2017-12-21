<template>
    <div class="u-set">
        <Card>
            <p slot="title">个人设置</p>
            <div class="u-set-content">
                <div class="u-user-info">
                    <div class="user-img">
                        <div>
                            <img src="../images/user-img.png" alt="">
                        </div>
                        <Button type="primary">修改头像</Button>
                    </div>
                    <div class="user-group">
                        <div class="title">基本资料</div>
                        <div class="item">
                            <Row>
                                <Col span="5">
                                    <span class="name">公司名称</span>
                                </Col>
                                <Col span="14">
                                    <span class="text">请输入您所在公司全称</span>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span>修改</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div class="item">
                            <Row>
                                <Col span="5">
                                    <span class="name">用户名</span>
                                </Col>
                                <Col span="14">
                                    <span class="text">用户名是您在U行政的昵称</span>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span>修改</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div class="user-group">
                        <div class="title">账号关联</div>
                        <div class="item">
                            <Row>
                                <Col span="5">
                                    <span class="name">绑定手机号</span>
                                </Col>
                                <Col span="14">
                                    <span class="text">17521015175</span>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span>修改</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div class="item">
                            <Row>
                                <Col span="5">
                                    <span class="name">绑定邮箱</span>
                                </Col>
                                <Col span="14">
                                    <span class="text">请输入您的邮箱</span>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span>修改</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div class="item">
                            <Row>
                                <Col span="5">
                                    <span class="name">绑定微信</span>
                                </Col>
                                <Col span="14">
                                    <span class="text">微信名称</span>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span>修改</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div class="user-group">
                        <div class="title">安全设置</div>
                        <div class="item">
                            <Row>
                                <Col span="5">
                                    <span class="name">登录密码</span>
                                </Col>
                                <Col span="14">
                                    <span class="text">登录所用到的密码</span>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span>修改</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
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

        }
    }
</script>
<style lang="less">
    .u-set-content{
        .u-user-info{
            max-width: 980px;
            margin: 0 auto;
            .user-img{
                text-align: center;
                margin-bottom: 80px;
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 100%;
                }
                .ivu-btn{
                    margin-top: 15px;
                }
            }
            .user-group{
                margin-bottom: 80px;
                line-height: 80px;
                .title{
                    font-size: 28px;
                }
                .item{
                    line-height: 70px;
                    border-bottom: 1px solid #d9d9d9;
                    .name{
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .text{
                        font-size: 14px;
                        color: #999;
                    }
                    .operation{
                        font-size: 14px;
                        .ivu-icon{
                            font-size: 20px;
                            position: relative;
                            top: 2px;
                        }
                        .yesSet{
                            color: #32aa1d;
                        }
                        .onSet{
                            color: #ffa200;
                        }
                        .edit{
                            color: #2d8cf0;
                        }
                        .sep{
                            color: #bebebe;
                            margin: 0 5px;
                            display: inline-block;
                            position: relative;
                            top: -1px;
                        }
                    }
                }
                
            }
            
        }
    }
</style>
