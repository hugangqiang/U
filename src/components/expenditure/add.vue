<template>
    <div class="u-expenditure">
        <Card>
            <p slot="title">新增支出</p>
            <div class="u-expenditure-content">
                <Form ref="expenditureForm" :model="expenditureForm" :rules="expenditureRule" inline>
                    <FormItem prop="departmentId" label="部门">
                        <Input type="text" v-model="expenditureForm.departmentId" placeholder=""></Input>
                    </FormItem>
                    <FormItem prop="employeeId" label="姓名">
                        <Input type="text" v-model="expenditureForm.employeeId" placeholder="Password"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="expenditureSubmit('expenditureForm')">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                expenditureForm: {
                    departmentId: '',
                    employeeId: ''
                },
                expenditureRule: {
                    departmentId: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    employeeId: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
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
            },
            expenditureSubmit(){

            }
        }
    }
</script>
<style lang="less">

</style>
