/*
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-24 20:25:03
 * @FilePath: \SkuMemo\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
import { routerName } from "../assets/data/routerName";

const routes = [
  {
    path: "/",
    redirect: routerName["首页"],
  },
  {
    path: routerName["首页"],
    name: "home",
    component: () => import("../views/SkuMemoHome.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
