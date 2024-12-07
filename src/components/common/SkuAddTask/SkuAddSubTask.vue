<!-- 添加子任务 -->
<!--
  功能：添加/编辑子任务
  和任务添加组件类似
 -->
<!-- 
  影响范围：src\views\SkuMemoHome.vue
-->
<template>
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
</template>

<script setup>
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import { useStore } from "../../../stores";
import { TaskPriority, TaskStatus } from "../../../assets/data/status";
import SkuPriorityText from "../../ui/SkuPriorityText.vue";
import { convertEnumToArray } from "../../../utils";

// ================== 定义 ==================
const store = useStore();
// 提交事件
const emit = defineEmits(["submit", "editSubmit"]);

// 是否显示添加任务面板
const show = ref(false);
// 是否显示优先级选择框
const showPriority = ref(false);
// 父组id
const parentId = ref("");

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
  placeholder: computed(() => "请输入任务名称"),
});

// 任务数据
// 影响范围：handleSubmit，handleEditSubmit，editData，
// src\assets\data\requiedKeys.js 中的 SkuTaskList
// 数据监听中的 editTaskDataForSkuAddTask
const task = reactive({
  // 任务名称
  taskName: "",
  // 任务优先级
  taskPriority: TaskPriority["无优先级"],
});

// 优先级选择框数据
const priorityState = reactive({
  // 选项
  columns: [],
  // 当前选择
  current: TaskPriority["无优先级"],
  // 选中的优先级
  selectedPriority: [TaskPriority["无优先级"]],
});

// 编辑数据
const editData = reactive({
  // 任务名称
  taskName: "",
  // 任务优先级
  taskPriority: "",
  // 任务状态
  taskStatus: "",
  // 任务id
  taskId: "",
  // 创建时间
  createTime: "",
  // 更新时间
  updateTime: "",
});
// ================== 定义end ==================

// ================== 逻辑操作 ==================
/**
 * 确认添加
 */
const handleSubmit = () => {
  emit("submit", {
    taskName: task.taskName,
    taskStatus: TaskStatus["未完成"],
    taskPriority: task.taskPriority ?? TaskPriority["无优先级"],
    taskGroup: false,
    parentId: parentId.value,
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
const handleEditSubmit = () => {
  emit("editSubmit", {
    taskName: task.taskName,
    taskStatus: editData.taskStatus,
    taskPriority: task.taskPriority ?? TaskPriority["无优先级"],
    taskGroup: false,
    taskId: editData.taskId,
    parentId: parentId.value,
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

// ================== 初期渲染 ==================
onBeforeMount(() => {
  // 获取优先级选项
  priorityState.columns = convertEnumToArray(TaskPriority).map((item) => {
    return {
      text: item.value,
      value: item.key,
    };
  });
});
// ================== 初期渲染end ==================

// ================== 数据监听 ==================
// 面板展开
watch(
  () => store.isAddSubTask,
  (newVal) => {
    if (state.isEdit) {
      clearData();
      state.isEdit = false;
    }

    show.value = newVal.isAdd;
    parentId.value = newVal.parentId;
  }
);

// 编辑数据变动是否为编辑模式
watch(
  () => store.editSubTaskDataForSkuAddSubTask,
  (newVal) => {
    if (!newVal) return;

    for (const key in newVal) {
      editData[key] = newVal[key];
    }

    task.taskName = editData.taskName;
    task.taskPriority = editData.taskPriority;
    task.taskGroup = editData.taskGroup;
    priorityState.selectedPriority = [editData.taskPriority];
    parentId.value = newVal.parentId;

    state.isEdit = true;
    show.value = true;
  }
);
// ================== 数据监听end ==================
</script>

<style lang="scss" scoped>
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

      // 优先级，子任务
      .task-priority,
      .task-group {
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
        .icon-taskGroup {
          transition: all 0.15s;
          font-size: 14px;
          margin-right: 3px;
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
