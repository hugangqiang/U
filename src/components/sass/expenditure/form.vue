<template>
    <div class="u-expenditure-form">
        <Card>
            <p slot="title">支出报表</p>
            <div slot="extra">
                <Button type="success" @click.native="exportExcel">导出Excel</Button>
            </div>
            <div class="u-table-filter">
                <DatePicker v-model="finds.date" type="daterange" placement="bottom-start" placeholder="请选择起止日期" @on-change="changeFindDate" style="width: 200px;"></DatePicker>
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
    </div>
</template>
<script>
    export default {
        data () {
            return {
                finds: {
                    date: [],
                    cycle: 1,
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
                expenditure.on('click', function (params) {
                    console.log(params)
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
            changeFind(){
                this.getData({
                    type: this.finds.filter,
                    dateType: this.finds.cycle
                })
            },
            changeFind(){
                this.getData({
                    type: this.finds.filter,
                    dateType: this.finds.cycle
                })
            },
            changeFindCycle(){
                this.finds.date = [];
                this.getData({
                    type: this.finds.filter,
                    dateType: this.finds.cycle
                })
            },
            changeFindDate(){
                this.finds.cycle = '';
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
                    endDate: getDate(this.finds.date[0])
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
                json.entityId = this.finds.filter;
                this.$ajax({
                    url: "/report/export",
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
</style>
