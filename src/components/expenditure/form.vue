<template>
    <div class="u-expenditure-form">
        <Card>
            <p slot="title">支出报表</p>
            <Row>
                <Col span="24">
                    <div class="expenditure01"></div>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
               
            }
        },
        created(){
           
        },
        mounted(){
            // 基于准备好的dom，初始化echarts实例
            let expenditure01 = this.$echarts.init(document.querySelector('.expenditure01'));
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
        },
        methods: {
            
        }
    }
</script>
<style lang="less">

</style>
