<!-- 滑块组件 -->
<!-- 
功能：左右滑动按钮组件
可以自定义左右部分，可以通过handleBeforeClose判断点击位置，默认全都关闭
-->
<!-- 
  影响范围：
  src\components\common\SkuTask\SkuTaskItem.vue
  src\components\common\SkuTask\SkuTaskGroup.vue
 -->
<template>
  <van-swipe-cell class="sku-swipe" :before-close="handleBeforeClose">
    <!-- 主体内容 -->
    <slot></slot>

    <!-- 左侧按钮区域 -->
    <template #left>
      <!-- 功能按钮区域 -->
      <div class="sku-item-func-sec-left">
        <slot name="left"></slot>
      </div>
    </template>
    <!-- 左侧按钮区域end -->

    <!-- 右侧按钮区域 -->
    <template #right>
      <!-- 功能按钮区域 -->
      <div class="sku-item-func-sec-right">
        <slot name="right"></slot>
      </div>
    </template>
    <!-- 右侧按钮区域end -->
  </van-swipe-cell>
</template>

<script setup>
const emit = defineEmits(["before-close"]);

/**
 * 关闭前的处理, 传递给父组件
 * @param {string} action
 * @param {Function} done
 */
const handleBeforeClose = (action, done) => {
  emit("before-close", action, done);
  return true;
};
</script>

<style lang="scss" scoped>
.sku-swipe {
  height: 100%;
  // 右侧功能区
  .sku-item-func-sec-right {
    height: 100%;
    margin-left: 1px;

    ::v-deep .nut-button--square {
      height: 100%;
    }

    // ::v-deep .nut-button--square {
    //   border-top-right-radius: $button-radius;
    //   border-bottom-right-radius: $button-radius;
    // }
  }

  // 左侧功能区
  .sku-item-func-sec-left {
    height: 100%;
    margin-right: 1px;

    ::v-deep .nut-button--square {
      height: 100%;
    }

    // ::v-deep .nut-button--square {
    //   border-top-left-radius: $button-radius;
    //   border-bottom-left-radius: $button-radius;
    // }
  }
}
</style>
