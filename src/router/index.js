import BaseLayout from '@/views/Layout/BaseLayout.vue'
import SignInUp from '@/views/User/SignInUp.vue'
import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',//主页面
      name: 'home',
      component: BaseLayout,
      meta: {
        title: '主页',
        auth: true
      }
    },
    {
      path: '/signInUp',//登录或注册的页面
      name: 'signInUp',
      component: SignInUp,
      meta: {
        title: 'signInUp',
        auth: false
      }
    },
    {
      path: '/',
      redirect: '/home'
      // (to) => {
      //   if () {//这里判断用户是否登录，来切换跳转方向
      //     return {name: 'home'}
      //   } else {
      //     return {name: 'signInUp'}
      //   }
      // }
    },

  ],
})

export default router
