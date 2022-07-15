import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, mode }) => {
  console.log(11, command, mode);
  return {
    base: "/",
    server: {
      host: "127.0.0.1",
      port: 9000,
      proxy: {
        "/api": {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target: "https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "~": resolve("./"),
        "@": resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 如需自定义组件其他 token, 在此处配置
          },
        },
      },
    },
    plugins: [vue()],
  };
});
