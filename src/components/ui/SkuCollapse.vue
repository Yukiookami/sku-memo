<!-- 折叠面板容器，具有动态高度和过渡效果 -->
<!-- 
  影响范围：
  src\components\common\SkuTask\SkuTaskGruop.vue
-->
<template>
  <div
    class="collapse-panel"
    :style="{ height: panelHeight, transition: 'height 0.3s ease' }"
    ref="panelContent"
  >
    <!-- 用于从父组件传递内容的插槽 -->
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 接收组件的 props
const props = defineProps({
  // 控制面板是否展开的属性
  open: {
    type: Boolean,
    default: false,
  },
});

// 响应式变量，用于跟踪面板是否展开
const isOpen = ref(props.open);
// 对面板内容元素的引用
const panelContent = ref(null);
// 响应式变量，用于存储面板的高度
const panelHeight = ref("0px");

// 根据面板内容计算面板高度的函数
const calculateHeight = () => {
  if (panelContent.value) {
    panelHeight.value = isOpen.value
      ? `${panelContent.value.scrollHeight}px`
      : "0px";
  }
};

// 监听 'open' 属性的变化，更新面板高度
watch(
  () => props.open,
  (newOpen) => {
    isOpen.value = newOpen;
    calculateHeight();
  },
  { immediate: true }
);
</script>

<style scoped>
.collapse-panel {
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
}
</style>
