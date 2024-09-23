<template>
  <div class="sku-sidebar">
    <nut-popup
      :style="{ width: '50%', height: '100%', backgroundColor: '#fff' }"
      v-model:visible="showLeft"
      position="left"
      @click-overlay="handleClickSideMenuMask"
    >
      <div class="sidebar-context">
        <sku-text
          @click="handleClickSideMenuMask"
          class="logo-title"
          :title="HeaderTitle"
          :type="TextType['标题1号']"
          :fontType="TextFont['header标题字体']"
          useNeonGradient
        />

        <sku-side-item :sideBarList="sidebarMenu" />
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { HeaderTitle, TextFont, TextType } from "../../../assets/data/status";
import SkuSideItem from "./SkuSideItem.vue";
import { sidebarMenu } from "../../../assets/data/componentsData";
import { ref, watch } from "vue";
import { useStore } from "../../../stores";
import SkuText from "../../ui/SkuText.vue";

const store = useStore();

const showLeft = ref(false);

const handleClickSideMenuMask = () => {
  showLeft.value = false;
  store.setIsSidebarOpen(false);
};

watch(
  () => store.isSidebarOpen,
  (val) => {
    showLeft.value = val;
  }
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
    padding: 10px 0;

    .logo-title {
      margin: 20px 0 40px 0;
    }
  }
}
</style>
