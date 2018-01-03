<template>
    <div class="u-file-index">
        <div class="u-header">
            <div class="filter">
                <div class="filter-box" :class="{active: sortActive === ''}" @click="sort('')">综合排序</div>
                <div class="filter-box" :class="{active: sortActive === 'download'}" @click="sort('download')">下载<Icon type="arrow-down-a"></Icon></div>
                <div class="filter-box" :class="{active: sortActive === 'collect'}" @click="sort('collect')">预览<Icon type="arrow-down-a"></Icon></div>
                <div class="filter-box" :class="{active: sortActive === 'new'}" @click="sort('new')">最新<Icon type="arrow-down-a"></Icon></div>
            </div>
            <div class="u-file-content">
                <div class="u-file-list">
                    <div class="u-file-item" v-for="(item,index) in fileList.data" :key="item.id" >
                        <div class="flex-box">
                            <div class="type-img excel" v-if="item.fileSuffix === 'xlsx' || item.fileSuffix === 'xls'"></div>
                            <div class="type-img word" v-if="item.fileSuffix === 'docx' || item.fileSuffix === 'doc' || item.fileSuffix === 'wpt'|| item.fileSuffix === 'wps' || item.fileSuffix === 'dotx'"></div>
                            <div class="type-img ppt" v-if="item.fileSuffix === 'pptx' || item.fileSuffix === 'ppt'"></div>
                            <div class="type-img pdf" v-if="item.fileSuffix === 'pdf'"></div>
                            <div class="type-img other" v-if="item.fileSuffix === ''"></div>
                            <div class="file-info">
                                <router-link :to="'/file/list/view?id='+item.id">
                                    <div class="name">{{item.name}}</div>
                                </router-link>
                                <div class="meta">
                                    <span>{{item.uploadDate}}</span>
                                    <span>{{item.downloadCount}}下载</span>
                                    <span>{{item.previewCount}}预览</span>
                                    <span v-if="item.fileSuffix === 'xlsx' || item.fileSuffix === 'xls'">Excel文档</span>
                                    <span v-if="item.fileSuffix === 'docx' || item.fileSuffix === 'doc' || item.fileSuffix === 'wpt'|| item.fileSuffix === 'wps' || item.fileSuffix === 'dotx'">Word文档</span>
                                    <span v-if="item.fileSuffix === 'pptx' || item.fileSuffix === 'ppt'">PTT文档</span>
                                    <span v-if="item.fileSuffix === 'pdf'">PDF文档</span>
                                    <span v-if="item.fileSuffix === ''">其他文档</span>
                                </div>
                            </div>
                            <div class="operation">
                                <!-- <Button type="primary">下载</Button> -->
                                <Button type="warning" class="active" v-if="!item.isCollect" @click="collect(item,1)">收藏</Button>
                                <Button type="warning" v-else  @click="collect(item,0)">已收藏</Button>
                            </div>
                        </div>
                    </div>
                    <div class="u-file-item nullData" v-show="fileList.data.length === 0 && !loadList">
                        暂无文件，急需需要请联系QQ：1031514657
                    </div>
                </div>
                <div class="u-file-list-pages" v-show="fileList.total>15">
                    <Page ref="pages" :total="fileList.total" :current="1" show-sizer  show-elevator placement="top" @on-change="changePage" @on-page-size-change="changeSizePage"></Page>
                </div>
            </div>
        </div>
        <Spin class="loadlist" fix v-show="loadList">
            <div class="loader">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                </svg>
            </div>
        </Spin>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loadList: false,
                fileList: {
                    total: 0,
                    current: 1,
                    pageSize: 15,
                    data: []
                },
                sortActive: ''
            }
        },
        created(){

        },
        mounted(){
            this.getData({
                page: this.fileList.current,
                pageSize: this.fileList.pageSize
            })
        },
        methods: {
            getData(json={},load=true){
                if(load){
                    this.fileList.data = [];
                    this.fileList.total = 0;
                    this.loadList = true;
                }
                this.$ajax({
                    url: "/materials/search",
                    method: "GET",
                    params: json
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        if(load){
                            this.loadList = false;
                        }
                        this.fileList.data = res.data.data.rows;
                        this.fileList.total = res.data.data.total;
                    }
                })
            },
            collect(item,num){
                if(typeof this.$store.state.userinfo.phone != 'undefined'){
                    this.$ajax({
                        url: "/materials/collect",
                        method: "POST",
                        params: {
                            id: item.id,
                            type: num
                        }
                    }).then((res) => {
                        if(res.data.meta.code === 200){
                            if(num === 1){
                                item.isCollect = true;
                            }else{
                                item.isCollect = false;
                            }
                            this.fileList.data.push({});
                            this.fileList.data.pop();
                        }
                    })
                }else{
                    this.$router.push({path:'/auth/login'});
                }
            },
            changePage (current) {
                this.fileList.current = current;
                let json = {};
                if(typeof this.$router.currentRoute.query.s != 'undefined'){
                    json.keyword = this.$router.currentRoute.query.s;
                }
                if(typeof this.$router.currentRoute.query.tag != 'undefined'){
                    json.tagId = this.$router.currentRoute.query.tag;
                }
                if(typeof this.$router.currentRoute.query.mytype != 'undefined'){
                    json.searchType = this.$router.currentRoute.query.mytype;
                }
                json.page = this.fileList.current;
                json.pageSize = this.fileList.pageSize;

                this.getData(json,false)
            },
            changeSizePage (size){
                this.fileList.pageSize = size;
                let json = {};
                if(typeof this.$router.currentRoute.query.s != 'undefined'){
                    json.keyword = this.$router.currentRoute.query.s;
                }
                if(typeof this.$router.currentRoute.query.tag != 'undefined'){
                    json.tagId = this.$router.currentRoute.query.tag;
                }
                if(typeof this.$router.currentRoute.query.mytype != 'undefined'){
                    json.searchType = this.$router.currentRoute.query.mytype;
                }
                json.page = this.fileList.current;
                json.pageSize = this.fileList.pageSize;
                this.getData(json,false)
            },
            sort(str=''){
                this.sortActive = str;
                let json= {};
                if(typeof this.$router.currentRoute.query.s != 'undefined'){
                    json.keyword = this.$router.currentRoute.query.s;
                }
                if(typeof this.$router.currentRoute.query.mytype != 'undefined'){
                    json.searchType = this.$router.currentRoute.query.mytype;
                }
                if(typeof this.$router.currentRoute.query.tag != 'undefined'){
                    json.tagId = this.$router.currentRoute.query.tag;
                }
                if(str != ''){
                    json.sortField = str;
                }
                json.page = 1;
                json.pageSize = this.fileList.pageSize;
                
                this.getData(json);
                this.$nextTick(function(){
                    this.$refs['pages'].currentPage = 1;
                })
            },
            watchRoute(){
                let json = {};
                if(typeof this.$router.currentRoute.query.s != 'undefined'){
                    json.keyword = this.$router.currentRoute.query.s;
                }
                if(typeof this.$router.currentRoute.query.tag != 'undefined'){
                    json.tagId = this.$router.currentRoute.query.tag;
                }
                if(typeof this.$router.currentRoute.query.mytype != 'undefined'){
                    json.searchType = this.$router.currentRoute.query.mytype;
                }
                json.page = 1;
                json.pageSize = this.fileList.pageSize;
                this.getData(json);
                this.$nextTick(function(){
                    this.$refs['pages'].currentPage = 1;
                })
            }
        },
        watch: {
            '$route': 'watchRoute'
        }
    }
</script>
<style lang="less">
    .loadlist{
        min-height: 300px;
    }
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
                .nullData{
                    text-align: center;
                    line-height: 50px;
                    font-size: 16px;
                    margin-top: 30px;
                }
            }
            .u-file-list-pages{
                text-align: center;
                margin: 50px 0;
            }
        }
    }
</style>