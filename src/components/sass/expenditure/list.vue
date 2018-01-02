<template>
    <div class="u-expenditure-list">
        <Card>
            <p slot="title">支出管理</p>
            <div slot="extra">
                <router-link to="/sass/expenditure/add">
                    <Button type="primary" @click.native="depaAdd">新增</Button>
                </router-link>
            </div>
            <div class="u-table">
                <div class="u-table-filter">
                    <DatePicker v-model="finds.date" type="daterange" placement="bottom-start" placeholder="请选择起止日期" style="width: 13%"></DatePicker>
                    <Select filterable clearable  v-model="finds.oneClass" style="width:13%" placeholder="请选择大类目">
                        <Option v-for="item in finds.classData" :value="item.key" :key="item.key">{{ item.value }}</Option>
                    </Select>
                    <Select filterable clearable v-model="finds.twoClass" style="width:13%" placeholder="请选择小类目">
                        <OptionGroup v-for="item in finds.classData" :key="item.key" :label="item.value">
                            <Option v-for="box in item.children" :value="box.key" :key="box.value">{{ box.value }}</Option>
                        </OptionGroup>
                    </Select>
                    <Select filterable clearable v-model="finds.suppliers" style="width:13%" placeholder="请选择供应商">
                        <Option v-for="item in finds.suppliersData" :value="item.key" :key="item.key">{{ item.value }}</Option>
                    </Select>
                    <Select filterable clearable v-model="finds.depts" style="width:13%" placeholder="请选择部门">
                        <Option v-for="item in finds.deptsEmployeesData" :value="item.key" :key="item.key">{{ item.value }}</Option>
                    </Select>
                    <Select filterable clearable v-model="finds.employees" style="width:13%" placeholder="请选择人员">
                        <OptionGroup v-for="item in finds.deptsEmployeesData" :key="item.key" :label="item.value">
                            <Option v-for="box in item.children" :value="box.key" :key="box.value">{{ box.value }}</Option>
                        </OptionGroup>
                    </Select>
                    <Input v-model="finds.name" placeholder="请输入商品名称" style="width:13%"></Input>
                    <Button type="primary" @click="find">查询</Button>
                </div>
                <Table stripe :columns="expenditureTitle" :data="expenditure.rows"></Table>
                <div class="u-table-page">
                    <div class="pages-show"  v-show="expenditure.total > 10">
                        <Page ref="pages" :total="expenditure.total" :current="1" show-sizer  show-elevator placement="top" @on-change="changePage" @on-page-size-change="changeSizePage"></Page>
                    </div>
                    <div class="export">
                        <Button type="success" @click.native="exportExcel">导出Excel</Button>
                    </div>
                </div>
            </div>
        </Card>
        <Modal
            v-model="expenditureEditData.modal"
            title="支出修改"
            :styles="{top: '65px'}">
            <div class="u-modalAddData edit">
                <Row>    
                    <Col span="4">
                        <label>人员</label>
                    </Col>
                    <Col span="8">
                        <div class="form-table-item" :class="{red:expenditureEditData.red.nameValue}">
                            <Cascader :data="expenditureEditData.names" v-model="expenditureEditData.data.nameValue" filterable></Cascader>
                        </div>
                    </Col>
                    <Col span="4">
                        <label>类目</label>
                    </Col>
                    <Col span="8">
                        <div class="form-table-item" :class="{red:expenditureEditData.red.categoryValue}">
                            <Cascader :data="expenditureEditData.categorys" v-model="expenditureEditData.data.categoryValue" filterable></Cascader>
                        </div>
                    </Col>

                    <Col span="4">
                        <label>商品名</label>
                    </Col>
                    <Col span="20">
                        <div class="form-table-item" :class="{red:expenditureEditData.red.classNameValue}">
                            <Input v-model="expenditureEditData.data.classNameValue" placeholder="商品名"></Input>
                        </div>
                    </Col>

                    <Col span="4">
                        <label>数量</label>
                    </Col>
                    <Col span="4">
                        <div class="form-table-item" :class="{red:expenditureEditData.red.num}">
                            <InputNumber :min="1" v-model="expenditureEditData.data.num" @on-change="expenditureEditData.data.total = expenditureEditData.data.num * expenditureEditData.data.price;"></InputNumber>
                        </div>
                    </Col>
                    <Col span="4">
                        <label>单价</label>
                    </Col>
                    <Col span="4">
                        <div class="form-table-item" :class="{red:expenditureEditData.red.price}">
                            <InputNumber :min="0" v-model="expenditureEditData.data.price" @on-change="expenditureEditData.data.total = expenditureEditData.data.num * expenditureEditData.data.price;"></InputNumber>
                        </div>
                    </Col>
                    <Col span="4">
                        <label>总金额</label>
                    </Col>
                    <Col span="4">
                        <div class="form-table-item">
                            <InputNumber :min="0" v-model="expenditureEditData.data.total" :precision="2"></InputNumber>
                        </div>
                    </Col>
                    
                    <Col span="4">
                        <label>供应商</label>
                    </Col>
                    <Col span="20">
                        <div class="form-table-item supplier-input">
                            <Select v-model="expenditureEditData.data.supplier" clearable filterable  placeholder="供应商">
                                <Option v-for="box in expenditureEditData.suppliers" :value="box.key" :key="box.key">{{ box.value }}</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span="4">
                        <label>支出时间</label>
                    </Col>
                    <Col span="20">
                        <div class="form-table-item" :class="{red:expenditureEditData.red.date}">
                            <DatePicker type="date" v-model="expenditureEditData.data.date" placeholder="支出时间"></DatePicker>
                        </div>
                    </Col>
                    <Col span="4">
                        <label>备注</label>
                    </Col>
                    <Col span="20">
                        <div class="form-table-item">
                            <Input v-model="expenditureEditData.data.mes" placeholder="备注"></Input>
                        </div>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" @click="expenditureEditOk">保存</Button>
            </div>
        </Modal>
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
                        width: 105,
                        key: 'departmentName'
                    },
                    {
                        title: '人员',
                        width: 100,
                        key: 'employeeName'
                    },
                    {
                        title: '大类目',
                        width: 135,
                        key: 'oneCategoryName'
                    },
                    {
                        title: '小类目',
                        width: 135,
                        key: 'twoCategoryName'
                    },
                    {
                        title: '商品名',
                        width: 120,
                        key: 'costName'
                    },
                    {
                        title: '数量',
                        width: 80,
                        key: 'number'
                    },
                    {
                        title: '单价',
                        width: 100,
                        key: 'unitPrice'
                    },
                    {
                        title: '金额',
                        width: 100,
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
                        key: 'expenditureDate'
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
                expenditureEditData: {
                    modal: false,
                    data: {
                        nameValue: [],
                        categoryValue: [],
                        classNameValue: '',
                        num: 1,
                        price: 0,
                        total: 0,
                        supplier: '',
                        date: '',
                        mes: '',
                        id: ''
                    },
                    red: {
                        nameValue: false,
                        categoryValue: false,
                        classNameValue: false,
                        num: false,
                        price: false,
                        total: false,
                        supplier: false,
                        date: false,
                        mes: false
                    },
                    suppliers: [],
                    names: [],
                    categorys: []
                },
                finds: {
                    date: '',
                    oneClass: '',
                    twoClass: '',
                    classData: [],
                    suppliers: '',
                    suppliersData: [],
                    depts: '',
                    employees: '',
                    deptsEmployeesData: [],
                    name: ''
                }
            }
        },
        created(){
            this.getData({
                page: this.expenditure.current,
                pageSize: this.expenditure.pageSize
            });
            this.getInit();
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
            getInit(){
                
                /** 
                 * 获取类目
                */
                this.$ajax.get("/select/categorys").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.finds.classData = res.data.data;
                        this.expenditureEditData.categorys = [];
                        for(let i=0; i<res.data.data.length; i++){
                            this.expenditureEditData.categorys.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value,
                                children: []
                            })
                            for(let j=0; j<res.data.data[i].children.length; j++){
                                this.expenditureEditData.categorys[i].children.push({
                                    value: res.data.data[i].children[j].key,
                                    label: res.data.data[i].children[j].value
                                })
                            }
                        }
                        let arr = [];
                        for(let i=0; i<this.expenditureEditData.categorys.length; i++){
                            if(this.expenditureEditData.categorys[i].children.length != 0){
                                arr.push(this.expenditureEditData.categorys[i]);
                            }
                        }
                        this.expenditureEditData.categorys = arr;
                    }
                })
               
                /**-
                * 获取供应商
                * */
                this.$ajax.get("/select/suppliers").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.finds.suppliersData = res.data.data;
                        this.expenditureEditData.suppliers = res.data.data;
                    }
                })
                /**
                * 获取部门人员
                * */
                this.$ajax.get("/select/dept-employees").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.finds.deptsEmployeesData = res.data.data;

                        this.expenditureEditData.names = [];
                        for(let i=0; i<res.data.data.length; i++){
                            this.expenditureEditData.names.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value,
                                children: []
                            })
                            for(let j=0; j<res.data.data[i].children.length; j++){
                                this.expenditureEditData.names[i].children.push({
                                    value: res.data.data[i].children[j].key,
                                    label: res.data.data[i].children[j].value
                                })
                            }
                        }
                    }
                })
            },
            find(){
                let json = {};
                function getDate(str){
                    let date = new Date(str);
                    function p(s) {
                        return s < 10 ? '0' + s: s;
                    }
                    return date.getFullYear() + '-' + p((date.getMonth() + 1)) + '-' + p(date.getDate()); 
                }
                json.page = 1;
                json.pageSize = this.expenditure.pageSize;
                if(this.finds.date.length === 2){
                    json.startDate = getDate(this.finds.date[0]);
                    json.endDate = getDate(this.finds.date[1]);
                }
                if(this.finds.oneClass != ''){
                    json.oneCategoryId = this.finds.oneClass;
                }
                if(this.finds.twoClass != ''){
                    json.twoCategoryId = this.finds.twoClass;
                }
                if(this.finds.suppliers != ''){
                    json.supplierId = this.finds.suppliers;
                }
                if(this.finds.depts != ''){
                    json.departmentId = this.finds.depts;
                }
                if(this.finds.employees != ''){
                    json.employeeId = this.finds.employees;
                }
                if(this.finds.name != ''){
                    json.costName = this.finds.name;
                }
                
                this.getData(json)
                this.$nextTick(function(){
                    this.$refs['pages'].currentPage = 1;
                })
            },
            expenditureEdit(data){
                this.expenditureEditData.data.nameValue = [data.row.departmentId,data.row.employeeId]; 
                this.expenditureEditData.data.categoryValue = [data.row.oneCategoryId,data.row.twoCategoryId]; 
                this.expenditureEditData.data.classNameValue = data.row.costName; 
                this.expenditureEditData.data.num = data.row.number; 
                this.expenditureEditData.data.price = data.row.unitPrice;
                this.expenditureEditData.data.total = data.row.totalAmount;
                this.expenditureEditData.data.supplier = data.row.supplierId;
                this.expenditureEditData.data.mes = data.row.remarks;
                this.expenditureEditData.data.date = data.row.expenditureDate;
                this.expenditureEditData.data.id = data.row.id;
                this.expenditureEditData.modal = true;
            },
            expenditureEditOk(){
                function p(s) {
                    return s < 10 ? '0' + s: s;
                }
                if( this.expenditureEditData.data.nameValue.length === 0 ){
                    this.expenditureEditData.red.nameValue = true;
                    this.$Notice.warning({
                        title: '请选择人员！'
                    });
                    return;
                }else{
                    this.expenditureEditData.red.nameValue = false;
                }

                if( this.expenditureEditData.data.categoryValue.length === 0 ){
                    this.expenditureEditData.red.categoryValue = true;
                    this.$Notice.warning({
                        title: '请选择类目！'
                    });
                    return;
                }else{
                    this.expenditureEditData.red.categoryValue = false;
                }

                if(this.expenditureEditData.data.classNameValue === ''){
                    this.expenditureEditData.red.classNameValue = true;
                    this.$Notice.warning({
                        title: '请输入商品名！'
                    });
                    return;
                }else{
                    this.expenditureEditData.red.classNameValue = false;
                }

                if(this.expenditureEditData.data.price === 0){
                    this.expenditureEditData.red.price = true;
                    this.$Notice.warning({
                        title: '请填写价格！'
                    });
                    return;
                }else{
                    this.expenditureEditData.red.price = false;
                }

                if(this.expenditureEditData.data.date === ''){
                    this.expenditureEditData.red.date = true;
                    this.$Notice.warning({
                        title: '请选择日期！'
                    });
                    return;
                }else{
                    this.expenditureEditData.red.date = false;
                    let date = new Date(this.expenditureEditData.data.date);
                    this.expenditureEditData.data.date = date.getFullYear() + '-' + p((date.getMonth() + 1)) + '-' + p(date.getDate());
                }
                this.$ajax({
                    url: "/expenditures",
                    method: "PUT",
                    params: {
                        id: this.expenditureEditData.data.id,
                        departmentId: this.expenditureEditData.data.nameValue[0],
                        employeeId: this.expenditureEditData.data.nameValue[1],
                        oneCategoryId: this.expenditureEditData.data.categoryValue[0],
                        twoCategoryId: this.expenditureEditData.data.categoryValue[1],
                        costName: this.expenditureEditData.data.classNameValue,
                        number: this.expenditureEditData.data.num,
                        unitPrice: this.expenditureEditData.data.price,
                        totalAmount: this.expenditureEditData.data.total,
                        supplierId: this.expenditureEditData.data.supplier,
                        expenditureDateStr: this.expenditureEditData.data.date,
                        remarks: this.expenditureEditData.data.mes
                    }
                }).then((res) => {
                    if( res.data.meta.code === 200 ){
                        this.$Notice.success({
                            title: '修改成功。'
                        });
                        this.getData({
                            page: this.expenditure.current,
                            pageSize: this.expenditure.pageSize
                        })
                        this.expenditureEditData.modal = false;
                    }
                })
            },
            expenditureDel(data){
                this.$Modal.confirm({
                    content: '<h3>确认是否删除!</h3>',
                    okText: '是',
                    cancelText: '否',
                    onOk: () => {
                        this.$ajax({
                            url: "/expenditures/"+data.row.id,
                            method: "DELETE"
                        }).then((res) => {
                            if(res.data.meta.code === 200){
                                this.getData({
                                    page: this.expenditure.current,
                                    pageSize: this.expenditure.pageSize
                                });
                            }
                        })
                    }
                });
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
            },
            exportExcel(){
                let json = {};
                function getDate(str){
                    let date = new Date(str);
                    function p(s) {
                        return s < 10 ? '0' + s: s;
                    }
                    return date.getFullYear() + '-' + p((date.getMonth() + 1)) + '-' + p(date.getDate()); 
                }
                if(this.finds.date.length === 2){
                    json.startDate = getDate(this.finds.date[0]);
                    json.endDate = getDate(this.finds.date[1]);
                }
                if(this.finds.oneClass != ''){
                    json.oneCategoryId = this.finds.oneClass;
                }
                if(this.finds.twoClass != ''){
                    json.twoCategoryId = this.finds.twoClass;
                }
                if(this.finds.suppliers != ''){
                    json.supplierId = this.finds.suppliers;
                }
                if(this.finds.depts != ''){
                    json.departmentId = this.finds.depts;
                }
                if(this.finds.employees != ''){
                    json.employeeId = this.finds.employees;
                }
                if(this.finds.name != ''){
                    json.costName = this.finds.name;
                }
                function buildUri(obj){
                    var uri = '';
                    for(var index in obj){
                        if(isEmpty(obj[index])){
                        uri +=( index + '=' + obj[index] + '&');
                        }else{
                        uri += buildUri(obj[index]);
                        }
                    }
                    return uri;
                }
                function isEmpty(obj){
                    if(typeof obj == 'string' ) return true;
                    for(var i in obj){
                        return false;
                    }
                    return true;
                }
                this.$ajax({
                    url: "/expenditures/export",
                    method: "GET",
                    params: json
                }).then((res) => {
                    window.open(res.config.url+'?'+buildUri(res.config.params),'_blank');
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
        .pages-show{
            display: inline-block;
        }
        .export{
            float: right;
        }
    }
    .u-modalAddData.edit{
        .ivu-input-number,
        .ivu-input-icon,
        .ivu-input-number-input-wrap{
            height: 40px;
            line-height: 40px;
        }
        .ivu-cascader-label{
            line-height: 40px;
        }
        .ivu-input-number-handler{
            height: 20px;
        }
    }
</style>
