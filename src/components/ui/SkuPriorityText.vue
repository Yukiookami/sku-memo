<!-- 优先级字体颜色组件 -->
<!-- 
影响范围: 
src\components\common\SkuAddTask\SkuAddTask.vue
src\components\common\SkuTask\SkuTaskItem.vue
-->
<template>
  <div :class="`sku-priority-${priority}`">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  // 优先级
  priority: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
