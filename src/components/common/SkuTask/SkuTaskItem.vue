<!--
 * @Author: zxy
 * @Date: 2024-09-19 21:49:07
 * @LastEditTime: 2024-09-29 17:34:05
 * @FilePath: \MakeMemo\src\components\common\SkuTask\SkuTaskItem.vue
-->
<template>
  <!-- 单个任务 -->
  <div class="sku-task-item">
    <!-- checkbox任务主体 -->
    <!-- 当长按屏幕滑动的时候触发内容滑动而不是单任务滑动 -->
    <van-swipe-cell
      :disabled="store.isTouchForContextMove ?? false"
      :before-close="handleBeforeClose"
    >
      <nut-checkbox
        @change="handleChange"
        v-model="state.usedTaskStatus"
        class="sku-task-checkbox"
        :class="`sku-priority-${taskPriority}`"
      >
        <span
          class="task-name"
          :class="[
            { closed: state.usedTaskStatus },
            `sku-priority-${taskPriority}`,
          ]"
        >
          {{ props.taskName }}
        </span>
        <template #icon>
          <i class="icon-select"></i>
        </template>
        <template #checkedIcon>
          <i class="icon-selected"></i>
        </template>
      </nut-checkbox>

      <template #right>
        <!-- 功能按钮区域 -->
        <div class="sku-item-func-sec">
          <nut-button type="info" shape="square" @click="handleClickEdit">
            编辑
          </nut-button>

          <nut-button shape="square" type="danger" @click="handleClickDel">
            删除
          </nut-button>
        </div>
      </template>
    </van-swipe-cell>
    <!-- checkbox任务主题 -->

    <!-- 删除确认框 -->
    <van-dialog
      v-model:show="state.showDelDialog"
      title="删除任务"
      message="确定要删除该任务吗？"
      showCancelButton
      confirmButtonText="确定"
      cancelButtonText="取消"
      @confirm="handleDelTask"
    ></van-dialog>
    <!-- 删除确认框end -->
  </div>
  <!-- 单个任务end -->
</template>

<script setup>
import { onBeforeMount, reactive, watch } from "vue";
import { TaskPriority, TaskStatus } from "../../../assets/data/status";
import { useStore } from "../../../stores";

const store = useStore();

const props = defineProps({
  taskName: {
    type: String,
    required: true,
  },
  taskStatus: {
    type: String,
    default: TaskStatus["未完成"],
  },
  taskId: {
    type: Number,
    required: true,
  },
  taskPriority: {
    type: String,
    default: TaskPriority["无优先级"],
  },
});

const emit = defineEmits(["taskChange"]);

const state = reactive({
  // 确认是否完成任务
  usedTaskStatus: props.taskStatus === TaskStatus["已完成"],
  // 是否显示删除确认框
  showDelDialog: false,
});

/**
 * 当任务被点击改变状态的时候触发
 * @param e
 */
const handleChange = (e) => {
  state.usedTaskStatus = e;
  emit("taskChange", {
    taskId: props.taskId,
    taskStatus: e ? TaskStatus["已完成"] : TaskStatus["未完成"],
    taskName: props.taskName,
  });
};

/**
 *  打开删除框
 */
const handleClickDel = () => {
  state.showDelDialog = true;
};

/**
 * 确认删除任务
 */
const handleDelTask = () => {
  // store.delTask(props.taskId);
};

/**
 * 编辑任务
 */
const handleClickEdit = () => {
  // store.editTask(props.taskId);
};

/**
 * 关闭前的操作, 如果点击的是删除按钮则阻止关闭
 * @param action
 * @param done
 */
const handleBeforeClose = () => {
  if (state.showDelDialog) {
    return false;
  } else {
    return true;
  }
};

onBeforeMount(() => {
  watch(
    () => props.taskStatus,
    (val) => {
      state.usedTaskStatus = val === TaskStatus["已完成"];
    }
  );
});
</script>

<style lang="scss" scoped>
$button-radius: 5px;

.sku-task-item {
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: $button-radius;

  .sku-task-checkbox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.5rem 1rem;
    min-height: 16px;
    overflow: hidden;

    .task-name {
      font-size: 1rem;

      &.closed {
        text-decoration: line-through;
        color: #ccc !important;
      }
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  .sku-item-func-sec {
    height: 100%;
    margin-left: 1px;

    ::v-deep .nut-button--square {
      height: 100%;
    }

    ::v-deep .nut-button--square:last-child {
      border-top-right-radius: $button-radius;
      border-bottom-right-radius: $button-radius;
    }
  }
}
</style>
