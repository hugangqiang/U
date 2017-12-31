<template>
    <div class="layout">
        <div class="u-file-list">
            <div class="u-file-btns">
                <Button type="primary">上传</Button>
                <Button type="warning">我的上传</Button>
                <Button type="success">我的收藏</Button>
            </div>
            <div class="u-file-search">
                <Row>
                    <Col span="18">
                        <div class="center">
                            <Input  v-model="searchValue" placeholder="请输入搜索关键字">
                                <Button slot="append">搜索</Button>
                            </Input>
                            <div class="hotTag">
                                <span>莎莎</span>
                                <span>水果和阿</span>
                                <span>水果和</span>
                                <span>水果和阿斯蒂芬</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="6"></Col>
                </Row>
            </div>
            <Row>
                <Col span="18">
                    <router-view></router-view>
                </Col>
                <Col span="6">
                    <div class="hotDown">
                        <div class="title">本周热门下载榜</div>
                        <div class="item" v-for="(item,index) in hotDown"><span class="num">{{index+1}}</span>{{item.name}}</div>
                    </div>
                    <div class="hotTags">
                        <div class="title">热门标签</div>
                        <div class="items">
                            <div class="item" v-for="item in hotTags" :key="item.key">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="adSass">
                        <img src="../images/adsass.png" alt="">
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                searchValue: '',
                hotTags: [],
                hotDown: []
            }
        },
        created(){

        },
        mounted(){
            this.getHotData()
        },
        methods: {
            getHotData(){
                this.$ajax({
                    url: "/tags/hot",
                    method: "GET"
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.hotTags = res.data.data;
                    }
                })

                this.$ajax({
                    url: "/materials/hot",
                    method: "GET"
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.hotDown = res.data.data;
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .u-file-list{
        .u-file-btns{
            text-align: right;
            margin: 20px 0;
            .ivu-btn{
                margin-left: 10px;
            }
        }
        .u-file-search{
            text-align: center;
            margin: 50px 0 40px;
            .center{
                width: 600px;
                display: inline-block;
                text-align: left;
                .ivu-input{
                    height: 35px;
                    line-height: 35px;
                    padding: 0 5px;
                    border: 1px solid #cccccc;
                }
                .ivu-input:focus {
                    outline: 0;
                    box-shadow: none;
                }
                .ivu-input-group-append{
                    width: 100px;
                    line-height: 33px;
                    height: 33px;
                    background: #0096ff;
                    border: none;
                    border-radius: 0;
                    padding: 0;
                    font-size: 14px;
                    cursor: pointer;
                    .ivu-btn{
                        color: #fff;
                    }
                }
                .hotTag{
                    span{
                        font-size: 14px;
                        color: #ffa100;
                        line-height: 30px;
                        margin-right: 10px;
                    }
                }
            }
        }
        .hotDown{
            padding: 0 0 0 50px;
            .title{
                color: #ff5050;
                font-size: 16px;
                font-weight: bold;
                line-height: 30px;
                padding-left: 10px;
                padding-top: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid #e0e0e0;
                position: relative;
            }
            .title:before{
                content: '';
                width: 3px;
                height: 20px;
                display: inline-block;
                background: #ff5050;
                position: absolute;
                top: 10px;
                left: 0;
            }
            .item{
                line-height: 20px;
                padding-top: 10px;
                padding-bottom: 10px;
                padding-left: 25px;
                border-bottom: 1px solid #e0e0e0;
                color: #0096ff;
                cursor: pointer;
                .num{
                    color: #999;
                    margin-right: 15px;
                }
            }
        }
        .hotTags{
            margin-top: 45px;
            padding: 0 0 0 50px;
            .title{
                color: #ff5050;
                font-size: 16px;
                font-weight: bold;
                line-height: 30px;
                padding-left: 10px;
                padding-top: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid #e0e0e0;
                position: relative;
            }
            .title:before{
                content: '';
                width: 3px;
                height: 20px;
                display: inline-block;
                background: #ff5050;
                position: absolute;
                top: 10px;
                left: 0;
            }
            .items{
                padding: 10px;
                border-bottom: 1px solid #e0e0e0;
            }
            .item{
                display: inline-block;
                line-height: 26px;
                margin: 3px;
                padding: 0 10px;
                background: #ff7575;
                font-size: 14px;
                color: #fff;
            }
        }
        .adSass{
            padding-left: 50px;
            text-align: center;
            margin-top: 50px;
        }
    }
</style>