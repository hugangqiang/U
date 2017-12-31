<template>
    <div class="u-set">
        <Card>
            <p slot="title">个人设置</p>
            <div class="u-set-content">
                <div class="u-user-info">
                    <div class="user-img">
                        <div v-if="userImg === ''">
                            <img src="../../images/user-img.png" alt="">
                        </div>
                        <div v-else>
                            <img :src="userImg" alt="">
                        </div>
                        <Button type="primary" @click="editUserImg">修改头像</Button>
                    </div>
                    <div class="user-group">
                        <div class="title">基本资料</div>
                        <div class="item">
                            <Row>
                                <Col span="5">
                                    <span class="name">公司名称</span>
                                </Col>
                                <Col span="14">
                                    <div v-if="!companyNameEdit">
                                        <span class="text" v-if="companyName === ''">请输入您所在公司全称</span>
                                        <span class="text" v-else>{{companyName}}</span>
                                    </div>
                                    <div v-else style="padding-right: 30px;">
                                        <Input type="text" v-model="companyNameTemp" @on-blur="companySave('blur')" placeholder="请输入公司名称"></Input>
                                    </div>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet"  v-if="companyName === ''">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet" v-else>
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span class="edit" v-if="companyName === ''" @click="companySave">
                                            <span v-if="!companyNameEdit">添加</span>
                                            <span v-else>保存</span>
                                        </span>
                                        <span class="edit" v-else  @click="companySave">
                                            <span v-if="!companyNameEdit">修改</span>
                                            <span v-else>保存</span>
                                        </span>
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
                                    <div v-if="!userNameEdit">
                                        <span class="text" v-if="userName === ''">用户名是您在U行政的昵称</span>
                                        <span class="text" v-else>{{userName}}</span>
                                    </div>
                                    <div v-else style="padding-right: 30px;">
                                        <Input type="text" v-model="userNameTemp" @on-blur="userNameSave('blur')" placeholder="请输入用户名"></Input>
                                    </div>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <span class="onSet"  v-if="userName === ''">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span>
                                        <span class="yesSet" v-else>
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span class="edit" v-if="userName === ''" @click="userNameSave">
                                            <span v-if="!userNameEdit">添加</span>
                                            <span v-else>保存</span>
                                        </span>
                                        <span class="edit" v-else  @click="userNameSave">
                                            <span v-if="!userNameEdit">修改</span>
                                            <span v-else>保存</span>
                                        </span>
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
                                    <span class="text">{{$store.state.userinfo.phone}}</span>
                                </Col>
                                <Col span="5">
                                    <div class="operation">
                                        <!-- <span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span> -->
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <!-- <span class="sep">|</span>
                                        <span>修改</span> -->
                                    </div>
                                </Col>
                            </Row>
                        </div>
                       <!--  <div class="item">
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
                        </div> -->
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
                                        <!-- span class="onSet">
                                            <Icon type="ios-information"></Icon>
                                            <span>未设置</span>
                                        </span> -->
                                        <span class="yesSet">
                                            <Icon type="ios-checkmark"></Icon>
                                            <span>已设置</span>
                                        </span>
                                        <span class="sep">|</span>
                                        <span @click="editpasswordOpen" class="edit">修改</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        <Modal
            v-model="editPassword.modal"
            title="修改密码"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Form ref="editPassword" :model="editPassword" :rules="ruleCustom" :label-width="80">
                    <FormItem label="原密码" prop="oldpassword">
                        <Input type="password" v-model="editPassword.oldpassword" placeholder="请输入原始密码"></Input>
                    </FormItem>
                    <FormItem label="新密码" prop="newpassword">
                        <Input type="password" v-model="editPassword.newpassword" placeholder="请输入新密码"></Input>
                    </FormItem>
                    <FormItem label="再次输入" prop="passwdcheck">
                        <Input type="password" v-model="editPassword.passwdcheck" placeholder="再次输入新密码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="editPasswordOk('editPassword')">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码！'));
                } else {
                    if( value.length < 8){
                        callback(new Error('请输入8位以上的密码！'));
                    }else{
                        if (this.editPassword.passwdcheck !== '') {
                            // 对第二个密码框单独验证
                            this.$refs.editPassword.validateField('passwdcheck');
                        }
                        callback();
                    }
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('再次输入新密码！'));
                } else if(value.length < 8){
                    callback(new Error('请输入8位以上的密码！'));
                } else if (value !== this.editPassword.newpassword) {
                    callback(new Error('请输入相同的新密码！'));
                } else {
                    callback();
                }
            };
            return {
                editPassword: {
                    modal: false,
                    oldpassword: '',
                    newpassword: '',
                    passwdcheck: ''
                },
                ruleCustom: {
                    oldpassword: [
                        { required: true, message: '请输入原始密码', trigger: 'blur' },
                        { type: 'string', min: 8, max: 20, message: '密码长度不能小于8位', trigger: 'blur' }
                    ],
                    newpassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdcheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                },
                phone: '',
                userName: '',
                userNameTemp: '',
                userNameEdit: false,
                companyName: '',
                companyNameTemp: '',
                companyNameEdit: false,
                userImg: ''
            }
        },
        created(){
            this.getData()
        },
        methods: {
            getData(){
                this.$ajax({
                    url: "/users",
                    method: 'GET'
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.phone = res.data.data.phone;
                        this.userName = res.data.data.nickname;
                        this.companyName = res.data.data.companyName;
                        this.userImg = res.data.data.avatarUrl;
                    }
                })
            },
            editpasswordOpen(){
                this.editPassword.modal = true;
                this.editPassword.oldpassword = '';
                this.editPassword.newpassword = '';
                this.editPassword.passwdcheck = '';
            },
            editPasswordOk(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$ajax({
                            url: "/users/password",
                            method: 'PATCH',
                            params: {
                                oldPassword: this.editPassword.oldpassword,
                                newPassword: this.editPassword.newpassword
                            }
                        }).then((res) => {
                            if(res.data.meta.code === 452){
                                this.$Notice.error({
                                    title: '原始密码错误！'
                                });
                            }else if(res.data.meta.code === 200){
                                this.$Notice.success({
                                    title: '修改成功。重新登录'
                                });
                                this.editPassword.modal = false;
                                this.$store.commit('SAVE_USER', {});
                                this.$delCookie("token");
                                this.$router.push({path:'/login'});
                                
                            }
                        })
                    } else {
                        this.$Notice.error({
                            title: '请完成验证再保存！'
                        });
                    }
                })
            },
            editUserImg(){
                let input = document.createElement('input');
                input.type = 'file';
                input.name = 'avatarFile';
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
                input.onchange = this.onImgChange;
                input.click();
            },
            onImgChange(e){
                let fileInput = e.target;
                let data = new FormData();
                data.append('avatarFile',fileInput.files[0]);
                this.$ajax({
                    url: "/users/setting",
                    method: 'PATCH',
                    data: data
                }).then((res) => {
                    if( res.data.meta.code === 200 ) { 
                        this.$Notice.success({
                            title: '修改成功。'
                        });
                        this.getData();
                    }
                })
            },
            companySave(str = ''){
                if(str === 'blur'){
                    this.$ajax({
                        url: "/users/setting",
                        method: 'PATCH',
                        params: {
                            companyName: this.companyNameTemp
                        }
                    }).then((res) => {
                        if(res.data.meta.code === 200){
                            this.$Notice.success({
                                title: '保存成功。'
                            });
                            this.companyNameEdit = false;
                            this.getData();
                        }
                    })
                }else{
                    this.companyNameTemp = this.companyName;
                    this.companyNameEdit = true;
                }
            },
            userNameSave(str = ''){
                if(str === 'blur'){
                    this.$ajax({
                        url: "/users/setting",
                        method: 'PATCH',
                        params: {
                            nickname: this.userNameTemp
                        }
                    }).then((res) => {
                        if(res.data.meta.code === 200){
                            this.$Notice.success({
                                title: '保存成功。'
                            });
                            this.userNameEdit = false;
                            this.getData();
                        }
                    })
                }else{
                    this.userNameTemp = this.userName;
                    this.userNameEdit = true;
                }
            }
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
                            cursor: pointer;
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
