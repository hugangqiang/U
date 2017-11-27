<template>
    <div>
        <div class="u-login u-height">
            <div class="login-top">
                <div class="layout">
                    <div class="logo"></div>
                    <div class="btns">
                        <span class="reg-btn">注册</span>
                        <span class="login-btn">登录</span>
                    </div>
                </div>
            </div>
            <div class="login-text">
                <h1>U行政</h1>
                <p>做真正懂你的行政助手</p>
                <p>国内首家行政类服务平台</p>
                <button class="btn">立即体验</button>
            </div>
            <div class="loginBox">
                <Tabs value="name1">
                    <TabPane label="登录" name="name1">
                        <Form ref="formInlineLogin" :model="formInlineLogin" :rules="ruleInlineLogin" >
                            <Form-item prop="userName">
                                <Input type="text" v-model="formInlineLogin.userName" placeholder="请输入手机号或用户名">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="password">
                                <Input type="password" v-model="formInlineLogin.password" placeholder="请输入密码">
                                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item>
                                <div class="forgotPass">
                                    <span>忘记密码</span>
                                </div>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" class="btn-login" @click="LoginSubmit('formInlineLogin')">登录</Button>
                            </Form-item>
                        </Form>
                    </TabPane>
                    <TabPane label="注册" name="name2">
                        <Form ref="formInlineReg" :model="formInlineReg" :rules="ruleInlineReg">
                            <Form-item prop="userName">
                                <Input type="text" v-model="formInlineReg.userName" placeholder="请输入手机号或用户名">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item prop="verifyCode" class="verifyCode">
                                <Input type="text" v-model="formInlineReg.verifyCode" placeholder="请输入手机验证码">
                                    <Icon type="grid" slot="prepend"></Icon>
                                </Input>
                                <div class="verifyCode-btn">获取验证码</div>
                            </Form-item>
                            <Form-item prop="password">
                                <Input type="password" v-model="formInlineReg.password" placeholder="设置密码，密码长度6-20字符">
                                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </Form-item>
                            <Form-item>
                                <Checkbox v-model="formInlineReg.check">我已阅读并且同意</Checkbox>
                                <span>《服务协议》</span>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" class="btn-login" @click="RegSubmit('formInlineReg')">登录</Button>
                            </Form-item>
                        </Form>
                    </TabPane>
                </Tabs>
                
            </div>
        </div>
        <div class="u-height u-content-box">
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
                            <img src="./images/content-img01.png" alt="">
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="u-height  u-content-box">
            <div class="layout">
                <Row>
                    <Col span="14">
                        <div class="u-content-img">
                            <img src="./images/content-img02.png" alt="">
                        </div>
                    </Col>
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
                </Row>
            </div>
        </div>
        <div class="u-height  u-content-box">
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
                            <img src="./images/content-img03.png" alt="">
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInlineLogin: {
                    userName: '',
                    password: '',
                    rememPasssword: []
                },
                ruleInlineLogin: {
                    userName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 8, message: '密码长度不能小于8位', trigger: 'blur' }
                    ]
                },
                formInlineReg: {
                    userName: '',
                    verifyCode: '',
                    password: '',
                    check: false
                },
                ruleInlineReg: {
                    userName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 8, message: '密码长度不能小于8位', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            //sessionStorage.removeItem('role');
            //sessionStorage.removeItem('token');
        },
        mounted(){
            let _this = this;
            let uH = document.querySelectorAll('.u-height');
            for(let i=0; i<uH.length; i++){
                uH[i].style.height = document.documentElement.clientHeight + 'px';
            }
            /* document.querySelector(".u-login").onkeyup = (event) => {
                if(event.keyCode == 13){
                    _this.LoginSubmit('formInlineLogin');
                } 
            }; */
        },
        methods: {
            LoginSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        _this.$ajax({
                            url: "/login",
                            method: "POST",
                            params: {
                                username: this.$refs.formInlineLogin.$options.propsData.model.userName,
                                password: this.$refs.formInlineLogin.$options.propsData.model.password
                            }
                        })
                        .then((res) => {
                            let code = res.data.meta.code;
                            if( code === 451 ){
                                _this.$Message.error("参数验证错误!");
                            }else if( code === 452 ){
                                _this.$Message.error("用户不存在!");
                            }else if( code === 453 ){
                                _this.$Message.error("用户已禁用!");
                            }else if( code === 454 ){
                                _this.$Message.error("密码错误!");
                            }else if( code === 200 ){
                                /*加密得到的信息token*/
                                let token = _this.$jwt.sign(res.data.data, 'sofa', {
                                    expiresIn: "1days"
                                })
                                let role = _this.$jwt.sign({role:"*$%#^"}, 'sofa', {
                                    expiresIn: "1days"
                                })
                                _this.$store.commit('SAVE_USER', res.data.data);
                                sessionStorage.setItem('token', token);
                                if( res.data.data.role === '' ){
                                    sessionStorage.setItem('role',role);
                                    _this.$router.push({path:'/role'});    
                                }else{
                                    _this.$router.push({path:'/'});
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            _this.$Message.error("登录异常，请稍后再尝试！");
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            RegSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        _this.$ajax({
                            url: "/login",
                            method: "POST",
                            params: {
                                username: this.$refs.formInlineLogin.$options.propsData.model.userName,
                                password: this.$refs.formInlineLogin.$options.propsData.model.password
                            }
                        })
                        .then((res) => {
                            let code = res.data.meta.code;
                            if( code === 451 ){
                                _this.$Message.error("参数验证错误!");
                            }else if( code === 452 ){
                                _this.$Message.error("用户不存在!");
                            }else if( code === 453 ){
                                _this.$Message.error("用户已禁用!");
                            }else if( code === 454 ){
                                _this.$Message.error("密码错误!");
                            }else if( code === 200 ){
                                /*加密得到的信息token*/
                                let token = _this.$jwt.sign(res.data.data, 'sofa', {
                                    expiresIn: "1days"
                                })
                                let role = _this.$jwt.sign({role:"*$%#^"}, 'sofa', {
                                    expiresIn: "1days"
                                })
                                _this.$store.commit('SAVE_USER', res.data.data);
                                sessionStorage.setItem('token', token);
                                if( res.data.data.role === '' ){
                                    sessionStorage.setItem('role',role);
                                    _this.$router.push({path:'/role'});    
                                }else{
                                    _this.$router.push({path:'/'});
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            _this.$Message.error("登录异常，请稍后再尝试！");
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .u-login{
        position: relative;
        width: 100%;
        background: url("./images/banner01.png");
        background-size: cover;
        background-repeat: no-repeat;
        .login-top{
            height: 90px;
            background: #fff;
            .layout{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                .logo{
                    width: 147px;
                    height: 45px;
                    background: url("./images/logo.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                    margin-top: 22.5px;
                }
                .btns{
                    margin-top: 25px;
                    .login-btn,
                    .reg-btn{
                        display: inline-block;
                        color: #999999;
                        font-size: 18px;
                        line-height: 38px;
                        height: 38px;
                        width: 86px;
                        text-align: center;
                        border: 1px solid #999;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .login-btn{
                        margin-left: 30px;
                    }
                }
            }
        }
        .login-text{
            position: absolute;
            left: 10%;
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
        .loginBox{
            width: 400px;
            min-height: 419px;
            background: #fff;
            position: absolute;
            right: 10%;
            top: 50%;
            border-radius: 8px;
            transform: translateY(-50%);
            .ivu-tabs-bar{
                border-bottom: none;
                position: relative;
            }
            .ivu-tabs-bar::before{
                content: '';
                position: absolute;
                background: #c8c8c8;
                width: 100%;
                height: 4px;
                bottom: 0;
            }
            .ivu-tabs-nav{
                width: 100%;
                .ivu-tabs-tab{
                    width: 50%;
                    margin-right: 0;
                    font-size: 24px;
                    line-height: 74px;
                    color: #666;
                    padding: 0;
                    text-align: center;
                }
                .ivu-tabs-ink-bar{
                    background: #08923a;
                    height: 4px;
                }
            }
            .ivu-tabs-content{
                margin-top: 30px;
            }
            .ivu-form-item{
                padding: 0 30px;
                position: relative;
                .ivu-input-group-prepend{
                    background: #fff;
                    border: none;
                }
                .ivu-input{
                    height: 55px;
                    line-height: 55px;
                    border: 1px solid #c8c8c8;
                    border-radius: 5px !important;
                    padding-left: 42px;
                    font-size: 16px;
                }
                .ivu-input-group-append, .ivu-input-group-prepend, .ivu-input-group>.ivu-input{
                    display: block;
                }
                .ivu-input-group-prepend{
                    padding: 0;
                    width: 40px;
                    height: 53px;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    z-index: 10;
                    .ivu-icon{
                        font-size: 30px;
                        line-height: 53px;
                    }
                }
                .forgotPass{
                    line-height: 30px;
                    font-size: 16px;
                    color: #666;
                    text-align: right;
                    cursor: pointer;
                }
                .ivu-btn{
                    width: 100%;
                    background: #08923a;
                    height: 55px;
                    line-height: 55px;
                    font-size: 16px;
                    padding: 0;
                    border: none;
                }
            }
            .verifyCode .ivu-input{
                padding-right: 100px;
            }
            .verifyCode-btn{
                background: #08923a;
                font-size: 14px;
                line-height: 1;
                padding: 10px;
                border-radius: 5px;
                position: absolute;
                right: 10px;
                top: 11px;
                z-index: 10;
                color: #fff;
                cursor: pointer;
            }
            
        }
    }
    .u-content-box{
        background: #fff;
        .layout{
            transform: translateY(50%);
        }
        .u-content-text{
            h3{
                font-size: 34px;
                color: #333;
            }
            p{
                color: #999;
                font-size: 24px;
                line-height: 50px;
                
            }
        }
        .u-content-img{
            img{
                max-width: 100%;
            }
        }
    }
</style>