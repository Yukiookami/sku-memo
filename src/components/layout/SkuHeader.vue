<!--
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-20 20:44:39
 * @FilePath: \MakeMemo\src\components\layout\SkuHeader.vue
-->
<template>
  <div class="sku-header">
    <!-- 左部 -->
    <div></div>

    <!-- 中部 -->
    <div>
      <sku-text
        :title="HeaderTitle"
        :type="TextType['标题1号']"
        :fontType="TextFont['header标题字体']"
      />
    </div>

    <!-- 右部 -->
    <div></div>
  </div>
</template>

<script setup>
import { HeaderTitle, TextFont, TextType } from "../../assets/data/status";
import SkuText from "../ui/SkuText.vue";
</script>

<style lang="scss" scoped>
.sku-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  height: $header-height;
  background-color: #fff;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}
</style>
