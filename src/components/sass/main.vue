<template>
    <div>
        <div class="u-layout" :class="{menuMini: menuActive}">
            <div class="u-layout-left">
                <router-link to="/">
                    <div class="logo" v-if="!menuActive">
                        <img src="../images/logo.png" alt="">                    
                    </div>
                    <div class="logo" v-else>
                        <img src="../images/logo-mini.png" alt="">                    
                    </div>
                </router-link>
                <div class="u-left-menu">
                    <div class="u-toggle-menu" @click="menuActive = !menuActive">
                        <Icon type="navicon"></Icon>
                    </div>
                    <Menu theme="dark" width="auto" :open-names="openName" :active-name="activeName" >
                        <Submenu v-for="(items,indexs) in menus" :key="items.id" :name="indexs+1">
                            <template slot="title" v-if="items.children.length != 0">
                                <Icon :type="items.icon"></Icon>
                                <span class="text">{{items.title}}</span>
                            </template>
                            <template slot="title" v-else>
                                <Icon :type="items.icon" @click.native="filePage"></Icon>
                                <span class="text hideDown" @click="filePage">{{items.title}}</span>
                            </template>
                            <router-link v-for="(item, index) in items.children" :key="item.id" :to="item.href">
                                <MenuItem :name="(indexs+1) + '-' + (index+1)">
                                    <Icon :type="item.icon"></Icon>
                                    <span class="text">{{ item.subtitle }}</span>
                                </MenuItem>
                            </router-link>
                        </Submenu>
                    </Menu>
                </div>
            </div>
            <div class="u-layout-right">
                <div class="u-top-menu">
                    <div class="item">
                        <Icon type="ios-bell"></Icon>
                        <span>消息</span>
                    </div>
                    <div class="item">
                        <Icon type="gear-b"></Icon>
                        <span>设置</span>
                    </div>
                    <div class="item">
                        <Icon type="person"></Icon>
                        <span>{{this.$store.state.userinfo.phone}}</span>
                        <div class="u-submenu">
                            <div class="subitem">基本资料</div>
                            <div class="subitem" @click="logout">退出</div>
                        </div>
                    </div>
                </div>
                <div class="u-body">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                menuActive: false,
                activeName: '',
                openName: [1,2,3],
                menus: [
                    {
                        title: "支出管理",
                        icon: 'calculator',
                        children: [
                            {
                                subtitle: '新增支出',
                                icon: 'ios-compose',
                                href: '/sass/expenditure/add'
                            },
                            {
                                subtitle: '支出详情',
                                icon: 'ios-list-outline',
                                href: '/sass/expenditure/list'
                            },
                            {
                                subtitle: '统计中心',
                                icon: 'ios-pulse-strong',
                                href: '/sass/expenditure/form'
                            }
                        ]
                    },
                    {
                        title: "资料模板",
                        icon: 'document',
                        children: []
                    },
                    {
                        title: "个人中心",
                        icon: 'ios-settings-strong',
                        children: [
                            {
                                subtitle: '个人设置',
                                icon: 'android-settings',
                                href: '/sass/user/set'
                            },
                            {
                                subtitle: '供应商管理',
                                icon: 'social-dribbble-outline',
                                href: '/sass/user/supplier'
                            },
                            {
                                subtitle: '部门人员管理',
                                icon: 'ios-people',
                                href: '/sass/user/department'
                            },
                            {
                                subtitle: '类目设置',
                                icon: 'ios-compose',
                                href: '/sass/user/category'
                            }
                        ]
                    }
                ]
            }
        },
        created(){
            for(let i=0; i<this.menus.length; i++){
                for(let j=0; j<this.menus[i].children.length; j++){
                    if( this.menus[i].children[j].href === this.$route.fullPath ){
                        //this.openName = [i+1];
                        this.activeName = (i+1)+'-'+(j+1);
                    }
                }
            }
        },
        mounted(){
            document.querySelector('.u-body').style.height = document.documentElement.clientHeight - 60 + 'px';
        },
        methods: {
            filePage(){
                console.log('1')
            },
            logout(){
				/** 
				 * 退出登录
				 **/
        		this.$Modal.confirm({
                    content: '<h2>是否退出系统？</h2>',
                    onOk: () => {
                        this.$store.commit('SAVE_USER', {});
            			this.$delCookie("token");
                        this.$router.push({path:'/login'});
                    }
                });
        	}
        }
    }
