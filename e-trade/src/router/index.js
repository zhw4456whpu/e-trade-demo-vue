import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Layout from '@/components/common/Layout'
import ItemId from '@/components/item/ItemId'
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
    }
  ]
})
