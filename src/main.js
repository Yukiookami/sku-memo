/*
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-20 20:34:16
 * @FilePath: \MakeMemo\src\main.js
 */
import { createApp } from "vue";
// css重置
import "./assets/styles/cssrest.scss";
// 全局字体
import "./assets/styles/font.scss";
// 全局样式
import "./assets/styles/global.scss";
// pinia
import { createPinia } from "pinia";

// nutUI
// 图标
import { IconFont } from "@nutui/icons-vue";
import "@nutui/icons-vue/dist/style_iconfont.css";
// 复选框, 弹出层, 输入框, 按钮
import { CheckboxGroup, Checkbox, Popup, Input, Button } from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
// nutUI end

import App from "./App.vue";
import router from "./router";

// 创建应用实例
const app = createApp(App);

// 创建Pinia实例
const pinia = createPinia();

// 挂载路由
app.use(router);
// 挂载Pinia
app.use(pinia);

// 挂载nutUI
// 挂载图标
app.use(IconFont);
// 挂载复选框
app.use(Checkbox);
app.use(CheckboxGroup);
// 挂载弹出层
app.use(Popup);
// 挂载输入框
app.use(Input);
// 挂载按钮
app.use(Button);
// nutUI end

// 挂载应用实例
app.mount("#app");
