<template>
  <SkuMainLayout>
    <!-- 头部 -->
    <template #header>
      <SkuHeader />
    </template>
    <!-- 内容 -->
    <router-view />
    <!-- 底部 -->
    <template #footer>
      <SkuFooter />
    </template>
  </SkuMainLayout>
</template>

<script setup>
import SkuMainLayout from "./components/layout/mainlayout.vue";
import SkuHeader from "./components/layout/SkuHeader.vue";
import SkuFooter from "./components/layout/SkuFooter.vue";
</script>

<style lang="scss"></style>
