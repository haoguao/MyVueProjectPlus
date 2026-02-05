<template>
  <button class="top-button" :style="newStyle" :class="props.className" v-bind="$attrs" @click="emits('click')">
    <slot name="default" />
  </button>
</template>


<script setup>
import { computed } from 'vue';

defineOptions({ inheritAttrs: false })
//向上提交点击事件
const emits = defineEmits(['click'])
const props = defineProps({
  buttonSize: {
    type: String,
    required: true,
    validator: (value) => {
      return ['min', 'mid', 'big', 'max', 'proMax'].includes(value);
    }
  },
  color: {
    type: String,
  },
  fontSize: {
    type: String,
    default: '16px'
  },
  fontColor: {
    type: String,
    default: '#fff'
  },
  className: {
    type: String
  }
})

const newStyle = computed(() => {
  const fontSize = props.fontSize
  const color = props.fontColor
  const backgroundColor = props.color
  let width;
  let height;
  if (props.buttonSize === 'min') {
    width = '70px';
    height = '20px';
  } else if (props.buttonSize === 'mid') {
    width = '100px';
    height = '30px';
  } else if (props.buttonSize === 'big') {
    width = '150px';
    height = '38px';
  } else if (props.buttonSize === 'max') {
    width = '200px';
    height = '40px';
  } else {
    width = '245px';
    height = '40px';
  }
  return {
    fontSize,
    color,
    backgroundColor,
    width,
    height
  }
})




</script>

<style scoped>
.top-button {
  border-radius: 5px;
  background-color: transparent;
}
</style>
