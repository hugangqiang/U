<template>
    <div class="u-expenditure">
        <Card>
            <p slot="title">支出管理</p>
            <div class="u-table">
                <div class="u-table-add">
                    <Button type="primary" @click.native="depaAdd">新增</Button>
                </div>
                <div class="u-table-filter">

                </div>
                <Table stripe :columns="expenditureTitle" :data="expenditure.rows"></Table>
                <div class="u-table-page" v-if="expenditure.total > 10">
                    <Page :total="expenditure.total" :current="1" show-sizer  show-elevator placement="top" @on-change="changePage" @on-page-size-change="changeSizePage"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                expenditureTitle: [
                    {
                        type: 'index',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '部门',
                        width: 100,
                        key: 'departmentName'
                    },
                    {
                        title: '人员',
                        width: 80,
                        key: 'employeeName'
                    },
                    {
                        title: '一级项目',
                        width: 130,
                        key: 'oneCategoryName'
                    },
                    {
                        title: '二级项目',
                        width: 130,
                        key: 'twoCategoryName'
                    },
                    {
                        title: '商品名',
                        width: 120,
                        key: 'costName'
                    },
                    {
                        title: '数量',
                        width: 50,
                        key: 'number'
                    },
                    {
                        title: '单价',
                        width: 70,
                        key: 'unitPrice'
                    },
                    {
                        title: '金额',
                        width: 80,
                        key: 'totalAmount'
                    },
                    {
                        title: '供应商',
                        width: 220,
                        key: 'supplierName'
                    },
                    {
                        title: '备注',
                        width: 350,
                        key: 'remarks'
                    },
                    {
                        title: '时间',
                        width: 150,
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 130,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
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
                                            this.expenditureEdit(params);
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
                                            this.expenditureDel(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                expenditure: {
                    current: 1,
                    pageSize: 10,
                    total: 0,
                    rows: []
                }
            }
        },
        created(){
            this.getData({
                page: this.expenditure.current,
                pageSize: this.expenditure.pageSize
            });
        },
        methods: {
            getData(json = {}){
                this.$ajax({
                    url: "/expenditures",
                    method: "GET",
                    params: json
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.expenditure.total = res.data.data.total;
                        this.expenditure.rows = res.data.data.rows;
                    }
                })
            },
            expenditureEdit(data){
                console.log(data)
            },
            expenditureDel(data){
                console.log(data)


                
            },
            changePage (current) {
                this.expenditure.current = current;
                this.getData({
                    page: this.expenditure.current,
                    pageSize: this.expenditure.pageSize
                })
            },
            changeSizePage (size){
                this.expenditure.pageSize = size;
                this.getData({
                    page: this.expenditure.current,
                    pageSize: this.expenditure.pageSize
                })
            }
        }
    }
</script>
<style lang="less">
    .u-expenditure{
        .ivu-table-cell{
            padding-left: 8px;
            padding-right: 8px;
        }
        .table-mes{
            min-width: 150px;
            max-width: 150px;
        }
    }
</style>
