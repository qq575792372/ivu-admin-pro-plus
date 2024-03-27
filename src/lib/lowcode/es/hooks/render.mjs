import { computed as d, h as f, resolveComponent as A } from "vue";
import { defineComponent as $ } from "@vue/composition-api";
import N from "./global.mjs";
import U from "./widget.mjs";
function L({ props: a }) {
  const { executeGlobalEvent: m, executeGlobalAction: v } = N({ props: a }), { getPropValue: b } = U({ props: a });
  let r = null;
  const p = d(() => a.widgets), s = d(() => a.globalConfig), h = function(o, l) {
    let e = {};
    for (let t in l.props)
      e[t] = b(l.props[t], o);
    return e;
  }, g = function(o, l) {
    let e = {};
    for (let t of l.events || []) {
      let c = `on${t.name.charAt(0).toUpperCase() + t.name.slice(1)}`, i = ["// 执行组件绑定的自定义事件"];
      if (t.code && i.push(t.code), t.action) {
        let x = t.action.filter((n) => n.includes("$globalActions")).map((n) => `this.executeGlobalAction('${n.split(".")[1]}');`), G = t.action.filter((n) => !n.includes("$globalActions")).map((n) => `this.$refs.${n && n.split(".")[0]} && this.$refs.${n}();`);
        i = i.concat(`
// 执行组件绑定的全局动作代码`).concat(x).concat(`
// 执行组件绑定的组件动作方法`).concat(G);
      }
      e[c] = new Function(t.args, i.join(`
`)).bind(o), console.log("events[eventName]", e[c]);
    }
    return e;
  }, u = function(o, l) {
    return l.map((e) => {
      let t = A(e.type + "-widget"), c = h(o, e), i = g(o, e);
      return f(
        t,
        {
          ref: e.id,
          widget: e,
          ...c,
          ...i
        },
        { default: () => u(o, e.widgets) }
      );
    });
  };
  return $({
    mounted() {
      r = this, this.executeGlobalEvent("onMounted", this);
    },
    updated() {
      this.executeGlobalEvent("onUpdated", this);
    },
    unmounted() {
      this.executeGlobalEvent("onUnmounted", this);
    },
    beforeMount() {
      this.executeGlobalEvent("onBeforeMount", this);
    },
    beforeUpdate() {
      this.executeGlobalEvent("onBeforeUpdate", this);
    },
    beforeUnmount() {
      this.executeGlobalEvent("onBeforeUnmount", this);
    },
    activated() {
      this.executeGlobalEvent("onActivated", this);
    },
    deactivated() {
      this.executeGlobalEvent("onDeactivated", this);
    },
    methods: {
      executeGlobalEvent: (o) => m(s.value.globalEvents, o, r, s.value.globalVars),
      executeGlobalAction: (o) => v(s.value.globalActions, o, r, s.value.globalVars)
    },
    // 渲染函数
    render() {
      return f("div", {}, { default: () => u(this, p.value) });
    }
  });
}
export {
  L as default
};
