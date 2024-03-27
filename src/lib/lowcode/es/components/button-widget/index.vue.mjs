import { resolveComponent as a, openBlock as s, createBlock as i, withCtx as u, createTextVNode as p, toDisplayString as r } from "vue";
const f = /* @__PURE__ */ Object.assign({
  name: "ButtonWidget"
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
  emits: ["custom-click"],
  setup(e, { emit: n }) {
    const o = n, t = e, c = () => {
      o("custom-click", t.widget);
    };
    return (m, d) => {
      const l = a("el-button");
      return s(), i(l, { onClick: c }, {
        default: u(() => [
          p(
            r(t.className),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});
export {
  f as default
};
