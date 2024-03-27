import { computed as d, watchEffect as m } from "vue";
import b from "./global.mjs";
import v from "./data-sources.mjs";
function y({ props: l, emits: a }) {
  const { executeGlobalFn: i } = b({ props: l, emits: a }), { requestData: r } = v({ props: l, emits: a }), o = d(() => l.globalConfig || {}), f = function(e) {
    let t = this;
    if (e.includes("$globalVars"))
      return new Function("$globalVars", `return ${e}`)(o.value.globalVars);
    if (e.includes("$globalFns")) {
      let n = e.split(".")[1];
      return i(o.value.globalFns, n, t, o.value.globalVars);
    } else if (e.includes("$dataSources")) {
      let n = e.split(".")[1], c = null;
      return m(async () => {
        c = await r(
          n,
          {
            myId: 123,
            myName: "myName"
          },
          t
        );
      }), c;
    } else
      return e;
  }, u = function(e, t) {
    return e.events.find((n) => n.name === t);
  }, g = function(e, t) {
    let n = u(e, t);
    return new Function(...n.args, n.code)(e);
  }, s = function(e, t) {
    return e.actions.find((n) => n.name === t);
  };
  return {
    // 组件属性
    getPropValue: f,
    // 组件事件
    getEvent: u,
    executeEvent: g,
    // 组件动作
    getAction: s,
    executeAction: function(e, t) {
      let n = s(e, t);
      return n && new Function("widget", n.code);
    }
  };
}
export {
  y as default
};
