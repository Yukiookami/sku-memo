<!-- 折叠面板 -->
<!-- 
  功能:折叠展示
  可以收起展开，使用max-height属性实现动画效果
-->
<!-- 
  影响范围：
  src\components\common\SkuTask\SkuTaskGruop.vue
-->
<template>
  <div
    class="collapse-panel"
    :style="{ maxHeight: panelHeight, transition: 'max-height 0.3s ease' }"
    ref="panelContent"
  >
    <!-- 用于从父组件传递内容的插槽 -->
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

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
const calculateHeight = async () => {
  await nextTick();
  if (panelContent.value) {
    panelHeight.value = isOpen.value
      ? `${panelContent.value.scrollHeight}px`
      : "0px";
  }
};

// 监听 open 属性的变化，更新面板高度
watch(
  () => props.open,
  async (newOpen) => {
    if (newOpen === isOpen.value) {
      return;
    }
    isOpen.value = newOpen;
    calculateHeight();
  },
  { immediate: true }
);

// 使用 MutationObserver 监听面板内容变化
let observer;

onMounted(() => {
  if (panelContent.value) {
    observer = new MutationObserver(() => {
      calculateHeight();
    });
    observer.observe(panelContent.value, {
      childList: true,
      subtree: true,
    });
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.collapse-panel {
  width: 100%;
  overflow: hidden;
  max-height: 0;
}
</style>
