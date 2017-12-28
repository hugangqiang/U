<template>
    <div class="u-file-index">
        <div class="u-header">
            <div class="filter">
                <div class="filter-box active">综合排序</div>
                <div class="filter-box">下载<Icon type="arrow-down-a"></Icon></div>
                <div class="filter-box">收藏<Icon type="arrow-down-a"></Icon></div>
                <div class="filter-box">最新<Icon type="arrow-down-a"></Icon></div>
            </div>
            <div class="u-file-content">
                <div class="u-file-list">
                    <div class="u-file-item" v-for="(item,index) in fileList.data" :key="item.id" >
                        <div class="flex-box">
                            <div class="type-img word"></div>
                            <div class="file-info">
                                <div class="name">{{item.name}}</div>
                                <div class="meta">
                                    <span>{{item.uploadDate}}</span>
                                    <span>{{item.downloadCount}}下载</span>
                                    <span>{{item.previewCount}}预览</span>
                                    <span>Excel文档</span>
                                </div>
                            </div>
                            <div class="operation">
                                <!-- <Button type="primary">下载</Button> -->
                                <Button type="warning" class="active">收藏</Button>
                                <Button type="warning">已收藏</Button>
                            </div>
                        </div>
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
                fileList: {
                    total: 0,
                    data: []
                }
            }
        },
        created(){

        },
        mounted(){
            this.getData({
                page: 1,
                pageSize: 10
            })
        },
        methods: {
           getData(json={}){
               this.$ajax({
                    url: "/materials",
                    method: "GET",
                    params: json
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.fileList.data = res.data.data.rows;
                        this.fileList.total = res.data.data.total;
                        console.log(this.fileList)
                    }
                })
           }
        }
    }
</script>
<style lang="less">
    .u-file-index{
        .u-header{
            .filter{
                background: #f2f2f2;
                height: 40px;
                line-height: 40px;
                border: 1px solid #f1f1f1;
                .filter-box{
                    width: 100px;
                    margin: -1px;
                    float: left;
                    text-align: center;
                    cursor: pointer;
                    color: #999;
                    .ivu-icon{
                        position: relative;
                        top: 1px;
                        margin-left: 2px;
                    }
                }
                .filter-box.active{
                    background: #0096ff;
                    color: #fff;
                }
            }
        }
        .u-file-content{
            .u-file-list{
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
        }
    }
</style>