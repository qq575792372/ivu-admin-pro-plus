import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 引入 vue-router
import router from "./router";
app.use(router);

// 引入 pinia
import store from "./store";
app.use(store);

// // 引入 arco-design
// import ArcoDesign from "@arco-design/web-vue";
// import "@arco-design/theme-line/css/arco.css";
// app.use(ArcoDesign);

// // 引入 element-plus
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// app.use(ElementPlus);

//
import "@/styles/index.scss";

// 挂载实例
app.mount("#app");
