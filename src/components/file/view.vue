<template>
    <div class="u-file-view">
        <div class="file-header-info">
            <div class="u-file-item" >
                <div class="flex-box">
                    <div class="type-img excel" v-if="fileInfo.fileSuffix === 'xlsx' || fileInfo.fileSuffix === 'xls'"></div>
                    <div class="type-img word"  v-if="fileInfo.fileSuffix === 'docx' || fileInfo.fileSuffix === 'doc' || fileInfo.fileSuffix === 'wpt'|| fileInfo.fileSuffix === 'wps' || fileInfo.fileSuffix === 'dotx'"></div>
                    <div class="type-img ppt" v-if="fileInfo.fileSuffix === 'pptx' || fileInfo.fileSuffix === 'ppt'"></div>
                    <div class="type-img pdf" v-if="fileInfo.fileSuffix === 'pdf'"></div>
                    <div class="type-img other" v-if="fileInfo.fileSuffix === ''"></div>
                    <div class="file-info">
                        <div class="name">{{fileInfo.name}}</div>
                        <div class="meta">
                            <span>{{fileInfo.uploadDate}}</span>
                            <span>{{fileInfo.downloadCount}}下载</span>
                            <span>{{fileInfo.previewCount}}预览</span>
                            <span v-if="fileInfo.fileSuffix === 'xlsx' || fileInfo.fileSuffix === 'xls'">Excel文档</span>
                            <span v-if="fileInfo.fileSuffix === 'docx' || fileInfo.fileSuffix === 'doc'">Word文档</span>
                            <span v-if="fileInfo.fileSuffix === 'pptx' || fileInfo.fileSuffix === 'ppt'">PTT文档</span>
                            <span v-if="fileInfo.fileSuffix === 'pdf'">PDF文档</span>
                            <span v-if="fileInfo.fileSuffix === ''">其他文档</span>
                        </div>
                    </div>
                    <div class="operation">
                        <Button type="primary" @click="download">下载</Button>
                        <Button type="warning" class="active" v-if="!fileInfo.isCollect" @click="collect(1)">收藏</Button>
                        <Button type="warning" v-else  @click="collect(0)">已收藏</Button>
                        <Button class="copy" :data-clipboard-text="href" type="success">分享</Button>
                    </div>
                </div>
            </div>
            <div class="u-file-view-info">
                <Carousel dots="none" arrow="always">
                    <CarouselItem v-for="item in fileInfo.bigPics" :key="item.id">
                        <div class="demo-carousel">
                            <img :src="item" alt="">
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <div class="tags">
                <div class="tagsIcon"><Icon type="bookmark"></Icon></div>
                <div class="name">标签：</div>
                <div class="tags-box">
                    <router-link v-for="item in fileInfo.tags" :key="item.key" :to="'/file/list/index?tag='+item.id">
                        <span class="box">{{ item.name }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                fileInfo: {},
                href: window.location.href
            }
        },
        created(){

        },
        mounted(){
            this.getData(this.$router.currentRoute.query.id);

            const copy = new this.$copy('.copy');
            let _this = this;
            copy.on('success', function(e) {
                _this.$Notice.success({
                    title: '分享链接已复制。'
                });
                e.clearSelection();
            });
            copy.on('error', function(e) {
                _this.$Notice.error({
                    title: '复制失败！'
                });
            });
        },
        methods: {
            getData(id){
                this.$ajax({
                    url: "/materials/detail",
                    method: "GET",
                    params: {
                        id: id
                    }
                }).then((res) => {
                    if( res.data.meta.code === 200 ){
                        this.fileInfo = res.data.data;
                    }
                })
            },
            download(){
                if(typeof this.$store.state.userinfo.phone != 'undefined'  && this.$store.state.userinfo.phone != '18888888888'){
                    this.$ajax({
                        url: "/materials/download",
                        method: "GET",
                        params: {
                            id: this.fileInfo.id,
                            fileId: this.fileInfo.fileId
                        }
                    }).then((res) => {
                        if(res.data.meta.code === 452){
                            this.$Notice.error({
                                title: '文件错误!'
                            });
                        } else if(res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                            let a = document.createElement('a');
                            a.href= res.data.data;
                            a.download = this.fileInfo.name;
                            a.click();
                        }
                    })
                }else{
                    this.$store.commit('SAVE_USER', {});
                    this.$delCookie("token");
                    this.$router.push({path:'/auth/login'});
                }
            },
            collect(num){
                if(typeof this.$store.state.userinfo.phone != 'undefined' && this.$store.state.userinfo.phone != '18888888888'){
                    this.$ajax({
                        url: "/materials/collect",
                        method: "POST",
                        params: {
                            id: this.fileInfo.id,
                            type: num
                        }
                    }).then((res) => {
                        if(res.data.meta.code === 200){
                            if(num === 1){
                                this.fileInfo.isCollect = true;
                            }else{
                                this.fileInfo.isCollect = false;
                            }
                        }
                    })
                }else{
                    this.$store.commit('SAVE_USER', {});
                    this.$delCookie("token");
                    this.$router.push({path:'/auth/login'});
                }
            },
            watchRoute(){
                this.getData(this.$router.currentRoute.query.id);
            }
        },
        watch: {
            '$route': 'watchRoute'
        }
    }
</script>
<style lang="less">
    .u-file-view{
        .u-file-item{
            position: relative;
            .flex-box{
                display: flex;
                flex-direction: row;
                padding: 20px;
                border-bottom: 1px solid #e0e0e0;
                .type-img{
                    margin-right: 20px;
                }
                .file-info{
                    .name{
                        color: #4c4c4c;
                        font-size: 16px;
                        margin-top: 5px;
                    }
                    .meta{
                        font-size: 14px;
                        color: #999;
                        margin-top: 10px;
                        span{
                            margin-right: 30px;
                        }
                    }
                }
                .operation{
                    position: absolute;
                    right: 20px;
                    top: 34px;
                    .ivu-btn{
                        padding: 0;
                        width: 80px;
                        height: 32px;
                    }
                    .ivu-btn.active{
                        background: #fff;
                        border: 2px solid #f90;
                        color: #f90;
                        font-weight: bold;
                    }
                }
            }
        }
        .tags{
            margin: 50px 0;
            border: 1px solid #e0e0e0;
            padding: 10px 20px 40px;
            display: flex;
            flex-direction: row;
            font-size: 14px;
            .tagsIcon{
                font-size: 80px;
                line-height: 1;
                color: red;
            }
            .name{
                width: 100px;
                text-align: right;
                font-weight: bold;
                padding-top: 10px;
            }
            .tags-box{
                padding-top: 8px;
                .box{
                    color: #333;
                    margin-right: 15px;
                    line-height: 25px;
                }
            }
        }
        .u-file-view-info{
            margin: 30px 0;
            .ivu-carousel-arrow{
                top: 0px;
                height: 100%;
                border-radius: 0;
                transform: translateY(0);
                background-color: rgba(31,45,61,.5);
            }
            .ivu-carousel-arrow.left{
                left: 0;
            }
            .ivu-carousel-arrow.right{
                right: 0;
            }
            .demo-carousel{
                text-align: center;
            }
        }
    }
</style>