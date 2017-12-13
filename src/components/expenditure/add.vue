<template>
    <div class="u-expenditure">
        <Card>
            <p slot="title">新增支出</p>
            <div class="u-expenditure-content">
                <Row :gutter="16">
                    <Col span="2">
                        <div class="form-table-title">姓名</div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-title">商品名</div>
                    </Col>
                    <Col span="2">
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
                        <div class="form-table-title center">操作</div>
                    </Col>
                </Row>
                <Row :gutter="16" v-for="(item,index) in expenditure.info" :key="item.id" >
                    <Col span="2">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].nameValue}">
                            <Cascader :data="expenditure.names" v-model="item.nameValue" :load-data="loadNameData" filterable></Cascader>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].categoryValue}">
                            <Cascader :data="expenditure.categorys" v-model="item.categoryValue" :load-data="loadCategoryData" filterable></Cascader>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].classNameValue}">
                            <AutoComplete
                                v-model="item.classNameValue"
                                :data="expenditure.className"
                                @on-search="classNameSearch"
                                placeholder="类名"
                            >
                            </AutoComplete>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].num}">
                            <InputNumber :min="1" v-model="item.num" @on-change="item.total = item.num * item.price;"></InputNumber>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].price}">
                            <InputNumber :min="0" v-model="item.price" @on-change="item.total = item.num * item.price;"></InputNumber>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item">
                            <InputNumber :min="0" v-model="item.total" :precision="2"></InputNumber>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item supplier-input">
                            <Select v-model="item.supplier" clearable filterable  placeholder="供应商">
                                <Option v-for="box in expenditure.suppliers" :value="box.value" :key="box.value">{{ box.value }}</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].date}">
                            <DatePicker type="date" v-model="item.date" placeholder="支出时间"></DatePicker>
                        </div>
                    </Col>
                    <Col span="3">
                        <div class="form-table-item">
                            <Input v-model="item.mes" placeholder="备注"></Input>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item center">
                            <Button type="error" size="small" @click="delFormTable(index)">删除</Button>
                        </div>
                    </Col>
                </Row>
                <div class="form-table-total">合计：<span class="icon">￥</span><span class="num">{{expenditure.total}}</span></div>
                <div class="add-form-table">
                    <span @click="addFormTable"><Icon type="ios-plus-empty"></Icon>添加</span> 
                </div>
                <div class="form-table-save">
                    <Button type="primary" @click="expenditureSubmit">保存</Button>
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
                    total: 0,
                    names: [],
                    categorys: [],
                    suppliers: [],
                    className: [],
                    info: [],
                    infoRed: []
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
                        nameValue: [],
                        categoryValue: [],
                        classNameValue: '',
                        num: 1,
                        price: 0,
                        total: 0,
                        supplier: '',
                        date: '',
                        mes: ''
                    })
                    this.expenditure.infoRed.push({
                        nameValue: false,
                        categoryValue: false,
                        classNameValue: false,
                        num: false,
                        price: false,
                        total: false,
                        supplier: false,
                        date: false,
                        mes: false
                    })
                }
                /**
                * 获取供应商
                * */
                this.$ajax.get("/select/suppliers").then((res) => {
                    if( res.data.meta.code === 200 ){
                        this.expenditure.suppliers = res.data.data;
                    }
                })
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
            classNameSearch(value){
                let arr = ['签字笔','iphone','mac','饮水机','卫生纸','显示器','鼠标','键盘'];
                this.expenditure.className = arr;
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
                    nameValue: [],
                    categoryValue: [],
                    classNameValue: '',
                    num: 1,
                    price: 0,
                    total: 0,
                    supplier: '',
                    date: '',
                    mes: ''
                })
                this.expenditure.infoRed.push({
                    nameValue: false,
                    categoryValue: false,
                    classNameValue: false,
                    num: false,
                    price: false,
                    total: false,
                    supplier: false,
                    date: false,
                    mes: false
                })
            },
            delFormTable(index){
                this.expenditure.info.splice(index,1);
                this.expenditure.infoRed.splice(index,1);
            },
            infoIsNull(index){
            
                let state = true;
                if(
                    this.expenditure.info[index].nameValue.length === 0 && 
                    this.expenditure.info[index].categoryValue.length === 0 && 
                    this.expenditure.info[index].classNameValue === '' && 
                    this.expenditure.info[index].date === '' &&
                    this.expenditure.info[index].num === 1 &&
                    this.expenditure.info[index].price === 0 
                ){
                    state = false;
                }
                return state;
            },
            expenditureSubmit(){
                
                let jsonArr = [];
                function p(s) {
                    return s < 10 ? '0' + s: s;
                }
                for(let i=0; i<this.expenditure.info.length; i++){
                    if(this.infoIsNull(i)){
                        if(this.expenditure.info[i].supplier != ''){
                            for(let j=0; j<this.expenditure.suppliers.length; j++){
                                if( this.expenditure.info[i].supplier === this.expenditure.suppliers[j].value ){
                                    this.expenditure.info[i].supplier = this.expenditure.suppliers[j].key;
                                }
                            }
                        }

                        if( this.expenditure.info[i].nameValue.length === 0 ){
                            this.expenditure.infoRed[i].nameValue = true;
                            this.$Notice.warning({
                                title: '请选择人员！'
                            });
                            return;break;
                        }else{
                            this.expenditure.infoRed[i].nameValue = false;
                        }

                        if( this.expenditure.info[i].categoryValue.length === 0 ){
                            this.expenditure.infoRed[i].categoryValue = true;
                            this.$Notice.warning({
                                title: '请选择类目！'
                            });
                            return;break;
                        }else{
                            this.expenditure.infoRed[i].categoryValue = false;
                        }

                        if(this.expenditure.info[i].classNameValue === ''){
                            this.expenditure.infoRed[i].classNameValue = true;
                            this.$Notice.warning({
                                title: '请输入商品名！'
                            });
                            return;break;
                        }else{
                            this.expenditure.infoRed[i].classNameValue = false;
                        }

                        if(this.expenditure.info[i].price === 0){
                            this.expenditure.infoRed[i].price = true;
                            this.$Notice.warning({
                                title: '请填写价格！'
                            });
                            return;break;
                        }else{
                            this.expenditure.infoRed[i].price = false;
                        }

                        if(this.expenditure.info[i].date === ''){
                            this.expenditure.infoRed[i].date = true;
                            this.$Notice.warning({
                                title: '请选择日期！'
                            });
                            return;break;
                        }else{
                            this.expenditure.infoRed[i].date = false;
                            let date = new Date(this.expenditure.info[i].date);
                            this.expenditure.info[i].date = date.getFullYear() + '-' + p((date.getMonth() + 1)) + '-' + p(date.getDate());
                        }

                        let json = {
                            departmentId: this.expenditure.info[i].nameValue[0],
                            employeeId: this.expenditure.info[i].nameValue[1],
                            oneCategoryId: this.expenditure.info[i].categoryValue[0],
                            twoCategoryId: this.expenditure.info[i].categoryValue[1],
                            costName: this.expenditure.info[i].classNameValue,
                            number: this.expenditure.info[i].num,
                            unitPrice: this.expenditure.info[i].price,
                            totalAmount: this.expenditure.info[i].total,
                            supplierId: this.expenditure.info[i].supplier,
                            expenditureDate: this.expenditure.info[i].date,
                            remarks: this.expenditure.info[i].mes
                        }
                        jsonArr.push(json);
                    }
                }
                
                if(jsonArr.length === 0 ){
                    this.$Notice.warning({
                        title: '请最少添加一条支出！'
                    });
                    return;
                }
                this.$ajax({
                    url: "/expenditures",
                    method: "POST",
                    params: {
                        saveJson: JSON.stringify(jsonArr)
                    }
                }).then((res) => {
                    console.log(res)
                    if( res.data.meta.code === 200 ){
                        console.log("添加成功！");
                    }
                })
            }
        },
        watch: {
            expenditure: {
                handler: function (val, oldVal) {
                    let sum = 0;
                    for(let i=0; i<this.expenditure.info.length; i++){
                        sum += this.expenditure.info[i].total;
                    }
                    if(sum>0 ){
                        sum = sum.toFixed(2);
                    }
                    this.expenditure.total = sum;
                },
                deep: true
            }
        }
    }
</script>
<style lang="less">
    .u-expenditure{
        .center{
            text-align: center;
        }
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
            .ivu-date-picker,
            .ivu-input-number{
                width: 100%;
            }
            
        }
        .form-table-item.red input{
            border: 1px solid red;
        }
        .form-table-item.red .ivu-input-number{
            border: 1px solid red;
            input{
                border: none;
            }
        }
        .supplier-input{
            .ivu-select-dropdown{
                width: 200px !important;
                left: 0 !important;
            }
        }
        .form-table-total{
            position: absolute;
            bottom: 10px;
            left: 20px;
            font-size: 14px;
            .icon{
                color: red;
                font-size: 24px;
            }
            .num{
                font-size: 30px;
                color: red;
            }
        }
        .add-form-table{
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            cursor: pointer;
            .ivu-icon{
                margin-right: 5px;
            }
        }
        .form-table-save{
            text-align: right;
        }
    }
</style>
