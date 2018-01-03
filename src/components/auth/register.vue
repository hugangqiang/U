<template>
    <div class="u-register">
        <div class="title">注册</div>
        <div class="u-register-content">
            <Form ref="formInlineregister" :model="formInlineregister" :rules="ruleInlineregister" >
                <Form-item prop="phone">
                    <Input type="text" v-model="formInlineregister.phone" placeholder="请输入手机号" @on-enter="registerSubmit('formInlineregister')">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="verifyPhotoCode">
                    <Input type="text" v-model="formInlineregister.verifyPhotoCode" class="vg" :class="{success: isReg}" :icon="codeIcon" placeholder="请输入图形验证码" @on-change="photoCode" @on-enter="registerSubmit('formInlineregister')"></Input>
                    <div class="vg-code">
                        <div id="v_container"></div>
                    </div>
                </Form-item>
                <Form-item prop="verifyCode" class="verifyCode">
                    <Input type="text" v-model="formInlineregister.verifyCode" placeholder="请输入手机验证码"  @on-enter="registerSubmit('formInlineregister')">
                        <Icon type="grid" slot="prepend"></Icon>
                    </Input>
                    <div class="verifyCode-btn" @click="getVerifyCode">获取验证码</div>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInlineregister.password" placeholder="设置密码，密码长度8-20字符"  @on-enter="registerSubmit('formInlineregister')">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item>
                    <Checkbox v-model="formInlineregister.check">我已阅读并且同意 </Checkbox>
                    <span>《服务协议》</span>
                </Form-item>
                <Form-item>
                    <Button type="primary" :disabled="!formInlineregister.check" class="btn-login" @click="registerSubmit('formInlineregister')">注册</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script>
    import { GVerify } from '../js/g.js';
    export default {
        data () {
            const validatePhone = (rule, value, callback) => {
                value = value.replace(/(^\s*)|(\s*$)/g, "");
                let reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (value === '') {
                    callback(new Error('请输入手机号！'));
                } else if( !reg.test(value) ) {
                    callback(new Error('请输入正确的手机号！'));
                } else {
                    callback();
                }
            };
            return {
                formInlineregister: {
                    phone: '',
                    verifyCode: '',
                    verifyPhotoCode: '',
                    onCode: true,
                    password: '',
                    check: false
                },
                ruleInlineregister: {
                    phone: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    verifyPhotoCode: [
                        { required: true, message: '请输入图形验证码', trigger: 'blur' },
                        { type: 'string', min: 4, max: 4, message: '请输入4位验证码！', trigger: 'blur' }
                    ],
                    verifyCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { type: 'string', min: 6, max: 6, message: '请输入6位验证码！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 8, max: 20, message: '密码长度不能小于8位', trigger: 'blur' }
                    ]
                },
                isReg: null,
                codeIcon: ''
            }
        },
        created(){
            
        },
        mounted(){
            this.verifyCode = new GVerify("v_container");
        },
        methods: {
            registerSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if(!this.formInlineregister.check){
                        return;
                    }
                    if (valid) {
                        let _this = this;
                        _this.$ajax({
                            url: "/register",
                            method: "POST",
                            params: {
                                phone: _this.$refs.formInlineregister.$options.propsData.model.phone,
                                code: _this.$refs.formInlineregister.$options.propsData.model.verifyCode,
                                password: _this.$refs.formInlineregister.$options.propsData.model.password
                            }
                        })
                        .then((res) => {
                            let code = res.data.meta.code;
                            if( code === 452 ){
                                _this.$Notice.error({
                                    title: '手机号已注册！'
                                });
                            }else if( code === 453 ){
                                _this.$Notice.error({
                                    title: '验证码错误！'
                                });
                            }else if( code === 454 ){
                                _this.$Notice.error({
                                    title: '验证码过期！'
                                });
                            }else if( code === 200 ){
                                /*加密得到的信息token*/
                                _this.$ajax({
                                    url: "/login",
                                    method: "POST",
                                    params: {
                                        phone: _this.$refs.formInlineregister.$options.propsData.model.phone,
                                        password: _this.$refs.formInlineregister.$options.propsData.model.password
                                    }
                                })
                                .then((res) => {
                                    let code = res.data.meta.code;
                                    if( code === 200 ){
                                        /*加密得到的信息token*/
                                        let token = _this.$jwt.sign(res.data.data, 'u', {
                                            expiresIn: "1days"
                                        })
                                        _this.$store.commit('SAVE_USER', res.data.data);
                                        _this.$setCookie("token",token);
                                        _this.$router.push({path:'/'});
                                    }
                                })
                            }
                        })
                    } else {
                        this.$Notice.error({
                            title: '表单验证失败！'
                        });
                    }
                })
            },
            getVerifyCode(e){
                if( this.formInlineregister.onCode ){
                    let reg = /0?(13|14|15|16|17|18|19)[0-9]{9}/;
                    let s = 59;
                    if( this.formInlineregister.phone === '' ){
                        this.$Notice.error({
                            title: '请输入手机号！'
                        });
                        return;
                    } else if( !reg.test(this.formInlineregister.phone) ){
                        this.$Notice.error({
                            title: '请输入正确的手机号！'
                        });
                        return;
                    }
                    if( this.formInlineregister.verifyPhotoCode === '' ){
                        this.$Notice.error({
                            title: '请输入图形验证码！'
                        });
                        return;
                    }
                    if(!this.isReg){
                        this.$Notice.error({
                            title: '请输入正确的图形验证码！'
                        });
                        return;
                    }
                    
                    this.formInlineregister.onCode = false;
                    let _this = this;
                    this.$ajax({
                        url: "/code/register",
                        method: "GET",
                        params: {
                            phone: _this.formInlineregister.phone
                        }
                    }).then((res) => {
                        if(res.data.meta.code === 452 ){
                            _this.$Notice.error({
                                title: '手机号已注册！'
                            });
                            _this.formInlineregister.onCode = true;
                            return;
                        } else if( res.data.meta.code === 200 ){
                            let time = setInterval(function(){
                                e.target.innerHTML = s + "s后重发";
                                s--;
                                if( s === 0 ){
                                    clearInterval(time);
                                    e.target.innerHTML = "获取验证";
                                    _this.formInlineregister.onCode = true;
                                }
                            },1000)
                        }
                    });
                }
            },
            photoCode(){
                if(this.formInlineregister.verifyPhotoCode.length === 4){
                    this.isReg = this.verifyCode.validate(this.formInlineregister.verifyPhotoCode);
                    if(this.isReg){
                        this.codeIcon = "checkmark-round";
                    }else{
                        this.codeIcon = "close-round";
                    }
                }else{
                    this.codeIcon = '';
                    this.isReg = null;
                }
            }
        }
    }
