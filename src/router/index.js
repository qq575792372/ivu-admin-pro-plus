import { createRouter, createWebHistory } from "vue-router";

// 公共路由
export const constantRoutes = [
  // 默认路由跳转到首页
  {
    path: "/",
    redirect: "/lowcode",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/lowcode",
    name: "Lowcode",
    component: () => import("@/views/lowcode/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
