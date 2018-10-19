import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Index from '@/components/home/Index'
import SummeryStatistics from '@/components/statics/SummeryStatistics'
import Layout from '@/components/common/Layout'
import ItemId from '@/components/item/ItemId'
import Test from '@/components/Test'
import TestCss from '@/components/test/TestCss'
import TopTree from '@/components/common/TuopuTree'
import Upload from '@/components/common/Upload'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/index',
      name:'Index',
      component:Index,
      children: [
        {
          path: 'test',
          name: 'Test',
          component: Test
        },
        {
          path: 'summerystatistics',
          name: 'Summerystatistics',
          component: SummeryStatistics
        },
      ]
    },
    {
      path:'/item',
      name:'Item',
      component:Layout,
      children:[
        {
          path:'/item/:id',
          name:'ItemId',
          component:ItemId
        }
      ]
    },
    {
      path:'/test',
      name:'Test',
      component:Test
    },
    {
      path:'/test/testcss',
      name:'TestCss',
      component:TestCss
    },
    {
      path:'/toptree',
      name:'TopTree',
      component:TopTree
    },
    {
      path:'/upload',
      name:'Upload',
      component:Upload
    }
  ]
})
