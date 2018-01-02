<template>
    <div class="u-expenditure-add">
        <Card>
            <p slot="title">新增支出</p>
            <div class="u-expenditure-content">
                <Row :gutter="16">
                    <Col span="2">
                        <div class="form-table-title">
                            <span>人员</span>
                            <span class="add" @click="depaAdd">新增+</span>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-title">
                            <span>类目</span>
                            <span class="add" @click="categoryAdd">新增+</span>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-title">商品名</div>
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
                        <div class="form-table-title">
                            <span>供应商</span>
                            <span class="add" @click="supplierAdd">新增+</span>
                        </div>
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
                            <Cascader :data="expenditure.names" v-model="item.nameValue" filterable></Cascader>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].categoryValue}">
                            <Cascader :data="expenditure.categorys" v-model="item.categoryValue" filterable></Cascader>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="form-table-item" :class="{red:expenditure.infoRed[index].classNameValue}">
                            <Input v-model="item.classNameValue" placeholder="商品名"></Input>
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
                        <Input v-model="depaAddData.name" placeholder="请输入姓名" @on-enter="depaAddOk"></Input>
                    </Col>
                    <Col span="4">
                        <label>部门</label>
                    </Col>
                    <Col span="20">
                        <AutoComplete v-model="depaAddData.department" placeholder="请输入部门" @on-enter="depaAddOk">
                            <Option v-for="item in depts" :value="item.value" :key="item.id">{{ item.value }}</Option>
                        </AutoComplete>
                    </Col>
                    <Col span="4">
                        <label>邮箱</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="depaAddData.email" placeholder="请输入邮箱" @on-enter="depaAddOk"></Input>
                    </Col>
                    <Col span="4">
                        <label>手机号</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="depaAddData.phone" placeholder="请输入手机号" @on-enter="depaAddOk"></Input>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" @click="depaAddOk">保存</Button>
            </div>
        </Modal>
        <Modal
            v-model="categoryAddData.modal"
            title="新增类目/修改类目"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Row>
                    <Col span="4" v-show="expenditure.categorys.length > 0">
                        <label>选择级别</label>
                    </Col>
                    <Col span="18" v-show="expenditure.categorys.length > 0">
                        <ButtonGroup>
                            <Button :class="{active: categoryAddData.rankActive === '1'}" @click="categoryAddData.rankActive = '1'">一级</Button>
                            <Button :class="{active: categoryAddData.rankActive === '2'}" @click="categoryAddData.rankActive = '2'">二级</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col span="4" v-show="categoryAddData.rankActive === '2'">
                        <label>父级</label>
                    </Col>
                    <Col span="20" v-show="categoryAddData.rankActive === '2'">
                        <Select v-model="categoryAddData.parentId" filterable>
                            <Option v-for="item in categoryData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="4">
                        <label>类目</label>
                    </Col>
                    <Col span="20">
                        <Input v-model="categoryAddData.category" placeholder="请输入类目" @on-enter="categoryAddOk"></Input>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" @click="categoryAddOk">保存</Button>
            </div>
        </Modal>
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
    import { Spell } from '../../js/spell.js';
    export default {
        data () {
            return {
                depaAddData: {
                    modal: false,
                    name: '',
                    department: '',
                    email: '',
                    phone: '',
                    id: ''
                },
                categoryAddData: {
                    modal: false,
                    category: '',
                    parentId: '',
                    rankActive: '1',
                    id: ''
                },
                supplierAddData: {
                    modal: false,
                    contact: '',
                    supplier: '',
                    phone: '',
                    id: ''
                },
                expenditure: {
                    total: 0,
                    names: [],
                    categorys: [],
                    suppliers: [],
                    className: [],
                    info: [],
                    infoRed: []
                },
                depts: [],
                categoryData: []
            }
        },
        created(){
            this.getInit();

            /* 获取所有部门 */
            this.getDepts();
            /* 获取所有类目 */
            this.getCategorys();
            /* 获取供应商 */
            this.getSuppliers();
            
        },
        methods: {
            getInit(){
                /** 
                * 初始化支出明细表单
                **/
                this.expenditure.info = [];
                this.expenditure.infoRed = [];
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
            },
            getDepts(){
                /**
                * 获取部门人员
                * */
                this.$ajax.get("/select/dept-employees").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.expenditure.names = [];
                        for(let i=0; i<res.data.data.length; i++){
                            this.expenditure.names.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value,
                                children: []
                            })
                            for(let j=0; j<res.data.data[i].children.length; j++){
                                this.expenditure.names[i].children.push({
                                    value: res.data.data[i].children[j].key,
                                    label: res.data.data[i].children[j].value
                                })
                            }
                        }
                    }
                })
                /**-
                * 获取部门列表
                * */
                this.$ajax.get("/select/depts").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.depts = res.data.data;
                    }
                })
            },
            getCategorys(){
                /** 
                 * 获取类目
                */
                this.$ajax.get("/select/categorys").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.expenditure.categorys = [];
                        for(let i=0; i<res.data.data.length; i++){
                            this.expenditure.categorys.push({
                                value: res.data.data[i].key,
                                label: res.data.data[i].value,
                                children: []
                            })
                            for(let j=0; j<res.data.data[i].children.length; j++){
                                this.expenditure.categorys[i].children.push({
                                    value: res.data.data[i].children[j].key,
                                    label: res.data.data[i].children[j].value
                                })
                            }
                        }
                        let arr = [];
                        for(let i=0; i<this.expenditure.categorys.length; i++){
                            if(this.expenditure.categorys[i].children.length != 0){
                                arr.push(this.expenditure.categorys[i]);
                            }
                        }
                        this.expenditure.categorys = arr;
                    }
                })
                /**-
                * 获取一级类目
                * */
                this.$ajax.get("/categorys").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.categoryData = res.data.data;
                    }
                })
            },
            getSuppliers(){
                /**-
                * 获取供应商
                * */
                this.$ajax.get("/select/suppliers").then((res) => {
                    if( res.data.meta.code === 200 && typeof res.data.data != 'undefined'){
                        this.expenditure.suppliers = res.data.data;
                    }
                })
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
                    if( res.data.meta.code === 200 ){
                        this.$Notice.success({
                            title: '添加成功。'
                        });
                        this.getInit()
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
                this.$ajax({
                    url: "/employees",
                    method: 'POST',
                    params: {
                        name: this.depaAddData.name,
                        departmentName: this.depaAddData.department,
                        email: this.depaAddData.email,
                        mobilePhone: this.depaAddData.phone
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.$Notice.success({
                            title: '添加成功。'
                        });
                        this.getDepts();
                        this.depaAddData.modal = false;
                    }
                })
            },
            categoryAdd(){
                this.categoryAddData.id = '';
                this.categoryAddData.rankActive = '1';
                this.categoryAddData.category = '';
                this.categoryAddData.parentId = '';
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
                this.$ajax({
                    url: "/categorys",
                    method: 'POST',
                    params: {
                        name: this.categoryAddData.category,
                        parentId: parentId,
                        level: level
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.$Notice.success({
                            title: '添加成功。'
                        });
                        this.getCategorys();
                        this.categoryAddData.modal = false;
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
                let S = new Spell();
                this.$ajax({
                    url: "/suppliers",
                    method: 'POST',
                    params: {
                        contacts: this.supplierAddData.contact,
                        name: this.supplierAddData.supplier,
                        shortName: S.ConvertPinyin(this.supplierAddData.supplier),
                        phone: this.supplierAddData.phone
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.$Notice.success({
                            title: '添加成功。'
                        });
                        this.getSuppliers();
                        this.supplierAddData.modal = false;
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
    .u-expenditure-add{
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
        .form-table-title{
            position: relative;
            .add{
                position: absolute;
                right: 0;
                color: #3399ff;
                font-size: 14px;
                cursor: pointer;
            }
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
