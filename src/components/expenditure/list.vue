<template>
    <div class="u-expenditure-list">
        <Card>
            <p slot="title">支出管理</p>
            <div slot="extra">
                <router-link to="/expenditure/add">
                    <Button type="primary" @click.native="depaAdd">新增</Button>
                </router-link>
            </div>
            <div class="u-table">
                <div class="u-table-filter">
                    <DatePicker type="daterange" placement="bottom-start" placeholder="请选择起止日期" style="width: 200px"></DatePicker>
                    <Select v-model="model1" style="width:200px" placeholder="请选择类目">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model1" style="width:200px" placeholder="请选择子类目">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model1" style="width:200px" placeholder="请选择供应商">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model1" style="width:200px" placeholder="请选择部门">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model1" style="width:200px" placeholder="请选择人员">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <AutoComplete
                        v-model="model1"
                        placeholder="请输入商品名称"
                        style="width:200px">
                        <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
                    </AutoComplete>
                    <Button type="primary">查询</Button>
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
                },
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
                data2: ['签字笔','iphone','mac','饮水机','卫生纸','显示器','鼠标','键盘']
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
    .u-expenditure-list{
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
