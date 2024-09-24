<!--
 * @Author: zxy
 * @Date: 2024-09-19 21:49:07
 * @LastEditTime: 2024-09-24 20:48:49
 * @FilePath: \SkuMemo\src\components\common\SkuTask\SkuTaskItem.vue
-->
<template>
  <div class="sku-task-item">
    <nut-checkbox
      @change="handleChange"
      v-model="state.usedTaskStatus"
      class="sku-task-checkbox"
    >
      <span class="task-name" :class="{ closed: state.usedTaskStatus }">
        {{ props.taskName }}
      </span>
      <template #icon>
        <img src="../../../assets/images/checkList/未选中.svg" alt="未完成" />
      </template>
      <template #checkedIcon>
        <img src="../../../assets/images/checkList/选中.svg" alt="已完成" />
      </template>
    </nut-checkbox>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, watch } from "vue";
import { TaskStatus } from "../../../assets/data/status";

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
      margin-left: 0.5rem;

      &.closed {
        text-decoration: line-through;
        color: #ccc;
      }
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
