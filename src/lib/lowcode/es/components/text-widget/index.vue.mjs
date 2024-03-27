import { useCssVars as r, ref as u, openBlock as m, createElementBlock as p, Fragment as d, createElementVNode as g, toDisplayString as f, createCommentVNode as S } from "vue";
import "./index.vue2.mjs";
import _ from "../../_virtual/_plugin-vue_export-helper.mjs";
const b = /* @__PURE__ */ Object.assign({
  name: "TextWidget"
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
  setup(l, { expose: c, emit: n }) {
    r((i) => ({
      "87277f9a": e.value
    }));
    const o = n, t = l, s = () => {
      t.widget.props.className = "ddd", o("custom-click", t.className), a();
    }, e = u(14), a = () => {
      e.value = e.value + 2;
    };
    return c({
      changeLargeSize: a,
      changeSmallSize: () => {
        e.value = e.value - 2;
      }
    }), (i, v) => (m(), p(
      d,
      null,
      [
        g(
          "span",
          { onClick: s },
          f(t.value),
          1
          /* TEXT */
        ),
        S(`  <el-button @click="changeLargeSize">加大</el-button>\r
  <el-button @click="changeSmallSize">减小</el-button>`)
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ));
  }
}), y = /* @__PURE__ */ _(b, [["__scopeId", "data-v-a95f5933"]]);
export {
  y as default
};
