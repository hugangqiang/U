<template>
    <div class="u-home">
        
        <Row>
            <Col span="24">
                <Card>
                    <div class="expenditure01"></div>
                </Card>
            </Col>
            <Col span="12">
                <Card>
                    <p slot="title">开支占比</p>
                    <div class="expenditure02"></div>
                </Card>
            </Col>
            <Col span="12">
                <Card class="u-todo">
                    <p slot="title">代办事项</p>
                    <span slot="extra">更多</span>
                    <p class="item" v-for="item in todos" :key="item.id">{{item.text}}</p>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                todos: [
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    },
                    {
                        text: '10月1日完成与李梅的工作交接'
                    }
                ]
            }
        },
        created(){
            
        },
        mounted(){
            // 基于准备好的dom，初始化echarts实例
            let expenditure01 = this.$echarts.init(document.querySelector('.expenditure01'));
            let expenditure02 = this.$echarts.init(document.querySelector('.expenditure02'));
            expenditure01.setOption({
                title: {
                    text: '开支数据（元）'
                },
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
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:[10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            });
            expenditure02.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            });
        },
        methods: {

        }
    }
</script>
<style lang="less">

    .ivu-card{
        background: #fff;
        margin: 30px 20px;
        border-radius: 0;
        border: none;
    }
    .expenditure01{
        height: 600px;
        padding: 35px;
    }
    .expenditure02{
        height: 550px;
        padding: 35px;
    }
    .u-todo{
        .item{
            line-height: 30px;
            font-size: 14px;
            margin: 14.5px 0;
        }
    }
</style>
