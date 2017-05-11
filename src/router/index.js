import Vue from 'vue'
import Router from 'vue-router'
import login from '@/myPage/login'
import index from '@/myPage/index/index.vue' // 主页or首页

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: login
    }, {
      path: '/index',
      name: '个人主页',
      component: index
    }
  ]
})
