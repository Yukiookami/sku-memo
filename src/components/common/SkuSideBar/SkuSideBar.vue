<!-- 侧边栏组件 -->
<!-- 
  功能：侧边栏
  显示侧边菜单
-->
<!-- 
  影响范围：src\components\layout\SkuMainlayout.vue
-->
<template>
  <div class="sku-sidebar">
    <nut-popup
      :style="{ width: '50%', height: '100%', backgroundColor: '#fff' }"
      v-model:visible="showLeft"
      position="left"
      @click-overlay="handleClickSideMenuMask"
    >
      <div class="sidebar-context">
        <img
          @click="handleClickSideMenuMask"
          class="logo-title"
          src="/logo/logo.png"
          alt="logo"
        />

        <sku-side-item :sideBarList="sidebarMenu" />
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import SkuSideItem from "./SkuSideItem.vue";
import { sidebarMenu } from "../../../assets/data/componentsData";
import { ref, watch } from "vue";
import { useStore } from "../../../stores";

const store = useStore();

const showLeft = ref(false);

const handleClickSideMenuMask = () => {
  showLeft.value = false;
  store.isSidebarOpen = false;
};

watch(
  () => store.isSidebarOpen,
  (val) => {
    showLeft.value = val;
  },
);
</script>

<style lang="scss" scoped>
.sku-sidebar {
  .sku-sidebar-popup {
    width: 20%;
    height: 100%;
    background-color: #fff;
  }

  .sidebar-context {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 35px 0;

    .logo-title {
      margin: 27px 0 40px 0;
      height: 28px;
      width: auto;
      display: block;
      cursor: pointer;
    }
  }
}
</style>
