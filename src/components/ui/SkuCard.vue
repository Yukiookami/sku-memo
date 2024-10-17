<template>
  <div class="sku-card">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.sku-card {
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: $button-radius;
  user-select: none;
  padding: 1.5rem 1rem;
  min-height: 16px;
}
</style>
