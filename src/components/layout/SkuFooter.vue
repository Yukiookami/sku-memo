<!--
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-20 21:02:41
 * @FilePath: \MakeMemo\src\components\layout\SkuFooter.vue
-->
<template>
  <div class="sku-footer">
    <!-- 底部按钮 -->
    <div
      class="footer-item"
      :class="{
        active: store.activeIndexInFooter === item.id,
      }"
      v-for="item in footerShowList"
      @click="handleCilckFooterItem(item)"
      :key="item.id"
      :style="{
        width: `calc(100% / ${footerShowList.length})`,
      }"
    >
      <icon-font width="2rem" height="2rem" :name="item.icon" />
      <sku-text
        class="button-title"
        :title="item.title"
        :type="TextType['标题3号']"
      >
      </sku-text>
    </div>
  </div>
</template>

<script setup>
import { checkHasAllProperties } from "../../utils";
import { useStore } from "../../stores";
import SkuText from "../ui/SkuText.vue";
import { TextType } from "../../assets/data/status";

// Pinia store
const store = useStore();

// 入参
defineProps({
  // 底部显示的列表
  footerShowList: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((item) => {
        // 验证数组中的每个对象是否包含 'id' 'icon' 'title' 'link' 属性
        const requiredKeys = ["id", "icon", "title", "link"];

        return checkHasAllProperties(requiredKeys, item);
      });
    },
  },
});

/**
 * 点击底部按钮
 * @param item 底部按钮对象
 */
const handleCilckFooterItem = (item) => {
  store.setActiveIndexInFooter(item.id);
};
</script>

<style lang="scss" scoped>
.sku-footer {
  $button-line-height: 50%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $footer-height;
  background-color: #fff;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.3);

  .footer-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    font-weight: bolder;
    color: #000000;
    transition: all 0.2s ease;

    &.active {
      color: $primary-color;
    }

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: calc(100% - $button-line-height) / 2;
      right: 0;
      height: $button-line-height;
      width: 1px;
      background-color: rgba($color: #000000, $alpha: 0.3);
    }

    .button-title {
      margin-left: 5px;
    }
  }
}
</style>
