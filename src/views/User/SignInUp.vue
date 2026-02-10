<template>
  <div class="container">
    <div class="top">
      <MyButton button-size="big" font-size="23px" font-color="#000"
        :class="['myButton', { 'active': !defaultTrue, 'disable': defaultTrue }]" :disabled="defaultTrue"
        @click="change">
        密码登录
      </MyButton>
      <MyButton button-size="big" font-size="23px" font-color="#000"
        :class="['myButton', { 'active': defaultTrue, 'disable': !defaultTrue }]" :disabled="!defaultTrue"
        @click="change">
        账户注册
      </MyButton>
    </div>
    <div class="mid">
      <KeepAlive>
        <component :is="componentName" />
      </KeepAlive>
    </div>
    <div class="bottom">
      <template v-if="defaultTrue">
        <MyButton font-color="blue" class="button_1" button-size="proMax"
          color="rgba(58, 183, 255, 0.7)" font-size="18px" fontColor="#fff"
          @click="submitLogin">
          登录
        </MyButton>
      </template>
      <template v-else>
        <MyButton font-color="blue" class="button_1" button-size="proMax"
          color="rgba(58, 183, 255, 0.7)" font-size="18px" fontColor="#fff"
          @click="sumbitRegister">
          注册
        </MyButton>
      </template>
    </div>
  </div>
</template>


<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue';
import { useLoginStore } from '@/stores/loginStore';

import MyButton from '@/components/MyButton.vue';
import LoginComponent from './Login/LoginComponent.vue';
import RegisterComponent from './Register/RegisterComponent.vue';
import { useRegisterStore } from '@/stores/registerStore';
import router from '@/router';
import { useTokenStore } from '@/stores/tokenStore';

//切换可点击按钮
const defaultTrue = ref(true)
const change = () => {
  defaultTrue.value = !defaultTrue.value
}
//切换Login，Register组件
const componentName = computed(() => defaultTrue.value ? LoginComponent : RegisterComponent)

//判断点击事件后是否提交登录表单
const loginStore = useLoginStore()
const submitLogin = async () => {
  if (loginStore.judjePassword(loginStore.loginForm.password)
    && loginStore.judjeUsername(loginStore.loginForm.username)) {
    try {
      const loginResponse = await loginStore.login(loginStore.loginForm)
      if (loginResponse.code === "200") {
        //存储后端传来的token

        //浏览器自动存储响应头中的refreshtoken作为cookie
        useTokenStore().accessToken = loginResponse.data.accessToken
        console.log(useTokenStore().accessToken);

        //由于refreshtoken的cookie前端js无法读取，可在localStorage存储isLogin标志是否登录
        localStorage.setItem("isLogin", true);

        ElMessage.success('登录成功')
        router.push({ name: 'home' })

      } else {
        ElMessage.error('登录失败')
      }
    } catch (e) {
      ElMessage.error('系统繁忙请稍后登录')
      console.error(e)
    }
  } else {
    ElMessage.error('用户名或密码错误')
  }
}

//判断点击事件后是否提交注册表单
const registerStore = useRegisterStore()
const sumbitRegister = async () => {
  if (registerStore.judjePassword(registerStore.registerForm.password)
    && registerStore.judjeRePassword(registerStore.registerForm.rePassword)
    && registerStore.judjeUsername(registerStore.registerForm.username)) {
    try {
      const registerResponse = await registerStore.register(registerStore.registerForm)
      console.log(registerResponse);

      if (registerResponse.code === "200") {
        //切换到登录组件
        defaultTrue.value = true;
        ElMessage.success('注册成功，请登录')
      } else {
        ElMessage.error('注册失败')
      }
    } catch (e) {
      ElMessage.error('系统繁忙请稍后注册')
      console.error(e)
    }
  } else {
    ElMessage.error('请再次确认信息')
  }

}



</script>

<style scoped>
.container {
  width: 65rem;
  height: 38rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.myButton {
  font-weight: 500;
  cursor: pointer;
}

.active {
  cursor: pointer;
}

.disable {
  cursor: not-allowed;
  color: rgba(58, 183, 255, 0.7) !important;
}

.top {
  display: flex;
  align-items: center;
  position: relative;
  top: 13%;
}

.top::before {
  position: absolute;
  content: "";
  width: 2.5px;
  height: 21px;
  background-color: rgb(211, 211, 211, 0.5);
  left: 50%;
  top: 27%;
  border-radius: 1px;
}

.mid {
  width: 100%;
  position: relative;
  top: 15%;
  left: 11%;
}

.bottom {
  width: 100%;
  position: relative;
  top: 24%;
}

.button_1 {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: box-shadow 0.5s;
}

.button_1:hover {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
