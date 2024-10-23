<!-- 任务列表组件，用于展示子任务 -->
<!-- 
  功能：展示任务组标题，任务组下的任务列表，
  可以展开/收起任务列表，可以删除任务组，可以添加子任务
-->
<!-- 
  影响范围: 
  src\components\common\SkuTask\SkuTask.vue
-->
<template>
  <div class="sku-task-group">
    <sku-card>
      <sku-swipe @before-close="handleBeforeClose">
        <div
          @click="handleOpenBord"
          class="sku-task-group-title"
          :class="{ 'open-title': isOpen && subTasks?.length > 0 }"
        >
          <sku-priority-text class="title-sec" :priority="taskPriority">
            <!-- 任务组标题 -->
            <div>
              <i class="icon-taskGroup"></i>
              <span>
                {{ taskName }}
              </span>
            </div>

            <!-- 已完成数量/任务数量 -->
            <div class="count-box">
              <sku-text
                :title="state.todoCount"
                :fontType="TextFont['数字字体']"
                :type="TextType['标题3号']"
              >
              </sku-text>
            </div>
          </sku-priority-text>
        </div>

        <template #left>
          <nut-button shape="square" type="info"> 添加 </nut-button>
        </template>

        <template #right>
          <nut-button shape="square" type="danger"> 删除 </nut-button>
        </template>
      </sku-swipe>

      <sku-collapse :open="isOpen" :taskId="taskId">
        <sku-task-item
          v-for="item in subTasks"
          :key="item.taskId"
          :taskName="item.taskName"
          :taskStatus="item.taskStatus"
          :taskId="item.taskId"
          :taskPriority="item.taskPriority"
          @taskChange="handleChange"
          :parentId="parentId"
        />
      </sku-collapse>
    </sku-card>
  </div>
</template>

<script setup>
import SkuPriorityText from "../../ui/SkuPriorityText.vue";
import SkuText from "../../ui/SkuText.vue";
import SkuSwipe from "../../ui/SkuSwipe.vue";
import SkuCollapse from "../../ui/SkuCollapse.vue";
import { showConfirmDialog } from "vant";
import SkuTaskItem from "./SkuTaskItem.vue";
import SkuCard from "../../ui/SkuCard.vue";
import { throttle } from "lodash";
import {
  TaskPriority,
  CloseCellType,
  TaskStatus,
  TextFont,
  TextType,
} from "../../../assets/data/status";
import { useStore } from "../../../stores";
import { computed, reactive, toRaw, ref, watch } from "vue";

const store = useStore();

const isOpen = ref(false);

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

// 状态
const state = reactive({
  // 确认未完成的任务数量
  todoCount: computed(() => {
    return props.subTasks.filter(
      (item) => item.taskStatus === TaskStatus["未完成"]
    ).length;
  }),
});

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

// 在 setup 中定义一个持久的节流函数
const throttledToggleOpen = throttle(
  () => {
    isOpen.value = !isOpen.value;
  },
  300,
  // 限制只有在 leading edge（即首次触发）时执行
  { leading: true, trailing: false }
);

/**
 * 打开任务组子任务面板
 */
const handleOpenBord = () => {
  throttledToggleOpen();
};

// 监听子任务组长度，有变化则打开任务组
watch(
  () => props.subTasks.length,
  () => {
    if (props.subTasks.length > 0) {
      isOpen.value = true;
    }
  }
);
</script>

<style lang="scss" scoped>
.sku-task-group {
  .sku-task-group-title {
    $border-position: 0%;

    position: relative;
    padding: $card-padding;
    word-break: break-all;

    &:after {
      content: "";
      display: block;
      height: 1px;
      background-color: #ccc;
      position: absolute;
      bottom: 0px;
      left: $border-position;
      right: $border-position;
      transition: all 0.3s;
      opacity: 0;
    }

    &.open-title {
      &:after {
        opacity: 1;
      }
    }

    .title-sec {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-taskGroup {
        margin-right: 0.9rem;
      }

      .count-box {
        font-size: 1.2rem;
        text-align: center;
        min-width: 30px;
        & :nth-child(2) {
          margin: 0 0.25rem;
        }
      }
    }
  }
}
</style>
