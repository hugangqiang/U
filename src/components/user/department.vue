<template>
    <div class="u-department">
        <Card>
            <p slot="title">部门人员管理</p>
            <div class="u-table">
                <div class="u-table-add">
                    <Button type="primary" @click.native="depaAdd">新增</Button>
                </div>
                <div class="u-table-filter">
                    
                </div>
                <Table stripe :columns="departmentTitle" :data="departmentData"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="10" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
            </div>
        </Card>
        <Modal
            v-model="depaAddData.modal"
            title="新增人员/修改人员"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Row>
                    <Col span="4">
                        <label>姓名</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="depaAddData.name" placeholder="请输入姓名"></Input>
                    </Col>
                    <Col span="4">
                        <label>部门</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="depaAddData.department" placeholder="请输入部门"></Input>
                    </Col>
                    <Col span="4">
                        <label>邮箱</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="depaAddData.email" placeholder="请输入邮箱"></Input>
                    </Col>
                    <Col span="4">
                        <label>手机号</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="depaAddData.phone" placeholder="请输入手机号"></Input>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" @click="depaAddOk">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                depaAddData: {
                    modal: false,
                    isEdit: false,
                    name: '',
                    department: '',
                    email: '',
                    phone: '',
                    id: ''
                },
                departmentTitle: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'departmentName'
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
                departmentData: []
            }
        },
        created(){
            this.getData()
        },
        methods: {
            getData(){
                let employeeList = {};
                this.$ajax({
                    url: "/employees",
                    method: "GET",
                    params: employeeList
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.departmentData = res.data.data.rows;
                    }
                })
            },
            depaAdd(){
                /** 
                 * 打开添加人模态框
                */
                this.depaAddData.name = '';
                this.depaAddData.department = '';
                this.depaAddData.email = '';
                this.depaAddData.phone = '';
                this.depaAddData.modal = true;
                this.depaAddData.isEdit = false;
            },
            depaEdit(data){
                /** 
                 * 打开添加人模态框
                */
                this.depaAddData.name = data.row.name;
                this.depaAddData.department = data.row.departmentName;
                this.depaAddData.email = data.row.email;
                this.depaAddData.phone = data.row.mobilePhone;
                this.depaAddData.id = data.row.id;
                this.depaAddData.isEdit = true;
                this.depaAddData.modal = true;
            },
            depaAddOk(){
                /** 
                 * 保存添加人员
                */
                if(this.depaAddData.name === ''){
                    this.$Notice.warning({
                        title: '请输入姓名！'
                    });
                    return;
                }
                if(this.depaAddData.department === ''){
                    this.$Notice.warning({
                        title: '请输入部门！'
                    });
                    return;
                }
                if(this.depaAddData.email != ''){
                    let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if(!regEmail.test(this.depaAddData.email)){
                        this.$Notice.warning({
                            title: '请输入正确的邮箱！'
                        });
                        return;
                    }
                }
                if(this.depaAddData.phone != ''){
                    let regPhone = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                    if(!regPhone.test(this.depaAddData.phone)){
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
                            _this.getData();
                            _this.depaAddData.modal = false;
                        }
                    })
                }
                if(this.depaAddData.isEdit){
                    save('PUT',{
                        id: _this.depaAddData.id,
                        name: _this.depaAddData.name,
                        departmentName: _this.depaAddData.department,
                        email: _this.depaAddData.email,
                        mobilePhone: _this.depaAddData.phone
                    },'修改成功。');
                }else{
                    save('POST',{
                        name: _this.depaAddData.name,
                        departmentName: _this.depaAddData.department,
                        email: _this.depaAddData.email,
                        mobilePhone: _this.depaAddData.phone
                    },'添加成功。');
                }
            },
            depaIsStop(data){
                let type = '0';
                if(data.row.status === 'N'){
                    type = '1'
                }
                this.$ajax({
                    url: "/employees/enable/"+data.row.id,
                    method: "PATCH",
                    params: {
                        type: type
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.getData();
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
                                this.getData();
                            }
                        })
                    }
                });
            },
            mockTableData () {
                let data = [];

                return data;
            },
            changePage () {
                
            }
        }
    }
</script>
<style lang="less">

</style>
