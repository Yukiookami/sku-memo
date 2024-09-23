<!--
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-24 08:49:56
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

  <sku-add-task @submit="handleAddTaskSubmit" />
</template>

<script setup>
import { computed, onBeforeMount, reactive, watch } from "vue";
import { useStore } from "../stores";
import SkuTask from "../components/common/SkuTask/SkuTask.vue";
import SkuContextSwipe from "../components/layout/SkuContextSwipe.vue";
import SkuAddTask from "../components/common/SkuAddTask/SkuAddTask.vue";
import {
  httpTaskAdd,
  httpTaskChange,
  httpTaskGetAll,
} from "../mockApiForIndexDB/task";
import { ApiType } from "../assets/data/status";

// Pinia store
const store = useStore();

const state = reactive({
  // 任务列表
  taskList: [],
  // 未完成任务列表
  todoList: computed(() =>
    state.taskList.filter((item) => item.taskStatus === "00")
  ),
  // 已完成任务列表
  doneList: computed(() =>
    state.taskList.filter((item) => item.taskStatus === "01")
  ),
  // 当前使用的DB
  nowUseDBName: ApiType[store.activeIndexInSidebar],
});

/**
 * 根据返回的任务id与任务状态，更新任务状态
 * @param e 返回的任务id与任务状态
 */
const handleTaskChange = (e) => {
  const { taskId, taskStatus } = e;
  const index = state.taskList.findIndex((item) => item.id === taskId);
  state.taskList[index].taskStatus = taskStatus;

  updateTaskList(e, state.nowUseDBName);
};

/**
 * 添加任务
 * @param e 任务对象
 */
const handleAddTaskSubmit = async (e) => {
  await httpTaskAdd(e, state.nowUseDBName);

  getAllTaskList(state.nowUseDBName);
};

/**
 * 获取任务列表
 */
const getAllTaskList = async (dbName) => {
  // 获取任务列表
  const res = await httpTaskGetAll(dbName);
  state.taskList = res.data ?? [];
};

/**
 * 更新单个任务
 */
const updateTaskList = async (e) => {
  const updateObj = {
    taskStatus: e.taskStatus,
    taskName: e.taskName,
  };
  await httpTaskChange(e.taskId, updateObj, state.nowUseDBName);
};

// 监听侧边栏变化，切换请求类型
watch(
  () => store.activeIndexInSidebar,
  (newVal) => {
    state.nowUseDBName = ApiType[newVal];
    getAllTaskList(ApiType[newVal]);
  }
);

onBeforeMount(() => {
  // 获取任务列表
  getAllTaskList(state.nowUseDBName);
});
</script>

<style lang="scss" scoped></style>
