<!-- 任务列表组件, 用于展示任务列表, 主出口 -->
<!-- 
  影响范围：
  src\views\SkuMemoHome.vue
-->
<template>
  <div class="sku-task">
    <transition-group name="slice" tag="div">
      <template v-for="item in props.taskList" :key="item.id">
        <sku-task-item
          v-if="!item.taskGroup"
          :taskName="item.taskName"
          :taskStatus="item.taskStatus"
          :taskId="item.id"
          :taskPriority="item.taskPriority"
          :parentId="null"
          @taskChange="handleChange"
        />

        <sku-task-gruop
          v-else
          :taskId="item.id"
          :taskName="item.taskName"
          :taskStatus="item.taskStatus"
          :subTasks="item.subTasks ?? []"
          :taskPriority="item.taskPriority"
          :parentId="item.id"
          @taskChange="handleChange"
        ></sku-task-gruop>
      </template>
    </transition-group>
  </div>
</template>

<script setup>
// import { SkuTaskList } from "../../../assets/data/requiedKeys";
// import { checkHasAllProperties } from "../../../utils";
import SkuTaskItem from "./SkuTaskItem.vue";
import SkuTaskGruop from "./SkuTaskGruop.vue";

const props = defineProps({
  taskList: {
    type: Array,
    required: true,
    // validator: (value) => {
    //   return value.every((item) => {
    //     const requiredKeys = SkuTaskList;
    //     return checkHasAllProperties(requiredKeys, item);
    //   });
    // },
  },
});

const emit = defineEmits(["taskChange"]);

const handleChange = (e) => {
  emit("taskChange", e);
};
</script>

<style lang="scss" scoped>
/* 组件增减动画样式 */
.slice-enter-active,
.slice-leave-active {
  overflow: hidden;
}

.slice-enter-from,
.slice-leave-to {
  transform: translateX(-100%);
}

.slice-enter-to,
.slice-leave-from {
  transform: translateX(0%);
}

.slice-enter-active {
  animation: sliceIn 0.3s forwards;
}

.slice-leave-active {
  animation: sliceOut 0.3s forwards;
}

@keyframes sliceIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes sliceOut {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
