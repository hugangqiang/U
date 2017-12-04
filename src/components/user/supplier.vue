<template>
    <div class="u-supplier">
        <Card>
            <p slot="title">供应商管理</p>
            <div class="u-table">
                <div class="u-table-add">
                    <Button type="primary" @click.native="supplierAdd">新增</Button>
                </div>
                <div class="u-table-filter">

                </div>
                <Table stripe :columns="supplierTitle" :data="supplierData.rows"></Table>
                <div class="u-table-page" v-if="supplierData.total > 10">
                    <Page :total="supplierData.total" :current="1" show-sizer  show-elevator placement="top" @on-change="changePage" @on-page-size-change="changeSizePage"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                supplierAddData: {
                    modal: false,
                    isEdit: false,
                    name: '',
                    supplier: '',
                    email: '',
                    phone: '',
                    id: ''
                },
                isActive: 'all',
                depts: [],
                supplierTitle: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'supplierName'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '手机号',
                        key: 'mobilePhone'
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
                                            this.depaEdit(params);
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
                                            this.depaIsStop(params);
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
                                            this.depaDel(params)
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
            this.getDepts();
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
            getDepts(){
                /** 
                 * 获取所有部门
                */
                this.$ajax.get('/depts').then((res) => {
                    if(res.data.meta.code === 200){
                        this.depts = res.data.data;
                        for(let i=0; i<this.depts.length; i++){
                            this.depts[i].isActive = false; 
                        }
                    }
                });
            },
            supplierAdd(){
                /** 
                 * 打开添加人模态框
                */
                this.supplierAddData.name = '';
                this.supplierAddData.supplier = '';
                this.supplierAddData.email = '';
                this.supplierAddData.phone = '';
                this.supplierAddData.modal = true;
                this.supplierAddData.isEdit = false;
            },
            depaEdit(data){
                /** 
                 * 打开添加人模态框
                */
                this.supplierAddData.name = data.row.name;
                this.supplierAddData.supplier = data.row.supplierName;
                this.supplierAddData.email = data.row.email;
                this.supplierAddData.phone = data.row.mobilePhone;
                this.supplierAddData.id = data.row.id;
                this.supplierAddData.isEdit = true;
                this.supplierAddData.modal = true;
            },
            depaAddOk(){
                /** 
                 * 保存添加人员
                */
                if(this.supplierAddData.name === ''){
                    this.$Notice.warning({
                        title: '请输入姓名！'
                    });
                    return;
                }
                if(this.supplierAddData.supplier === ''){
                    this.$Notice.warning({
                        title: '请输入部门！'
                    });
                    return;
                }
                if(this.supplierAddData.email != ''){
                    let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if(!regEmail.test(this.supplierAddData.email)){
                        this.$Notice.warning({
                            title: '请输入正确的邮箱！'
                        });
                        return;
                    }
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
                function save(method,data,mes){
                    _this.$ajax({
                        url: "/employees",
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
                            _this.getDepts();
                            _this.supplierAddData.modal = false;
                        }
                    })
                }
                if(this.supplierAddData.isEdit){
                    save('PUT',{
                        id: _this.supplierAddData.id,
                        name: _this.supplierAddData.name,
                        supplierName: _this.supplierAddData.supplier,
                        email: _this.supplierAddData.email,
                        mobilePhone: _this.supplierAddData.phone
                    },'修改成功。');
                }else{
                    save('POST',{
                        name: _this.supplierAddData.name,
                        supplierName: _this.supplierAddData.supplier,
                        email: _this.supplierAddData.email,
                        mobilePhone: _this.supplierAddData.phone
                    },'添加成功。');
                }
            },
            depaIsStop(data){
                let type = '0';
                let mes = '停用成功。';
                if(data.row.status === 'N'){
                    type = '1';
                    mes = '启用成功。';
                }
                this.$ajax({
                    url: "/employees/enable/"+data.row.id,
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
            depaDel(data){
                this.$Modal.confirm({
                    content: '<h3>确认是否删除!</h3>',
                    okText: '是',
                    cancelText: '否',
                    onOk: () => {
                        this.$ajax({
                            url: "/employees/"+data.row.id,
                            method: "DELETE"
                        }).then((res) => {
                            if(res.data.meta.code === 200){
                                this.getData({
                                    page: this.current,
                                    pageSize: this.pageSize
                                });
                                this.getDepts();
                            }
                        })
                    }
                });
            },
            depaFilter(item){
                if( item === 'all' ){
                    this.isActive = 'all';
                    this.getData({
                        page: this.current,
                        pageSize: this.pageSize
                    })
                }else{
                    this.isActive = item.key;
                    this.getData({
                        page: this.current,
                        pageSize: this.pageSize,
                        supplierId: item.key
                    })
                }
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
