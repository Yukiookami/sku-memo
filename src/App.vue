<!--
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-20 20:32:29
 * @FilePath: \MakeMemo\src\App.vue
-->
<template>
  <sku-main-layout>
    <!-- 头部 -->
    <template #header>
      <sku-header />
    </template>
    <!-- 内容 -->
    <router-view />
    <!-- 底部 -->
    <template #footer>
      <sku-footer :footer-show-list="footerMenu" />
    </template>
  </sku-main-layout>
</template>

<script setup>
import SkuMainLayout from "./components/layout/SkuMainlayout.vue";
import SkuHeader from "./components/layout/SkuHeader.vue";
import SkuFooter from "./components/layout/SkuFooter.vue";
import { footerMenu } from "./assets/data/componentsData";
</script>

<style lang="scss"></style>
