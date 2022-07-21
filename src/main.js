import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 引入 vue-router
import router from "./router";
app.use(router);

// 引入 pinia
import store from "./store";
app.use(store);

// 引入 arco-design
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
app.use(ArcoVue);

// 挂载实例
app.mount("#app");
