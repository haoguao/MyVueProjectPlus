<template>
  <span class="icon-base" :style="iconStyle"
    :class="className" v-bind="$attrs">
    <slot name="default"/>
  </span>
</template>


<script setup>
import { computed } from 'vue';


defineOptions({inheritAttrs:false})
const props = defineProps({
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: String,
    default: "#000"
  },
  className: {
    type: String
  }
})

//将样式组合为一个对象返回，vue自动拆解
const iconStyle = computed(()=> {
  const {size, color} = props;
  const iconSize = typeof size === 'number' ? `${size}px`:size
  return {
    fontSize: iconSize,
    color: color,
    display: "inline-block",
    lineHeight: 1
  }
})


</script>

<style scoped>

.icon-base :deep(svg) {
  width: 100%;
  height: 100%;
  /*指向svg自己的color属性*/
  /*但自身color为空，因此继承父元素span的color属性的值*/
  fill: currentColor;
}

</style>
