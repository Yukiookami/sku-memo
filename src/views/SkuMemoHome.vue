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

  <!-- 当目前显示已完成的时候显示删除按钮，可以批量删除已完成任务 -->
  <transition name="fade" appear>
    <sku-del-task
      @deleteAllDoneTask="handleDeleteAllDoneTask"
      v-show="store.activeIndexInFooter === Footer['已完成']"
    />
  </transition>
  <!-- 有一个追加按钮 -->
  <sku-add-task
    @submit="handleAddTaskSubmit"
    @editSubmit="handleEditTaskSubmit"
  />
  <!-- 只是面板 -->
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
import SkuDelTask from "../components/common/SkuDelTask/SkuDelTask.vue";
import {
  httpTaskAdd,
  httpTaskChange,
  httpTaskChangeAll,
  httpTaskGetAll,
} from "../mockApiForIndexDB/task";
import {
  ApiType,
  Footer,
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
      task.taskStatus !== TaskStatus["已删除"] &&
      task.taskStatus !== TaskStatus["已完成"]
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
// 批量更新已完成任务状态为已删除
const deleteAllDoneTaskWithReload = getDataDecoratorWithParam(true);
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
 * 批量更新任务
 */
const updateTaskListBatch = async (taskList) => {
  await httpTaskChangeAll(taskList, state.nowUseDBName);
};

/**
 * 获取任务列表
 */
const getAllTaskList = async (dbName) => {
  // 获取任务列表
  const res = await httpTaskGetAll(dbName);
  state.taskList = res.data ?? [];

  // 设置任务列表到pinia，方便随时使用原始数据
  store.setPropertyTaskData(res.data);

  // 排序任务列表
  sortTaskList(state.taskList, state.nowSortType);
};

// ================== 基础增删改查end ==================

// ================== 排序 ==================
/**
 * 排序任务列表
 */
const sortTaskList = (taskList, nowSortType) => {
  // 定义排序策略
  const compareTasks = (a, b, isAscending) => {
    // 1. 优先级排序（根据升序或降序）
    if (a.taskPriority !== b.taskPriority) {
      return isAscending
        ? a.taskPriority - b.taskPriority
        : b.taskPriority - a.taskPriority;
    }

    // 2. 同优先级情况下，任务组排在最上方
    if (a.taskGroup && !b.taskGroup) return -1;
    if (!a.taskGroup && b.taskGroup) return 1;

    // 3. 同优先级、同任务组状态下，按照创建时间排序（新创建的在上）
    return (
      (new Date(b.createTime).getTime() || 0) -
      (new Date(a.createTime).getTime() || 0)
    );
  };

  const sortTasks = (tasks, nowSortType) => {
    const isAscending = nowSortType === sortType["优先级升序"];
    tasks.sort((a, b) => {
      a.taskPriority = a.taskPriority ?? TaskPriority["无优先级"];
      b.taskPriority = b.taskPriority ?? TaskPriority["无优先级"];
      return compareTasks(a, b, isAscending);
    });

    // 对子任务进行递归排序
    tasks.forEach((item) => {
      if (item.subTasks) {
        sortTasks(item.subTasks, nowSortType);
      }
    });
  };

  // 排序主任务列表
  sortTasks(taskList, nowSortType);
};
// ================== 排序end ==================

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

// ================== 已完成任务删除 ==================
/**
 * 删除所有已完成任务
 */
const handleDeleteAllDoneTask = () => {
  // 深拷贝原始对象
  const taskList = _.cloneDeep(state.taskList);

  // 判断任务是否已完成或状态为空
  const isTaskCompletedOrEmpty = (task) => {
    return task.taskStatus === TaskStatus["已完成"] || !task.taskStatus;
  };

  // 更新任务状态
  taskList.forEach((item) => {
    if (isTaskCompletedOrEmpty(item)) {
      item.taskStatus = TaskStatus["已删除"];
      if (item.subTasks && item.subTasks.length > 0) {
        item.subTasks.forEach((subItem) => {
          if (isTaskCompletedOrEmpty(subItem)) {
            subItem.taskStatus = TaskStatus["已删除"];
          }
        });
      }
    }
  });

  deleteAllDoneTaskWithReload(updateTaskListBatch)(taskList);
};

// ================== 已完成任务删除end ==================

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

<style lang="scss" scoped>
// 删除按钮的淡入淡出
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-leave-to {
  opacity: 0; /* 确保离开时变得透明 */
}

.fade-leave-from {
  opacity: 1; /* 离开时初始的不透明状态 */
}
</style>
