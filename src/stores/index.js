import { defineStore } from "pinia";
import { Footer, Sidebar } from "../assets/data/status";
import { ref } from "vue";

export const useStore = defineStore("app", () => {
  // ========== Footer 状态 ===========
  /** Footer 按钮高亮索引 */
  const activeIndexInFooter = ref(Footer["未完成"]);

  // ========== Sidebar 状态 ===========
  /** Sidebar 是否展开 */
  const isSidebarOpen = ref(false);
  /** Sidebar 当前选中索引 */
  const activeIndexInSidebar = ref(Sidebar["生活"]);

  // ========== 交互状态 ===========
  /** 是否触发左右内容滑动 */
  const isTouchForContextMove = ref(false);

  // ========== 任务编辑状态 ===========
  /** 需要编辑的任务数据（SkuAddTask） */
  const editTaskDataForSkuAddTask = ref({});

  /**
   * 是否显示添加子任务
   * 影响范围：
   * - src/components/common/SkuTask/SkuTaskGruop.vue
   * - src/components/common/SkuAddTask/SkuAddSubTask.vue
   */
  const isAddSubTask = ref({
    isAdd: false,
    parentId: "",
  });

  /** 需要编辑的子任务数据（SkuAddSubTask） */
  const editSubTaskDataForSkuAddSubTask = ref({});

  /** 原始 task 数据，方便参照 */
  const propertyTaskData = ref({});

  // ========== Actions ===========
  /**
   * 切换 Sidebar 显示状态
   */
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  return {
    // ===== State =====
    activeIndexInFooter,
    isSidebarOpen,
    activeIndexInSidebar,
    isTouchForContextMove,
    editTaskDataForSkuAddTask,
    isAddSubTask,
    editSubTaskDataForSkuAddSubTask,
    propertyTaskData,

    // ===== Actions =====
    toggleSidebar,
  };
});
