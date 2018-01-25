<template>
    <div class="u-expenditure-form">
        <Card>
            <p slot="title">支出报表</p>
            <div slot="extra">
                <Button type="success" @click.native="exportExcel">导出Excel</Button>
            </div>
            <div class="u-table-filter">
                <DatePicker 
                    v-model="finds.date"
                    ref="findDate"
                    format="yyyy-MM-dd"  
                    type="daterange" 
                    placement="bottom-start" 
                    placeholder="请选择起止日期"
                    @on-change="changeFindDate"
                    style="width: 200px;">
                </DatePicker>
                <Select filterable v-model="finds.cycle" style="width:200px;" placeholder="请选择周期" @on-change="changeFindCycle">
                    <Option v-for="item in finds.cycleData" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
                <Select filterable v-model="finds.filter" style="width:200px;" placeholder="请选择条件" @on-change="changeFind">
                    <Option v-for="item in finds.filterData" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
            </div>
            <div class="total">
                <span class="text">合计费用：</span>
                <span>￥<span class="num">{{total}}</span></span>
            </div>
            <Row>
                <Col span="24">
                    <div class="expenditure"></div>
                </Col>
            </Row>
        </Card>
        <Modal
            v-model="formInfo.modal"
            title="统计详情"
            width="950"
            :styles="{zIndex: '999999'}"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Table stripe :columns="formInfo.formInfoTitle" :data="formInfo.formInfoData.rows"></Table>
            </div>
            <div slot="footer">
                <div class="pages-show"  v-show="formInfo.formInfoData.total > 10">
                    <Page ref="pages" :total="formInfo.formInfoData.total" :current="1" show-sizer  show-elevator placement="top" @on-change="changePage" @on-page-size-change="changeSizePage"></Page>
                </div>
                <div class="formInfototal">
                    <span>合计费用：￥<span class="num">{{formInfo.formInfoData.totalAmount}}</span></span>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            let getDate = () => {
                let now = new Date(); //当前日期 
                let nowDayOfWeek = now.getDay(); //今天本周的第几天 
                let nowDay = now.getDate(); //当前日 
                let nowMonth = now.getMonth(); //当前月 
                let nowYear = now.getFullYear(); //当前年 
                let arr = [];
                function formatDate(date) { 
                    let myyear = date.getFullYear(); 
                    let mymonth = date.getMonth()+1; 
                    let myweekday = date.getDate(); 

                    if(mymonth < 10){ 
                        mymonth = "0" + mymonth; 
                    } 
                    if(myweekday < 10){ 
                        myweekday = "0" + myweekday; 
                    } 
                    return (myyear+"-"+mymonth + "-" + myweekday); 
                }
                arr[0] = formatDate( new Date(nowYear, nowMonth, nowDay - nowDayOfWeek) );
                arr[1] = formatDate( new Date(nowYear, nowMonth, nowDay) );
                return arr;
            }
            return {
                finds: {
                    date: getDate(),
                    startDate: [],
                    startDateOpen: false,
                    endDate: [],
                    endDateOpen: false,
                    cycle: 2,
                    cycleData: [
                        {
                            key: 1,
                            value: '本周'
                        },
                        {
                            key: 2,
                            value: '15天'
                        },
                        {
                            key: 3,
                            value: '1个月'
                        },
                        {
                            key: 4,
                            value: '3个月'
                        },
                        {
                            key: 5,
                            value: '半年'
                        },
                        {
                            key: 6,
                            value: '一年'
                        }
                    ],
                    filter: 3,
                    filterData: [
                        {
                            key: 1,
                            value: '按一级类目'
                        },
                        {
                            key: 2,
                            value: '按二级类目'
                        },
                        {
                            key: 3,
                            value: '按部门'
                        },
                        {
                            key: 4,
                            value: '按个人'
                        }
                    ]
                },
                total: 0,
                list: [],
                formInfo: {
                    modal: false,
                    id: null,
                    formInfoTitle: [
                        {
                            type: 'index',
                            width: 50,
                            align: 'center'
                        },
                        {
                            title: '部门',
                            key: 'departmentName'
                        },
                        {
                            title: '人员',
                            key: 'employeeName'
                        },
                        {
                            title: '大类目',
                            key: 'oneCategoryName'
                        },
                        {
                            title: '小类目',
                            key: 'twoCategoryName'
                        },
                        {
                            title: '金额',
                            key: 'totalAmount'
                        },
                        {
                            title: '时间',
                            key: 'expenditureDate'
                        }
                    ],
                    formInfoData: {
                        current: 1,
                        pageSize: 10,
                        totalAmount: 0,
                        total: 0,
                        rows: []
                    }
                },
                config: {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : [],
                            ids: [],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color:'#999',
                                    width:'0'
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'支出总额',
                            type:'bar',
                            barWidth: '60%',
                            data:[]
                        }
                    ]
                }
            }
        },
        created(){
            
        },
        mounted(){
            this.getData({
                type: this.finds.filter,
                dateType: this.finds.cycle
            })
            document.querySelector('.expenditure').style.height = document.documentElement.clientHeight - 350 + 'px';
        },
        methods: {
            init(){
                // 基于准备好的dom，初始化echarts实例
                let expenditure = this.$echarts.init(document.querySelector('.expenditure'));
                expenditure.setOption(this.config);
                let _this = this;
                expenditure.on('click', function (params) {
                    _this.formInfo.id = _this.list[params.dataIndex].id;
                    _this.getInfo()
                });
            },
            getData(json = {}){
                this.$ajax({
                    url: "/report/index",
                    method: "GET",
                    params: json
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.total = res.data.data.totalAmount.toFixed(2);
                        this.total = this.total.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        let arr = [];
                        let arr1 = [];
                        this.list = res.data.data.list;
                        for(let i=0; i<res.data.data.list.length; i++){
                            arr.push(res.data.data.list[i].name)
                            arr1.push(res.data.data.list[i].amount)
                        }
                        this.config.xAxis[0].data = arr;
                        this.config.series[0].data = arr1;
                        this.init();
                    }
                })
            },
            getInfo(){
                let json = {};
                let date = null;
                function getDate(str){
                    let date = new Date(str);
                    function p(s) {
                        return s < 10 ? '0' + s: s;
                    }
                    return date.getFullYear() + '-' + p((date.getMonth() + 1)) + '-' + p(date.getDate()); 
                }
                if(this.finds.cycle === ''){
                    json.startDate = getDate(this.finds.date[0]);
                    json.endDate = getDate(this.finds.date[0]);
                }else{
                    json.dateType = this.finds.cycle;
                }
                json.type = this.finds.filter;
                json.entityId = this.formInfo.id;
                json.page = this.formInfo.formInfoData.current;
                json.pageSize = this.formInfo.formInfoData.pageSize;
                this.$ajax({
                    url: "/report/detail",
                    method: "GET",
                    params: json
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.formInfo.formInfoData.totalAmount = res.data.data.totalAmount.toFixed(2);
                        this.formInfo.formInfoData.totalAmount = this.formInfo.formInfoData.totalAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        this.formInfo.formInfoData.rows = res.data.data.page.rows;
                        this.formInfo.formInfoData.total = res.data.data.page.total;
                        this.formInfo.modal = true;
                    }
                })
            },
            changeFind(){
                function getDate(str){
                    let date = new Date(str);
                    function p(s) {
                        return s < 10 ? '0' + s: s;
                    }
                    return date.getFullYear() + '-' + p((date.getMonth() + 1)) + '-' + p(date.getDate()); 
                }
                this.getData({
                    type: this.finds.filter,
                    startDate: getDate(this.finds.date[0]),
                    endDate: getDate(this.finds.date[1])
                }) 
            },
            changeFindCycle(){
                if(this.finds.cycle === ''){return;}
                

                let now = new Date(); //当前日期 
                let nowDayOfWeek = now.getDay(); //今天本周的第几天 
                let nowDay = now.getDate(); //当前日 
                let nowMonth = now.getMonth(); //当前月 
                let nowYear = now.getFullYear(); //当前年 
                function formatDate(date) { 
                    let myyear = date.getFullYear(); 
                    let mymonth = date.getMonth()+1; 
                    let myweekday = date.getDate(); 

                    if(mymonth < 10){ 
                        mymonth = "0" + mymonth; 
                    } 
                    if(myweekday < 10){ 
                        myweekday = "0" + myweekday; 
                    } 
                    return (myyear+"-"+mymonth + "-" + myweekday); 
                }
                function getBeforeDate(n){  
                    let d = new Date();  
                    let year = d.getFullYear();  
                    let mon=d.getMonth()+1;  
                    let day=d.getDate();  
                    if(day <= n){  
                            if(mon>1) {  
                            mon=mon-1;  
                            }  
                        else {  
                            year = year-1;  
                            mon = 12;  
                            }  
                        }  
                        d.setDate(d.getDate()-n);  
                        year = d.getFullYear();  
                        mon=d.getMonth()+1;  
                        day=d.getDate(); 
                    return year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);  
                }
                switch(this.finds.cycle){
                    case 1:
                        this.finds.date[0] = formatDate( new Date(nowYear, nowMonth, nowDay - nowDayOfWeek) );
                        this.finds.date[1] = formatDate( new Date(nowYear, nowMonth, nowDay) );
                        break;
                    case 2:
                        this.finds.date[0] = getBeforeDate(15);
                        this.finds.date[1] = formatDate( new Date(nowYear, nowMonth, nowDay) );
                        break;
                    case 3:
                        this.finds.date[0] = getBeforeDate(30);
                        this.finds.date[1] = formatDate( new Date(nowYear, nowMonth, nowDay) );
                        break;
                    case 4:
                        this.finds.date[0] = getBeforeDate(91);
                        this.finds.date[1] = formatDate( new Date(nowYear, nowMonth, nowDay) );
                        break;
                    case 5:
                        this.finds.date[0] = getBeforeDate(182);
                        this.finds.date[1] = formatDate( new Date(nowYear, nowMonth, nowDay) );
                        break;
                    case 6:
                        this.finds.date[0] = getBeforeDate(365);;
                        this.finds.date[1] = formatDate( new Date(nowYear, nowMonth, nowDay) );
                        break;
                    default: ;
                }
                this.finds.date.push({});
                this.finds.date.pop();
                

                this.getData({
                    type: this.finds.filter,
                    dateType: this.finds.cycle
                })
            },
            changeFindDate(date){
                this.finds.cycle = '';
                this.getData({
                    type: this.finds.filter,
                    startDate: date[0],
                    endDate: date[1]
                })
            },
            exportExcel(){
                let json = {};
                let date = null;
                function getDate(str){
                    let date = new Date(str);
                    function p(s) {
                        return s < 10 ? '0' + s: s;
                    }
                    return date.getFullYear() + '-' + p((date.getMonth() + 1)) + '-' + p(date.getDate()); 
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
                if(this.finds.cycle === ''){
                    json.startDate = getDate(this.finds.date[0]);
                    json.endDate = getDate(this.finds.date[0]);
                }else{
                    json.dateType = this.finds.cycle;
                }
                json.type = this.finds.filter;
                this.$ajax({
                    url: "/report/export",
                    method: "GET",
                    params: json
                }).then((res) => {
                    window.open(res.config.url+'?'+buildUri(res.config.params),'_blank');
                })
            },
            changePage (current) {
                this.formInfo.formInfoData.current = current;
                this.getInfo();
            },
            changeSizePage (size){
                this.formInfo.formInfoData.pageSize = size;
                this.getInfo();
            }
        }
    }
</script>
<style lang="less">
    .u-expenditure-form{
        .total{
            font-size: 14px;
            margin: 20px 0;
            line-height: 40px;
            color: #333;
            .text{
                font-weight: bold;
            }
            .num{
                color: red;
                font-size: 30px;
            }
        }
        .expenditure{
            height: 300px;
        }
    }
    .ivu-modal-footer{
        min-height: 60px;
        .pages-show{
            text-align: left;
            float: left;
        }
    }
    .formInfototal{
        font-size: 14px;
        float: right;
        .num{
            color: red;
            font-size: 25px;
        }
    } 
</style>
