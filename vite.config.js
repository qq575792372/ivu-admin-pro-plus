import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// 按需加载element-plus和arco-design
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import { ElementPlusResolver, ArcoResolver } from "unplugin-vue-components/resolvers";
import vitePluginForArco from "@arco-plugins/vite-vue";

// 当前目录路径
const CWD = process.cwd();

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, CWD);
  return {
    base: "/", // 打包和路由访问的路径，例如：/my-demo

    /* server配置 */
    server: {
      host: "0.0.0.0",
      port: 8090,
      open: true,
      // 配置反向代理
      proxy: {
        [env.VITE_BASE_API]: {
          // 代理的地址
          target: "http://192.168.1.10:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_BASE_API}`, "g"), "/"),
        },
      },
    },

    /* 解析配置 */
    resolve: {
      alias: {
        "~": resolve("./"),
        "@": resolve("./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },

    /* css配置 */
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            // 如需自定义组件其他 token, 在此处配置
          },
        },
      },
    },

    /* rollup配置 */
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          "element-plus": ["element-plus"],
          echarts: ["echarts"],
        },
      },
    },

    /* 插件配置 */
    plugins: [
      vue(),
      /* 按需引入 element-plus 和 arco-design-vue */
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: "sass" }), ArcoResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({ importStyle: "sass" }),
          ArcoResolver({
            sideEffect: true,
          }),
        ],
      }),
      createStyleImportPlugin({
        libs: [
          {
            libraryName: "@arco-design/web-vue",
            esModule: true,
            resolveStyle: (name) => {
              return `@arco-design/web-vue/es/${name}/style/css.js`;
            },
          },
          {
            libraryName: "element-plus",
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/theme-chalk/${name}.css`;
            },
          },
        ],
      }),
      vitePluginForArco({ theme: "@arco-design/theme-line" }),
    ],
  };
});
