import { computed as d, getCurrentInstance as f } from "vue";
function p({ props: r, emits: b }) {
  d(() => r.globalConfig || {});
  const a = function(t, n) {
    return t.find((e) => e.name === n);
  }, s = function(t, n, e, o) {
    let l = i(t, n);
    return new Function("$globalVars", l.code).bind(e, o)();
  }, i = function(t, n) {
    return t.find((e) => e.name === n);
  }, g = function(t, n, e, o) {
    let l = i(t, n);
    return new Function("$globalVars", l.code).bind(e, o)();
  }, c = function(t, n) {
    return t.find((e) => e.name === n);
  };
  return {
    // 全局函数
    getGlobalFn: a,
    executeGlobalFn: s,
    // 全局动作
    getGlobalAction: c,
    executeGlobalAction: function(t, n, e, o) {
      let l = c(t, n);
      return new Function("$globalVars", l.code).bind(e, o)();
    },
    // 全局事件
    getGlobalEvent: i,
    executeGlobalEvent: g,
    // 全局组件列表
    getFlatWidgets: function() {
      const t = (n) => {
        let e = [];
        for (let o of n)
          if (o.widgets && !o.widgets.length && delete o.widgets, e.push(o), o.widgets && o.widgets.length) {
            let l = t(o.widgets);
            l && e.push(...l);
          }
        return e;
      };
      return t(r.designer.widgets);
    },
    // 全局挂载变量
    getGlobalProperties: function() {
      const { proxy: t } = f();
      return t;
    }
  };
}
export {
  p as default
};
