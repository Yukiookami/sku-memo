import { defineStore } from "pinia";
import { Footer, Sidebar } from "../assets/data/status";

export const useStore = defineStore({
  id: "app",
  // 定义状态
  state: () => ({
    // footer按钮高亮
    activeIndexInFooter: Footer["未完成"],
    // 侧边栏是否展开
    isSidebarOpen: false,
    // 侧边栏访问
    activeIndexInSidebar: Sidebar["生活"],
    // 是否触发左右内容滑动
    isTouchForContextMove: false,
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
    // 设置是否触发左右内容滑动
    setIsTouchForContextMove(isMove) {
      this.isTouchForContextMove = isMove;
    },
  },
});
