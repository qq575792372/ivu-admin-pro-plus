import { openBlock as t, createElementBlock as o, renderSlot as r } from "vue";
import "./index.vue2.mjs";
import n from "../../_virtual/_plugin-vue_export-helper.mjs";
const i = { class: "simple-container-widget-wrapper" }, s = /* @__PURE__ */ Object.assign({
  name: "SimpleContainerWidget"
}, {
  __name: "index",
  props: {
    /*   designer: { type: Object, default: () => null },
    widget: { type: Object, default: () => null },
    parentWidget: { type: Object, default: () => null },
    parentWidgets: { type: Array, default: () => [] },
    indexOfParentWidgets: { type: Number, default: null }, */
  },
  setup(p) {
    return (e, a) => (t(), o("div", i, [
      r(e.$slots, "default", {}, void 0, !0)
    ]));
  }
}), m = /* @__PURE__ */ n(s, [["__scopeId", "data-v-5776f192"]]);
export {
  m as default
};
