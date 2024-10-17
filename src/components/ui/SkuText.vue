<!-- 特殊文字组件 -->
<!-- 
  影响范围: 
  src\components\common\SkuSideBar\SkuSideBar.vue
  src\components\common\SkuTask\SkuTaskItem.vue
  src\components\common\SkuTask\SkuFooter.vue
  src\components\common\SkuTask\SkuHeader.vue
-->
<template>
  <!-- 动态使用类名 -->
  <div
    :class="[typeClass, fontClass, { 'neon-gradient-effect': useNeonGradient }]"
  >
    {{ title }}
  </div>
</template>

<script setup>
import { TextFont, TextType } from "../../assets/data/status";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: TextType["文本"],
  },
  fontType: {
    type: String,
    default: TextFont["默认"],
  },
  useNeonGradient: {
    type: Boolean,
    default: false,
  },
});

// 动态生成类名
const typeClass = `sku-text-type-${props.type}`;
const fontClass = `sku-font-type-${props.fontType}`;
</script>

<style lang="scss" scoped>
.sku-text-type-text {
  font-size: 1rem;
}

.sku-text-type-h1 {
  font-size: 2rem;
}

.sku-text-type-h2 {
  font-size: 1.5rem;
}

.sku-text-type-h3 {
  font-size: 1.25rem;
}

.sku-text-type-h4 {
  font-size: 1rem;
}

.sku-text-type-h5 {
  font-size: 0.875rem;
}

.sku-text-type-h6 {
  font-size: 0.75rem;
}

.sku-text-type-h1,
.sku-text-type-h2,
.sku-text-type-h3,
.sku-text-type-h4,
.sku-text-type-h5,
.sku-text-type-h6 {
  font-weight: bold;
}

.sku-font-type-default {
  font-family: "chinese-font", sans-serif;
}

.sku-font-type-headerTitleFont {
  font-family: "PermanentMarker-Regular", sans-serif;
}

/* 渐变霓虹效果 */
.neon-gradient-effect {
  font-weight: bold;
  font-size: 2rem;
  background: linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: neon-gradient 3s infinite;
}

@keyframes neon-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
