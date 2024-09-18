import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// 创建应用实例
const app = createApp(App);

// 挂载路由
app.use(router);
// 挂载应用实例
app.mount("#app");
