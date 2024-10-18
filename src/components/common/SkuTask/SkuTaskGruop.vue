<!-- 任务列表组件，用于展示子任务 -->
<template>
  <div class="sku-task-group">
    <sku-card>
      <sku-swipe @before-close="handleBeforeClose">
        <div class="sku-task-group-title">
          <sku-priority-text :priority="taskPriority">
            <i class="icon-taskGroup"></i>
            <span>
              {{ props.taskName }}
            </span>
          </sku-priority-text>
        </div>

        <template #left>
          <nut-button shape="square" type="info"> 添加 </nut-button>
        </template>

        <template #right>
          <nut-button shape="square" type="danger"> 删除 </nut-button>
        </template>
      </sku-swipe>
      <sku-task-item
        v-for="item in props.subTasks"
        :key="item.taskId"
        :taskName="item.taskName"
        :taskStatus="item.taskStatus"
        :taskId="item.taskId"
        :taskPriority="item.taskPriority"
        @taskChange="handleChange"
        :parentId="props.parentId"
      />
    </sku-card>
  </div>
</template>

<script setup>
import SkuPriorityText from "../../ui/SkuPriorityText.vue";
import SkuSwipe from "../../ui/SkuSwipe.vue";
import { showConfirmDialog } from "vant";
import SkuTaskItem from "./SkuTaskItem.vue";
import SkuCard from "../../ui/SkuCard.vue";
import {
  TaskPriority,
  CloseCellType,
  TaskStatus,
} from "../../../assets/data/status";
import { useStore } from "../../../stores";
import { toRaw } from "vue";

const store = useStore();

const props = defineProps({
  // 任务组id
  taskId: {
    type: Number,
    required: true,
  },
  // 父任务id
  parentId: {
    type: Number,
    required: false,
  },
  // 任务组优先级
  taskPriority: {
    type: String,
    default: TaskPriority["无优先级"],
  },
  // 任务组标题
  taskName: {
    type: String,
    required: true,
  },
  // 任务组任务列表
  subTasks: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["taskChange"]);

/**
 * 当任务被点击改变状态的时候触发
 * @param e
 */
const handleChange = (e) => {
  emit("taskChange", e);
};

/**
 * 关闭前的操作, 如果点击的是删除按钮则阻止关闭
 * @param action
 * @param done
 */
const handleBeforeClose = ({ position }) => {
  const callFunc = {
    // 实际为添加
    [CloseCellType["编辑"]]: () => {
      store.setIsAddSubTask({
        parentId: props.taskId,
        isAdd: true,
      });

      return true;
    },
    [CloseCellType["删除"]]: async () => {
      try {
        const res = await showConfirmDialog({
          title: "删除任务",
          message: "确定删除该任务组吗? 子任务也会一起消失",
          closeOnClickOverlay: true,
        });

        let confirmDel = res === "confirm";

        // 如果确认删除则触发任务变动事件
        if (confirmDel) {
          emit("taskChange", {
            ...props,
            taskGroup: true,
            subTasks: toRaw(props.subTasks),
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
</script>

<style lang="scss" scoped>
.sku-task-group {
  .sku-task-group-title {
    padding: $card-padding;

    .icon-taskGroup {
      margin-right: 0.9rem;
    }
  }
}
</style>
