<template>
  <div class="sku-icon">
    <img :src="icon" :alt="icon" :style="{ width: width, height: height }" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "2rem",
  },
  height: {
    type: String,
    default: "2rem",
  },
});
</script>

<style lang="scss" scoped></style>
