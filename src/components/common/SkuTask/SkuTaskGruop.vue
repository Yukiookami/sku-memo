<!-- 任务列表组件，用于展示子任务 -->
<template>
  <div class="sku-task-group">
    <sku-card>
      <div class="sku-task-group-title">{{ props.title }}</div>
      <!-- <sku-task-item
        v-for="item in props.taskList"
        :key="item.id"
        :taskName="item.taskName"
        :taskStatus="item.taskStatus"
        :taskId="item.id"
        :taskPriority="item.taskPriority"
        @taskChange="handleChange"
      /> -->
    </sku-card>
  </div>
</template>

<script setup>
import { SkuTaskList } from "../../../assets/data/requiedKeys";
import { checkHasAllProperties } from "../../../utils";
// import SkuTaskItem from "./SkuTaskItem.vue";
import SkuCard from "../../ui/SkuCard.vue";
import { TaskPriority } from "../../../assets/data/status";

const props = defineProps({
  // 任务组id
  id: {
    type: Number,
    required: true,
  },
  // 任务组优先级
  taskPriority: {
    type: String,
    default: TaskPriority["无优先级"],
  },
  // 任务组标题
  title: {
    type: String,
    required: true,
  },
  // 任务组是否展开
  open: {
    type: Boolean,
    required: false,
  },
  // 任务组任务列表
  taskList: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((item) => {
        const requiredKeys = SkuTaskList;
        return checkHasAllProperties(requiredKeys, item);
      });
    },
  },
});

// const emit = defineEmits(["taskChange"]);

// const handleChange = (e) => {
//   emit("taskChange", e);
// };
</script>

<style lang="scss" scoped></style>
