import { useTokenStore } from '@/stores/tokenStore'
import { useUserStore } from '@/stores/userStore'
import BaseLayout from '@/views/Layout/BaseLayout.vue'
import SignInUp from '@/views/User/SignInUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { userInfoAPI } from '@/apis'



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
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: ()=> import('@/views/404/indexPage.vue')
    }

  ],
})



router.beforeEach(async (to, from, next)=> {
  const tokenStore = useTokenStore()
  const userStore = useUserStore()

  if (to.meta.auth) {//需要登录
    // 直接从localStorage检查token是否存在，因为此时tokenStore的onMounted可能还未执行
    const storedToken = localStorage.getItem('accessToken');
    const hasToken = !!storedToken;

    // 如果localStorage有token，同步到tokenStore
    if (storedToken && tokenStore.isEmptyAccessToken()) {
      tokenStore.setAccessToken(storedToken);
    }

    if (!hasToken) {
      // token不存在，跳转到登录页面
      next({name: 'signInUp'})
    } else {
      // token存在
      if (!userStore.userRole) {
        // 用户角色不存在，向后端请求用户信息,解决刷新页面导致的用户角色丢失问题
        try {
          const userInfoResponse = await userInfoAPI.getUserInfoReq();

          // 尝试不同的响应格式检查
          let role = null;

          // 格式1: userInfoResponse.data.code
          if (userInfoResponse.data && userInfoResponse.data.code === "200") {
            if (userInfoResponse.data.data && userInfoResponse.data.data.userRole) {
              role = userInfoResponse.data.data.userRole;
            } else if (userInfoResponse.data.data && userInfoResponse.data.data.roleResponse && userInfoResponse.data.data.roleResponse.userRole) {
              role = userInfoResponse.data.data.roleResponse.userRole;
            } else if (userInfoResponse.data.roleResponse && userInfoResponse.data.roleResponse.userRole) {
              role = userInfoResponse.data.roleResponse.userRole;
            } else if (userInfoResponse.data.userRole) {
              role = userInfoResponse.data.userRole;
            }
          }
          // 格式2: userInfoResponse.code
          else if (userInfoResponse.code === "200") {
            if (userInfoResponse.data && userInfoResponse.data.roleResponse && userInfoResponse.data.roleResponse.userRole) {
              role = userInfoResponse.data.roleResponse.userRole;
            } else if (userInfoResponse.roleResponse && userInfoResponse.roleResponse.userRole) {
              role = userInfoResponse.roleResponse.userRole;
            } else if (userInfoResponse.userRole) {
              role = userInfoResponse.userRole;
            }
          }

          if (role) {
            userStore.setUserRole(role);
            next();
          } else {
            // 获取用户信息失败，跳转到登录页面
            tokenStore.clearAccessToken();
            userStore.clearUserRole();
            next({name: 'signInUp'});
          }
        } catch (error) {
          // 请求失败，跳转到登录页面
          console.error('获取用户信息失败:', error); // 打印错误信息便于调试
          tokenStore.clearAccessToken();
          userStore.clearUserRole();
          next({name: 'signInUp'});
          // 请求失败，跳转到登录页面
          tokenStore.clearAccessToken();
          userStore.clearUserRole();
          next({name: 'signInUp'});
        }
      } else {
        // 用户角色已存在，直接放行
        next();
      }
    }
  } else {
    next()
  }
})


export default router
