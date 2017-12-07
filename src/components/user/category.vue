<template>
    <div class="u-category">
        <Card>
            <p slot="title">类目管理</p>
            <div class="u-table">
                <div class="u-table-add">
                    <Button type="primary" @click.native="categoryAdd">新增</Button>
                </div>
                <Tree :data="categoryData" :render="renderContent"></Tree>
            </div>
        </Card>
        <Modal
            v-model="categoryAddData.modal"
            title="新增类目/修改类目"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Row>
                     <Col span="4" v-show="categoryData.length > 0">
                        <label>选择级别</label>
                    </Col>
                    <Col span="18" v-show="categoryData.length > 0">
                        <ButtonGroup>
                            <Button :class="{active: categoryAddData.rankActive === '1'}" @click="categoryAddData.rankActive = '1'">一级</Button>
                            <Button :class="{active: categoryAddData.rankActive === '2'}" @click="categoryAddData.rankActive = '2'">二级</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span="4">
                        <label>类目</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="categoryAddData.category" placeholder="请输入类目" @on-enter="categoryAddOk"></Input>
                    </Col>
                    <Col span="4" v-show="categoryAddData.rankActive === '2'">
                        <label>父级</label>
                    </Col>
                    <Col span="20" v-show="categoryAddData.rankActive === '2'">
                        <Select v-model="categoryAddData.parentId" filterable>
                            <Option v-for="item in categoryData" :value="item.id" :key="item.id">{{ item.title }}</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" @click="categoryAddOk">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                categoryAddData: {
                    modal: false,
                    isEdit: false,
                    category: '',
                    parentId: '',
                    rankActive: '1',
                    id: ''
                },
                categoryData: []
            }
        },
        created(){
            
        },
        mounted(){
            this.getData();
        },
        methods: {
            getData(){
                this.$ajax.get('/categorys').then((res) => {
                    if(res.data.meta.code === 200){
                        this.categoryData = [];
                        for(let i=0; i<res.data.data.length; i++){
                            this.categoryData.push({
                                title: res.data.data[i].name,
                                id: res.data.data[i].id,
                                parentId: res.data.data[i].parentId,
                                level: res.data.data[i].level,
                                expand: true,
                                children: []
                            })
                            for(let j=0; j<res.data.data[i].childrens.length; j++){
                                this.categoryData[i].children.push({
                                    title: res.data.data[i].childrens[j].name,
                                    id: res.data.data[i].childrens[j].id,
                                    parentId: res.data.data[i].childrens[j].parentId,
                                    level: res.data.data[i].childrens[j].level
                                })
                            }
                        }
                    }
                })
            },
            renderContent (h, { root, node, data }) {
                let text = "一级分类";
                if(node.node.level === 2){
                    text = "二级分类";
                }
                return h('span', {
                    "class":{
                        categoryItem: true
                    },
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.categoryEdit( root, node, data);
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.categoryDel( root, node, data )
                                }
                            }
                        }, '删除')
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '200px'
                        }
                    }, text)
                ]);
            },
            categoryEdit(root, node, data){
                this.categoryAddData.rankActive = '1';
                this.categoryAddData.parentId = '';
                if(data.level === 2){
                    this.categoryAddData.rankActive = '2';
                    this.categoryAddData.parentId = data.parentId;
                }
                this.categoryAddData.id = data.id;
                this.categoryAddData.category = data.title;
                this.categoryAddData.isEdit = true;
                this.categoryAddData.modal = true;
            },
            categoryDel(root, node, data){
                this.$Modal.confirm({
                    content: '<h3>确认是否删除!</h3>',
                    okText: '是',
                    cancelText: '否',
                    onOk: () => {
                        this.$ajax({
                            url: "/categorys/"+data.id,
                            method: "DELETE"
                        }).then((res) => {
                            if(res.data.meta.code === 452){
                                this.$Notice.error({
                                    title: '该类目下存在子类目，不能删除!'
                                });
                            } else if(res.data.meta.code === 200){
                                this.getData();
                            }
                        })
                    }
                });
            },
            categoryAdd(){
                this.categoryAddData.id = '';
                this.categoryAddData.rankActive = '1';
                this.categoryAddData.category = '';
                this.categoryAddData.parentId = '';
                this.categoryAddData.isEdit = false;
                this.categoryAddData.modal = true;
            },
            categoryAddOk(){
                /** 
                 * 保存添加人员
                */
                let level = 1;
                let parentId = 0;
                if(this.categoryAddData.category === ''){
                    this.$Notice.warning({
                        title: '请输入类目名！'
                    });
                    return;
                }
                if(this.categoryAddData.rankActive === '2'){
                    level = 2;
                    if(this.categoryAddData.parentId === ''){
                        this.$Notice.warning({
                            title: '请选择父级类！'
                        });
                        return;
                    }else{
                        parentId = this.categoryAddData.parentId;
                    }
                }
                
                let _this = this;
                function save(method,data,mes){
                    _this.$ajax({
                        url: "/categorys",
                        method: method,
                        params: data
                    }).then((res) => {
                        if(res.data.meta.code === 200){
                            _this.$Notice.success({
                                title: mes
                            });
                            _this.getData()
                            _this.categoryAddData.modal = false;
                        }
                    })
                }
                if(this.categoryAddData.isEdit){
                    save('PUT',{
                        id: _this.categoryAddData.id,
                        name: _this.categoryAddData.category,
                        parentId: parentId,
                        level: level
                    },'修改成功。');
                }else{
                    save('POST',{
                        name: _this.categoryAddData.category,
                        parentId: parentId,
                        level: level
                    },'添加成功。');
                }
            }
        }
    }
</script>
<style lang="less">
    .u-modalAddData{
        .ivu-btn-group{
            .ivu-btn.active{
                background: #2b85e4;
                color: #fff;
            }
        }
    }
    .categoryItem{
        position: relative;
        line-height: 45px;
    }
    .categoryItem::after{
        content: '';
        width: 100%;
        height: 1px;
        background: #f0f0f0;
        position: absolute;
        left: -20px;
        bottom: 0;
    }
    .ivu-tree ul li{
        margin: 0 !important;
    }
    .ivu-tree li ul{
        padding: 0 !important;
    }
</style>
