import { shallowRef as o, openBlock as n, createElementBlock as l, Fragment as r, createTextVNode as s, toDisplayString as c, createBlock as d, resolveDynamicComponent as i } from "vue";
import p from "../../hooks/render.mjs";
const b = /* @__PURE__ */ Object.assign({
  name: "Render"
}, {
  __name: "index",
  props: {
    data: { type: Object, default: () => ({}) }
  },
  setup(e) {
    const t = e, a = o(null);
    return a.value = p({ props: { widgets: t.data.widgets, globalConfig: t.data.globalConfig } }), (g, m) => (n(), l(
      r,
      null,
      [
        s(
          c(e.data.globalConfig) + " ",
          1
          /* TEXT */
        ),
        (n(), d(i(a.value), { class: "render" }))
      ],
      64
      /* STABLE_FRAGMENT */
    ));
  }
});
export {
  b as default
};
