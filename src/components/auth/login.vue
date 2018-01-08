<template>
    <div class="u-login">
        <div class="title">登录</div>
        <div class="u-login-content">
            <Form ref="formInlineLogin" :model="formInlineLogin" :rules="ruleInlineLogin" >
                <Form-item prop="phone">
                    <Input type="text" v-model="formInlineLogin.phone" placeholder="请输入手机号或用户名" @on-enter="LoginSubmit('formInlineLogin')" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInlineLogin.password" placeholder="请输入密码" @on-enter="LoginSubmit('formInlineLogin')">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item>
                    <div class="forgotPass">
                        <router-link to="/auth/findpassword"><span>忘记密码?</span></router-link>
                    </div>
                </Form-item>
                <Form-item>
                    <Button type="primary" class="btn-login" @click="LoginSubmit('formInlineLogin')">登录</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            const validatePhone = (rule, value, callback) => {
                value = value.replace(/(^\s*)|(\s*$)/g, "");
                let reg = /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (value === '') {
                    callback(new Error('请输入手机号！'));
                } else if( !reg.test(value) ) {
                    callback(new Error('请输入正确的手机号！'));
                } else {
                    callback();
                }
            };
            return {
                formInlineLogin: {
                    phone: '',
                    password: ''
                },
                ruleInlineLogin: {
                    phone: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 8, max: 20, message: '密码长度不能小于8位', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            
        },
        mounted(){

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
                                phone: this.$refs.formInlineLogin.$options.propsData.model.phone,
                                password: this.$refs.formInlineLogin.$options.propsData.model.password
                            }
                        })
                        .then((res) => {
                            let code = res.data.meta.code;
                            if( code === 451 ){
                                _this.$Notice.error({
                                    title: '参数验证错误！'
                                });
                            }else if( code === 452 ){
                                _this.$Notice.error({
                                    title: '用户不存在！'
                                });
                            }else if( code === 453 ){
                                _this.$Notice.error({
                                    title: '用户已禁用！'
                                });
                            }else if( code === 454 ){
                                _this.$Notice.error({
                                    title: '密码错误！'
                                });
                            }else if( code === 200 ){
                                /*加密得到的信息token*/
                                let token = _this.$jwt.sign(res.data.data, 'u', {
                                    expiresIn: "1days"
                                })
                                _this.$store.commit('SAVE_USER', res.data.data);
                                _this.$setCookie("token",token);
                                _this.$router.push({path:'/'});
                            }
                        })
                    } else {
                        this.$Notice.error({
                            title: '表单验证失败！'
                        });
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .u-login{
        background: #fff;
        .title{
            background: #f0f0f0;
            line-height: 45px;
            font-size: 20px;
            text-align: center;
        }
        .u-login-content{
            padding: 25px;
            .ivu-form-item{
                position: relative;
                .ivu-input-group-prepend{
                    background: #fff;
                    border: none;
                }
                .ivu-input{
                    height: 45px;
                    line-height: 45px;
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
                    height: 43px;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    z-index: 10;
                    .ivu-icon{
                        font-size: 25px;
                        line-height: 43px;
                    }
                }
                .forgotPass{
                    line-height: 1;
                    font-size: 14px;
                    text-align: right;
                    cursor: pointer;
                }
                .ivu-btn{
                    width: 100%;
                    background: #08923a;
                    height: 45px;
                    line-height: 45px;
                    font-size: 14px;
                    padding: 0;
                    border: none;
                }
            }
        }
    }
</style>
