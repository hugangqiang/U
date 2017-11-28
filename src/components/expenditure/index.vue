<template>
    <div class="u-expenditure">
        <Card>
            <p slot="title">支出管理</p>
            <div class="u-table">
                <div class="u-table-add">
                    <Button type="primary">新增</Button>
                </div>
                <Table :columns="expenditureCol" :data="expenditureData"></Table>
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                expenditureCol: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                expenditureData: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        created(){
            
        },
        methods: {
            getData(){
                /* this.$ajax({
                    url: "/email/init",
                    method: "POST",
                    params: {
                        saveJson: sstr
                    }
                }).then((res) => {
                    console.log(res.data)
                }) */
            }
        }
    }
</script>
<style lang="less">

</style>
