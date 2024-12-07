<!-- 任务追加组件 -->
<!-- 功能：追加/编辑
  追加/编辑任务数据，可以追加单任务也可以追加组（仅标题） 
-->
<!-- 
  影响范围：
  src\views\SkuMemoHome.vue
-->
<template>
  <!-- 追加按钮 -->
  <div class="sku-add-icon" @click="handleClickAddIcon">
    <i class="icon-addForButton" />
  </div>
  <!-- 追加按钮end -->

  <!-- 追加面板 -->
  <nut-popup
    v-model:visible="show"
    position="bottom"
    :style="{ width: '100%', height: '80px' }"
  >
    <div class="add-task-sec">
      <nut-input
        :class="`sku-priority-${
          priorityState.selectedPriority?.[0] || task.taskPriority
        }`"
        v-model="task.taskName"
        :placeholder="state.placeholder"
        clearable
        @keypress.enter="handleSubmit"
      />
      <div class="add-task-fun-sec">
        <!-- 左侧区域 -->
        <div class="left-sec">
          <!-- 优先级 -->
          <sku-priority-text :priority="task.taskPriority">
            <div class="task-priority" @click="handleClickTaskPriority">
              <i class="icon-priority"></i>

              <span>{{ TaskPriority[task.taskPriority] }}</span>
            </div>
          </sku-priority-text>
          <!-- 优先级end -->

          <!-- 子任务 -->
          <div
            class="task-group"
            @click="handleClickMakeGroup"
            :class="{
              'task-group-actived': task.taskGroup,
            }"
          >
            <i class="icon-taskGroup"></i>

            <span>创建组</span>
          </div>
          <!-- 子任务end -->

          <!-- 当前任务状态，暂时只适用于任务组 -->
          <div
            @click="handleClickTaskStatus"
            v-if="task.taskGroup"
            :class="`task-status-${state.statusClass} task-status`"
          >
            <i :class="`${state.statusClass} status-icon`"></i>

            <span>{{ state.taskStatusName }}</span>
          </div>
        </div>
        <!-- 左侧区域end -->

        <!-- 右侧区域 -->
        <div class="right-sec">
          <!--添加任务  -->
          <nut-button
            :type="state.buttonType"
            @click="state.handleClick"
            size="small"
          >
            {{ state.buttonText }}
          </nut-button>
        </div>
        <!-- 右侧区域end -->
      </div>
    </div>
  </nut-popup>
  <!-- 追加面板end -->

  <!-- 优先级选择框 -->
  <nut-popup
    v-model:visible="showPriority"
    position="bottom"
    :style="{ width: '100%' }"
  >
    <nut-picker
      v-model="priorityState.selectedPriority"
      :columns="priorityState.columns"
      :title="priorityState.current"
      three-dimensional
      @confirm="handleConfirmPriority"
      @change="handleChangePriority"
    />
  </nut-popup>
  <!-- 优先级选择框end -->

  <!-- 当前任务状态选择框 -->
  <nut-popup
    v-model:visible="showStatus"
    position="bottom"
    :style="{ width: '100%' }"
  >
    <nut-picker
      v-model="statusState.selectedPriority"
      :columns="statusState.columns"
      :title="statusState.current"
      three-dimensional
      @confirm="handleConfirmStatus"
      @change="handleChangeStatus"
    />
  </nut-popup>
  <!-- 当前任务选择框end -->
</template>

<script setup>
import SkuPriorityText from "../../ui/SkuPriorityText.vue";
import { computed, onBeforeMount, reactive, toRaw, watch } from "vue";
import { ref } from "vue";
import {
  TaskPriority,
  TaskStatus,
  TaskStatusIcon,
} from "../../../assets/data/status";
import { convertEnumToArray } from "../../../utils";
import { useStore } from "../../../stores";
import { showConfirmDialog } from "vant";

// ================== 定义 ==================
const store = useStore();
// 提交事件
const emit = defineEmits(["submit", "editSubmit"]);

// 是否显示添加任务面板
const show = ref(false);
// 是否显示优先级选择框
const showPriority = ref(false);
// 是否显示当前任务状态选择框
const showStatus = ref(false);

// 状态
const state = reactive({
  // 是否为编辑
  isEdit: false,
  // 按钮文字
  buttonText: computed(() => (state.isEdit ? "修改" : "添加")),
  // 按钮类型
  buttonType: computed(() => (state.isEdit ? "success" : "info")),
  // 点击按钮触发的函数
  handleClick: computed(() => (state.isEdit ? handleEditSubmit : handleSubmit)),
  // placeholder提示文字
  placeholder: computed(() =>
    task.taskGroup ? "请输入任务组标题" : "请输入任务名称"
  ),
  // 编辑当前任务状态
  statusClass: computed(() => {
    return TaskStatusIcon[task.taskStatus];
  }),
  // 当前任务状态
  taskStatusName: computed(() => {
    return TaskStatus[task.taskStatus];
  }),
});

// 任务数据
// 影响范围：handleSubmit，handleEditSubmit，editData，
// src\assets\data\requiedKeys.js 中的 SkuTaskList
// 数据监听中的 editTaskDataForSkuAddTask
// 与src\components\common\SkuAddTask\SkuAddSubTask.vue中的task数据部分一致（无分组）
const task = reactive({
  // 任务名称
  taskName: "",
  // 任务优先级
  taskPriority: TaskPriority["无优先级"],
  // 是否为任务组
  taskGroup: false,
  // 子任务
  subTasks: [],
  // 当前任务状态
  taskStatus: TaskStatus["未完成"],
});

// 优先级选择框数据
const priorityState = reactive({
  // 选项
  columns: [],
  // 当前选择
  current: "无优先级",
  // 选中的优先级
  selectedPriority: [TaskPriority["无优先级"]],
});

// 任务状态选择框数据
const statusState = reactive({
  // 选项
  columns: [],
  // 当前选择
  current: "未完成",
  // 选中的任务状态
  selectedStatus: [TaskStatus["未完成"]],
});

// 编辑数据
const editData = reactive({
  // 任务名称
  taskName: "",
  // 任务优先级
  taskPriority: "",
  // 任务状态
  taskStatus: "",
  // 是否为任务组
  taskGroup: false,
  // 任务id
  taskId: "",
  // 子任务
  subTasks: [],
  // 创建时间
  createTime: "",
});
// ================== 定义end ==================

// ================== 逻辑操作 ==================
/**
 * 点击添加按钮
 */
const handleClickAddIcon = () => {
  show.value = true;

  // 编辑模式下，点击添加按钮，清空数据，并设置为非编辑模式
  if (state.isEdit) {
    state.isEdit = false;
    // 清空数据
    clearData();
  }
};

/**
 * 确认添加
 */
const handleSubmit = async () => {
  emit("submit", {
    taskName: task.taskName,
    taskStatus: task.taskStatus ?? TaskStatus["未完成"],
    taskPriority: task.taskPriority ?? TaskPriority["无优先级"],
    taskGroup: task.taskGroup ?? false,
    createTime: new Date().getTime(),
  });
  task.taskName = "";
  show.value = false;
  showPriority.value = false;

  // 清空数据
  clearData();
};

/**
 * 确认编辑
 */
const handleEditSubmit = async () => {
  if (editData.taskGroup && !task.taskGroup) {
    show.value = false;
    showPriority.value = false;

    const res = await showConfirmDialog({
      title: "更改任务组",
      message: "任务组下的任务将会被清空，是否继续？",
    });

    if (res !== "confirm") {
      return;
    }
  }

  // 参照原始数据，找到对应的子任务
  const thisTask =
    store.propertyTaskData?.find((item) => item.taskId === editData.taskId) ??
    {};

  emit("editSubmit", {
    taskName: task.taskName,
    taskStatus: task.taskStatus ?? TaskStatus["未完成"],
    taskPriority: task.taskPriority ?? TaskPriority["无优先级"],
    taskGroup: task.taskGroup ?? false,
    taskId: editData.taskId,
    subTasks: task.taskGroup ? toRaw(thisTask.subTasks) || [] : [],
    createTime: editData.createTime,
    updateTime: new Date().getTime(),
  });
  task.taskName = "";
  show.value = false;
  showPriority.value = false;

  // 清空数据
  clearData();
};

/**
 * 清空数据
 */
const clearData = () => {
  // 清空编辑数据
  // 编辑数据清空策略
  const editDataStrategy = {
    subTasks: () => {
      return [];
    },
    taskGroup: () => {
      return false;
    },
    default: () => {
      return "";
    },
  };

  for (const key in editData) {
    // 如果策略中不存在对应的键，则使用 default 策略
    const strategy = editDataStrategy[key] || editDataStrategy.default;
    editData[key] = strategy();
  }

  // 清空任务数据
  // 任务数据清空策略
  const taskStrategy = {
    taskPriority: () => {
      return TaskPriority["无优先级"];
    },
    taskStatus: () => {
      return TaskStatus["未完成"];
    },
    taskGroup: () => {
      return false;
    },
    subTasks: () => {
      return [];
    },
    default: () => {
      return "";
    },
  };

  for (const key in task) {
    const strategy = taskStrategy[key] || taskStrategy.default;
    task[key] = strategy();
  }

  // 清空优先级数据
  // 优先级数据清空策略
  const priorityStateStrategy = {
    selectedPriority: () => {
      return [TaskPriority["无优先级"]];
    },
    current: () => {
      return TaskPriority["无优先级"];
    },
    columns: () => {
      return priorityState.columns;
    },
    default: () => {
      return [];
    },
  };

  for (const key in priorityState) {
    const strategy =
      priorityStateStrategy[key] || priorityStateStrategy.default;
    priorityState[key] = strategy();
  }

  // 清空任务状态数据
  // 任务状态数据清空策略
  const statusStateStrategy = {
    selectedStatus: () => {
      return [TaskStatus["未完成"]];
    },
    current: () => {
      return TaskStatus["未完成"];
    },
    columns: () => {
      return statusState.columns;
    },
    default: () => {
      return [];
    },
  };

  for (const key in statusState) {
    const strategy = statusStateStrategy[key] || statusStateStrategy.default;
    statusState[key] = strategy();
  }

  state.isEdit = false;
};
// ================== 逻辑操作end ==================

// ================== 优先级 ==================
/**
 * 点击任务优先级
 */
const handleClickTaskPriority = () => {
  showPriority.value = true;
};

/**
 * 确认选择优先级
 * @param {Array} values
 */
const handleConfirmPriority = ({ selectedOptions }) => {
  task.taskPriority = selectedOptions[0].value;
  priorityState.current = selectedOptions[0].text;
  priorityState.selectedPriority = [selectedOptions[0].value];
  showPriority.value = false;
};

/**
 * 优先级变动
 * @param {Array} values
 */
const handleChangePriority = ({ selectedOptions }) => {
  priorityState.current = selectedOptions[0].text;
};
// ================== 优先级end ==================

// ================== 任务状态 ==================
/**
 * 点击任务状态
 */
const handleClickTaskStatus = () => {
  showStatus.value = true;
};

/**
 * 确认选择任务状态
 * @param {Array} values
 */
const handleConfirmStatus = ({ selectedOptions }) => {
  task.taskStatus = selectedOptions[0].value;
  statusState.current = selectedOptions[0].text;
  statusState.selectedStatus = [selectedOptions[0].value];
  showStatus.value = false;
};

/**
 * 任务状态变动
 * @param {Array} values
 */
const handleChangeStatus = ({ selectedOptions }) => {
  statusState.current = selectedOptions[0].text;
};
// ================== 任务状态end ==================

// ================== 子任务 ==================
/**
 * 点击切换创建组的选中状态
 */
const handleClickMakeGroup = () => {
  task.taskGroup = !task.taskGroup;
};

// ================== 子任务end ==================

// ================== 初期渲染 ==================
onBeforeMount(() => {
  // 获取优先级选项
  priorityState.columns = convertEnumToArray(TaskPriority).map((item) => {
    return {
      text: item.value,
      value: item.key,
    };
  });

  // 获取任务状态选项
  statusState.columns = convertEnumToArray(TaskStatus).map((item) => {
    return {
      text: item.value,
      value: item.key,
    };
  });
});
// ================== 初期渲染end ==================

// ================== 数据监听 ==================
// 编辑数据变动是否是编辑模式
watch(
  () => store.editTaskDataForSkuAddTask,
  (newVal) => {
    if (!newVal) {
      return;
    }
    for (const key in newVal) {
      editData[key] = newVal[key];
    }

    task.taskName = editData.taskName;
    task.taskPriority = editData.taskPriority;
    task.taskGroup = editData.taskGroup;
    task.subTasks = editData.subTasks;
    task.taskStatus = editData.taskStatus;
    priorityState.selectedPriority = [editData.taskPriority];
    state.isEdit = true;
    show.value = true;
  }
);
// ================== 数据监听end ==================
</script>

<style lang="scss" scoped>
// 添加任务按钮，固定在右下角
.sku-add-icon {
  user-select: none;
  position: fixed;
  right: 15px;
  bottom: calc($footer-height + 15px);
  width: $icon-size;
  height: $icon-size;
  font-size: 25px;
  background-color: $primary-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  cursor: pointer;

  .icon-addForButton {
    &::before {
      color: #fff;
    }
  }
}

.add-task-sec {
  display: flex;
  flex-direction: column;

  // 功能按钮区域
  .add-task-fun-sec {
    ::v-deep .nut-button__wrap {
      margin-top: -1px;
    }

    height: 39px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // 左侧区域
    .left-sec {
      display: flex;
      align-items: center;

      // 优先级，子任务, 任务组当前状态
      .task-priority,
      .task-group,
      .task-status {
        display: flex;
        align-items: center;
        margin-right: 12px;
        cursor: pointer;
        transition: all 0.1s;

        // 选中创建组
        &.task-group-actived {
          color: $primary-color;

          .icon-taskGroup {
            &::before {
              color: $primary-color;
            }
          }
        }

        .icon-priority,
        .icon-taskGroup,
        .status-icon {
          transition: all 0.15s;
          font-size: 14px;
          margin-right: 3px;
        }

        // 任务状态的整体颜色变化
        // 完成
        &.task-status-icon-ok {
          color: $task-done-color;
          .icon-ok {
            &::before {
              color: $task-done-color;
            }
          }
        }

        // 删除
        &.task-status-icon-delete {
          color: $task-delete-color;

          .icon-delete {
            &::before {
              color: $task-delete-color;
            }
          }
        }

        span {
          display: block;
          font-size: 12px;
          font-weight: bolder;
        }
      }
    }

    // 右侧区域
    .right-sec {
      display: flex;
      align-items: center;
    }
  }
}
</style>
