<!-- 图标组件 -->
<!-- 
  功能: 展示图标
-->
<!-- 
  影响范围:
  src\components\common\SkuAddTask\SkuAddTask.vue
  src\components\common\SkuSideBar\SkuSideItem.vue
-->
<template>
  <div class="sku-icon">
    <img
      v-if="!useInnerSvg"
      :src="icon"
      :alt="icon"
      :style="{ width: width, height: height }"
    />
    <div v-else v-html="icon"></div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "2rem",
  },
  height: {
    type: String,
    default: "2rem",
  },
  useInnerSvg: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
