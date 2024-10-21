/*
 * @Author: zxy
 * @Date: 2024-09-20 16:52:44
 * @LastEditTime: 2024-09-29 17:03:16
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
// viewport 控制视窗高度
import "./utils/viewport"; // 引入 viewport.js
// 引入字体图标
import "./assets/font/iconfont/style.css";
// 自定义指令
// 长按
import longPress from "./directives/longPress";

// nutUI
// 图标
import { IconFont } from "@nutui/icons-vue";
import "@nutui/icons-vue/dist/style_iconfont.css";
// 复选框, 弹出层, 输入框, 按钮, 选择器, 徽章
import {
  CheckboxGroup,
  Checkbox,
  Popup,
  Input,
  Button,
  Picker,
} from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
// nutUI end
// vant
// 滑动单元格, 弹出框
import { SwipeCell, Dialog } from "vant";
// 引入样式
import "vant/lib/index.css";
// vant end

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
// 挂载自定义指令
// 长按
app.directive("long-press", longPress);

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
// 挂载选择器
app.use(Picker);
// nutUI end

// 挂载vant
// 挂载滑动单元格
app.use(SwipeCell);
// 挂载弹出框
app.use(Dialog);
// vant end

// 挂载应用实例
app.mount("#app");
