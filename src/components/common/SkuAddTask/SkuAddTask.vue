<!--
 * @Author: zxy
 * @Date: 2024-09-23 21:17:36
 * @LastEditTime: 2024-09-29 17:30:15
 * @FilePath: \MakeMemo\src\components\common\SkuAddTask\SkuAddTask.vue
-->
<template>
  <!-- 追加按钮 -->
  <div class="sku-add-icon" @click="handleClickAddIcon">
    <sku-icon height="40px" width="40px" :icon="add" />
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
        placeholder="请输入任务名称"
        clearable
        @keypress.enter="handleSubmit"
      />
      <div class="add-task-fun-sec">
        <!-- 左侧区域 -->
        <div class="left-sec">
          <!-- 优先级 -->
          <div
            class="task-priority"
            @click="handleClickTaskPriority"
            :class="`sku-priority-${task.taskPriority}`"
          >
            <i class="icon-priority"></i>

            <span>{{ TaskPriority[task.taskPriority] }}</span>
          </div>
          <!-- 优先级end -->

          <!-- 子任务 -->
          <div></div>
          <!-- 子任务end -->
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
import SkuIcon from "../../ui/SkuIcon.vue";
import add from "../../../assets/images/skuAddTask/添加.svg";
import { computed, onBeforeMount, reactive, watch } from "vue";
import { ref } from "vue";
import { TaskPriority, TaskStatus } from "../../../assets/data/status";
import { convertEnumToArray } from "../../../utils";
import { useStore } from "../../../stores";

const store = useStore();
// 提交事件
const emit = defineEmits(["submit", "editSubmit"]);

// 是否显示添加任务面板
const show = ref(false);
// 是否显示优先级选择框
const showPriority = ref(false);

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
});

// 任务数据
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
});

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

/**
 * 确认添加
 */
const handleSubmit = () => {
  emit("submit", {
    taskName: task.taskName,
    taskStatus: TaskStatus["未完成"],
    taskPriority: task.taskPriority ?? TaskPriority["无优先级"],
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
    taskId: editData.taskId,
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

onBeforeMount(() => {
  // 获取优先级选项
  priorityState.columns = convertEnumToArray(TaskPriority).map((item) => {
    return {
      text: item.value,
      value: item.key,
    };
  });
});

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
    priorityState.selectedPriority = [editData.taskPriority];
    state.isEdit = true;
    show.value = true;
  }
);
</script>

<style lang="scss" scoped>
// 添加任务按钮，固定在右下角
.sku-add-icon {
  $icon-size: 40px;

  user-select: none;
  position: fixed;
  right: 15px;
  bottom: calc($footer-height + 15px);
  width: $icon-size;
  height: $icon-size;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  cursor: pointer;
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

      .task-priority {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;

        .icon-priority {
          font-size: 1.65rem;
        }

        span {
          display: block;
          font-size: 12px;
          font-weight: bolder;
          margin-top: -4px;
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
