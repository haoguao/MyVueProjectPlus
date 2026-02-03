<template>
  <div class="myInput">
    <slot name="default" />
    <input :type="props.type" :placeholder="props.placeholder"
      :style="myStyle" :class="props.className"
      autocomplete=""
      v-bind="$attrs">
  </div>
</template>


<script setup>
import { computed } from 'vue';

defineOptions({ inheritAttrs: false })
const props = defineProps({
  size: {
    type: String,
    require: true,
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
    type: String
  },
  className: {
    type: String
  },
  type: {
    type: String
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
