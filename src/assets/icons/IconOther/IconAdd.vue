<template>
  <IconBase :size="size" :color="color"
    :class-name="className" v-bind="$attrs">
    <template #default>
      <svg>
        ...
      </svg>
    </template>
  </IconBase>
</template>


<script setup>
import IconBase from '../IconBase.vue';

//简单的传递调用方传递的props
defineProps(['size', 'color', 'className'])
//当有多个根标签的时候，$attrs在哪，<属性穿透>就到那个标签上
defineOptions({inheritAttrs:false})

</script>

<style scoped></style>
