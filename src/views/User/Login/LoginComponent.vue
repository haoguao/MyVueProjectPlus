<template>
  <div class="sonContainer">
    <form class="form_1">
      <div class="input_demo input_demo_1">
        <MyInput size="max" placeholder="请输入用户名" type="text" color="transparent" font-size="16px"
          v-model="loginForm.userName">
          <span>账号</span>
        </MyInput>
      </div>
      <div class="input_demo input_demo_2">
        <MyInput size="max" placeholder="请输入密码" type="password" color="transparent" font-size="16px"
          v-model="loginForm.password">
          <span>密码</span>
        </MyInput>
      </div>
    </form>
  </div>
</template>


<script setup>
import MyInput from '@/components/MyInput.vue';
import { useLoginStore } from '@/stores/loginStore';
import { reactive, watch } from 'vue';

const loginStore = useLoginStore();
const loginForm = reactive({
  userName: '',
  password: ''
});

watch([() => loginForm.userName, () => loginForm.password],
  (newV) => {
    loginStore.loginForm.username = newV[0];
    loginStore.loginForm.password = newV[1];
  })







</script>

<style scoped>
.sonContainer {
  height: 170px;
  position: relative;
}

.form_1 {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 45%;
  margin-left: 90px;
  transform: translate(-50%, -50%);
}

.input_demo {
  width: 400px;
}

.input_demo :deep(span) {
  margin-left: 17px;
  margin-right: 17px;
  line-height: 40px;
  font-weight: 500;
  font-size: 17px;
}


.input_demo :deep(.myInput) {
  height: 48px;
  width: 400px;
  border: 1px solid rgb(185, 185, 185);
}

.input_demo_1 :deep(.myInput) {
  border-radius: 10px 10px 0 0;
  border-bottom: 0;
}

.input_demo_2 :deep(.myInput) {
  border-radius: 0 0 10px 10px;
}

.input_demo :deep(input::placeholder) {
  font-size: 16px;
  font-weight: 500;
}
</style>
