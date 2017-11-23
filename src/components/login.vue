<template>
    <div class="vd-login">
        <div class="login-coin">
            <!-- <img src="./images/login-coin.png" alt=""> -->
        </div>
        <div class="loginBox">
            <div class="login-logo">
                <span>登录</span>
            </div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <Form-item prop="userName">
                    <Input type="text" v-model="formInline.userName" placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="rememPasssword">
                    <CheckboxGroup v-model="formInline.rememPasssword">
                        <Checkbox label="记住密码"></Checkbox>
                    </CheckboxGroup>
                </Form-item>
                <Form-item>
                    <Button type="primary" class="btn-login" @click="handleSubmit('formInline')">登录</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    userName: '',
                    password: '',
                    rememPasssword: []
                },
                ruleInline: {
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
            
            document.querySelector(".vd-login").onkeyup = (event) => {
                if(event.keyCode == 13){
                    _this.handleSubmit('formInline');
                } 
            };
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        _this.$ajax({
                            url: "/login",
                            method: "POST",
                            params: {
                                username: this.$refs.formInline.$options.propsData.model.userName,
                                password: this.$refs.formInline.$options.propsData.model.password
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
    .vd-login{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
       /*  background: url("./images/login_bg.png"); */
        background-size: cover;
        .login-coin{
            position: absolute;
            width: 459px;
            height: 340px;
            top: 50%;
            margin-top: -170px;
            left: 10%;
        }
    }
    .loginBox{
        width: 310px;
        height: 360px;
        background: #626c77;
        position: absolute;
        right: 10%;
        top: 50%;
        margin-top: -180px;
        border-radius: 4px;
        .login-logo{
            font-size: 40px;
            text-align: center;
            line-height: 100px;
            color: #fff;
        }
        .ivu-form-inline .ivu-form-item {
            display: block;
            margin-right: 0px;
            vertical-align: top;
            padding: 0 20px;
            .ivu-checkbox-group{
                color: #fff;
            }
            .ivu-input{
                height: 40px;
            }
            .ivu-btn{
                width: 100%;
                height: 40px;
                background: #ff7c24;
            }
        }
    }
</style>