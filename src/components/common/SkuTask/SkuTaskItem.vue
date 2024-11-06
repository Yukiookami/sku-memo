<!-- 任务组件，作为列表的子组件使用 -->
<!-- 功能: 展示
 展示任务信息，显示任务状态，控制删除，修改面板展开 
-->
<!-- 
  影响范围；
  src\components\common\SkuTask\SkuTask.vue
  src\components\common\SkuTask\SkuTaskGruop.vue
-->
<template>
  <!-- 单个任务 -->
  <div class="sku-task-item">
    <!-- checkbox任务主体 -->
    <!-- 当长按屏幕滑动的时候触发内容滑动而不是单任务滑动 -->
    <sku-card :isSub="!!parentId">
      <sku-swipe @before-close="handleBeforeClose">
        <nut-checkbox
          @change="handleChange"
          v-model="state.usedTaskStatus"
          class="sku-task-checkbox"
          :class="`sku-priority-${taskPriority}`"
        >
          <sku-priority-text :priority="taskPriority">
            <span class="task-name" :class="[{ closed: state.usedTaskStatus }]">
              {{ props.taskName }}
            </span>
          </sku-priority-text>
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
          <nut-button shape="square" type="info"> 编辑 </nut-button>
        </template>
        <!-- 左侧按钮区域end -->

        <!-- 右侧按钮区域 -->
        <template #right>
          <!-- 功能按钮区域 -->
          <nut-button shape="square" type="danger"> 删除 </nut-button>
        </template>
        <!-- 右侧按钮区域end -->
      </sku-swipe>
    </sku-card>
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
import SkuCard from "../../ui/SkuCard.vue";
import SkuPriorityText from "../../ui/SkuPriorityText.vue";
import SkuSwipe from "../../ui/SkuSwipe.vue";

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
    type: [Number, String],
    required: true,
  },
  taskPriority: {
    type: String,
    default: TaskPriority["无优先级"],
  },
  parentId: {
    type: Number,
    default: null,
  },
  createTime: {
    type: Number,
    default: null,
  },
  updateTime: {
    type: Number,
    default: null,
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
      // 判断是否有parentId，如果有则为修改子任务
      if (props.parentId !== null) {
        store.setEditSubTaskDataForSkuAddSubTask({
          ...props,
        });
      } else {
        store.setEditTaskDataForSkuAddTask({
          ...props,
        });
      }
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
      } catch {
        return false;
      }
    },
    // 主体点击关闭
    [CloseCellType["主体"]]: () => {},
    // 外部点击关闭
    [CloseCellType["外部"]]: () => {},
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
.sku-task-item {
  .sku-task-checkbox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 16px;
    overflow: hidden;
    padding: $card-padding;

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
}
</style>
