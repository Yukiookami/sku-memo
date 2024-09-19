<template>
  <!-- 主布局 -->
  <div class="sku-main-layout">
    <!-- 头部区域 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 内容 -->
    <div class="context">
      <slot></slot>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.sku-main-layout {
  height: 100vh;
  width: 100vw;
}
</style>
