<!-- 任务列表组件，用于展示子任务 -->
<template>
  <div>
    <div class="sku-task-group-title">{{ props.title }}</div>
    <sku-task-item
      v-for="item in props.taskList"
      :key="item.id"
      :taskName="item.taskName"
      :taskStatus="item.taskStatus"
      :taskId="item.id"
      :taskPriority="item.taskPriority"
      @taskChange="handleChange"
    />
  </div>
</template>

<script setup>
import { SkuTaskList } from "../../../assets/data/requiedKeys";
import { checkHasAllProperties } from "../../../utils";
import SkuTaskItem from "./SkuTaskItem.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
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

const emit = defineEmits(["taskChange"]);

const handleChange = (e) => {
  emit("taskChange", e);
};
</script>

<style lang="scss" scoped></style>
