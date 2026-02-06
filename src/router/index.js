import { useTokenStore } from '@/stores/tokenStore'
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
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: ()=> {import('@/views/404/indexPage.vue')}
    }

  ],
})

router.beforeEach((to, from, next)=> {
  const tokenStore = useTokenStore()
  if (to.meta.auth) {//需要登录
    if (tokenStore.isEmptyToken) {//token为空
      router.push({name: 'signInUp'})
    } else {//token存在，但不知道是否过期，只有当发起一个新的请求之后由后端返回的状态码在相响应拦截器处理
      next()
    }
  } else {
    next()
  }

})


export default router
