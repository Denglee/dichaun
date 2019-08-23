import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'
import classIfy from './views/classIfy/classIfy.vue'
import classIfyInfo from './views/classIfy/classIfyInfo.vue'
import showTpl from './views/classIfy/showTpl.vue'
import editTpl from './views/classIfy/editTpl.vue'
import userCenter from './views/user/userCenter.vue'
import userEdit from './views/user/userEdit.vue'
import userPurchased from './views/user/userPurchased.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash', //history
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      redirect:'/home'   //重定向
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      // 一级分类
      path: '/classIfy',
      name: 'classIfy',
      component: classIfy
    },
    {
      // 二级分类
      path: '/classIfyInfo',
      name: 'classIfyInfo',
      component: classIfyInfo
    },
    {
      // 去显示页面
      path: '/showTpl',
      name: 'showTpl',
      component: showTpl
    },
    {
      // 去编辑页面
      path: '/editTpl',
      name: 'editTpl',
      component: editTpl
    },
    {
      // 个人中心
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      // 个人中心=已编辑
      path: '/userEdit',
      name: 'userEdit',
      component: userEdit
    },
    {
      // 个人中心=已购买
      path: '/userPurchased',
      name: 'userPurchased',
      component: userPurchased
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
