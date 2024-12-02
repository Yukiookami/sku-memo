<!-- 阴影卡片组件 -->
<!-- 
  功能: 展示容器
  添加对应卡片样式，支持阴影和卡片边框
-->
<!-- 
  影响范围： 
  src\components\common\SkuTask\SkuTaskItem.vue，
  src\components\common\SkuTask\SkuTaskGruop.vue
 -->
<template>
  <div
    :class="{
      'child-card': isSub,
      'sku-card': !isSub,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  isSub: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.sku-card,
.child-card {
  border-radius: $button-radius;
  overflow: hidden;
  user-select: none;

  min-height: 16px;

  &.sku-card {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  }

  &.child-card {
    &::after {
      content: "";
      display: block;
      width: 95%;
      height: 1px;
      margin: 0 auto;
      background-color: #ccc;
    }
  }
}
</style>
