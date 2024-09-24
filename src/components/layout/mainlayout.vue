<!--
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-25 00:26:54
 * @FilePath: \MakeMemo\src\components\layout\mainlayout.vue
-->
<template>
  <!-- 主布局 -->
  <div class="sku-main-layout">
    <!-- 侧边栏 -->
    <div class="sku-side-bar">
      <sku-side-bar />
    </div>

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

<script setup>
import SkuSideBar from "../common/SkuSideBar/SkuSideBar.vue";
</script>

<style lang="scss" scoped>
.sku-main-layout {
  position: relative;
  font-family: "chinese-font";
  height: calc(var(--vh, 1vh) * 100); /* 使用动态计算的视口高度 */
  height: -webkit-fill-available; /* 使用 webkit-fill-available 解决在Safari中，超出满屏的问题 */
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;

  .header {
    position: sticky;
    height: $header-height;
    top: 0;
  }

  .context {
    min-height: calc(
      var(--vh, 1vh) * 100 - #{$header-height} - #{$footer-height}
    );
  }

  .footer {
    position: sticky;
    height: $footer-height;
    bottom: 0;
  }
}
</style>
