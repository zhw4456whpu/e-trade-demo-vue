<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 300px;/*212px;*/
    height: 100px;/*36px;*/
    background: #13C27C;
    float: left;
    position: relative;
}
.logo{
    width: 212px;
    height: 36px;
    background : url('../../../static/i/home/index/logo.png');
    background-size: cover;
    top: 32px;
    left: 20px;
    position: relative;
}
.layout-nav{
    margin: 0 auto;
    margin-left: 450px;
}
.ivu-layout-header{
    height: 100px;
    line-height: 100px;
    background: #13C27C;
    padding: 0px;
}
.ivu-menu-dark{
    background: white;
}

.ivu-menu-horizontal{
    height: 100px;
    line-height: 100px;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active.ivu-menu-item-selected{
    color: #13C27C;
    border-bottom: 4px solid #13C27C;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item{
    color: rgba(20,51,39,1);
    height: 100px;
}
.ivu-menu-horizontal .ivu-menu-item{
    padding: 0px;
    margin: 0 20px;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    border-right:none;
    border-left: 4px solid #13C27C;
    background: rgba(240,250,246,1);
    color: #13C27C;
}
.ivu-menu.ivu-menu-light.ivu-menu-vertical::after{
    width: 0px;
}
.ivu-layout.ivu-layout-has-sider{
    margin-top: 20px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <div class="logo"></div>
                    </div>
                    
                    <div class="layout-nav">
                        <MenuItem v-for="(item,index) in topNav" :name="index+1" @click.native="selected(item.name,index)" 
                          :class="{'ivu-menu-item-active ivu-menu-item-selected':curTopNav.index == index}">
                            <Icon :type="item.icon"></Icon>
                            {{item.name}}
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff',width: '300px',maxWidth:'300px',minWidth:'300px'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1" v-for="(item,index) in curSubMenus">

                            <template slot="title">
                                <span >
                                <Icon :type="item.icon"></Icon>
                                {{item.name}}
                                </span>
                            </template>
                            <template v-if="item.children && item.children.length> 0">
                                <MenuItem  v-for="sitem in item.children" :name="sitem.name">{{sitem.name}}</MenuItem>
                            </template>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        name: 'Index',
        data(){
            return {
                curTopNav:{
                    name: '',
                    index: 0
                },
                curSubMenus:[],
                topNav: [
                    {
                        name: '数据统计',
                        icon: 'md-keypad'
                    },
                    {
                        name: '客服管理',
                        icon: 'ios-keypad'
                    },
                    {
                        name: '系统设置',
                        icon: 'ios-construct'
                    },
                    {
                        name: '营销数据',
                        icon: 'ios-analytics'
                    },
                    {
                        name: '客户中心',
                        icon: 'ios-paper'
                    }
                ],
                subMenus: [
                    /******数据统计 */
                    {
                        name: '统计概况',
                        parent: '数据统计',
                        icon: 'ios-stats',
                        children: [
                            {
                                name: 'a概况'
                            },
                            {
                                name: 'b概况'
                            },
                            {
                                name: 'c概况'
                            }
                        ]
                    },
                    {
                        name: '访客与对话',
                        parent: '数据统计',
                        icon: 'ios-statics',
                    },
                    {
                        name: '工单统计',
                        parent: '数据统计',
                        icon: 'ios-statics',
                    },
                    {
                        name: '客服质量',
                        parent: '数据统计',
                        icon: 'ios-statics',
                    },
                    /****** 客服管理*/
                    {
                        name: '客服',
                        parent: '客服管理',
                        icon: 'ios-statics',
                    },
                    {
                        name: '技能组',
                        parent: '客服管理',
                        icon: 'ios-statics',
                    },
                    /********* 系统设置*/
                    {
                        name: '企业信息',
                        parent: '系统设置',
                        icon: 'ios-statics',
                    },
                    {
                        name: '系统开关',
                        parent: '系统设置',
                        icon: 'ios-statics',
                    },
                    {
                        name: '时间计划',
                        parent: '系统设置',
                        icon: 'ios-statics',
                    },
                    {
                        name: '会话标签',
                        parent: '系统设置',
                        icon: 'ios-statics',
                    },
                    {
                        name: '会话分配规则',
                        parent: '系统设置',
                        icon: 'ios-statics',
                    },
                    /************营销数据 */
                    {
                        name: '营销数据',
                        parent: '营销数据',
                        icon: 'ios-statics',
                    },
                    /******客户中心*/
                    {
                        name: '客户中心',
                        parent: '客户中心',
                        icon: 'ios-statics',
                    }
                ]
            }
        },
        methods:{
            //顶级菜单单击事件
            selected(name,index){
                this.curTopNav.name = name;
                this.curTopNav.index = index;

                this.curSubMenus = this.subMenus.filter(item =>{
                    return item.parent == name;
                });
            }
        },
        mounted(){
            this.selected('数据统计',0);
        }
    }
</script>
