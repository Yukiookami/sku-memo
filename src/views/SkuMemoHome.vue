<!-- todoList的主要页面 -->
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

  <sku-add-task
    @submit="handleAddTaskSubmit"
    @editSubmit="handleEditTaskSubmit"
  />
  <sku-add-sub-task
    @submit="handleAddSubTaskSubmit"
    @editSubmit="handleEditSubTaskSubmit"
  />
</template>

<script setup>
import { computed, onBeforeMount, reactive, toRaw, watch } from "vue";
import { useStore } from "../stores";
import SkuTask from "../components/common/SkuTask/SkuTask.vue";
import SkuContextSwipe from "../components/layout/SkuContextSwipe.vue";
import SkuAddTask from "../components/common/SkuAddTask/SkuAddTask.vue";
import SkuAddSubTask from "../components/common/SkuAddTask/SkuAddSubTask.vue";
import {
  httpTaskAdd,
  httpTaskChange,
  httpTaskGetAll,
} from "../mockApiForIndexDB/task";
import {
  ApiType,
  sortType,
  TaskPriority,
  TaskStatus,
} from "../assets/data/status";
import { generateUUID } from "../utils";

// Pinia store
const store = useStore();

const state = reactive({
  // 任务列表
  taskList: [],
  // 未完成任务列表
  todoList: computed(() => filterToDoTask(state.taskList)),
  // 已完成任务列表
  doneList: computed(() => filterDoneTask(state.taskList)),
  // 当前使用的DB
  nowUseDBName: ApiType[store.activeIndexInSidebar],
  // 当前排序方式
  nowSortType: sortType["优先级升序"],
});

// ================== 逻辑控制 ==================
/**
 * 过滤未完成任务
 * @param taskList 任务列表
 * @returns 未完成任务列表
 */
const filterToDoTask = (taskList) => {
  return taskList.filter((task) => {
    // 如果是任务组，并且组内有未完成的任务
    if (
      task.taskGroup &&
      task.subTasks?.length > 0 &&
      task.taskStatus !== TaskStatus["已删除"]
    ) {
      const hasIncompleteSubTask = task.subTasks.some(
        (subTask) => subTask.taskStatus === TaskStatus["未完成"]
      );
      return hasIncompleteSubTask;
    }

    // 如果不是任务组或没有子任务，直接判断任务状态
    return task.taskStatus === TaskStatus["未完成"];
  });
};

/**
 * 过滤已完成任务
 * @param taskList 任务列表
 * @returns 已完成任务列表
 */
const filterDoneTask = (taskList) => {
  return taskList.filter((task) => {
    // 如果是任务组，并且组内所有子任务都已完成
    if (
      task.taskGroup &&
      task.subTasks?.length > 0 &&
      task.taskStatus !== TaskStatus["已删除"]
    ) {
      const allSubTasksCompleted = task.subTasks.every(
        (subTask) => subTask.taskStatus === TaskStatus["已完成"]
      );
      return allSubTasksCompleted;
    }

    // 如果不是任务组或没有子任务，直接判断任务状态
    return task.taskStatus === TaskStatus["已完成"];
  });
};
// ================== 逻辑控制end ==================

// ================== 基础增删改查 ==================
/**
 * 更新单个任务
 */
const updateTaskList = async (e) => {
  const updateObj = {
    ...e,
    taskStatus: e.taskStatus,
    taskName: e.taskName,
    taskPriority: e.taskPriority ?? TaskPriority["无优先级"],
    taskGroup: e.taskGroup ?? false,
    parentId: e.parentId ?? null,
    subTasks: e.subTasks ?? [],
  };

  await httpTaskChange(e.taskId, updateObj, state.nowUseDBName);
};

/**
 * 获取任务列表
 */
const getAllTaskList = async (dbName) => {
  // 获取任务列表
  const res = await httpTaskGetAll(dbName);
  state.taskList = res.data ?? [];

  const sortStrategies = {
    [sortType["优先级升序"]]: (a, b) => a.taskPriority - b.taskPriority,
    [sortType["优先级降序"]]: (a, b) => b.taskPriority - a.taskPriority,
  };

  // 根据排序方式排序
  state.taskList.sort((a, b) => {
    a.taskPriority = a.taskPriority ?? TaskPriority["无优先级"];
    b.taskPriority = b.taskPriority ?? TaskPriority["无优先级"];
    return sortStrategies[state.nowSortType](a, b);
  });
};
// ================== 基础增删改查end ==================

// ================== 单任务/子任务共通 ==================
/**
 * 根据返回的任务id与任务状态，更新任务状态
 * @param e 返回的任务id与任务状态
 */
const handleTaskChange = (e) => {
  // 判断是否为子任务
  const isSub = e.parentId !== null && !e.taskGroup;
  const { taskId, taskStatus } = e;
  if (isSub) {
    handleEditSubTaskSubmit(e);
  } else {
    // 组和单独的任务都走这里
    const index = state.taskList.findIndex((item) => item.id === taskId);
    state.taskList[index].taskStatus = taskStatus;

    updateTaskList(e);
  }
};
// ================== 单任务/子任务共通end ==================

// ================== 单任务追加 ==================
/**
 * 添加任务
 * @param e 任务对象
 */
const handleAddTaskSubmit = async (e) => {
  await httpTaskAdd(e, state.nowUseDBName);

  getAllTaskList(state.nowUseDBName);
};

/**
 * 编辑任务
 * @param e 任务对象
 */
const handleEditTaskSubmit = async (e) => {
  await updateTaskList(e);

  getAllTaskList(state.nowUseDBName);
};
// ================== 单任务追加end ==================

// ================== 子任务追加 ==================
/**
 * 添加子任务
 * @param e 任务对象
 */
const handleAddSubTaskSubmit = async (e) => {
  const { parentId } = e;
  const parentTask = state.taskList.find((item) => item.id === parentId);
  parentTask.subTasks ?? (parentTask.subTasks = []);

  // 因为不是真正的数据库，所以这里需要手动添加taskId
  e.taskId = generateUUID();
  parentTask.subTasks.push(e);
  parentTask.taskId = parentId;

  await updateTaskList(toRaw(parentTask));
  getAllTaskList(state.nowUseDBName);
};

/**
 * 编辑子任务
 * @param e 任务对象
 */
const handleEditSubTaskSubmit = async (e) => {
  const { parentId } = e;
  const parentTask = state.taskList.find((item) => item.id === parentId);

  parentTask.subTasks =
    parentTask.subTasks?.map((item) => {
      if (item.taskId === e.taskId) {
        return e;
      }
      return item;
    }) ?? [];

  await updateTaskList(toRaw(parentTask));
};
// ================== 子任务追加end ==================

// ================== 数据监听 ==================
// 监听侧边栏变化，切换请求类型
watch(
  () => store.activeIndexInSidebar,
  (newVal) => {
    state.nowUseDBName = ApiType[newVal];
    getAllTaskList(ApiType[newVal]);
  }
);
// ================== 数据监听end ==================

// ================== 初期渲染 ==================
onBeforeMount(() => {
  // 获取任务列表
  getAllTaskList(state.nowUseDBName);
});
// ================== 初期渲染end ==================
</script>

<style lang="scss" scoped></style>
