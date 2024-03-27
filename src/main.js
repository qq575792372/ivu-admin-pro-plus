import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 引入 vue-router
import router from "./router";

app.use(router);

// 引入 pinia
import store from "./store";

app.use(store);

//
import LowCode from "@/lib/lowcode/es/index.mjs";

console.log(333, LowCode);
app.use(LowCode);

// 引入入口样式
import "@/styles/index.scss";

// 挂载实例
app.mount("#app");
