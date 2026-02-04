<template>
  <div class="container">
    <div class="top">
      <MyButton button-size="max" font-size="22px" font-color="#000"
        :class="['myButton', { 'active': !defaultTrue, 'disable': defaultTrue }]" :disabled="defaultTrue"
        @click="change">
        密码登录
      </MyButton>
      <MyButton button-size="max" font-size="22px" font-color="#000"
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
        <MyButton font-color="blue" class="button_1" button-size="max"
          color="rgba(58, 183, 255, 0.6)" fontColor="#fff">
          登录
        </MyButton>
      </template>
      <template v-else>
        <MyButton font-color="blue" class="button_1" button-size="max"
          color="rgba(58, 183, 255, 0.6)" fontColor="#fff">
          注册
        </MyButton>
      </template>
    </div>
  </div>
</template>


<script setup>
import MyButton from '@/components/MyButton.vue';
import { computed, ref } from 'vue';
import LoginComponent from './Login/LoginComponent.vue';
import RegisterComponent from './Register/RegisterComponent.vue';
//切换可点击按钮
const defaultTrue = ref(true)
const change = () => {
  defaultTrue.value = !defaultTrue.value
}
//切换Login，Register组件
const componentName = computed(() => defaultTrue.value ? LoginComponent : RegisterComponent)



</script>

<style scoped>
.container {
  width: 53rem;
  height: 30rem;
  background-color: #ffffff;
  border: 2px solid rgb(173, 216, 230, 0.6);
  border-radius: 12px;
  box-shadow: 0px 3px 12px rgb(173, 216, 230, 0.7);
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
  flex: 3;
  display: flex;
  align-items: center;
  position: relative;
}

.top::before {
  position: absolute;
  content: "";
  width: 2px;
  height: 35px;
  background-color: rgb(211, 211, 211, 0.7);
  left: 50%;
  top: 33%;
  border-radius: 1px;
}

.mid {
  flex: 4;
  width: 100%;
}

.bottom {
  flex: 3;
  width: 100%;
  position: relative;
}

.button_1 {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
