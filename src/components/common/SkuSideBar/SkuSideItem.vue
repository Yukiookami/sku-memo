<!-- 侧边栏子项组件 -->
<!-- 
  功能：侧边栏子项组件
  侧边栏中的每一项
 -->
<!-- 
  影响范围：
  src\components\common\SkuSideBar\SkuSideBar.vue
-->
<template>
  <!-- 侧边栏按钮 -->
  <div
    class="sku-sidebar-item"
    :class="{
      active: store.activeIndexInSidebar === item.id,
    }"
    v-for="item in sideBarList"
    @click="handleCilckSidebarItem(item)"
    :key="item.id"
  >
    <sku-icon
      :icon="store.activeIndexInSidebar === item.id ? item.active : item.icon"
    />
    <sku-text
      class="button-title"
      :title="item.title"
      :type="TextType['标题3号']"
    ></sku-text>
  </div>
</template>

<script setup>
import { checkHasAllProperties } from "../../../utils";
import SkuIcon from "../../ui/SkuIcon.vue";
import { useStore } from "../../../stores";
import SkuText from "../../ui/SkuText.vue";
import { TextType } from "../../../assets/data/status";

const store = useStore();

defineProps({
  sideBarList: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((item) => {
        // 验证数组中的每个对象是否包含 'id' 'icon' 'title' 'link' 'active' 属性
        const requiredKeys = ["id", "icon", "title", "link", "active"];

        return checkHasAllProperties(requiredKeys, item);
      });
    },
  },
});

const handleCilckSidebarItem = (item) => {
  store.setActiveIndexInSidebar(item.id);
  store.setActiveIndexInFooter(0);
  store.setIsSidebarOpen(false);
};
</script>

<style lang="scss" scoped>
.sku-sidebar-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #ccc;
  padding: 15px 20px;
  width: 100%;
  transition: all 0.2s;

  &.active {
    color: $primary-color;
    background: rgba($color: #ccc, $alpha: 0.15);
  }

  .button-title {
    margin-left: 10px;
  }
}
</style>
