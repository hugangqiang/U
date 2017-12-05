<template>
    <div class="u-supplier">
        <Card>
            <p slot="title">供应商管理</p>
            <div class="u-table">
                <div class="u-table-add">
                    <Button type="primary" @click.native="supplierAdd">新增</Button>
                </div>
                <div class="u-table-filter">
                    <Input v-model="searchValue" placeholder="搜索" style="width: 300px" @on-change="search"></Input>
                </div>
                <Table stripe :columns="supplierTitle" :data="supplierData.rows"></Table>
                <div class="u-table-page" v-if="supplierData.total > 10">
                    <Page :total="supplierData.total" :current="1" show-sizer  show-elevator placement="top" @on-change="changePage" @on-page-size-change="changeSizePage"></Page>
                </div>
            </div>
        </Card>
        <Modal
            v-model="supplierAddData.modal"
            title="新增供应商/修改供应商"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Row>
                    <Col span="4">
                        <label>供应商</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="supplierAddData.supplier" placeholder="请输入供应商" @on-enter="supplierAddOk"></Input>
                    </Col>
                    <Col span="4">
                        <label>联系人</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="supplierAddData.contact" placeholder="请输入联系人" @on-enter="supplierAddOk"></Input>
                    </Col>
                    <Col span="4">
                        <label>手机号</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="supplierAddData.phone" placeholder="请输入手机号" @on-enter="supplierAddOk"></Input>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" @click="supplierAddOk">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { Spell } from '../js/spell.js';
    
    export default {
        data () {
            return {
                supplierAddData: {
                    modal: false,
                    isEdit: false,
                    contact: '',
                    supplier: '',
                    phone: '',
                    id: ''
                },
                searchValue: '',
                supplierTitle: [
                    {
                        title: '供应商',
                        key: 'name'
                    },
                    {
                        title: '联系人',
                        key: 'contacts'
                    },
                    {
                        title: '手机号',
                        key: 'phone'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {

                            let btnType = 'success';
                            let btnText = '停用';
                            if(params.row.status === 'N'){
                                btnType = 'warning';
                                btnText = '启用'
                            }

                            return h('div', [
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
                                            this.supplierEdit(params);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: btnType,
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: (e) => {
                                            this.supplierIsStop(params);
                                        }
                                    }
                                }, btnText),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.supplierDel(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                supplierData: {},
                current: 1,
                pageSize: 10
            }
        },
        mounted(){
            
            this.getData({
                page: this.current,
                pageSize: this.pageSize
            });
        },
        methods: {
            getData(json = {}){
                this.$ajax({
                    url: "/suppliers",
                    method: "GET",
                    params: json
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.supplierData = res.data.data;
                    }
                })
            },
            supplierAdd(){
                /** 
                 * 打开添加人模态框
                */
                this.supplierAddData.contact = '';
                this.supplierAddData.supplier = '';
                this.supplierAddData.phone = '';
                this.supplierAddData.modal = true;
                this.supplierAddData.isEdit = false;
            },
            supplierEdit(data){
                /** 
                 * 打开添加人模态框
                */
                this.supplierAddData.contact = data.row.contacts;
                this.supplierAddData.supplier = data.row.name;
                this.supplierAddData.phone = data.row.phone;
                this.supplierAddData.id = data.row.id;
                this.supplierAddData.isEdit = true;
                this.supplierAddData.modal = true;
            },
            supplierAddOk(){
                /** 
                 * 保存添加人员
                */
                if(this.supplierAddData.supplier === ''){
                    this.$Notice.warning({
                        title: '请输入供应商名称！'
                    });
                    return;
                }                
                if(this.supplierAddData.phone != ''){
                    let regPhone = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                    if(!regPhone.test(this.supplierAddData.phone)){
                        this.$Notice.warning({
                            title: '请输入正确的手机号！'
                        });
                        return;
                    }
                }
                let _this = this;
                let S = new Spell();
                function save(method,data,mes){
                    _this.$ajax({
                        url: "/suppliers",
                        method: method,
                        params: data
                    }).then((res) => {
                        if(res.data.meta.code === 200){
                            _this.$Notice.success({
                                title: mes
                            });
                            _this.getData({
                                page: _this.current,
                                pageSize: _this.pageSize
                            })
                            _this.supplierAddData.modal = false;
                        }
                    })
                }

                
                console.log(S.ConvertPinyin("强大"))

                if(this.supplierAddData.isEdit){
                    save('PUT',{
                        id: _this.supplierAddData.id,
                        contacts: _this.supplierAddData.contact,
                        name: _this.supplierAddData.supplier,
                        shortName: S.ConvertPinyin(_this.supplierAddData.supplier),
                        phone: _this.supplierAddData.phone
                    },'修改成功。');
                }else{
                    save('POST',{
                        contacts: _this.supplierAddData.contact,
                        name: _this.supplierAddData.supplier,
                        shortName: S.ConvertPinyin(_this.supplierAddData.supplier),
                        phone: _this.supplierAddData.phone
                    },'添加成功。');
                }
            },
            supplierIsStop(data){
                let type = '0';
                let mes = '停用成功。';
                if(data.row.status === 'N'){
                    type = '1';
                    mes = '启用成功。';
                }
                this.$ajax({
                    url: "/suppliers/enable/"+data.row.id,
                    method: "PATCH",
                    params: {
                        type: type
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.getData({
                            page: this.current,
                            pageSize: this.pageSize
                        })
                        this.$Notice.success({
                            title: mes
                        });
                    }
                })
            },
            supplierDel(data){
                this.$Modal.confirm({
                    content: '<h3>确认是否删除!</h3>',
                    okText: '是',
                    cancelText: '否',
                    onOk: () => {
                        this.$ajax({
                            url: "/suppliers/"+data.row.id,
                            method: "DELETE"
                        }).then((res) => {
                            if(res.data.meta.code === 200){
                                this.getData({
                                    page: this.current,
                                    pageSize: this.pageSize
                                });
                            }
                        })
                    }
                });
            },
            search(){
                this.getData({
                    page: this.current,
                    pageSize: this.pageSize,
                    search: this.searchValue
                })
            },
            changePage (current) {
                this.current = current;
                this.getData({
                    page: this.current,
                    pageSize: this.pageSize
                })
            },
            changeSizePage (size){
                this.pageSize = size;
                this.getData({
                    page: this.current,
                    pageSize: this.pageSize
                })
            }
        }
    }
</script>
<style lang="less">

</style>
