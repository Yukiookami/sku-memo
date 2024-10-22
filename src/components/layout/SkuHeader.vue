<!-- Hader组件 -->
<!-- 
  功能:展示头部信息
  目前主要是展示标题以及点击展开侧边栏  
-->
<!-- 
  影响范围：
  src\components\layout\SkuMainlayout.vue
-->
<template>
  <div class="sku-header">
    <!-- 左部 -->
    <div @click="handleClickSideMenu">
      <icon-font class="side-menu" name="horizontal"></icon-font>
    </div>

    <!-- 中部 -->
    <div>
      <sku-text
        :title="HeaderTitle"
        :type="TextType['标题1号']"
        :fontType="TextFont['header标题字体']"
        :useNeonGradient="true"
      />
    </div>

    <!-- 右部 -->
    <div></div>
  </div>
</template>

<script setup>
import { HeaderTitle, TextFont, TextType } from "../../assets/data/status";
import { useStore } from "../../stores";
import SkuText from "../ui/SkuText.vue";

const store = useStore();

const handleClickSideMenu = () => {
  store.setIsSidebarOpen(true);
};
</script>

<style lang="scss" scoped>
.sku-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  height: $header-height;
  background-color: #fff;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);

  // 左部
  .side-menu {
    font-size: 1rem;
    cursor: pointer;
  }
}
</style>
