<!--
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-20 20:47:39
 * @FilePath: \MakeMemo\src\views\SkuMemoHome.vue
-->
<template>
  <sku-context-swipe>
    <template #left>
      <div class="sku-home-page-left">
        <div class="sku-task-list">
          <sku-task :taskList="state.todoList" @taskChange="handleTaskChange" />
        </div>
      </div>
    </template>
    <template #right>
      <div class="sku-task-list">
        <sku-task :taskList="state.doneList" @taskChange="handleTaskChange" />
      </div>
    </template>
  </sku-context-swipe>
</template>

<script setup>
import { computed, reactive } from "vue";
import SkuTask from "../components/common/SkuTask/index.vue";
import SkuContextSwipe from "../components/layout/SkuContextSwipe.vue";

const state = reactive({
  // 任务列表
  taskList: [
    { id: 1, taskName: "任务1", taskStatus: "01" },
    { id: 2, taskName: "任务2", taskStatus: "00" },
    { id: 3, taskName: "任务3", taskStatus: "00" },
  ],
  // 未完成任务列表
  todoList: computed(() =>
    state.taskList.filter((item) => item.taskStatus === "00")
  ),
  // 已完成任务列表
  doneList: computed(() =>
    state.taskList.filter((item) => item.taskStatus === "01")
  ),
});

/**
 * 根据返回的任务id与任务状态，更新任务状态
 * @param e 返回的任务id与任务状态
 */
const handleTaskChange = (e) => {
  const { taskId, taskStatus } = e;
  const index = state.taskList.findIndex((item) => item.id === taskId);
  state.taskList[index].taskStatus = taskStatus;
};
</script>

<style lang="scss" scoped></style>
