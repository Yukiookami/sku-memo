<!-- 任务批量删除组件 -->
<!-- 功能：删除
 只在已完成界面显示，可以批量删除已完成任务，具体删除逻辑在页面内书写，改组件仅负责触发删除 
 -->
<!-- 影响范围：src\views\SkuMemoHome.vue -->
<template>
  <div class="sku-del-task">
    <div class="sku-del-icon" @click="handleDelete">
      <i class="icon-deleteForButton"></i>
    </div>
  </div>
</template>

<script setup>
import { showConfirmDialog } from "vant";

const emit = defineEmits(["deleteAllDoneTask"]);

// ================ 逻辑部分 ===============
/**
 * 删除全部已完成任务
 */
const handleDelete = async () => {
  const res = await showConfirmDialog({
    title: "删除已完成任务",
    message: "确定要把所有已完成任务移除到回收站么？",
    closeOnClickOverlay: true,
  });

  if (res === "confirm") {
    emit("deleteAllDoneTask");
  }
};

// ================ 逻辑部分end =============
</script>

<style lang="scss" scoped>
.sku-del-task {
  // 删除任务按钮，固定在右下角
  .sku-del-icon {
    user-select: none;
    position: fixed;
    right: 15px;
    font-size: 25px;
    bottom: calc($footer-height + $icon-size + 15px + 10px);
    width: $icon-size;
    height: $icon-size;
    background-color: $task-delete-button-color;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    cursor: pointer;

    .icon-deleteForButton {
      &::before {
        color: #fff;
      }
    }
  }
}
</style>
