<template>
  <div class="myInput">
    <slot name="default" />
    <input :type="props.type" :placeholder="props.placeholder"
      :style="myStyle" :class="props.className"
      autocomplete=""
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>


<script setup>
import { computed } from 'vue';

defineOptions({ inheritAttrs: false })
defineEmits(['update:modelValue'])
const props = defineProps({
  size: {
    type: String,
    required: true,
    validator: (value) => {
      return ['min', 'mid', 'max'].includes(value);
    }
  },
  color: {
    type: String
  },
  fontSize: {
    type: String
  },
  placeholder: {
    type: String,
    default: ''
  },
  className: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const myStyle = computed(() => {
  const fontSize = props.fontSize
  const backgroundColor = props.color
  let width;
  let height;
  if (props.size === 'min') {
    width = '120px'
    height = '20px'
  } else if (props.size === 'mid') {
    width = '160px'
    height = '25px'
  } else {
    width = '330px'
    height = '40px'
  }
  return {
    fontSize,
    backgroundColor,
    width,
    height
  }
})

</script>

<style scoped>
input::placeholder {
  color: rgb(211, 211, 211, 0.9);
}

</style>
