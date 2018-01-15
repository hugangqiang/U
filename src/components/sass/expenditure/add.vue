<template>
    <div class="u-expenditure-add">
        <Card>
            <p slot="title">新增支出</p>
            <div slot="extra">
                <Button type="primary" @click.native="importExcel">批量导入</Button>
            </div>
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
                            <span class="add" @click="categoryAddData = true">新增+</span>
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
                        <div class="form-table-item"  :class="{red:expenditure.infoRed[index].total}">
                            <InputNumber :min="0" v-model="item.total" ></InputNumber>
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
                <Button type="primary" @click="importDepa">批量导入</Button>
                <Button type="primary" @click="depaAddOk">保存</Button>
            </div>
        </Modal>
        <Modal
            v-model="categoryAddData"
            title="新增类目/修改类目"
            :width="700"
            class-name="vertical-center-modal">
            <div class="u-category-content">
                <div class="u-category-one">
                    <div class="header">
                        <div class="name">
                            <span>大类目</span>
                            <div class="add"  @click="categoryAddTwo(1,'请输入大类目')"><Icon type="plus-circled"></Icon></div>
                        </div>
                    </div>
                    <div class="u-category-con">
                        <div class="content-item" v-for="(item,index) in categoryData" :key="item.id" :class="{active: item === categoryActive}" @click="categoryActive = item">
                            <div class="text" v-show="!item.show">{{item.name}}</div>
                            <div class="edit" v-show="item.show" >
                                <Input type="text" v-model="item.editValue"></Input>
                            </div>
                            <div class="operation" v-show="item === categoryActive">
                                <div v-if="item.isDefault">
                                    <Button v-if="item.status === 'Y'" type="success" size="small" @click.native="categoryShopTodo(item,0)">停用</Button>
                                    <Button v-else type="warning" size="small" @click.native="categoryShopTodo(item,1)">禁用</Button>
                                </div>
                                <div v-else>
                                    <Button type="primary" size="small" v-if="!item.show" @click.native="categoryEditTodo(item)">修改</Button>
                                    <Button type="primary" size="small" v-else @click.native="categoryEditSaveTodo(item)">保存</Button>
                                    <Button type="error" size="small" @click.native="categoryDelTodo(item,index)">删除</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="u-category-two">
                    <div class="header">
                        <div class="name">
                            <span>小类目</span>
                            <div class="add" @click="categoryAddTwo(2,'请输入小类目')"><Icon type="plus-circled"></Icon></div>
                        </div>
                    </div>
                    <div class="u-category-con">
                        <div class="content-item" v-for="(item,index) in categoryActive.childrens" :key="item.id" >
                            <div class="text" v-if="!item.show">{{item.name}}</div>
                            <div class="edit" v-else>
                                <Input type="text" v-model="item.editValue"></Input>
                            </div>
                            <div class="operation" >
                                <div v-if="item.isDefault">
                                    <Button v-if="item.status === 'Y'" type="success" size="small" @click.native="categoryShopTodo(item,0)">停用</Button>
                                    <Button v-else type="warning" size="small" @click.native="categoryShopTodo(item,1)">禁用</Button>
                                </div>
                                <div v-else>
                                    <Button type="primary" size="small" v-if="!item.show" @click.native="categoryEditTodo(item)">修改</Button>
                                    <Button type="primary" size="small" v-else @click.native="categoryEditSaveTodo(item)">保存</Button>
                                    <Button type="error" size="small" @click.native="categoryDelTodo(item,index)">删除</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
        <Modal
            v-model="categoryAddDataTwo.modal"
            title="添加类目"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Input v-model="categoryAddDataTwo.value" :placeholder="categoryAddDataTwo.placeholder" @on-enter="categoryAddDataOk"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" @click="categoryAddDataOk">保存</Button>
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
        <Modal
            v-model="importExceldata.modal"
            title="批量导入"
            class-name="vertical-center-modal importExceldata">
            <div class="u-modalAddData">
                <Row>
                    <Col span="12">
                        <Button type="primary" @click="importExcelDown">模板下载</Button>
                    </Col>
                    <Col span="12">
                        <Button type="primary" @click="importExcelUp">导入上传</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="importHelp">您可通过模板下载，根据模板提示一次录入贵公司的支出信息；完成后导入上传您的文件，可实现新增支出的批量导入。</div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="importHelp" style="color: red;">{{importExceldata.error}}</div>
                    </Col>
                </Row>
            </div>
            <div slot="footer"></div>
        </Modal>
        <Modal
            v-model="importDepadata.modal"
            title="批量导入"
            class-name="vertical-center-modal importExceldata">
            <div class="u-modalAddData">
                <Row>
                    <Col span="12">
                        <Button type="primary" @click="importDepaDown">模板下载</Button>
                    </Col>
                    <Col span="12">
                        <Button type="primary" @click="importDepaUp">导入上传</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="importHelp">您可通过模板下载，根据模板提示一次录入贵公司的人员；完成后导入上传您的文件，可实现新增支出的批量导入。</div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="importHelp" style="color: red;">{{importDepadata.error}}</div>
                    </Col>
                </Row>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import { Spell } from '../../js/spell.js';
    export default {
        data () {
            return {
                importExceldata: {
                    modal: false,
                    error: ''
                },
                importDepadata: {
                    modal: false,
                    error: ''
                },
                depaAddData: {
                    modal: false,
                    name: '',
                    department: '',
                    email: '',
                    phone: '',
                    id: ''
                },
                categoryAddData: false,
                categoryAddDataTwo: {
                    modal: false,
                    value: '',
                    level: 0,
                    placeholder: '请输入类目'
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
                categoryData: [],
                categoryActive: {}
            }
        },
        mounted(){
            this.getInit();

            /* 获取所有部门 */
            this.getDepts();
            /* 获取所有类目 */
            this.getCategorys();
            /* 获取供应商 */
            this.getSuppliers();
            
            let expenditureStr = localStorage.getItem('expenditure');
            if(expenditureStr){
                this.expenditure = JSON.parse(expenditureStr);
            }
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

                this.$ajax.get('/categorys').then((res) => {
                    if(res.data.meta.code === 200){
                        this.categoryData = res.data.data;
                        this.categoryActive = this.categoryData[0];
                        for(let i=0; i<this.categoryData.length; i++){
                            this.categoryData[i].show = false;
                            this.categoryData[i].editValue = '';
                            for(let j=0; j<this.categoryData[i].childrens.length; j++){
                                this.categoryData[i].childrens[j].show = false;
                                this.categoryData[i].childrens[j].editValue = '';
                            }
                        }
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

                        if(this.expenditure.info[i].total === 0){
                            this.expenditure.infoRed[i].total = true;
                            this.$Notice.warning({
                                title: '请填写金额！'
                            });
                            return;break;
                        }else{
                            this.expenditure.infoRed[i].total = false;
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
                //去空格
                this.depaAddData.email = this.depaAddData.email.replace(/(^\s*)|(\s*$)/g, "");
                if(this.depaAddData.email != ''){
                    let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if(!regEmail.test(this.depaAddData.email)){
                        this.$Notice.warning({
                            title: '请输入正确的邮箱！'
                        });
                        return;
                    }
                }
                //去空格
                this.depaAddData.phone = this.depaAddData.phone.replace(/(^\s*)|(\s*$)/g, "");
                if(this.depaAddData.phone != ''){
                    let regPhone = /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
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
            categoryEditTodo(item){
                item.show = true;
                item.editValue = item.name;
                this.categoryData.push({});
                this.categoryData.pop();
            },
            categoryEditSaveTodo(item){
                 /** 
                 * 保存修改添加人员
                */
                if(item.editValue === ''){
                    this.$Notice.warning({
                        title: '请输入类目名！'
                    });
                    return;
                }
                this.$ajax({
                    url: "/categorys",
                    method: 'PUT',
                    params: {
                        id: item.id,
                        name: item.editValue,
                        parentId: item.parentId,
                        level: item.level
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.$Notice.success({
                            title: '修改成功。'
                        });
                        this.getCategorys();
                        item.show = false;
                        item.editValue = '';
                    }
                })
            },
            categoryAddTwo(level,placeholder){
                this.categoryAddDataTwo.level = level;
                this.categoryAddDataTwo.modal = true;
                this.categoryAddDataTwo.value = '';
                this.categoryAddDataTwo.placeholder = placeholder;
            },
            categoryAddDataOk(){
                let parentId = 0;
                if(this.categoryAddDataTwo.level === 2){
                    parentId = this.categoryActive.id;
                }
                if(this.categoryAddDataTwo.value === ''){
                    this.$Notice.warning({
                        title: '请输入类目名！'
                    });
                    return;
                }
                
                this.$ajax({
                    url: "/categorys",
                    method: 'POST',
                    params: {
                        name: this.categoryAddDataTwo.value,
                        parentId: parentId,
                        level: this.categoryAddDataTwo.level
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.$Notice.success({
                            title: '添加成功。'
                        });
                        this.getCategorys();
                        this.categoryAddDataTwo.modal = false;
                    }
                })
            },
            categoryDelTodo(item,index){
                this.$Modal.confirm({
                    content: '<h3>确认是否删除!</h3>',
                    okText: '是',
                    cancelText: '否',
                    onOk: () => {
                        this.$ajax({
                            url: "/categorys/"+item.id,
                            method: "DELETE"
                        }).then((res) => {
                            if(res.data.meta.code === 452){
                                this.$Notice.error({
                                    title: '该类目下存在子类目，不能删除!'
                                });
                            } else if(res.data.meta.code === 200){
                                if(item.level === 1){
                                    this.getCategorys();
                                }else if(item.level === 2){
                                    for(let i=0; i<this.categoryData.length; i++){
                                        if(this.categoryData[i] === this.categoryActive){
                                            this.categoryData[i].childrens.splice(index,1);
                                            break;
                                        }
                                    }
                                }
                            }
                        })
                    }
                });
            },
            categoryShopTodo(item,type){
                this.$ajax({
                    url: "/categorys/"+item.id,
                    method: "PATCH",
                    params: {
                        type: type
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        if(type === 1){
                            item.status = 'Y';
                            this.$Notice.success({
                                title: '启用成功。'
                            });
                            this.categoryData.push({});
                            this.categoryData.pop();
                        }else if(type === 0){
                            item.status = 'N';
                            this.$Notice.success({
                                title: '禁用成功。'
                            });
                            this.categoryData.push({});
                            this.categoryData.pop();
                        }
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
                this.supplierAddData.phone = this.supplierAddData.phone.replace(/(^\s*)|(\s*$)/g, "");         
                if(this.supplierAddData.phone != ''){
                    let regPhone = /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
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
            },
            importExcel(){
                this.importExceldata.modal = true;
            },
            importExcelDown(){
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
                    url: "/expenditures/download/template",
                    method: 'GET'
                }).then((res) => {
                    let a = document.createElement('a');
                    a.href= res.config.url+'?'+buildUri(res.config.params);
                    a.download = '';
                    a.click();
                })
            },
            importExcelUp(){
                let input = document.createElement('input');
                input.type = 'file';
                input.name = 'importFile';
                input.onchange = this.onExceChange;
                input.click();
            },
            onExceChange(e){
                let fileInput = e.target;
                let data = new FormData();
                data.append('importFile',fileInput.files[0]);
                this.$ajax({
                    url: "/expenditures/import",
                    method: 'POST',
                    data: data
                }).then((res) => {
                    if( res.data.meta.code === 452 ) { 
                        this.importExceldata.error = res.data.meta.msg;
                    } else if( res.data.meta.code === 200 ) { 
                        this.importExceldata.error = '';
                        this.$Notice.success({
                            title: '导入成功！'
                        });
                        this.importExceldata.modal = false;
                        this.$router.push({path:'/sass/expenditure/list'});
                    }
                })
            },
            importDepa(){
                this.importDepadata.modal = true;
                this.depaAddData.modal = false;
            },
            importDepaDown(){
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
                    url: "/employees/download/template",
                    method: 'GET'
                }).then((res) => {
                    let a = document.createElement('a');
                    a.href= res.config.url+'?'+buildUri(res.config.params);
                    a.download = '';
                    a.click();
                })
            },
            importDepaUp(){
                let input = document.createElement('input');
                input.type = 'file';
                input.name = 'importFile';
                input.onchange = this.onDepaChange;
                input.click();
            },
            onDepaChange(e){
                let fileInput = e.target;
                let data = new FormData();
                data.append('importFile',fileInput.files[0]);
                this.$ajax({
                    url: "/employees/import",
                    method: 'POST',
                    data: data
                }).then((res) => {
                    if( res.data.meta.code === 452 ) { 
                        this.importDepadata.error = res.data.meta.msg;
                    } else if( res.data.meta.code === 200 ) { 
                        this.importDepadata.error = '';
                        this.$Notice.success({
                            title: '导入成功！'
                        });
                        this.getDepts();
                        this.importDepadata.modal = false;
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

                    let sstr = JSON.stringify(this.expenditure);
                    localStorage.setItem('expenditure', sstr);
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
    .importExceldata{
        .ivu-modal-footer{
            display: none;
        }
        .ivu-col-span-12{
            text-align: center;
        }
        .importHelp{
            padding: 20px 80px 0;
        }   
    }
    .vertical-center-modal .u-category-content{
        display: flex;
        flex-direction: row;
        border-radius: 5px;
        margin: 10px 0;
        border: 1px solid #e0e0e0;
        height: 400px!important;
        .u-category-one{
            width: 40%;
            background: #f1eff5;
            .header{
                border-right: 1px solid #fff;
            }
        }
        .u-category-two{
            width: 60%;
            .header{
                border-left: 1px solid #fff;
            }
        }
        .header{
            background: #e0e0e0;
            .name{
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                line-height: 50px;
                position: relative;
                .add{
                    position: absolute;
                    right: 10px;
                    top: 0;
                    cursor: pointer;
                    .ivu-icon{
                        line-height: 50px;
                        font-size: 30px;
                        color: #2c8df2;
                    }
                }
            }
        }
        .u-category-con{
            overflow: hidden;
            overflow-y: auto;
            height: 350px!important;
            .content-item{
                line-height: 50px;
                position: relative;
                padding: 0 100px 0 10px;
                cursor: pointer;
                .operation{
                    position: absolute;
                    right: 10px;
                    line-height: 50px;
                    top: 0;
                }
            }
            .content-item.active{
                background: #fff;
            }
        }
        
    }
</style>
