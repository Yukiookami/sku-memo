<!-- 阴影卡片组件 -->
<!-- 
  影响范围： 
  src\components\common\SkuTask\SkuTaskItem.vue，
  src\components\common\SkuTask\SkuTaskGruop.vue
 -->
<template>
  <div class="sku-card">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.sku-card {
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: $button-radius;
  user-select: none;
  padding: 1.5rem 1rem;
  min-height: 16px;
}
</style>
