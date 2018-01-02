<template>
    <div class="u-file-view">
        <div class="file-header-info">
            <div class="u-file-item" >
                <div class="flex-box">
                    <div class="type-img word"></div>
                    <div class="file-info">
                        <div class="name">{{fileInfo.name}}</div>
                        <div class="meta">
                            <span>{{fileInfo.uploadDate}}</span>
                            <span>{{fileInfo.downloadCount}}下载</span>
                            <span>{{fileInfo.previewCount}}预览</span>
                            <span>Excel文档</span>
                        </div>
                    </div>
                    <div class="operation">
                        <!-- <Button type="primary">下载</Button> -->
                        <!-- <Button type="warning" class="active" v-if="!fileInfo.isCollect" @click="collect(fileInfo,1)">收藏</Button>
                        <Button type="warning" v-else  @click="collect(fileInfo,0)">已收藏</Button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                fileInfo: {}
            }
        },
        created(){

        },
        mounted(){
            this.getData(this.$router.currentRoute.query.id);
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
    }
</style>