</script>
<style lang="less">
    .u-layout{
        .u-layout-left{
            width: 180px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 20;
            background: #424f63;
            .logo{
                height: 60px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                img{
                    width: 100px;
                    height: 35px;
                    margin-top: 12.5px;
                }
            }
            .u-toggle-menu{
                height: 35px;
                background: #333f50;
                color: hsla(0,0%,100%,.7);
                text-align: center;
                cursor: pointer;
                .ivu-icon{
                    line-height: 35px;
                    font-size: 28px;
                    transform: rotateZ(-90deg);
                }
            }
            .ivu-menu{
                background: #424f63;
                .text.hideDown + .ivu-menu-submenu-title-icon{
                    display: none;
                }
            }
            .ivu-menu-item>i {
                margin-right: 4px;
                font-size: 16px;
            }
            .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
                background: #333f50;
            }
            .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover{
                background: #333f50;
            }
            .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
                padding-left: 35px;
            }
            .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
                transition: none;
            }
            .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover{
                background: #374457 !important;
            }
            .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
                background: #2d8cf0!important;
            }
        }
        .u-layout-right{
            width: 100%;
            position: relative;
            padding-left: 180px;
            background: #e7ebf0;
            .u-top-menu{
                height: 60px;
                background: #fff;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                position: relative;
                border-bottom: 1px solid #f0f0f0;
                .item{
                    line-height: 60px;
                    color: #333;
                    font-size: 16px;
                    padding: 0 20px;
                    cursor: pointer;
                    position: relative;
                    .u-submenu{
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: #fff;
                        z-index: 10;
                        border: 1px solid #f0f0f0;
                        padding: 5px 0;
                        .subitem{
                            padding: 0 20px;
                            line-height: 40px;
                            background: #fff;
                        }
                        .subitem:hover{
                            background: #f0f0f0;
                        }
                    }
                }
                .item:hover .u-submenu{
                    display: block;
                }
            }
            .u-body{
                width: 100%;
                overflow: hidden;
                overflow-y: auto;
            }
        }
    }
    .u-layout.menuMini{
        .u-layout-left{
            width: 50px;
            .logo{
                width: 50px;
                img{
                    width: auto;
                    height: 28px;
                    margin-top: 16px;
                }
            }
            .u-toggle-menu{
                .ivu-icon{
                    transform: rotateZ(0deg);
                }
            }
        }
        .ivu-menu{
            .ivu-menu-submenu-title,
            .ivu-menu-item{
                position: relative;
                padding: 0;
                line-height: 40px;
                height: 40px;
                font-size: 20px;
                text-align: center;
                .text{
                    display: none;
                    width: 100px;
                    height: 40px;
                    position: absolute;
                    left: 60px;
                    top: 0;
                    background: rgba(55, 68, 87,.95);
                    padding-left: 10px;
                    line-height: 40px;
                    text-align: left;
                    font-size: 14px;
                }
                .text:before {
                    content: "";
                    border-right: 6px solid rgba(55, 68, 87,.95);
                    border-top: 5px solid rgba(0,0,0,0);
                    border-bottom: 5px solid rgba(0,0,0,0);
                    position: absolute;
                    font-size: 15px;
                    left: -6px;
                    top: 16px;
                }
            }
            .ivu-menu-submenu-title:hover .text,
            .ivu-menu-item:hover .text{
                display: inline-block;
            }
            .ivu-menu-submenu .ivu-menu-item{
                padding-left: 0;
                .ivu-icon{
                    margin: 0;
                }
            }
            .ivu-menu-submenu-title{
                .ivu-icon{
                    display: none;
                }
                .ivu-icon.ivu-menu-submenu-title-icon{
                    display: inline-block;
                    float: none;
                    top: auto;
                    margin: 0;
                }
            }
        }
        .u-layout-right{
            padding-left: 50px;
        }
    }
</style>
