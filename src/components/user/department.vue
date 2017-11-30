<template>
    <div class="u-department">
        <Card>
            <p slot="title">部门人员管理</p>
            <div class="u-table">
                <div class="u-table-add">
                    <Button type="primary">新增</Button>
                </div>
                <div class="u-table-filter">
                    
                </div>
                <Table stripe :columns="departmentTitle" :data="departmentData"></Table>
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                departmentTitle: [
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
                departmentData: [
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
