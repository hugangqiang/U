<template>
    <div class="u-expenditure">
        <Card>
            <p slot="title">新增支出</p>
            
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
            this.getData()
        },
        methods: {
            getData(){
                /* this.$ajax({
                    url: "/expenditures",
                    method: "GET",
                    params: {}
                }).then((res) => {
                    console.log(res.data)
                }) */
            }
        }
    }
</script>
<style lang="less">

</style>
