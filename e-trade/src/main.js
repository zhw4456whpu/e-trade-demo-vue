// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'/* 使用 CSS */
import iview from 'iview/dist/iview.js'/* 使用 js */
import lazyLoad from 'vue-lazyload'
Vue.use(lazyLoad,{
    error:require('../static/i/lazyload/error.jpg'),
    loading:require('../static/i/lazyload/loading.gif')
})
Vue.use(iview)
Vue.config.productionTip = false

import uploader from 'vue-simple-uploader'
import Upload from './components/common/Upload'
Vue.use(uploader)
/* eslint-disable no-new */
/*new Vue({
    render(createElement) {
        return createElement(Upload)
    }
}).$mount('#upload')*/

//定义路由beforeEach函数
/* router.beforeEach((to,from,next) =>{
  if(to.name.toLocaleLowerCase.indexof('api') >-1){
    debugger
  }
  next();
}) */

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.token) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
