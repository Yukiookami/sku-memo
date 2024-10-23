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
import _ from "lodash";

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
  const deepData = _.cloneDeep(taskList);
  return deepData.filter((task) => {
    // 如果是任务组
    if (
      task.taskGroup &&
      task.subTasks?.length > 0 &&
      task.taskStatus !== TaskStatus["已删除"]
    ) {
      // 显示组中状态是未完成的任务
      task.subTasks = task.subTasks.filter(
        (subTask) => subTask.taskStatus === TaskStatus["未完成"]
      );
      return true;
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
  const deepData = _.cloneDeep(taskList);
  return deepData.filter((task) => {
    // 如果是任务组，并且组内所有子任务都已完成
    if (
      task.taskGroup &&
      task.subTasks?.length > 0 &&
      task.taskStatus !== TaskStatus["已删除"]
    ) {
      // 显示组中状态是已完成的任务
      task.subTasks = task.subTasks.filter(
        (subTask) => subTask.taskStatus === TaskStatus["已完成"]
      );

      return true;
    }

    // 如果不是任务组或没有子任务，直接判断任务状态
    return task.taskStatus === TaskStatus["已完成"];
  });
};
// ================== 逻辑控制end ==================

// ================== 装饰器 ==================
/**
 * 获取数据装饰器
 * @param shouldReload 是否重新获取数据
 */
const getDataDecoratorWithParam = (shouldReload) => {
  // 返回一个装饰器函数
  return (func) => {
    return async (...args) => {
      await func(...args);

      // 根据参数决定是否重新获取数据
      if (shouldReload) {
        getAllTaskList(state.nowUseDBName);
      }
    };
  };
};
// ================== 装饰器end ==================

// ================== 装饰器工厂 ==================、
// 添加任务
const addTaskWithReload = getDataDecoratorWithParam(true);
// 编辑任务
const editTaskWithReload = getDataDecoratorWithParam(true);
// 添加子任务
const addSubWithReload = getDataDecoratorWithParam(true);
// 编辑子任务
const editSubWithReload = getDataDecoratorWithParam(true);
// 任务状态更改（仅限单任务和任务组标题）
const taskChangeWithReload = getDataDecoratorWithParam(true);
// ================== 装饰器工厂end ==================

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

  await httpTaskChange(e.taskId ?? e.id, updateObj, state.nowUseDBName);
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

  // 子任务同样排序
  state.taskList.forEach((item) => {
    if (item.subTasks) {
      item.subTasks.sort((a, b) => {
        a.taskPriority = a.taskPriority ?? TaskPriority["无优先级"];
        b.taskPriority = b.taskPriority ?? TaskPriority["无优先级"];
        return sortStrategies[state.nowSortType](a, b);
      });
    }
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
    const updatedTask = _.cloneDeep(state.taskList[index]);
    updatedTask.taskStatus = taskStatus;

    taskChangeWithReload(updateTaskList)(updatedTask);
  }
};
// ================== 单任务/子任务共通end ==================

// ================== 单任务追加 ==================
/**
 * 添加任务
 * @param e 任务对象
 */
const handleAddTaskSubmit = addTaskWithReload(async (e) => {
  await httpTaskAdd(e, state.nowUseDBName);
});

/**
 * 编辑任务
 * @param e 任务对象
 */
const handleEditTaskSubmit = editTaskWithReload(async (e) => {
  await updateTaskList(e);
});
// ================== 单任务追加end ==================

// ================== 子任务追加 ==================
/**
 * 添加子任务
 * @param e 任务对象
 */
const handleAddSubTaskSubmit = addSubWithReload(async (e) => {
  const { parentId } = e;
  const parentTaskIndex = state.taskList.findIndex(
    (item) => item.id === parentId
  );

  if (parentTaskIndex !== -1) {
    // 获取原始对象
    const parentTask = _.cloneDeep(state.taskList[parentTaskIndex]);

    // 创建非响应式副本并修改
    const updatedTask = {
      ...parentTask,
      subTasks: [
        ...(parentTask.subTasks ?? []),
        { ...e, taskId: generateUUID() },
      ],
    };

    // 更新任务列表
    await updateTaskList(updatedTask);
  }
});

/**
 * 编辑子任务
 * @param e 任务对象
 */
const handleEditSubTaskSubmit = editSubWithReload(async (e) => {
  const { parentId } = e;
  const parentTask = _.cloneDeep(
    state.taskList.find((item) => item.id === parentId)
  );

  parentTask.subTasks =
    parentTask.subTasks?.map((item) => {
      if (item.taskId === e.taskId) {
        return e;
      }
      return toRaw(item);
    }) ?? [];

  await updateTaskList(toRaw(parentTask));
});
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
