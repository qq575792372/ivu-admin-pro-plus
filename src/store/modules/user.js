import { defineStore } from "pinia";
const userStore = defineStore("user", {
  state: () => {
    return {
      token: "123",
    };
  },
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
  },
  persist: {
    key: "PINIA_USER", //缓存key
    storage: window.sessionStorage, //缓存方式
    // 部分持久化状态的点符号路径数组，默认持久化所有数据
    // paths: ["token"], //持久化counter 字段
  },
});

export default userStore;
