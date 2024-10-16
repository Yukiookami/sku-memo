<!-- 任务组件，作为列表的子组件使用 -->
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

      <!-- 左侧按钮区域 -->
      <template #left>
        <!-- 功能按钮区域 -->
        <div class="sku-item-func-sec-left">
          <nut-button shape="square" type="info"> 编辑 </nut-button>
        </div>
      </template>
      <!-- 左侧按钮区域end -->

      <!-- 右侧按钮区域 -->
      <template #right>
        <!-- 功能按钮区域 -->
        <div class="sku-item-func-sec-right">
          <nut-button shape="square" type="danger"> 删除 </nut-button>
        </div>
      </template>
      <!-- 右侧按钮区域end -->
    </van-swipe-cell>
    <!-- checkbox任务主题 -->
  </div>
  <!-- 单个任务end -->
</template>

<script setup>
import { onBeforeMount, reactive, watch } from "vue";
import {
  CloseCellType,
  TaskPriority,
  TaskStatus,
} from "../../../assets/data/status";
import { useStore } from "../../../stores";
import { showConfirmDialog } from "vant";

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
});

/**
 * 当任务被点击改变状态的时候触发
 * @param e
 */
const handleChange = (e) => {
  state.usedTaskStatus = e;
  emit("taskChange", {
    ...props,
    taskStatus: e ? TaskStatus["已完成"] : TaskStatus["未完成"],
  });
};

/**
 * 关闭前的操作, 如果点击的是删除按钮则阻止关闭
 * @param action
 * @param done
 */
const handleBeforeClose = ({ position }) => {
  const callFunc = {
    [CloseCellType["编辑"]]: () => {
      store.setEditTaskDataForSkuAddTask({
        ...props,
      });

      return true;
    },
    [CloseCellType["删除"]]: async () => {
      try {
        const res = await showConfirmDialog({
          title: "删除任务",
          message: "确定删除该任务吗?",
          closeOnClickOverlay: true,
        });

        let confirmDel = res === "confirm";

        // 如果确认删除则触发任务变动事件
        if (confirmDel) {
          emit("taskChange", {
            ...props,
            taskStatus: TaskStatus["已删除"],
          });
        }

        return confirmDel;
      } catch {
        return false;
      }
    },
    // 主体点击关闭
    [CloseCellType["主体"]]: () => {
      return true;
    },
    // 外部点击不关闭
    [CloseCellType["外部"]]: () => {
      return false;
    },
  };

  return callFunc[position]();
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
  user-select: none;

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

  .sku-item-func-sec-right {
    height: 100%;
    margin-left: 1px;

    ::v-deep .nut-button--square {
      height: 100%;
    }

    ::v-deep .nut-button--square {
      border-top-right-radius: $button-radius;
      border-bottom-right-radius: $button-radius;
    }
  }

  .sku-item-func-sec-left {
    height: 100%;
    margin-right: 1px;

    ::v-deep .nut-button--square {
      height: 100%;
    }

    ::v-deep .nut-button--square {
      border-top-left-radius: $button-radius;
      border-bottom-left-radius: $button-radius;
    }
  }
}
</style>
