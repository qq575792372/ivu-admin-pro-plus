import { openBlock as r, createElementBlock as a, renderSlot as c, createTextVNode as n } from "vue";
import l from "../../hooks/data-sources.mjs";
const m = { class: "easy-form-wrapper" }, i = /* @__PURE__ */ Object.assign({ name: "EasyForm" }, {
  __name: "index",
  props: {},
  setup(e) {
    const o = e, { requestData: t } = l({ props: o });
    return console.log("requestData", t), (s, p) => (r(), a("div", m, [
      c(s.$slots, "default"),
      n(" ivu-lowcode easy-form ")
    ]));
  }
});
export {
  i as default
};
