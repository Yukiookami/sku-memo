<!--
 * @Author: zxy
 * @Date: 2024-09-23 21:17:36
 * @LastEditTime: 2024-09-24 08:49:13
 * @FilePath: \MakeMemo\src\components\common\SkuAddTask\SkuAddTask.vue
-->
<template>
  <div class="sku-add-icon" @click="handleClickAddIcon">
    123123
    <sku-icon height="40px" width="40px" :icon="add" />
  </div>

  <nut-popup
    v-model:visible="show"
    position="bottom"
    :style="{ width: '100%', height: '80px' }"
  >
    <div class="add-task-sec">
      <nut-input
        v-model="state.taskName"
        placeholder="请输入任务名称"
        clearable
        @keypress.enter="handleSubmit"
      />
      <div class="add-task-fun-sec">
        <nut-button type="info" @click="handleSubmit" size="mini">
          添加
        </nut-button>
      </div>
    </div>
  </nut-popup>
</template>

<script setup>
import SkuIcon from "../../ui/SkuIcon.vue";
import add from "../../../assets/images/homePage/添加.svg";
import { reactive } from "vue";
import { ref } from "vue";
import { TaskStatus } from "../../../assets/data/status";

// 提交事件
const emit = defineEmits(["submit"]);

const show = ref(false);

const state = reactive({
  taskName: "",
});

console.log("state", 123123123);

/**
 * 点击添加按钮
 */
const handleClickAddIcon = () => {
  show.value = true;
};

const handleSubmit = () => {
  emit("submit", {
    taskName: state.taskName,
    taskStatus: TaskStatus["未完成"],
  });
  state.taskName = "";
  show.value = false;
};
</script>

<style lang="scss" scoped>
.sku-add-icon {
  $icon-size: 40px;

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

  .add-task-fun-sec {
    height: 39px;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
