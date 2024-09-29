<!--
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-29 16:41:38
 * @FilePath: \MakeMemo\src\components\ui\SkuIcon.vue
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
