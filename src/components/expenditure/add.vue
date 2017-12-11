<template>
    <div class="u-expenditure">
        <Card>
            <p slot="title">新增支出</p>
            <div class="u-expenditure-content">
                <div class="u-form-item">
                    <div class="item-text">姓名</div>
                    <Cascader :data="expenditure.names" v-model="expenditure.nameValue" :load-data="loadNameData" filterable></Cascader>
                </div>
                <div class="u-form-title">支出明细</div>
                <Row :gutter="16">
                    <Col span="3">
                        <div class="form-table-title">类目</div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-title">类名</div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-title">数量</div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-title">单价</div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-title">总金额</div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-title">供应商</div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-title">支出时间</div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-title">备注</div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-title">操作</div>
                    </Col>
                </Row>
                <Row :gutter="16" v-for="(item,index) in expenditure.info" :key="item.id" >
                    <Col span="3">
                        <div class="form-table-item">
                            <Cascader :data="expenditure.categorys" v-model="item.categoryValue" :load-data="loadCategoryData" filterable></Cascader>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item">
                            <AutoComplete
                                v-model="item.classNameValue"
                                placeholder="类名">
                                <Option v-for="box in expenditure.className" :value="box" :key="box">{{ box }}</Option>
                            </AutoComplete>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item">
                            <InputNumber :min="0" v-model="item.num" @on-change="item.total = item.num * item.price"></InputNumber>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item">
                            <InputNumber :min="0" v-model="item.price" @on-change="item.total = item.num * item.price"></InputNumber>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item">
                            <InputNumber :min="0" v-model="item.total"></InputNumber>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item">
                            <Input v-model="item.supplier" placeholder="供应商"></Input>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item">
                            <DatePicker type="date" :value="item.date" placeholder="支出时间"></DatePicker>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item">
                            <Input v-model="item.mes" placeholder="备注"></Input>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item">
                            <Button type="error" size="small" @click="delFormTable(index)">删除</Button>
                        </div>
                    </Col>
                </Row>
                <div class="form-table-total">{{expenditure.total}}</div>
                <div class="add-form-table">
                    <span @click="addFormTable"><Icon type="ios-plus-empty"></Icon>添加</span> 
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                expenditure: {
                    names: [],
                    nameValue: [],
                    categorys: [],
                    total: 0,
                    className: ['签字笔','iphone','mac','饮水机','卫生纸','显示器','鼠标','键盘'],
                    info: []
                }
            }
        },
        created(){
            this.getData()
        },
        methods: {
            getData(){
                /** 
                * 初始化支出明细表单
                **/
                for(let i=0; i<3; i++){
                    this.expenditure.info.push({
                        categoryValue: [],
                        classNameValue: '',
                        num: 0,
                        price: 0,
                        total: 0,
                        supplier: '',
                        date: '',
                        mes: ''
                    })
                }
                /**
                * 获取部门
                * */
                this.$ajax.get("/select/departments").then((res) => {
                    if( res.data.meta.code === 200 ){
                        this.expenditure.names = [];
                        for(let i=0; i<res.data.data.length; i++){
                            this.expenditure.names.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value,
                                children: [],
                                loading: false
                            })
                        }
                    }
                })
                /**
                * 获取一级类目
                * */
                this.$ajax.get("/select/categorys/first").then((res) => {
                    if( res.data.meta.code === 200 ){
                        this.expenditure.categorys = [];
                        for(let i=0; i<res.data.data.length; i++){

                            this.expenditure.categorys.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value,
                                children: [],
                                loading: false
                            })
                        }
                    }
                })
                /* this.$ajax({
                    url: "/expenditures",
                    method: "GET",
                    params: {}
                }).then((res) => {
                    console.log(res.data)
                }) */
            },
            loadNameData(item, callback){
                item.loading = true;
                this.$ajax({
                    url: "/select/employees",
                    method: "GET",
                    params: {
                        departmentId: item.value
                    }
                }).then((res) => {
                    if( res.data.meta.code === 200 ){
                        item.children = [];
                        for(let i=0; i<res.data.data.length; i++){
                            item.children.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value
                            })
                        }
                        item.loading = false;
                        callback();
                    }
                })
            },
            loadCategoryData(item, callback){
                item.loading = true;
                this.$ajax({
                    url: "/select/categorys/second",
                    method: "GET",
                    params: {
                        parentId: item.value
                    }
                }).then((res) => {
                    if( res.data.meta.code === 200 ){
                        item.children = [];
                        for(let i=0; i<res.data.data.length; i++){
                            item.children.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value
                            })
                        }
                        item.loading = false;
                        callback();
                    }
                })
            },
            addFormTable(){
                this.expenditure.info.push({
                    categoryValue: [],
                    classNameValue: '',
                    num: 0,
                    price: 0,
                    total: 0,
                    supplier: '',
                    date: '',
                    mes: ''
                })
            },
            delFormTable(index){
                this.expenditure.info.splice(index,1);
            },
            expenditureSubmit(){
            }
        }
    }
</script>
<style lang="less">
    .u-expenditure{
        .u-form-item{
            line-height: 45px;
            .item-text{
                display: inline-block;
                width: 65px;
                text-align: right;
                padding-right: 5px;
            }
            .ivu-cascader{
                display: inline-block;
                .ivu-cascader-rel{
                    width: 200px;
                }
            }
            
        }
        .u-form-title{
            font-size: 14px;
            font-weight: bold;
            line-height: 45px;
        }
        .form-table-item{
            height: 45px;
            line-height: 45px;
            .ivu-cascader-label,
            .ivu-cascader{
                line-height: 45px;
            }
            .ivu-input-number{
                width: 100%;
            }
        }
        .add-form-table{
            text-align: center;
            margin-top: 20px;
            cursor: pointer;
            .ivu-icon{
                margin-right: 5px;
            }
        }
    }
</style>