</script>
<style lang="less">
    .u-register{
        background: #fff;
        .title{
            background: #f0f0f0;
            line-height: 45px;
            font-size: 20px;
            text-align: center;
        }
        .u-register-content{
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
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    padding: 0;
                    border: none;
                }
            }
            .vg .ivu-input{
                width: 48%;
                padding-left: 5px;
            }
            .vg .ivu-input-icon{
                width: 45px;
                height: 45px;
                line-height: 45px;
                font-size: 18px;
                position: absolute;
                right: 50%;
                color: red;
            }
            .vg.success .ivu-input-icon{
                color: #08923a;
            }
            .vg-code{
                width: 48%;
                height: 45px;
                border: 1px solid #c8c8c8;
                border-radius: 5px;
                padding: 3px;
                position: absolute;
                right: 0px;
                top: 0px;
            }
            #v_container{
                width: 100%;
                height: 37px;
            }
            .verifyCode .ivu-input{
                padding-right: 100px;
            }
            .verifyCode-btn{
                background: #08923a;
                font-size: 12px;
                line-height: 1;
                padding: 8px;
                border-radius: 5px;
                position: absolute;
                right: 5px;
                top: 9px;
                z-index: 10;
                color: #fff;
                cursor: pointer;
            }
        }
    }
</style>
