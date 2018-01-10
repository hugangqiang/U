<template>
    <div class="u-category">
        <Card>
            <div class="u-category-content">
                <div class="u-category-one">
                    <div class="header">
                        <div class="name">
                            <span>大类目</span>
                            <div class="add"  @click="categoryAdd(1,'请输入大类目')"><Icon type="plus-circled"></Icon></div>
                        </div>
                    </div>
                    <div class="u-category-con">
                        <div class="content-item" v-for="(item,index) in categoryData" :key="item.id" :class="{active: item === categoryActive}" @click="categoryActive = item">
                            <div class="text" v-show="!item.show">{{item.name}}</div>
                            <div class="edit" v-show="item.show" >
                                <Input type="text" v-model="item.editValue"></Input>
                            </div>
                            <div class="operation" v-show="item === categoryActive">
                                <Button type="primary" size="small" v-if="!item.show" @click.native="categoryEditTodo(item)">修改</Button>
                                <Button type="primary" size="small" v-else @click.native="categoryEditSaveTodo(item)">保存</Button>
                                <Button type="error" size="small" @click.native="categoryDelTodo(item,index)">删除</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="u-category-two">
                    <div class="header">
                        <div class="name">
                            <span>小类目</span>
                            <div class="add" @click="categoryAdd(2,'请输入小类目')"><Icon type="plus-circled"></Icon></div>
                        </div>
                    </div>
                    <div class="u-category-con">
                        <div class="content-item" v-for="(item,index) in categoryActive.childrens" :key="item.id" >
                            <div class="text" v-if="!item.show">{{item.name}}</div>
                            <div class="edit" v-else>
                                <Input type="text" v-model="item.editValue"></Input>
                            </div>
                            <div class="operation" >
                                <Button type="primary" size="small" v-if="!item.show" @click.native="categoryEditTodo(item)">修改</Button>
                                <Button type="primary" size="small" v-else @click.native="categoryEditSaveTodo(item)">保存</Button>
                                <Button type="error" size="small" @click.native="categoryDelTodo(item,index)">删除</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        <Modal
            v-model="categoryAddData.modal"
            title="添加类目"
            class-name="vertical-center-modal">
            <div class="u-modalAddData">
                <Input v-model="categoryAddData.value" :placeholder="categoryAddData.placeholder" @on-enter="categoryAddDataOk"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" @click="categoryAddDataOk">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                categoryData: [],
                categoryActive: {},
                categoryAddData: {
                    modal: false,
                    value: '',
                    level: 0,
                    placeholder: '请输入类目'
                }
            }
        },
        created(){
            
        },
        mounted(){
            this.getData();
            document.querySelector('.u-category-content').style.height = document.documentElement.clientHeight - 200 + 'px';
            document.querySelectorAll('.u-category-con')[0].style.height = document.documentElement.clientHeight - 240 - 50 + 'px';
            document.querySelectorAll('.u-category-con')[1].style.height = document.documentElement.clientHeight - 240 - 50 + 'px';
        },
        methods: {
            getData(){
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
                        this.getData();
                        item.show = false;
                        item.editValue = '';
                    }
                })
            },
            categoryAdd(level,placeholder){
                this.categoryAddData.level = level;
                this.categoryAddData.modal = true;
                this.categoryAddData.value = '';
                this.categoryAddData.placeholder = placeholder;
            },
            categoryAddDataOk(){
                let parentId = 0;
                if(this.categoryAddData.level === 2){
                    parentId = this.categoryActive.id;
                }
                if(this.categoryAddData.value === ''){
                    this.$Notice.warning({
                        title: '请输入类目名！'
                    });
                    return;
                }
                
                this.$ajax({
                    url: "/categorys",
                    method: 'POST',
                    params: {
                        name: this.categoryAddData.value,
                        parentId: parentId,
                        level: this.categoryAddData.level
                    }
                }).then((res) => {
                    if(res.data.meta.code === 200){
                        this.$Notice.success({
                            title: '添加成功。'
                        });
                        this.getData();
                        this.categoryAddData.modal = false;
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
                                    this.getData();
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
            }
        }
    }
</script>
<style lang="less">
    .u-category{
        .u-category-content{
            display: flex;
            flex-direction: row;
            border-radius: 5px;
            margin: 10px 0;
            border: 1px solid #e0e0e0;
            .u-category-one{
                width: 25%;
                background: #f1eff5;
                .header{
                    border-right: 1px solid #fff;
                }
            }
            .u-category-two{
                width: 75%;
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
    }
</style>
