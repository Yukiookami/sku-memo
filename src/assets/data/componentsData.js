import life from "../images/sideBar/生活.svg";
import work from "../images/sideBar/工作.svg";
import life_active from "../images/sideBar/生活-选中.svg";
import work_active from "../images/sideBar/工作-选中.svg";
import { Sidebar, Footer } from "./status";

// 底部菜单
export const footerMenu = [
  {
    id: Footer["未完成"],
    icon: "edit",
    title: "未完成",
    link: "/",
  },
  {
    id: Footer["已完成"],
    icon: "Check",
    title: "已完成",
    link: "/",
  },
];

// 侧边栏
export const sidebarMenu = [
  {
    id: Sidebar["生活"],
    title: "生活",
    icon: life,
    link: "/",
    active: life_active,
  },
  {
    id: Sidebar["工作"],
    title: "工作",
    icon: work,
    link: "/",
    active: work_active,
  },
];
