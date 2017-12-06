<template>
    <div class="u-set">
        <Card>
            <p slot="title">个人设置</p>
            <div class="u-set-content">
                <div class="u-user-info">
                    <div class="user-img">
                        <img src="../images/user-img.png" alt="">
                    </div>
                    <div class="user-company center input-box">
                        <label class="input-text">公司</label>
                        <Input  placeholder="请输入公司名称"></Input>   
                    </div>
                    <div class="user-company center  input-box">
                        <label class="input-text">用户名</label>
                        <Input  placeholder="请设置用户名"></Input>   
                    </div>
                    <div class="user-title">账户绑定</div>
                    <div class="user-phone center  input-box">
                        <label class="input-text">已绑定手机号</label>
                        <Input  placeholder=""></Input>   
                    </div>
                    <div class="user-email center  input-box">
                        <label class="input-text">已绑定邮箱</label>
                        <Input  placeholder=""></Input>   
                    </div>
                    <div class="user-wx center  input-box">
                        <label class="input-text">已绑定微信</label>
                        <Input  placeholder=""></Input>   
                    </div>
                    <div class="save-btn center input-box">
                        <Button type="primary">保存</Button>
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
            .user-img{
                text-align: center;
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 100%;
                }
            }
            .center{
                text-align: center;
            }
            .input-box{
                margin-top: 15px;
                line-height: 40px;
            }
            .input-text{
                margin-right: 10px;
                width: 100px;
                display: inline-block;
                text-align: right;
            }
            .ivu-input-wrapper{
                width: auto;
            }
            .ivu-input{
                min-width: 300px;
                max-width: 400px;
                height: 40px;
            }
            .user-title{
                font-size: 18px;
                line-height: 50px;
            }
        }
    }
</style>
