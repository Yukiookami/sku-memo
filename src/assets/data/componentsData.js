import life from "../images/sideBar/生活.svg";
import work from "../images/sideBar/工作.svg";
import life_active from "../images/sideBar/生活-选中.svg";
import work_active from "../images/sideBar/工作-选中.svg";

// 底部菜单
export const footerMenu = [
  {
    id: 0,
    icon: "edit",
    title: "未完成",
    link: "/",
  },
  {
    id: 1,
    icon: "Check",
    title: "已完成",
    link: "/",
  },
];

// 侧边栏
export const sidebarMenu = [
  {
    id: 0,
    title: "生活",
    icon: life,
    link: "/",
    active: life_active,
  },
  {
    id: 1,
    title: "工作",
    icon: work,
    link: "/",
    active: work_active,
  },
];
