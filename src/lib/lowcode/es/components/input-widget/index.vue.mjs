import { ref as o, resolveComponent as a, openBlock as u, createBlock as p } from "vue";
const c = /* @__PURE__ */ Object.assign({
  name: "InputWidget"
}, {
  __name: "index",
  props: {
    // 当前组件和全局配置
    widget: { type: Object, default: null },
    globalConfig: { type: Object, default: null },
    // 组件属性
    value: { type: String, default: "" },
    className: { type: String, default: "" }
  },
  setup(d) {
    const e = o(null);
    return (r, l) => {
      const t = a("el-input");
      return u(), p(t, {
        modelValue: e.value,
        "onUpdate:modelValue": l[0] || (l[0] = (n) => e.value = n),
        placeholder: "ddd"
      }, null, 8, ["modelValue"]);
    };
  }
});
export {
  c as default
};
