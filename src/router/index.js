import Vue from 'vue'
import Router from 'vue-router'
import login from '@/myPage/login'
import index from '@/myPage/index/index.vue' // 主页or首页
import one from '@/myPage/componentsPage/one.vue' // 组件1
import two from '@/myPage/componentsPage/two.vue' // 组件2

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
    }, {
      path: '/one',
      component: one
    }, {
      path: '/two',
      component: two
    }]
})
