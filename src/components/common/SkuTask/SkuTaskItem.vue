<!--
 * @Author: zxy
 * @Date: 2024-09-19 21:49:07
 * @LastEditTime: 2024-09-29 17:34:05
 * @FilePath: \MakeMemo\src\components\common\SkuTask\SkuTaskItem.vue
-->
<template>
  <div class="sku-task-item">
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
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, watch } from "vue";
import { TaskPriority, TaskStatus } from "../../../assets/data/status";

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
  usedTaskStatus: props.taskStatus === TaskStatus["已完成"],
});

const handleChange = (e) => {
  state.usedTaskStatus = e;
  emit("taskChange", {
    taskId: props.taskId,
    taskStatus: e ? TaskStatus["已完成"] : TaskStatus["未完成"],
    taskName: props.taskName,
  });
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
  padding: 1.5rem 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: -6px;

  .sku-task-checkbox {
    display: flex;
    align-items: center;
    justify-content: flex-start;

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
