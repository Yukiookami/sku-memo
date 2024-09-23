import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "app",
  // 定义状态
  state: () => ({
    // footer按钮高亮
    activeIndexInFooter: 0,
    // 侧边栏是否展开
    isSidebarOpen: false,
    // 侧边栏访问
    activeIndexInSidebar: 0,
  }),
  // 定义操作
  actions: {
    // 设置footer按钮高亮
    setActiveIndexInFooter(index) {
      this.activeIndexInFooter = index;
    },
    // 设置侧边栏展开状态
    setIsSidebarOpen(isOpen) {
      this.isSidebarOpen = isOpen;
    },
    // 设置侧边栏访问
    setActiveIndexInSidebar(index) {
      this.activeIndexInSidebar = index;
    },
  },
});
