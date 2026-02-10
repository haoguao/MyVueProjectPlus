<template>
  <IconBase :size="size" :color="color" :class-name="className" v-bind="$attrs">
    <template #default>

      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 20H6V4H11V12L13.5 10.5L16 12V4H18V20Z" />
      </svg>
    </template>
  </IconBase>
</template>


<script setup>
import IconBase from '../IconBase.vue';

//简单的传递调用方传递的props
defineProps(['size', 'color', 'className'])
//当有多个根标签的时候，$attrs在哪，<属性穿透>就到那个标签上
defineOptions({ inheritAttrs: false })

</script>

<style scoped></style>
