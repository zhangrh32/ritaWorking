import Vue from 'vue'
import Router from 'vue-router'
import login from '@/myPage/login'
import index from '@/myPage/index'
import mypage from '@/myPage/index/index.vue' // 主页or首页
import one from '@/myPage/componentsPage/one.vue' // 组件1
import two from '@/myPage/componentsPage/two.vue' // 组件2
import remberMe from '@/myPage/componentsPage/remberMe.vue' // 一个提醒的实例
import list from '@/myPage/myself/list.vue' // 练习
import myself from '@/myPage/myself/index.vue' // 练习

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: login
    }, {
      path: '',
      name: '个人中心',
      component: index,
      children: [{
        path: '/mypage',
        name: '个人主页',
        component: mypage
      }, {
        path: '/one',
        component: one
      }, {
        path: '/two',
        component: two
      }, {
        path: '/remberMe',
        component: remberMe
      }]
    }, {
      path: '/myself',
      name: '练习',
      component: myself,
      children: [{
        path: '',
        redirect: 'list'
      }, {
        path: '/list',
        component: list
      }]
    }]
})
