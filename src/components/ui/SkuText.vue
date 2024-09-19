<!--
 * @Author: zxy
 * @Date: 2024-09-19 21:49:07
 * @LastEditTime: 2024-09-19 22:28:41
 * @FilePath: \SkuMemo\src\components\ui\SkuText.vue
-->
<template>
  <div>
    {{ title }}
  </div>
</template>

<script setup>
import { TextType } from "../../assets/data/status";

const props = defineProps(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    type: String,
    default: TextType["文本"],
  }
);
</script>

<style lang="scss" scoped></style>
