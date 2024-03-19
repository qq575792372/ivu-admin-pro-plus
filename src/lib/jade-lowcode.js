import { computed as k, getCurrentInstance as le, watchEffect as gn, openBlock as D, createElementBlock as A, getCurrentScope as pn, onScopeDispose as hn, unref as y, onMounted as wt, nextTick as Oe, watch as me, ref as B, defineComponent as G, createElementVNode as Y, warn as vn, inject as te, shallowRef as Be, mergeProps as Le, renderSlot as ee, toRef as rt, onUnmounted as mn, useAttrs as bn, useSlots as Vt, createCommentVNode as R, Fragment as Ue, normalizeClass as P, createBlock as z, withCtx as ue, resolveDynamicComponent as he, withModifiers as yn, createVNode as Ht, toDisplayString as $e, normalizeStyle as _n, Text as wn, provide as Sn, reactive as xn, createTextVNode as Wt, useCssVars as On, h as Et, resolveComponent as Mn } from "vue";
function St({ props: t, emits: i }) {
  k(() => t.globalConfig || {});
  const o = function(h, v) {
    return h.find((x) => x.name === v);
  }, s = function(h, v, x, S) {
    let I = c(h, v);
    return new Function("$globalVars", I.code).bind(x, S)();
  }, c = function(h, v) {
    return h.find((x) => x.name === v);
  }, f = function(h, v, x, S) {
    let I = c(h, v);
    return new Function("$globalVars", I.code).bind(x, S)();
  }, d = function(h, v) {
    return h.find((x) => x.name === v);
  };
  return {
    // 全局函数
    getGlobalFn: o,
    executeGlobalFn: s,
    // 全局动作
    getGlobalAction: d,
    executeGlobalAction: function(h, v, x, S) {
      let I = d(h, v);
      return new Function("$globalVars", I.code).bind(x, S)();
    },
    // 全局事件
    getGlobalEvent: c,
    executeGlobalEvent: f,
    // 全局组件列表
    getFlatWidgets: function() {
      const h = (v) => {
        let x = [];
        for (let S of v)
          if (S.widgets && !S.widgets.length && delete S.widgets, x.push(S), S.widgets && S.widgets.length) {
            let I = h(S.widgets);
            I && x.push(...I);
          }
        return x;
      };
      return h(t.designer.widgets);
    },
    // 全局挂载变量
    getGlobalProperties: function() {
      const { proxy: h } = le();
      return h;
    }
  };
}
function $n({ props: t, emits: i }) {
  const { getGlobalProperties: o } = St({ props: t, emits: i }), { $request: s, $message: c } = o(), f = k(() => t.globalConfig.dataSources), d = k(() => t.globalConfig || {}), m = async function(v, x = {}, S) {
    let I = O(v);
    try {
      let p = M(I, x, S, d.value.globalVars), C = await s.request(p);
      return new Function("result", "DSV", "$globalVars", I.responseCode).bind(S).call(null, C, x, d.value.globalVars);
    } catch (p) {
      new Function(
        "error",
        "DSV",
        "$globalVars",
        "$message",
        I.responseErrorCode
      ).bind(S).call(null, p, x, d.value.globalVars, c);
    }
  }, O = function(v) {
    return f.value.find((x) => x.name === v);
  }, M = function(v, x = {}, S, I) {
    let p = {};
    if (v.urlType === "String")
      p.url = String(v.url);
    else if (v.urlType === "VarFx") {
      let re = new Function("DSV", "$globalVars", "return " + String(v.url)).bind(S);
      p.url = re(x, I);
    }
    p.method = v.method;
    let C = h(v.headers, x, S, I);
    C && (p.headers = C);
    let E = h(v.params, x, S, I);
    E && (p.params = E);
    let F = h(v.data, x, S, I);
    return F && (p.data = F), new Function("config", "DSV", "$globalVars", v.requestCode).bind(S).call(null, p, x, I);
  }, h = function(v, x = {}, S, I) {
    if (!v || v.length <= 0)
      return;
    let p = {};
    for (let C of v)
      if (C.type === "String")
        p[C.name] = String(C.value);
      else if (C.type === "Number")
        p[C.name] = Number(C.value);
      else if (C.type === "Boolean")
        p[C.name] = !!C.value;
      else if (C.type === "VarFx") {
        let E = new Function("DSV", "$globalVars", "return " + C.value).bind(S);
        p[C.name] = E(x, I);
      } else {
        console.error("data source not support type!");
        return;
      }
    return p;
  };
  return {
    requestData: m
  };
}
function Cn({ props: t, emits: i }) {
  const { executeGlobalFn: o } = St({ props: t, emits: i }), { requestData: s } = $n({ props: t, emits: i }), c = k(() => t.globalConfig || {}), f = function(h) {
    let v = this;
    if (h.includes("$globalVars"))
      return new Function("$globalVars", `return ${h}`)(c.value.globalVars);
    if (h.includes("$globalFns")) {
      let x = h.split(".")[1];
      return o(c.value.globalFns, x, v, c.value.globalVars);
    } else if (h.includes("$dataSources")) {
      let x = h.split(".")[1], S = null;
      return gn(async () => {
        S = await s(
          x,
          {
            myId: 123,
            myName: "myName"
          },
          v
        );
      }), S;
    } else
      return h;
  }, d = function(h, v) {
    return h.events.find((x) => x.name === v);
  }, m = function(h, v) {
    let x = d(h, v);
    return new Function(...x.args, x.code)(h);
  }, O = function(h, v) {
    return h.actions.find((x) => x.name === v);
  };
  return {
    // 组件属性
    getPropValue: f,
    // 组件事件
    getEvent: d,
    executeEvent: m,
    // 组件动作
    getAction: O,
    executeAction: function(h, v) {
      let x = O(h, v);
      return x && new Function("widget", x.code);
    }
  };
}
const En = /* @__PURE__ */ Object.assign({
  name: "HospPersonManageBaseInfoSetsWidget"
}, {
  __name: "index",
  setup(t) {
    return (i, o) => (D(), A("div", null, "test"));
  }
}), Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: En
}, Symbol.toStringTag, { value: "Module" }));
var Dt;
const Ve = typeof window < "u", In = (t) => typeof t == "string", Nn = () => {
};
Ve && ((Dt = window == null ? void 0 : window.navigator) != null && Dt.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function kn(t) {
  return typeof t == "function" ? t() : y(t);
}
function An(t) {
  return t;
}
function Yt(t) {
  return pn() ? (hn(t), !0) : !1;
}
function Fn(t, i = !0) {
  le() ? wt(t) : i ? t() : Oe(t);
}
function Gt(t) {
  var i;
  const o = kn(t);
  return (i = o == null ? void 0 : o.$el) != null ? i : o;
}
const qt = Ve ? window : void 0;
function jn(...t) {
  let i, o, s, c;
  if (In(t[0]) || Array.isArray(t[0]) ? ([o, s, c] = t, i = qt) : [i, o, s, c] = t, !i)
    return Nn;
  Array.isArray(o) || (o = [o]), Array.isArray(s) || (s = [s]);
  const f = [], d = () => {
    f.forEach((h) => h()), f.length = 0;
  }, m = (h, v, x) => (h.addEventListener(v, x, c), () => h.removeEventListener(v, x, c)), O = me(() => Gt(i), (h) => {
    d(), h && f.push(...o.flatMap((v) => s.map((x) => m(h, v, x))));
  }, { immediate: !0, flush: "post" }), M = () => {
    O(), d();
  };
  return Yt(M), M;
}
function Tn(t, i = !1) {
  const o = B(), s = () => o.value = !!t();
  return s(), Fn(s, i), o;
}
const It = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Nt = "__vueuse_ssr_handlers__";
It[Nt] = It[Nt] || {};
var kt = Object.getOwnPropertySymbols, Rn = Object.prototype.hasOwnProperty, Pn = Object.prototype.propertyIsEnumerable, zn = (t, i) => {
  var o = {};
  for (var s in t)
    Rn.call(t, s) && i.indexOf(s) < 0 && (o[s] = t[s]);
  if (t != null && kt)
    for (var s of kt(t))
      i.indexOf(s) < 0 && Pn.call(t, s) && (o[s] = t[s]);
  return o;
};
function Bn(t, i, o = {}) {
  const s = o, { window: c = qt } = s, f = zn(s, ["window"]);
  let d;
  const m = Tn(() => c && "ResizeObserver" in c), O = () => {
    d && (d.disconnect(), d = void 0);
  }, M = me(() => Gt(t), (v) => {
    O(), m.value && c && v && (d = new ResizeObserver(i), d.observe(v, f));
  }, { immediate: !0, flush: "post" }), h = () => {
    O(), M();
  };
  return Yt(h), {
    isSupported: m,
    stop: h
  };
}
var At;
(function(t) {
  t.UP = "UP", t.RIGHT = "RIGHT", t.DOWN = "DOWN", t.LEFT = "LEFT", t.NONE = "NONE";
})(At || (At = {}));
var Ln = Object.defineProperty, Ft = Object.getOwnPropertySymbols, Un = Object.prototype.hasOwnProperty, Vn = Object.prototype.propertyIsEnumerable, jt = (t, i, o) => i in t ? Ln(t, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[i] = o, Hn = (t, i) => {
  for (var o in i || (i = {}))
    Un.call(i, o) && jt(t, o, i[o]);
  if (Ft)
    for (var o of Ft(i))
      Vn.call(i, o) && jt(t, o, i[o]);
  return t;
};
const Wn = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Hn({
  linear: An
}, Wn);
const Yn = () => Ve && /firefox/i.test(window.navigator.userAgent);
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Kt = () => {
}, Gn = Object.prototype.hasOwnProperty, Tt = (t, i) => Gn.call(t, i), qn = (t) => typeof t == "function", Fe = (t) => typeof t == "string", ot = (t) => t !== null && typeof t == "object";
function Zt(t) {
  for (var i = -1, o = t == null ? 0 : t.length, s = {}; ++i < o; ) {
    var c = t[i];
    s[c[0]] = c[1];
  }
  return s;
}
function Kn(t) {
  return t == null;
}
const Zn = (t) => t === void 0, vt = (t) => typeof t == "number", Qn = (t) => Fe(t) ? !Number.isNaN(Number(t)) : !1;
class Jn extends Error {
  constructor(i) {
    super(i), this.name = "ElementPlusError";
  }
}
function Ee(t, i) {
  if (process.env.NODE_ENV !== "production") {
    const o = Fe(t) ? new Jn(`[${t}] ${i}`) : t;
    console.warn(o);
  }
}
const Xn = "utils/dom/style";
function er(t, i = "px") {
  if (!t)
    return "";
  if (vt(t) || Qn(t))
    return `${t}${i}`;
  if (Fe(t))
    return t;
  Ee(Xn, "binding value must be a string or number");
}
/*! Element Plus Icons Vue v2.3.1 */
var tr = /* @__PURE__ */ G({
  name: "CircleCheck",
  __name: "circle-check",
  setup(t) {
    return (i, o) => (D(), A("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Y("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      Y("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
      })
    ]));
  }
}), nr = tr, rr = /* @__PURE__ */ G({
  name: "CircleClose",
  __name: "circle-close",
  setup(t) {
    return (i, o) => (D(), A("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Y("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      Y("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), Qt = rr, or = /* @__PURE__ */ G({
  name: "Hide",
  __name: "hide",
  setup(t) {
    return (i, o) => (D(), A("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Y("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
      }),
      Y("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
      })
    ]));
  }
}), ar = or, ir = /* @__PURE__ */ G({
  name: "Loading",
  __name: "loading",
  setup(t) {
    return (i, o) => (D(), A("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Y("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
      })
    ]));
  }
}), Jt = ir, sr = /* @__PURE__ */ G({
  name: "View",
  __name: "view",
  setup(t) {
    return (i, o) => (D(), A("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      Y("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), ur = sr;
const Xt = "__epPropKey", je = (t) => t, lr = (t) => ot(t) && !!t[Xt], en = (t, i) => {
  if (!ot(t) || lr(t))
    return t;
  const { values: o, required: s, default: c, type: f, validator: d } = t, O = {
    type: f,
    required: !!s,
    validator: o || d ? (M) => {
      let h = !1, v = [];
      if (o && (v = Array.from(o), Tt(t, "default") && v.push(c), h || (h = v.includes(M))), d && (h || (h = d(M))), !h && v.length > 0) {
        const x = [...new Set(v)].map((S) => JSON.stringify(S)).join(", ");
        vn(`Invalid prop: validation failed${i ? ` for prop "${i}"` : ""}. Expected one of [${x}], got value ${JSON.stringify(M)}.`);
      }
      return h;
    } : void 0,
    [Xt]: !0
  };
  return Tt(t, "default") && (O.default = c), O;
}, xt = (t) => Zt(Object.entries(t).map(([i, o]) => [
  i,
  en(o, i)
])), at = je([
  String,
  Object,
  Function
]), cr = {
  validating: Jt,
  success: nr,
  error: Qt
}, Ot = (t, i) => {
  if (t.install = (o) => {
    for (const s of [t, ...Object.values(i ?? {})])
      o.component(s.name, s);
  }, i)
    for (const [o, s] of Object.entries(i))
      t[o] = s;
  return t;
}, fr = (t) => (t.install = Kt, t), mt = "update:modelValue", dr = ["", "default", "small", "large"], gr = (t) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(t), pr = (t) => t, hr = ["class", "style"], vr = /^on[A-Z]/, mr = (t = {}) => {
  const { excludeListeners: i = !1, excludeKeys: o } = t, s = k(() => ((o == null ? void 0 : o.value) || []).concat(hr)), c = le();
  return c ? k(() => {
    var f;
    return Zt(Object.entries((f = c.proxy) == null ? void 0 : f.$attrs).filter(([d]) => !s.value.includes(d) && !(i && vr.test(d))));
  }) : (Ee("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function"), k(() => ({})));
}, br = ({ from: t, replacement: i, scope: o, version: s, ref: c, type: f = "API" }, d) => {
  me(() => y(d), (m) => {
    m && Ee(o, `[${f}] ${t} is about to be deprecated in version ${s}, please use ${i} instead.
For more detail, please visit: ${c}
`);
  }, {
    immediate: !0
  });
}, dt = "el", yr = "is-", xe = (t, i, o, s, c) => {
  let f = `${t}-${i}`;
  return o && (f += `-${o}`), s && (f += `__${s}`), c && (f += `--${c}`), f;
}, _r = Symbol("namespaceContextKey"), tn = (t) => {
  const i = t || (le() ? te(_r, B(dt)) : B(dt));
  return k(() => y(i) || dt);
}, Te = (t, i) => {
  const o = tn(i);
  return {
    namespace: o,
    b: (p = "") => xe(o.value, t, p, "", ""),
    e: (p) => p ? xe(o.value, t, "", p, "") : "",
    m: (p) => p ? xe(o.value, t, "", "", p) : "",
    be: (p, C) => p && C ? xe(o.value, t, p, C, "") : "",
    em: (p, C) => p && C ? xe(o.value, t, "", p, C) : "",
    bm: (p, C) => p && C ? xe(o.value, t, p, "", C) : "",
    bem: (p, C, E) => p && C && E ? xe(o.value, t, p, C, E) : "",
    is: (p, ...C) => {
      const E = C.length >= 1 ? C[0] : !0;
      return p && E ? `${yr}${p}` : "";
    },
    cssVar: (p) => {
      const C = {};
      for (const E in p)
        p[E] && (C[`--${o.value}-${E}`] = p[E]);
      return C;
    },
    cssVarName: (p) => `--${o.value}-${p}`,
    cssVarBlock: (p) => {
      const C = {};
      for (const E in p)
        p[E] && (C[`--${o.value}-${t}-${E}`] = p[E]);
      return C;
    },
    cssVarBlockName: (p) => `--${o.value}-${t}-${p}`
  };
}, nn = (t) => {
  const i = le();
  return k(() => {
    var o, s;
    return (s = (o = i == null ? void 0 : i.proxy) == null ? void 0 : o.$props) == null ? void 0 : s[t];
  });
}, bt = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, wr = Symbol("elIdInjection"), Sr = () => le() ? te(wr, bt) : bt, xr = (t) => {
  const i = Sr();
  !Ve && i === bt && Ee("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  const o = tn();
  return k(() => y(t) || `${o.value}-id-${i.prefix}-${i.current++}`);
};
function Or(t) {
  const i = B();
  function o() {
    if (t.value == null)
      return;
    const { selectionStart: c, selectionEnd: f, value: d } = t.value;
    if (c == null || f == null)
      return;
    const m = d.slice(0, Math.max(0, c)), O = d.slice(Math.max(0, f));
    i.value = {
      selectionStart: c,
      selectionEnd: f,
      value: d,
      beforeTxt: m,
      afterTxt: O
    };
  }
  function s() {
    if (t.value == null || i.value == null)
      return;
    const { value: c } = t.value, { beforeTxt: f, afterTxt: d, selectionStart: m } = i.value;
    if (f == null || d == null || m == null)
      return;
    let O = c.length;
    if (c.endsWith(d))
      O = c.length - d.length;
    else if (c.startsWith(f))
      O = f.length;
    else {
      const M = f[m - 1], h = c.indexOf(M, m - 1);
      h !== -1 && (O = h + 1);
    }
    t.value.setSelectionRange(O, O);
  }
  return [o, s];
}
const rn = en({
  type: String,
  values: dr,
  required: !1
}), Mr = Symbol("size"), $r = () => {
  const t = te(Mr, {});
  return k(() => y(t.size) || "");
};
function Cr(t, { afterFocus: i, beforeBlur: o, afterBlur: s } = {}) {
  const c = le(), { emit: f } = c, d = Be(), m = B(!1), O = (v) => {
    m.value || (m.value = !0, f("focus", v), i == null || i());
  }, M = (v) => {
    var x;
    qn(o) && o(v) || v.relatedTarget && ((x = d.value) != null && x.contains(v.relatedTarget)) || (m.value = !1, f("blur", v), s == null || s());
  }, h = () => {
    var v;
    (v = t.value) == null || v.focus();
  };
  return me(d, (v) => {
    v && v.setAttribute("tabindex", "-1");
  }), jn(d, "click", h), {
    wrapperRef: d,
    isFocused: m,
    handleFocus: O,
    handleBlur: M
  };
}
const Er = Symbol(), Rt = B();
function Dr(t, i = void 0) {
  const o = le() ? te(Er, Rt) : Rt;
  return t ? k(() => {
    var s, c;
    return (c = (s = o.value) == null ? void 0 : s[t]) != null ? c : i;
  }) : o;
}
var it = (t, i) => {
  const o = t.__vccOpts || t;
  for (const [s, c] of i)
    o[s] = c;
  return o;
};
const Ir = xt({
  size: {
    type: je([Number, String])
  },
  color: {
    type: String
  }
}), Nr = G({
  name: "ElIcon",
  inheritAttrs: !1
}), kr = /* @__PURE__ */ G({
  ...Nr,
  props: Ir,
  setup(t) {
    const i = t, o = Te("icon"), s = k(() => {
      const { size: c, color: f } = i;
      return !c && !f ? {} : {
        fontSize: Zn(c) ? void 0 : er(c),
        "--color": f
      };
    });
    return (c, f) => (D(), A("i", Le({
      class: y(o).b(),
      style: y(s)
    }, c.$attrs), [
      ee(c.$slots, "default")
    ], 16));
  }
});
var Ar = /* @__PURE__ */ it(kr, [["__file", "icon.vue"]]);
const Me = Ot(Ar), Mt = Symbol("formContextKey"), on = Symbol("formItemContextKey"), an = (t, i = {}) => {
  const o = B(void 0), s = i.prop ? o : nn("size"), c = i.global ? o : $r(), f = i.form ? { size: void 0 } : te(Mt, void 0), d = i.formItem ? { size: void 0 } : te(on, void 0);
  return k(() => s.value || y(t) || (d == null ? void 0 : d.size) || (f == null ? void 0 : f.size) || c.value || "");
}, $t = (t) => {
  const i = nn("disabled"), o = te(Mt, void 0);
  return k(() => i.value || y(t) || (o == null ? void 0 : o.disabled) || !1);
}, sn = () => {
  const t = te(Mt, void 0), i = te(on, void 0);
  return {
    form: t,
    formItem: i
  };
}, Fr = (t, {
  formItemContext: i,
  disableIdGeneration: o,
  disableIdManagement: s
}) => {
  o || (o = B(!1)), s || (s = B(!1));
  const c = B();
  let f;
  const d = k(() => {
    var m;
    return !!(!t.label && i && i.inputIds && ((m = i.inputIds) == null ? void 0 : m.length) <= 1);
  });
  return wt(() => {
    f = me([rt(t, "id"), o], ([m, O]) => {
      const M = m ?? (O ? void 0 : xr().value);
      M !== c.value && (i != null && i.removeInputId && (c.value && i.removeInputId(c.value), !(s != null && s.value) && !O && M && i.addInputId(M)), c.value = M);
    }, { immediate: !0 });
  }), mn(() => {
    f && f(), i != null && i.removeInputId && c.value && i.removeInputId(c.value);
  }), {
    isLabeledByFormItem: d,
    inputId: c
  };
};
let Q;
const jr = `
  height:0 !important;
  visibility:hidden !important;
  ${Yn() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`, Tr = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function Rr(t) {
  const i = window.getComputedStyle(t), o = i.getPropertyValue("box-sizing"), s = Number.parseFloat(i.getPropertyValue("padding-bottom")) + Number.parseFloat(i.getPropertyValue("padding-top")), c = Number.parseFloat(i.getPropertyValue("border-bottom-width")) + Number.parseFloat(i.getPropertyValue("border-top-width"));
  return { contextStyle: Tr.map((d) => `${d}:${i.getPropertyValue(d)}`).join(";"), paddingSize: s, borderSize: c, boxSizing: o };
}
function Pt(t, i = 1, o) {
  var s;
  Q || (Q = document.createElement("textarea"), document.body.appendChild(Q));
  const { paddingSize: c, borderSize: f, boxSizing: d, contextStyle: m } = Rr(t);
  Q.setAttribute("style", `${m};${jr}`), Q.value = t.value || t.placeholder || "";
  let O = Q.scrollHeight;
  const M = {};
  d === "border-box" ? O = O + f : d === "content-box" && (O = O - c), Q.value = "";
  const h = Q.scrollHeight - c;
  if (vt(i)) {
    let v = h * i;
    d === "border-box" && (v = v + c + f), O = Math.max(v, O), M.minHeight = `${v}px`;
  }
  if (vt(o)) {
    let v = h * o;
    d === "border-box" && (v = v + c + f), O = Math.min(v, O);
  }
  return M.height = `${O}px`, (s = Q.parentNode) == null || s.removeChild(Q), Q = void 0, M;
}
const Pr = xt({
  id: {
    type: String,
    default: void 0
  },
  size: rn,
  disabled: Boolean,
  modelValue: {
    type: je([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  maxlength: {
    type: [String, Number]
  },
  minlength: {
    type: [String, Number]
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: je([Boolean, Object]),
    default: !1
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: !1
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  showPassword: {
    type: Boolean,
    default: !1
  },
  showWordLimit: {
    type: Boolean,
    default: !1
  },
  suffixIcon: {
    type: at
  },
  prefixIcon: {
    type: at
  },
  containerRole: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  inputStyle: {
    type: je([Object, Array, String]),
    default: () => pr({})
  },
  autofocus: {
    type: Boolean,
    default: !1
  }
}), zr = {
  [mt]: (t) => Fe(t),
  input: (t) => Fe(t),
  change: (t) => Fe(t),
  focus: (t) => t instanceof FocusEvent,
  blur: (t) => t instanceof FocusEvent,
  clear: () => !0,
  mouseleave: (t) => t instanceof MouseEvent,
  mouseenter: (t) => t instanceof MouseEvent,
  keydown: (t) => t instanceof Event,
  compositionstart: (t) => t instanceof CompositionEvent,
  compositionupdate: (t) => t instanceof CompositionEvent,
  compositionend: (t) => t instanceof CompositionEvent
}, Br = ["role"], Lr = ["id", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus"], Ur = ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus"], Vr = G({
  name: "ElInput",
  inheritAttrs: !1
}), Hr = /* @__PURE__ */ G({
  ...Vr,
  props: Pr,
  emits: zr,
  setup(t, { expose: i, emit: o }) {
    const s = t, c = bn(), f = Vt(), d = k(() => {
      const r = {};
      return s.containerRole === "combobox" && (r["aria-haspopup"] = c["aria-haspopup"], r["aria-owns"] = c["aria-owns"], r["aria-expanded"] = c["aria-expanded"]), r;
    }), m = k(() => [
      s.type === "textarea" ? C.b() : p.b(),
      p.m(S.value),
      p.is("disabled", I.value),
      p.is("exceed", st.value),
      {
        [p.b("group")]: f.prepend || f.append,
        [p.bm("group", "append")]: f.append,
        [p.bm("group", "prepend")]: f.prepend,
        [p.m("prefix")]: f.prefix || s.prefixIcon,
        [p.m("suffix")]: f.suffix || s.suffixIcon || s.clearable || s.showPassword,
        [p.bm("suffix", "password-clear")]: H.value && W.value,
        [p.b("hidden")]: s.type === "hidden"
      },
      c.class
    ]), O = k(() => [
      p.e("wrapper"),
      p.is("focus", De.value)
    ]), M = mr({
      excludeKeys: k(() => Object.keys(d.value))
    }), { form: h, formItem: v } = sn(), { inputId: x } = Fr(s, {
      formItemContext: v
    }), S = an(), I = $t(), p = Te("input"), C = Te("textarea"), E = Be(), F = Be(), ne = B(!1), re = B(!1), be = B(!1), He = B(), ye = Be(s.inputStyle), ce = k(() => E.value || F.value), { wrapperRef: We, isFocused: De, handleFocus: fe, handleBlur: K } = Cr(ce, {
      afterBlur() {
        var r;
        s.validateEvent && ((r = v == null ? void 0 : v.validate) == null || r.call(v, "blur").catch((u) => Ee(u)));
      }
    }), Re = k(() => {
      var r;
      return (r = h == null ? void 0 : h.statusIcon) != null ? r : !1;
    }), V = k(() => (v == null ? void 0 : v.validateState) || ""), U = k(() => V.value && cr[V.value]), j = k(() => be.value ? ur : ar), oe = k(() => [
      c.style
    ]), Ie = k(() => [
      s.inputStyle,
      ye.value,
      { resize: s.resize }
    ]), X = k(() => Kn(s.modelValue) ? "" : String(s.modelValue)), H = k(() => s.clearable && !I.value && !s.readonly && !!X.value && (De.value || ne.value)), W = k(() => s.showPassword && !I.value && !s.readonly && !!X.value && (!!X.value || De.value)), de = k(() => s.showWordLimit && !!s.maxlength && (s.type === "text" || s.type === "textarea") && !I.value && !s.readonly && !s.showPassword), _e = k(() => X.value.length), st = k(() => !!de.value && _e.value > Number(s.maxlength)), ut = k(() => !!f.suffix || !!s.suffixIcon || H.value || s.showPassword || de.value || !!V.value && Re.value), [lt, ae] = Or(E);
    Bn(F, (r) => {
      if (ct(), !de.value || s.resize !== "both")
        return;
      const u = r[0], { width: l } = u.contentRect;
      He.value = {
        right: `calc(100% - ${l + 15 + 6}px)`
      };
    });
    const we = () => {
      const { type: r, autosize: u } = s;
      if (!(!Ve || r !== "textarea" || !F.value))
        if (u) {
          const l = ot(u) ? u.minRows : void 0, g = ot(u) ? u.maxRows : void 0, w = Pt(F.value, l, g);
          ye.value = {
            overflowY: "hidden",
            ...w
          }, Oe(() => {
            F.value.offsetHeight, ye.value = w;
          });
        } else
          ye.value = {
            minHeight: Pt(F.value).minHeight
          };
    }, ct = ((r) => {
      let u = !1;
      return () => {
        var l;
        if (u || !s.autosize)
          return;
        ((l = F.value) == null ? void 0 : l.offsetParent) === null || (r(), u = !0);
      };
    })(we), Se = () => {
      const r = ce.value, u = s.formatter ? s.formatter(X.value) : X.value;
      !r || r.value === u || (r.value = u);
    }, Ne = async (r) => {
      lt();
      let { value: u } = r.target;
      if (s.formatter && (u = s.parser ? s.parser(u) : u), !re.value) {
        if (u === X.value) {
          Se();
          return;
        }
        o(mt, u), o("input", u), await Oe(), Se(), ae();
      }
    }, Ge = (r) => {
      o("change", r.target.value);
    }, qe = (r) => {
      o("compositionstart", r), re.value = !0;
    }, ke = (r) => {
      var u;
      o("compositionupdate", r);
      const l = (u = r.target) == null ? void 0 : u.value, g = l[l.length - 1] || "";
      re.value = !gr(g);
    }, Pe = (r) => {
      o("compositionend", r), re.value && (re.value = !1, Ne(r));
    }, Ke = () => {
      be.value = !be.value, Ze();
    }, Ze = async () => {
      var r;
      await Oe(), (r = ce.value) == null || r.focus();
    }, Qe = () => {
      var r;
      return (r = ce.value) == null ? void 0 : r.blur();
    }, ft = (r) => {
      ne.value = !1, o("mouseleave", r);
    }, ze = (r) => {
      ne.value = !0, o("mouseenter", r);
    }, Ae = (r) => {
      o("keydown", r);
    }, e = () => {
      var r;
      (r = ce.value) == null || r.select();
    }, n = () => {
      o(mt, ""), o("change", ""), o("clear"), o("input", "");
    };
    return me(() => s.modelValue, () => {
      var r;
      Oe(() => we()), s.validateEvent && ((r = v == null ? void 0 : v.validate) == null || r.call(v, "change").catch((u) => Ee(u)));
    }), me(X, () => Se()), me(() => s.type, async () => {
      await Oe(), Se(), we();
    }), wt(() => {
      !s.formatter && s.parser && Ee("ElInput", "If you set the parser, you also need to set the formatter."), Se(), Oe(we);
    }), i({
      input: E,
      textarea: F,
      ref: ce,
      textareaStyle: Ie,
      autosize: rt(s, "autosize"),
      focus: Ze,
      blur: Qe,
      select: e,
      clear: n,
      resizeTextarea: we
    }), (r, u) => (D(), A("div", Le(y(d), {
      class: y(m),
      style: y(oe),
      role: r.containerRole,
      onMouseenter: ze,
      onMouseleave: ft
    }), [
      R(" input "),
      r.type !== "textarea" ? (D(), A(Ue, { key: 0 }, [
        R(" prepend slot "),
        r.$slots.prepend ? (D(), A("div", {
          key: 0,
          class: P(y(p).be("group", "prepend"))
        }, [
          ee(r.$slots, "prepend")
        ], 2)) : R("v-if", !0),
        Y("div", {
          ref_key: "wrapperRef",
          ref: We,
          class: P(y(O))
        }, [
          R(" prefix slot "),
          r.$slots.prefix || r.prefixIcon ? (D(), A("span", {
            key: 0,
            class: P(y(p).e("prefix"))
          }, [
            Y("span", {
              class: P(y(p).e("prefix-inner"))
            }, [
              ee(r.$slots, "prefix"),
              r.prefixIcon ? (D(), z(y(Me), {
                key: 0,
                class: P(y(p).e("icon"))
              }, {
                default: ue(() => [
                  (D(), z(he(r.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : R("v-if", !0)
            ], 2)
          ], 2)) : R("v-if", !0),
          Y("input", Le({
            id: y(x),
            ref_key: "input",
            ref: E,
            class: y(p).e("inner")
          }, y(M), {
            minlength: r.minlength,
            maxlength: r.maxlength,
            type: r.showPassword ? be.value ? "text" : "password" : r.type,
            disabled: y(I),
            readonly: r.readonly,
            autocomplete: r.autocomplete,
            tabindex: r.tabindex,
            "aria-label": r.label,
            placeholder: r.placeholder,
            style: r.inputStyle,
            form: r.form,
            autofocus: r.autofocus,
            onCompositionstart: qe,
            onCompositionupdate: ke,
            onCompositionend: Pe,
            onInput: Ne,
            onFocus: u[0] || (u[0] = (...l) => y(fe) && y(fe)(...l)),
            onBlur: u[1] || (u[1] = (...l) => y(K) && y(K)(...l)),
            onChange: Ge,
            onKeydown: Ae
          }), null, 16, Lr),
          R(" suffix slot "),
          y(ut) ? (D(), A("span", {
            key: 1,
            class: P(y(p).e("suffix"))
          }, [
            Y("span", {
              class: P(y(p).e("suffix-inner"))
            }, [
              !y(H) || !y(W) || !y(de) ? (D(), A(Ue, { key: 0 }, [
                ee(r.$slots, "suffix"),
                r.suffixIcon ? (D(), z(y(Me), {
                  key: 0,
                  class: P(y(p).e("icon"))
                }, {
                  default: ue(() => [
                    (D(), z(he(r.suffixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : R("v-if", !0)
              ], 64)) : R("v-if", !0),
              y(H) ? (D(), z(y(Me), {
                key: 1,
                class: P([y(p).e("icon"), y(p).e("clear")]),
                onMousedown: yn(y(Kt), ["prevent"]),
                onClick: n
              }, {
                default: ue(() => [
                  Ht(y(Qt))
                ]),
                _: 1
              }, 8, ["class", "onMousedown"])) : R("v-if", !0),
              y(W) ? (D(), z(y(Me), {
                key: 2,
                class: P([y(p).e("icon"), y(p).e("password")]),
                onClick: Ke
              }, {
                default: ue(() => [
                  (D(), z(he(y(j))))
                ]),
                _: 1
              }, 8, ["class"])) : R("v-if", !0),
              y(de) ? (D(), A("span", {
                key: 3,
                class: P(y(p).e("count"))
              }, [
                Y("span", {
                  class: P(y(p).e("count-inner"))
                }, $e(y(_e)) + " / " + $e(r.maxlength), 3)
              ], 2)) : R("v-if", !0),
              y(V) && y(U) && y(Re) ? (D(), z(y(Me), {
                key: 4,
                class: P([
                  y(p).e("icon"),
                  y(p).e("validateIcon"),
                  y(p).is("loading", y(V) === "validating")
                ])
              }, {
                default: ue(() => [
                  (D(), z(he(y(U))))
                ]),
                _: 1
              }, 8, ["class"])) : R("v-if", !0)
            ], 2)
          ], 2)) : R("v-if", !0)
        ], 2),
        R(" append slot "),
        r.$slots.append ? (D(), A("div", {
          key: 1,
          class: P(y(p).be("group", "append"))
        }, [
          ee(r.$slots, "append")
        ], 2)) : R("v-if", !0)
      ], 64)) : (D(), A(Ue, { key: 1 }, [
        R(" textarea "),
        Y("textarea", Le({
          id: y(x),
          ref_key: "textarea",
          ref: F,
          class: y(C).e("inner")
        }, y(M), {
          minlength: r.minlength,
          maxlength: r.maxlength,
          tabindex: r.tabindex,
          disabled: y(I),
          readonly: r.readonly,
          autocomplete: r.autocomplete,
          style: y(Ie),
          "aria-label": r.label,
          placeholder: r.placeholder,
          form: r.form,
          autofocus: r.autofocus,
          onCompositionstart: qe,
          onCompositionupdate: ke,
          onCompositionend: Pe,
          onInput: Ne,
          onFocus: u[2] || (u[2] = (...l) => y(fe) && y(fe)(...l)),
          onBlur: u[3] || (u[3] = (...l) => y(K) && y(K)(...l)),
          onChange: Ge,
          onKeydown: Ae
        }), null, 16, Ur),
        y(de) ? (D(), A("span", {
          key: 0,
          style: _n(He.value),
          class: P(y(p).e("count"))
        }, $e(y(_e)) + " / " + $e(r.maxlength), 7)) : R("v-if", !0)
      ], 64))
    ], 16, Br));
  }
});
var Wr = /* @__PURE__ */ it(Hr, [["__file", "input.vue"]]);
const un = Ot(Wr), ln = Symbol("buttonGroupContextKey"), Yr = (t, i) => {
  br({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, k(() => t.type === "text"));
  const o = te(ln, void 0), s = Dr("button"), { form: c } = sn(), f = an(k(() => o == null ? void 0 : o.size)), d = $t(), m = B(), O = Vt(), M = k(() => t.type || (o == null ? void 0 : o.type) || ""), h = k(() => {
    var I, p, C;
    return (C = (p = t.autoInsertSpace) != null ? p : (I = s.value) == null ? void 0 : I.autoInsertSpace) != null ? C : !1;
  }), v = k(() => t.tag === "button" ? {
    ariaDisabled: d.value || t.loading,
    disabled: d.value || t.loading,
    autofocus: t.autofocus,
    type: t.nativeType
  } : {}), x = k(() => {
    var I;
    const p = (I = O.default) == null ? void 0 : I.call(O);
    if (h.value && (p == null ? void 0 : p.length) === 1) {
      const C = p[0];
      if ((C == null ? void 0 : C.type) === wn) {
        const E = C.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(E.trim());
      }
    }
    return !1;
  });
  return {
    _disabled: d,
    _size: f,
    _type: M,
    _ref: m,
    _props: v,
    shouldAddSpace: x,
    handleClick: (I) => {
      t.nativeType === "reset" && (c == null || c.resetFields()), i("click", I);
    }
  };
}, Gr = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], qr = ["button", "submit", "reset"], yt = xt({
  size: rn,
  disabled: Boolean,
  type: {
    type: String,
    values: Gr,
    default: ""
  },
  icon: {
    type: at
  },
  nativeType: {
    type: String,
    values: qr,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: at,
    default: () => Jt
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: je([String, Object]),
    default: "button"
  }
}), Kr = {
  click: (t) => t instanceof MouseEvent
};
function L(t, i) {
  Zr(t) && (t = "100%");
  var o = Qr(t);
  return t = i === 360 ? t : Math.min(i, Math.max(0, parseFloat(t))), o && (t = parseInt(String(t * i), 10) / 100), Math.abs(t - i) < 1e-6 ? 1 : (i === 360 ? t = (t < 0 ? t % i + i : t % i) / parseFloat(String(i)) : t = t % i / parseFloat(String(i)), t);
}
function tt(t) {
  return Math.min(1, Math.max(0, t));
}
function Zr(t) {
  return typeof t == "string" && t.indexOf(".") !== -1 && parseFloat(t) === 1;
}
function Qr(t) {
  return typeof t == "string" && t.indexOf("%") !== -1;
}
function cn(t) {
  return t = parseFloat(t), (isNaN(t) || t < 0 || t > 1) && (t = 1), t;
}
function nt(t) {
  return t <= 1 ? "".concat(Number(t) * 100, "%") : t;
}
function Ce(t) {
  return t.length === 1 ? "0" + t : String(t);
}
function Jr(t, i, o) {
  return {
    r: L(t, 255) * 255,
    g: L(i, 255) * 255,
    b: L(o, 255) * 255
  };
}
function zt(t, i, o) {
  t = L(t, 255), i = L(i, 255), o = L(o, 255);
  var s = Math.max(t, i, o), c = Math.min(t, i, o), f = 0, d = 0, m = (s + c) / 2;
  if (s === c)
    d = 0, f = 0;
  else {
    var O = s - c;
    switch (d = m > 0.5 ? O / (2 - s - c) : O / (s + c), s) {
      case t:
        f = (i - o) / O + (i < o ? 6 : 0);
        break;
      case i:
        f = (o - t) / O + 2;
        break;
      case o:
        f = (t - i) / O + 4;
        break;
    }
    f /= 6;
  }
  return { h: f, s: d, l: m };
}
function gt(t, i, o) {
  return o < 0 && (o += 1), o > 1 && (o -= 1), o < 1 / 6 ? t + (i - t) * (6 * o) : o < 1 / 2 ? i : o < 2 / 3 ? t + (i - t) * (2 / 3 - o) * 6 : t;
}
function Xr(t, i, o) {
  var s, c, f;
  if (t = L(t, 360), i = L(i, 100), o = L(o, 100), i === 0)
    c = o, f = o, s = o;
  else {
    var d = o < 0.5 ? o * (1 + i) : o + i - o * i, m = 2 * o - d;
    s = gt(m, d, t + 1 / 3), c = gt(m, d, t), f = gt(m, d, t - 1 / 3);
  }
  return { r: s * 255, g: c * 255, b: f * 255 };
}
function Bt(t, i, o) {
  t = L(t, 255), i = L(i, 255), o = L(o, 255);
  var s = Math.max(t, i, o), c = Math.min(t, i, o), f = 0, d = s, m = s - c, O = s === 0 ? 0 : m / s;
  if (s === c)
    f = 0;
  else {
    switch (s) {
      case t:
        f = (i - o) / m + (i < o ? 6 : 0);
        break;
      case i:
        f = (o - t) / m + 2;
        break;
      case o:
        f = (t - i) / m + 4;
        break;
    }
    f /= 6;
  }
  return { h: f, s: O, v: d };
}
function eo(t, i, o) {
  t = L(t, 360) * 6, i = L(i, 100), o = L(o, 100);
  var s = Math.floor(t), c = t - s, f = o * (1 - i), d = o * (1 - c * i), m = o * (1 - (1 - c) * i), O = s % 6, M = [o, d, f, f, m, o][O], h = [m, o, o, d, f, f][O], v = [f, f, m, o, o, d][O];
  return { r: M * 255, g: h * 255, b: v * 255 };
}
function Lt(t, i, o, s) {
  var c = [
    Ce(Math.round(t).toString(16)),
    Ce(Math.round(i).toString(16)),
    Ce(Math.round(o).toString(16))
  ];
  return s && c[0].startsWith(c[0].charAt(1)) && c[1].startsWith(c[1].charAt(1)) && c[2].startsWith(c[2].charAt(1)) ? c[0].charAt(0) + c[1].charAt(0) + c[2].charAt(0) : c.join("");
}
function to(t, i, o, s, c) {
  var f = [
    Ce(Math.round(t).toString(16)),
    Ce(Math.round(i).toString(16)),
    Ce(Math.round(o).toString(16)),
    Ce(no(s))
  ];
  return c && f[0].startsWith(f[0].charAt(1)) && f[1].startsWith(f[1].charAt(1)) && f[2].startsWith(f[2].charAt(1)) && f[3].startsWith(f[3].charAt(1)) ? f[0].charAt(0) + f[1].charAt(0) + f[2].charAt(0) + f[3].charAt(0) : f.join("");
}
function no(t) {
  return Math.round(parseFloat(t) * 255).toString(16);
}
function Ut(t) {
  return q(t) / 255;
}
function q(t) {
  return parseInt(t, 16);
}
function ro(t) {
  return {
    r: t >> 16,
    g: (t & 65280) >> 8,
    b: t & 255
  };
}
var _t = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function oo(t) {
  var i = { r: 0, g: 0, b: 0 }, o = 1, s = null, c = null, f = null, d = !1, m = !1;
  return typeof t == "string" && (t = so(t)), typeof t == "object" && (se(t.r) && se(t.g) && se(t.b) ? (i = Jr(t.r, t.g, t.b), d = !0, m = String(t.r).substr(-1) === "%" ? "prgb" : "rgb") : se(t.h) && se(t.s) && se(t.v) ? (s = nt(t.s), c = nt(t.v), i = eo(t.h, s, c), d = !0, m = "hsv") : se(t.h) && se(t.s) && se(t.l) && (s = nt(t.s), f = nt(t.l), i = Xr(t.h, s, f), d = !0, m = "hsl"), Object.prototype.hasOwnProperty.call(t, "a") && (o = t.a)), o = cn(o), {
    ok: d,
    format: t.format || m,
    r: Math.min(255, Math.max(i.r, 0)),
    g: Math.min(255, Math.max(i.g, 0)),
    b: Math.min(255, Math.max(i.b, 0)),
    a: o
  };
}
var ao = "[-\\+]?\\d+%?", io = "[-\\+]?\\d*\\.\\d+%?", ve = "(?:".concat(io, ")|(?:").concat(ao, ")"), pt = "[\\s|\\(]+(".concat(ve, ")[,|\\s]+(").concat(ve, ")[,|\\s]+(").concat(ve, ")\\s*\\)?"), ht = "[\\s|\\(]+(".concat(ve, ")[,|\\s]+(").concat(ve, ")[,|\\s]+(").concat(ve, ")[,|\\s]+(").concat(ve, ")\\s*\\)?"), J = {
  CSS_UNIT: new RegExp(ve),
  rgb: new RegExp("rgb" + pt),
  rgba: new RegExp("rgba" + ht),
  hsl: new RegExp("hsl" + pt),
  hsla: new RegExp("hsla" + ht),
  hsv: new RegExp("hsv" + pt),
  hsva: new RegExp("hsva" + ht),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function so(t) {
  if (t = t.trim().toLowerCase(), t.length === 0)
    return !1;
  var i = !1;
  if (_t[t])
    t = _t[t], i = !0;
  else if (t === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var o = J.rgb.exec(t);
  return o ? { r: o[1], g: o[2], b: o[3] } : (o = J.rgba.exec(t), o ? { r: o[1], g: o[2], b: o[3], a: o[4] } : (o = J.hsl.exec(t), o ? { h: o[1], s: o[2], l: o[3] } : (o = J.hsla.exec(t), o ? { h: o[1], s: o[2], l: o[3], a: o[4] } : (o = J.hsv.exec(t), o ? { h: o[1], s: o[2], v: o[3] } : (o = J.hsva.exec(t), o ? { h: o[1], s: o[2], v: o[3], a: o[4] } : (o = J.hex8.exec(t), o ? {
    r: q(o[1]),
    g: q(o[2]),
    b: q(o[3]),
    a: Ut(o[4]),
    format: i ? "name" : "hex8"
  } : (o = J.hex6.exec(t), o ? {
    r: q(o[1]),
    g: q(o[2]),
    b: q(o[3]),
    format: i ? "name" : "hex"
  } : (o = J.hex4.exec(t), o ? {
    r: q(o[1] + o[1]),
    g: q(o[2] + o[2]),
    b: q(o[3] + o[3]),
    a: Ut(o[4] + o[4]),
    format: i ? "name" : "hex8"
  } : (o = J.hex3.exec(t), o ? {
    r: q(o[1] + o[1]),
    g: q(o[2] + o[2]),
    b: q(o[3] + o[3]),
    format: i ? "name" : "hex"
  } : !1)))))))));
}
function se(t) {
  return !!J.CSS_UNIT.exec(String(t));
}
var uo = (
  /** @class */
  function() {
    function t(i, o) {
      i === void 0 && (i = ""), o === void 0 && (o = {});
      var s;
      if (i instanceof t)
        return i;
      typeof i == "number" && (i = ro(i)), this.originalInput = i;
      var c = oo(i);
      this.originalInput = i, this.r = c.r, this.g = c.g, this.b = c.b, this.a = c.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (s = o.format) !== null && s !== void 0 ? s : c.format, this.gradientType = o.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = c.ok;
    }
    return t.prototype.isDark = function() {
      return this.getBrightness() < 128;
    }, t.prototype.isLight = function() {
      return !this.isDark();
    }, t.prototype.getBrightness = function() {
      var i = this.toRgb();
      return (i.r * 299 + i.g * 587 + i.b * 114) / 1e3;
    }, t.prototype.getLuminance = function() {
      var i = this.toRgb(), o, s, c, f = i.r / 255, d = i.g / 255, m = i.b / 255;
      return f <= 0.03928 ? o = f / 12.92 : o = Math.pow((f + 0.055) / 1.055, 2.4), d <= 0.03928 ? s = d / 12.92 : s = Math.pow((d + 0.055) / 1.055, 2.4), m <= 0.03928 ? c = m / 12.92 : c = Math.pow((m + 0.055) / 1.055, 2.4), 0.2126 * o + 0.7152 * s + 0.0722 * c;
    }, t.prototype.getAlpha = function() {
      return this.a;
    }, t.prototype.setAlpha = function(i) {
      return this.a = cn(i), this.roundA = Math.round(100 * this.a) / 100, this;
    }, t.prototype.toHsv = function() {
      var i = Bt(this.r, this.g, this.b);
      return { h: i.h * 360, s: i.s, v: i.v, a: this.a };
    }, t.prototype.toHsvString = function() {
      var i = Bt(this.r, this.g, this.b), o = Math.round(i.h * 360), s = Math.round(i.s * 100), c = Math.round(i.v * 100);
      return this.a === 1 ? "hsv(".concat(o, ", ").concat(s, "%, ").concat(c, "%)") : "hsva(".concat(o, ", ").concat(s, "%, ").concat(c, "%, ").concat(this.roundA, ")");
    }, t.prototype.toHsl = function() {
      var i = zt(this.r, this.g, this.b);
      return { h: i.h * 360, s: i.s, l: i.l, a: this.a };
    }, t.prototype.toHslString = function() {
      var i = zt(this.r, this.g, this.b), o = Math.round(i.h * 360), s = Math.round(i.s * 100), c = Math.round(i.l * 100);
      return this.a === 1 ? "hsl(".concat(o, ", ").concat(s, "%, ").concat(c, "%)") : "hsla(".concat(o, ", ").concat(s, "%, ").concat(c, "%, ").concat(this.roundA, ")");
    }, t.prototype.toHex = function(i) {
      return i === void 0 && (i = !1), Lt(this.r, this.g, this.b, i);
    }, t.prototype.toHexString = function(i) {
      return i === void 0 && (i = !1), "#" + this.toHex(i);
    }, t.prototype.toHex8 = function(i) {
      return i === void 0 && (i = !1), to(this.r, this.g, this.b, this.a, i);
    }, t.prototype.toHex8String = function(i) {
      return i === void 0 && (i = !1), "#" + this.toHex8(i);
    }, t.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    }, t.prototype.toRgbString = function() {
      var i = Math.round(this.r), o = Math.round(this.g), s = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(i, ", ").concat(o, ", ").concat(s, ")") : "rgba(".concat(i, ", ").concat(o, ", ").concat(s, ", ").concat(this.roundA, ")");
    }, t.prototype.toPercentageRgb = function() {
      var i = function(o) {
        return "".concat(Math.round(L(o, 255) * 100), "%");
      };
      return {
        r: i(this.r),
        g: i(this.g),
        b: i(this.b),
        a: this.a
      };
    }, t.prototype.toPercentageRgbString = function() {
      var i = function(o) {
        return Math.round(L(o, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(i(this.r), "%, ").concat(i(this.g), "%, ").concat(i(this.b), "%)") : "rgba(".concat(i(this.r), "%, ").concat(i(this.g), "%, ").concat(i(this.b), "%, ").concat(this.roundA, ")");
    }, t.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var i = "#" + Lt(this.r, this.g, this.b, !1), o = 0, s = Object.entries(_t); o < s.length; o++) {
        var c = s[o], f = c[0], d = c[1];
        if (i === d)
          return f;
      }
      return !1;
    }, t.prototype.toString = function(i) {
      var o = !!i;
      i = i ?? this.format;
      var s = !1, c = this.a < 1 && this.a >= 0, f = !o && c && (i.startsWith("hex") || i === "name");
      return f ? i === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (i === "rgb" && (s = this.toRgbString()), i === "prgb" && (s = this.toPercentageRgbString()), (i === "hex" || i === "hex6") && (s = this.toHexString()), i === "hex3" && (s = this.toHexString(!0)), i === "hex4" && (s = this.toHex8String(!0)), i === "hex8" && (s = this.toHex8String()), i === "name" && (s = this.toName()), i === "hsl" && (s = this.toHslString()), i === "hsv" && (s = this.toHsvString()), s || this.toHexString());
    }, t.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }, t.prototype.clone = function() {
      return new t(this.toString());
    }, t.prototype.lighten = function(i) {
      i === void 0 && (i = 10);
      var o = this.toHsl();
      return o.l += i / 100, o.l = tt(o.l), new t(o);
    }, t.prototype.brighten = function(i) {
      i === void 0 && (i = 10);
      var o = this.toRgb();
      return o.r = Math.max(0, Math.min(255, o.r - Math.round(255 * -(i / 100)))), o.g = Math.max(0, Math.min(255, o.g - Math.round(255 * -(i / 100)))), o.b = Math.max(0, Math.min(255, o.b - Math.round(255 * -(i / 100)))), new t(o);
    }, t.prototype.darken = function(i) {
      i === void 0 && (i = 10);
      var o = this.toHsl();
      return o.l -= i / 100, o.l = tt(o.l), new t(o);
    }, t.prototype.tint = function(i) {
      return i === void 0 && (i = 10), this.mix("white", i);
    }, t.prototype.shade = function(i) {
      return i === void 0 && (i = 10), this.mix("black", i);
    }, t.prototype.desaturate = function(i) {
      i === void 0 && (i = 10);
      var o = this.toHsl();
      return o.s -= i / 100, o.s = tt(o.s), new t(o);
    }, t.prototype.saturate = function(i) {
      i === void 0 && (i = 10);
      var o = this.toHsl();
      return o.s += i / 100, o.s = tt(o.s), new t(o);
    }, t.prototype.greyscale = function() {
      return this.desaturate(100);
    }, t.prototype.spin = function(i) {
      var o = this.toHsl(), s = (o.h + i) % 360;
      return o.h = s < 0 ? 360 + s : s, new t(o);
    }, t.prototype.mix = function(i, o) {
      o === void 0 && (o = 50);
      var s = this.toRgb(), c = new t(i).toRgb(), f = o / 100, d = {
        r: (c.r - s.r) * f + s.r,
        g: (c.g - s.g) * f + s.g,
        b: (c.b - s.b) * f + s.b,
        a: (c.a - s.a) * f + s.a
      };
      return new t(d);
    }, t.prototype.analogous = function(i, o) {
      i === void 0 && (i = 6), o === void 0 && (o = 30);
      var s = this.toHsl(), c = 360 / o, f = [this];
      for (s.h = (s.h - (c * i >> 1) + 720) % 360; --i; )
        s.h = (s.h + c) % 360, f.push(new t(s));
      return f;
    }, t.prototype.complement = function() {
      var i = this.toHsl();
      return i.h = (i.h + 180) % 360, new t(i);
    }, t.prototype.monochromatic = function(i) {
      i === void 0 && (i = 6);
      for (var o = this.toHsv(), s = o.h, c = o.s, f = o.v, d = [], m = 1 / i; i--; )
        d.push(new t({ h: s, s: c, v: f })), f = (f + m) % 1;
      return d;
    }, t.prototype.splitcomplement = function() {
      var i = this.toHsl(), o = i.h;
      return [
        this,
        new t({ h: (o + 72) % 360, s: i.s, l: i.l }),
        new t({ h: (o + 216) % 360, s: i.s, l: i.l })
      ];
    }, t.prototype.onBackground = function(i) {
      var o = this.toRgb(), s = new t(i).toRgb();
      return new t({
        r: s.r + (o.r - s.r) * o.a,
        g: s.g + (o.g - s.g) * o.a,
        b: s.b + (o.b - s.b) * o.a
      });
    }, t.prototype.triad = function() {
      return this.polyad(3);
    }, t.prototype.tetrad = function() {
      return this.polyad(4);
    }, t.prototype.polyad = function(i) {
      for (var o = this.toHsl(), s = o.h, c = [this], f = 360 / i, d = 1; d < i; d++)
        c.push(new t({ h: (s + d * f) % 360, s: o.s, l: o.l }));
      return c;
    }, t.prototype.equals = function(i) {
      return this.toRgbString() === new t(i).toRgbString();
    }, t;
  }()
);
function pe(t, i = 20) {
  return t.mix("#141414", i).toString();
}
function lo(t) {
  const i = $t(), o = Te("button");
  return k(() => {
    let s = {};
    const c = t.color;
    if (c) {
      const f = new uo(c), d = t.dark ? f.tint(20).toString() : pe(f, 20);
      if (t.plain)
        s = o.cssVarBlock({
          "bg-color": t.dark ? pe(f, 90) : f.tint(90).toString(),
          "text-color": c,
          "border-color": t.dark ? pe(f, 50) : f.tint(50).toString(),
          "hover-text-color": `var(${o.cssVarName("color-white")})`,
          "hover-bg-color": c,
          "hover-border-color": c,
          "active-bg-color": d,
          "active-text-color": `var(${o.cssVarName("color-white")})`,
          "active-border-color": d
        }), i.value && (s[o.cssVarBlockName("disabled-bg-color")] = t.dark ? pe(f, 90) : f.tint(90).toString(), s[o.cssVarBlockName("disabled-text-color")] = t.dark ? pe(f, 50) : f.tint(50).toString(), s[o.cssVarBlockName("disabled-border-color")] = t.dark ? pe(f, 80) : f.tint(80).toString());
      else {
        const m = t.dark ? pe(f, 30) : f.tint(30).toString(), O = f.isDark() ? `var(${o.cssVarName("color-white")})` : `var(${o.cssVarName("color-black")})`;
        if (s = o.cssVarBlock({
          "bg-color": c,
          "text-color": O,
          "border-color": c,
          "hover-bg-color": m,
          "hover-text-color": O,
          "hover-border-color": m,
          "active-bg-color": d,
          "active-border-color": d
        }), i.value) {
          const M = t.dark ? pe(f, 50) : f.tint(50).toString();
          s[o.cssVarBlockName("disabled-bg-color")] = M, s[o.cssVarBlockName("disabled-text-color")] = t.dark ? "rgba(255, 255, 255, 0.5)" : `var(${o.cssVarName("color-white")})`, s[o.cssVarBlockName("disabled-border-color")] = M;
        }
      }
    }
    return s;
  });
}
const co = G({
  name: "ElButton"
}), fo = /* @__PURE__ */ G({
  ...co,
  props: yt,
  emits: Kr,
  setup(t, { expose: i, emit: o }) {
    const s = t, c = lo(s), f = Te("button"), { _ref: d, _size: m, _type: O, _disabled: M, _props: h, shouldAddSpace: v, handleClick: x } = Yr(s, o);
    return i({
      ref: d,
      size: m,
      type: O,
      disabled: M,
      shouldAddSpace: v
    }), (S, I) => (D(), z(he(S.tag), Le({
      ref_key: "_ref",
      ref: d
    }, y(h), {
      class: [
        y(f).b(),
        y(f).m(y(O)),
        y(f).m(y(m)),
        y(f).is("disabled", y(M)),
        y(f).is("loading", S.loading),
        y(f).is("plain", S.plain),
        y(f).is("round", S.round),
        y(f).is("circle", S.circle),
        y(f).is("text", S.text),
        y(f).is("link", S.link),
        y(f).is("has-bg", S.bg)
      ],
      style: y(c),
      onClick: y(x)
    }), {
      default: ue(() => [
        S.loading ? (D(), A(Ue, { key: 0 }, [
          S.$slots.loading ? ee(S.$slots, "loading", { key: 0 }) : (D(), z(y(Me), {
            key: 1,
            class: P(y(f).is("loading"))
          }, {
            default: ue(() => [
              (D(), z(he(S.loadingIcon)))
            ]),
            _: 1
          }, 8, ["class"]))
        ], 64)) : S.icon || S.$slots.icon ? (D(), z(y(Me), { key: 1 }, {
          default: ue(() => [
            S.icon ? (D(), z(he(S.icon), { key: 0 })) : ee(S.$slots, "icon", { key: 1 })
          ]),
          _: 3
        })) : R("v-if", !0),
        S.$slots.default ? (D(), A("span", {
          key: 2,
          class: P({ [y(f).em("text", "expand")]: y(v) })
        }, [
          ee(S.$slots, "default")
        ], 2)) : R("v-if", !0)
      ]),
      _: 3
    }, 16, ["class", "style", "onClick"]));
  }
});
var go = /* @__PURE__ */ it(fo, [["__file", "button.vue"]]);
const po = {
  size: yt.size,
  type: yt.type
}, ho = G({
  name: "ElButtonGroup"
}), vo = /* @__PURE__ */ G({
  ...ho,
  props: po,
  setup(t) {
    const i = t;
    Sn(ln, xn({
      size: rt(i, "size"),
      type: rt(i, "type")
    }));
    const o = Te("button");
    return (s, c) => (D(), A("div", {
      class: P(`${y(o).b("group")}`)
    }, [
      ee(s.$slots, "default")
    ], 2));
  }
});
var fn = /* @__PURE__ */ it(vo, [["__file", "button-group.vue"]]);
const mo = Ot(go, {
  ButtonGroup: fn
});
fr(fn);
var bo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
const yo = /* @__PURE__ */ Object.assign({
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
  setup(t, { emit: i }) {
    const o = i, s = t, c = () => {
      o("custom-click", s.widget);
    };
    return (f, d) => {
      const m = mo;
      return D(), z(m, { onClick: c }, {
        default: ue(() => [
          Wt($e(s.className), 1)
        ]),
        _: 1
      });
    };
  }
}), _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yo
}, Symbol.toStringTag, { value: "Module" })), Z = (t, i) => {
  const o = t.__vccOpts || t;
  for (const [s, c] of i)
    o[s] = c;
  return o;
}, wo = {};
function So(t, i) {
  return D(), A("div", null, "test");
}
const xo = /* @__PURE__ */ Z(wo, [["render", So]]), Oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xo
}, Symbol.toStringTag, { value: "Module" })), Mo = {};
function $o(t, i) {
  return D(), A("div", null, "test");
}
const Co = /* @__PURE__ */ Z(Mo, [["render", $o]]), Eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Co
}, Symbol.toStringTag, { value: "Module" })), Do = /* @__PURE__ */ Object.assign({
  name: "HospPersonManageDeptListTreeWidget"
}, {
  __name: "index",
  setup(t) {
    return (i, o) => (D(), A("div", null, "test"));
  }
}), Io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Do
}, Symbol.toStringTag, { value: "Module" })), No = {};
function ko(t, i) {
  return D(), A("div", null, "test");
}
const Ao = /* @__PURE__ */ Z(No, [["render", ko]]), Fo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ao
}, Symbol.toStringTag, { value: "Module" })), jo = /* @__PURE__ */ Object.assign({
  name: "HospPersonManageExtraInfoSetsWidget"
}, {
  __name: "index",
  setup(t) {
    return (i, o) => (D(), A("div", null, "test"));
  }
}), To = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jo
}, Symbol.toStringTag, { value: "Module" })), Ro = /* @__PURE__ */ Object.assign({
  name: "HospBusinessFlowStepWidget"
}, {
  __name: "index",
  setup(t) {
    return (i, o) => (D(), A("div", null, "test"));
  }
}), Po = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ro
}, Symbol.toStringTag, { value: "Module" })), zo = {};
function Bo(t, i) {
  return D(), A("div", null, "test");
}
const Lo = /* @__PURE__ */ Z(zo, [["render", Bo]]), Uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lo
}, Symbol.toStringTag, { value: "Module" })), Vo = {};
function Ho(t, i) {
  return D(), A("div", null, "form");
}
const Wo = /* @__PURE__ */ Z(Vo, [["render", Ho]]), Yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wo
}, Symbol.toStringTag, { value: "Module" })), Go = /* @__PURE__ */ Object.assign({
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
  setup(t) {
    const i = B(null);
    return (o, s) => {
      const c = un;
      return D(), z(c, {
        modelValue: i.value,
        "onUpdate:modelValue": s[0] || (s[0] = (f) => i.value = f),
        placeholder: "ddd"
      }, null, 8, ["modelValue"]);
    };
  }
}), qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Go
}, Symbol.toStringTag, { value: "Module" })), Ko = /* @__PURE__ */ Object.assign({
  name: "HospBusinessMenuListTreeWidget"
}, {
  __name: "index",
  setup(t) {
    return (i, o) => (D(), A("div", null, "test"));
  }
}), Zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ko
}, Symbol.toStringTag, { value: "Module" })), Qo = {};
function Jo(t, i) {
  return D(), A("div", null, "test");
}
const Xo = /* @__PURE__ */ Z(Qo, [["render", Jo]]), ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xo
}, Symbol.toStringTag, { value: "Module" })), ta = {};
function na(t, i) {
  return D(), A("div", null, "test");
}
const ra = /* @__PURE__ */ Z(ta, [["render", na]]), oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ra
}, Symbol.toStringTag, { value: "Module" })), aa = { class: "simple-container-widget-wrapper" }, ia = /* @__PURE__ */ Object.assign({
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
  setup(t) {
    return (i, o) => (D(), A("div", aa, [
      ee(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), sa = /* @__PURE__ */ Z(ia, [["__scopeId", "data-v-9e5d5336"]]), ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sa
}, Symbol.toStringTag, { value: "Module" })), la = {};
function ca(t, i) {
  return D(), A("div", null, "test");
}
const fa = /* @__PURE__ */ Z(la, [["render", ca]]), da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fa
}, Symbol.toStringTag, { value: "Module" })), ga = {};
function pa(t, i) {
  return D(), A("div", null, "test");
}
const ha = /* @__PURE__ */ Z(ga, [["render", pa]]), va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ha
}, Symbol.toStringTag, { value: "Module" })), ma = /* @__PURE__ */ Object.assign({
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
  setup(t, { expose: i, emit: o }) {
    On((M) => ({
      "8d28301a": d.value
    }));
    const s = o, c = t, f = () => {
      c.widget.props.className = "ddd", s("custom-click", c.className), m();
    }, d = B(14), m = () => {
      d.value = d.value + 2;
    };
    return i({
      changeLargeSize: m,
      changeSmallSize: () => {
        d.value = d.value - 2;
      }
    }), (M, h) => (D(), A("span", { onClick: f }, $e(c.value), 1));
  }
}), ba = /* @__PURE__ */ Z(ma, [["__scopeId", "data-v-02a4a757"]]), ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ba
}, Symbol.toStringTag, { value: "Module" })), _a = {};
function wa(t, i) {
  const o = un;
  return D(), A("div", null, [
    Ht(o, {
      type: "textarea",
      placeholder: "ddd"
    })
  ]);
}
const Sa = /* @__PURE__ */ Z(_a, [["render", wa]]), xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sa
}, Symbol.toStringTag, { value: "Module" }));
function Oa({ props: t }) {
  const { executeGlobalEvent: i, executeGlobalAction: o } = St({ props: t }), { getPropValue: s } = Cn({ props: t });
  let c = null;
  const f = k(() => t.widgets), d = k(() => t.globalConfig), m = function(h, v) {
    let x = {};
    for (let S in v.props)
      x[S] = s(v.props[S], h);
    return x;
  }, O = function(h, v) {
    let x = {};
    for (let S of v.events || []) {
      let I = `on${S.name.charAt(0).toUpperCase() + S.name.slice(1)}`, p = ["// 执行组件绑定的自定义事件"];
      if (S.code && p.push(S.code), S.action) {
        let C = S.action.filter((F) => F.includes("$globalActions")).map((F) => `this.executeGlobalAction('${F.split(".")[1]}');`), E = S.action.filter((F) => !F.includes("$globalActions")).map((F) => `this.$refs.${F && F.split(".")[0]} && this.$refs.${F}();`);
        p = p.concat(`
// 执行组件绑定的全局动作代码`).concat(C).concat(`
// 执行组件绑定的组件动作方法`).concat(E);
      }
      x[I] = new Function(S.args, p.join(`
`)).bind(h), x[I];
    }
    return x;
  }, M = function(h, v) {
    return v.map((x) => {
      let S = Mn(x.type + "-widget"), I = m(h, x), p = O(h, x);
      return Et(
        S,
        {
          ref: x.id,
          widget: x,
          ...I,
          ...p
        },
        { default: () => M(h, x.widgets) }
      );
    });
  };
  return G({
    mounted() {
      c = this, this.executeGlobalEvent("onMounted", this);
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
      executeGlobalEvent: (h) => i(d.value.globalEvents, h, c, d.value.globalVars),
      executeGlobalAction: (h) => o(d.value.globalActions, h, c, d.value.globalVars)
    },
    // 渲染函数
    render() {
      return Et("div", {}, { default: () => M(this, f.value) });
    }
  });
}
var dn = { exports: {} };
(function(t, i) {
  (function(o, s) {
    t.exports = s();
  })(bo, function() {
    const o = { SORT_DESC: 0, SORT_ASC: 1, SORT_RANDOM: 2 }, s = { ROUND: 0, ROUND_FLOOR: 1 };
    var c = { ...o, ...s };
    function f(e, n, r) {
      if (n > (e = String(e)).length)
        return e;
      var u;
      return (r = r < 0 ? 0 : r) > e.length - n && (r = e.length - n), u = "".padEnd(r, "*"), e.substring(0, n) + u + e.substring(n + r);
    }
    var d = Object.freeze({ __proto__: null, trim: function(e) {
      return e.replace(/(^\s*)|(\s*$)/g, "");
    }, trimStart: function(e) {
      return e.replace(/(^\s*)/g, "");
    }, trimEnd: function(e) {
      return e.replace(/(\s*$)/g, "");
    }, trimAll: function(e) {
      return e.replace(/\s+/g, "");
    }, replaceAll: function(e, n, r) {
      return e.replace(new RegExp(n, "gm"), r);
    }, toUpper: function(e) {
      return String(e).toLocaleUpperCase();
    }, toLower: function(e) {
      String(e).toLocaleLowerCase();
    }, toSnakeCase: function(e) {
      return /^[a-z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")) ? e.replace(/([A-Z])/g, "_$1").toLowerCase() : 0 < e.indexOf("-") ? e.replace(/-/g, "_").toLowerCase() : /^[A-Z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")) ? (e = e.charAt(0).toLowerCase() + e.slice(1)).replace(/([A-Z])/g, "_$1").toLowerCase() : void 0;
    }, toKebabCase: function(e) {
      if (0 < e.indexOf("_"))
        return e.replace(/_/g, "-").toLowerCase();
      if (/^[a-z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")))
        return e.replace(/([A-Z])/g, "-$1").toLowerCase();
      if (/^[A-Z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")))
        return (e.charAt(0).toLowerCase() + e.slice(1)).replace(/([A-Z])/g, "-$1").toLowerCase();
    }, toCamelCase: function(e) {
      return 0 < e.indexOf("_") ? e.replace(/\_(\w)/g, function(n, r) {
        return r.toUpperCase();
      }) : 0 < e.indexOf("-") ? e.replace(/\-(\w)/g, function(n, r) {
        return r.toUpperCase();
      }) : /^[A-Z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")) ? e.charAt(0).toLowerCase() + e.slice(1) : void 0;
    }, toPascalCase: function(e) {
      if (0 < e.indexOf("_")) {
        let n = e.replace(/\_(\w)/g, function(r, u) {
          return u.toUpperCase();
        });
        return n.charAt(0).toUpperCase() + n.slice(1);
      }
      if (0 < e.indexOf("-")) {
        let n = e.replace(/\-(\w)/g, function(r, u) {
          return u.toUpperCase();
        });
        return n.charAt(0).toUpperCase() + n.slice(1);
      }
      if (/^[a-z]$/.test(e.charAt(0)) && !(0 < e.indexOf("-") || 0 < e.indexOf("_")))
        return e.charAt(0).toUpperCase() + e.slice(1);
    }, encode: function(e) {
      return window.btoa(e);
    }, decode: function(e) {
      return window.atob(e);
    }, inString: function(e, n) {
      return n.includes(e);
    }, zeroStart: function(e, n = 2) {
      let r = e.toString().length;
      for (; r < n; )
        e = "0" + e, r++;
      return e;
    }, zeroEnd: function(e, n = 2) {
      let r = e.toString().length;
      for (; r < n; )
        e += "0", r++;
      return e;
    }, formatThousand: function(e) {
      if (!parseFloat(e))
        return e;
      var n = -1 < (e = String(e)).indexOf(".") ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return e.replace(n, "$1,");
    }, formatRmbChinese: function(e) {
      var n = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"), r = new Array("", "拾", "佰", "仟"), u = new Array("", "万", "亿", "兆"), l = new Array("角", "分", "毫", "厘");
      let g, w, _ = "", $;
      if (e === "")
        return "";
      if (1e15 <= (e = parseFloat(e)))
        throw new Error("Calculated number overflow!");
      if (e == 0)
        return _ = n[0] + "元整", _;
      if (e = e.toString(), w = e.indexOf(".") == -1 ? (g = e, "") : ($ = e.split("."), g = $[0], $[1].substr(0, 4)), 0 < parseInt(g, 10)) {
        let ie = 0;
        var N = g.length;
        for (let et = 0; et < N; et++) {
          var T = g.substr(et, 1), ge = N - et - 1, Je = ge / 4, ge = ge % 4;
          T == "0" ? ie++ : (0 < ie && (_ += n[0]), ie = 0, _ += n[parseInt(T)] + r[ge]), ge == 0 && ie < 4 && (_ += u[Je]);
        }
        _ += "元";
      }
      if (w != "") {
        var Xe = w.length;
        for (let ie = 0; ie < Xe; ie++) {
          var Ct = w.substr(ie, 1);
          Ct != "0" && (_ += n[Number(Ct)] + l[ie]);
        }
      }
      return _ == "" ? _ += n[0] + "元整" : w == "" && (_ += "整"), _;
    }, formatStartOfName: function(e) {
      return e.length == 2 ? f(e, 1, 1) : 2 < e.length ? f(e, 1, e.length - 2) : e;
    }, formatStartOfMobile: function(e, n = 3, r = 4) {
      return f(e, n, r);
    }, formatStartOfIdCard: function(e, n = 4, r = 8) {
      return f(e, n, r);
    }, formatStartOfBankCard: function(e, n = 4, r = 11) {
      return f(e, n, r);
    } });
    function m(e, n = 10) {
      return Number.parseInt(e, n);
    }
    var O = Object.freeze({ __proto__: null, parseInt: m });
    function M(e) {
      return Number.isInteger(e);
    }
    function h(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "String";
    }
    function v(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Array";
    }
    function x(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Object";
    }
    function S(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Date";
    }
    function I(e) {
      return e == null || e == "undefined" || e == "null" || e == 0 || e == 0 || e == NaN;
    }
    function p(e) {
      return window.isNaN(e) || v(e) || e == null || e == "";
    }
    function C(e) {
      return e == null || e == "";
    }
    function E(e) {
      return C(e) || !(Object.keys(e) || e).length;
    }
    function F(e) {
      return E(e) || /^\s*$/.test(e);
    }
    function ne(e) {
      return e === void 0;
    }
    var re = Object.freeze({ __proto__: null, isInteger: M, isDecimal: function(e) {
      return /^\d+\.\d+$/.test(e);
    }, isNumber: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Number";
    }, isString: h, isArray: v, isObject: x, isBoolean: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Boolean";
    }, isDate: S, isFunction: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Function";
    }, isSymbol: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Symbol";
    }, isRegExp: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "RegExp";
    }, isError: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Error";
    }, isPromise: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Promise";
    }, isMap: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Map";
    }, isWeakMap: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "WeakMap";
    }, isSet: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Set";
    }, isWeakSet: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "WeakSet";
    }, isBigInt: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "BigInt";
    }, isTrue: function(e) {
      return !I(e);
    }, isFalse: I, isNaN: p, isNotNaN: function(e) {
      return !p(e);
    }, isNull: C, isNotNull: function(e) {
      return !C(e);
    }, isEmpty: E, isNotEmpty: function(e) {
      return !E(e);
    }, isBlank: F, isNotBlank: function(e) {
      return !F(e);
    }, isUndefined: ne, isNotUndefined: function(e) {
      return !ne(e);
    }, equals: function(e, n) {
      return Object.is(e, n);
    }, equalsIgnoreCase: function(e, n) {
      return Object.is(e.toLowerCase(), n.toLowerCase());
    }, deepCompare: function(e, n) {
      let r, u, l, g;
      if (arguments.length < 1)
        return !0;
      for (r = 1, u = arguments.length; r < u; r++)
        if (l = [], g = [], !function w(_, $) {
          let N;
          if (p(_) && p($) && typeof _ == "number" && typeof $ == "number" || _ === $)
            return 1;
          if (typeof _ == "function" && typeof $ == "function" || _ instanceof Date && $ instanceof Date || _ instanceof RegExp && $ instanceof RegExp || _ instanceof String && $ instanceof String || _ instanceof Number && $ instanceof Number)
            return _.toString() === $.toString();
          if (_ instanceof Object && $ instanceof Object && !_.isPrototypeOf($) && !$.isPrototypeOf(_) && _.constructor === $.constructor && _.prototype === $.prototype && !(-1 < l.indexOf(_) || -1 < g.indexOf($))) {
            for (N in $)
              if ($.hasOwnProperty(N) !== _.hasOwnProperty(N) || typeof $[N] != typeof _[N])
                return;
            for (N in _) {
              if ($.hasOwnProperty(N) !== _.hasOwnProperty(N) || typeof $[N] != typeof _[N])
                return;
              switch (typeof _[N]) {
                case "object":
                case "function":
                  if (l.push(_), g.push($), !w(_[N], $[N]))
                    return;
                  l.pop(), g.pop();
                  break;
                default:
                  if (_[N] !== $[N])
                    return;
              }
            }
            return 1;
          }
        }(e, arguments[r]))
          return !1;
      return !0;
    } });
    function be(e) {
      return e.reduce(function(n, r) {
        return n + r;
      });
    }
    var He = Object.freeze({ __proto__: null, arrayMin: function(e) {
      return Math.min.apply(null, e);
    }, arrayMax: function(e) {
      return Math.max.apply(null, e);
    }, arraySum: be, arrayAvg: function(e) {
      return be(e) / e.length;
    }, inArray: function(e, n) {
      if (!C(e))
        return n.includes(e);
    }, arrayEquals: function(e, n) {
      return e === n || e.length == n.length && e.every((r, u) => r === n[u]);
    }, arrayCreate: function(e = 0) {
      return [...Array(e).keys()];
    }, arrayInsert: function(e = [], n = 0, r = void 0) {
      return e.splice(n, 0, r), e;
    }, arrayRemove: function(e = [], n = 0) {
      return e.splice(n, 1), e;
    }, arrayUnique: function(e) {
      if (!C(value))
        return Array.from(new Set(e));
    }, arrayShuffle: function(e) {
      for (let r = 1; r < e.length; r++) {
        var n = Math.floor(Math.random() * (r + 1));
        [e[n], e[r]] = [e[r], e[n]];
      }
      return e;
    }, arraySort: function(e, n = o.SORT_ASC) {
      return e.sort((r, u) => {
        switch (n) {
          case o.SORT_ASC:
            return r - u;
          case o.SORT_DESC:
            return u - r;
          case o.SORT_RANDOM:
            return Math.random() - 0.5;
          default:
            return e;
        }
      });
    }, arraySwap: function(e, n, r) {
      const u = [...e];
      return [u[r], u[n]] = [e[n], e[r]], u;
    }, arrayToTree: function(e, n) {
      let r = [];
      return e.forEach((u) => {
        u.pid == n && (u.children = toTree(e, u.id), r.push(u));
      }), r;
    }, arrayUnion: function(e, n) {
      return [...new Set(e.concat(n))];
    }, arrayIntersect: function(e, n) {
      return [...new Set(e)].filter((r) => n.includes(r));
    }, arrayDifference: function(e, n) {
      return [...new Set(e)].filter((r) => !n.includes(r));
    }, arrayComplement: function(e, n) {
      return [...[...new Set(e)].filter((r) => !n.includes(r)), ...[...new Set(n)].filter((r) => !e.includes(r))];
    } });
    function ye(e) {
      let n = /* @__PURE__ */ Object.create(null);
      for (var [r, u] of e)
        n[r] = u;
      return n;
    }
    var ce = Object.freeze({ __proto__: null, mapToObject: ye, mapToJson: function(e) {
      return JSON.stringify(ye(e));
    }, objectToMap: function(e) {
      let n = /* @__PURE__ */ new Map();
      for (var r of Object.keys(e))
        n.set(r, e[r]);
      return n;
    }, jsonToMap: function(e) {
      return objToMap(JSON.parse(e));
    }, stringifyJson: function(e) {
      return JSON.stringify(e);
    }, parseJson: function(e) {
      if (!E(e))
        return JSON.parse(e);
    }, clone: function(e) {
      return Object.assign(e);
    }, cloneDeep: function e(n) {
      if (x(n)) {
        let u = {};
        for (var r in n)
          n.hasOwnProperty(r) && (u[r] = e(n[r]));
        return u;
      }
      if (v(n)) {
        let u = [];
        for (let l = 0, g = n.length; l < g; l++)
          u[l] = e(n[l]);
        return u;
      }
      if (S(n)) {
        let u = /* @__PURE__ */ new Date();
        return u.setTime(n.getTime()), u;
      }
      return n;
    }, objectEquals: function e(n, r) {
      if (n === r)
        return !0;
      if (n instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();
      if (!n || !r || typeof n != "object" && typeof r != "object")
        return n === r;
      if (n.prototype !== b.prototype)
        return !1;
      const u = Object.keys(n);
      return u.length === Object.keys(r).length && u.every((l) => e(n[l], r[l]));
    }, merge: function(e, ...n) {
      return Object.assign(e, ...n);
    } });
    function We(e) {
      return e % 100 != 0 && e % 4 == 0 || e % 400 == 0;
    }
    function De(e = /* @__PURE__ */ new Date(), n = "-") {
      let r = e.getFullYear(), u = e.getMonth() + 1, l = e.getDate();
      return [r, u, l].map(oe).join(n);
    }
    function fe(e = /* @__PURE__ */ new Date()) {
      return e.getDate();
    }
    function K(e = /* @__PURE__ */ new Date()) {
      return new Array(7, 1, 2, 3, 4, 5, 6)[e.getDay()];
    }
    function Re(e = /* @__PURE__ */ new Date()) {
      return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
    }
    function V(e = /* @__PURE__ */ new Date(), n = 1) {
      return e.setDate(e.getDate() + n), e;
    }
    function U(e, n = "yyyy-MM-dd") {
      if (!C(e)) {
        M(e = h(e) ? j(e) : e) && String(e).length == 13 && (e = new Date(e));
        var r, u = { 0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" }, l = { "M+": (e = M(e) && String(e).length == 10 ? new Date(1e3 * e) : e).getMonth() + 1, "d+": e.getDate(), "h+": e.getHours() % 12 == 0 ? 12 : e.getHours() % 12, "H+": e.getHours(), "m+": e.getMinutes(), "s+": e.getSeconds(), "E+": u[e.getDay()], "q+": Math.floor((e.getMonth() + 3) / 3), S: e.getMilliseconds() };
        for (r in /(y+)/.test(n) && (n = n.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), /(E+)/.test(n) && (n = n.replace(RegExp.$1, (1 < RegExp.$1.length ? 2 < RegExp.$1.length ? "星期" : "周" : "") + u[e.getDay()])), /(q+)/.test(n) && (n = n.replace(RegExp.$1, (1 < RegExp.$1.length ? "第" : "") + { 1: "一", 2: "二", 3: "三", 4: "四" }[Math.floor((e.getMonth() + 3) / 3)] + "季度")), l)
          new RegExp("(" + r + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? l[r] : ("00" + l[r]).substr(("" + l[r]).length)));
        return n;
      }
    }
    function j(e) {
      if (!C(e))
        return h(e) ? new Date(e.replace(/-/g, "/")) : M(e) && String(e).length == 13 ? new Date(e) : M(e) && String(e).length == 10 ? new Date(1e3 * e) : void 0;
    }
    function oe(e) {
      return (e = e.toString())[1] ? e : "0" + e;
    }
    var Ae = Object.freeze({ __proto__: null, today: function() {
      return De();
    }, yesterday: function() {
      return U(V(/* @__PURE__ */ new Date(), -1));
    }, tomorrow: function() {
      return U(V(/* @__PURE__ */ new Date(), 1));
    }, prevWeek: function() {
      return U(V(/* @__PURE__ */ new Date(), -7));
    }, nextWeek: function() {
      return U(V(/* @__PURE__ */ new Date(), 7));
    }, prevMonth: function() {
      return U(V(/* @__PURE__ */ new Date(), -30));
    }, nextMonth: function() {
      return U(V(/* @__PURE__ */ new Date(), 30));
    }, prevYear: function() {
      return U(V(/* @__PURE__ */ new Date(), -365));
    }, nextYear: function() {
      return U(V(/* @__PURE__ */ new Date(), 365));
    }, isAM: function() {
      return (/* @__PURE__ */ new Date()).getHours() < 12;
    }, isPM: function() {
      return 12 <= (/* @__PURE__ */ new Date()).getHours();
    }, isToday: function(e) {
      if (!C(e)) {
        h(e) && (e = j(e));
        let n = /* @__PURE__ */ new Date();
        return ["getFullYear", "getMonth", "getDate"].every((r) => n[r]() === e[r]());
      }
    }, isYesterday: function(e) {
      return e = e.getTime(), m((Date.now() - e) / 864e5) === 1;
    }, isBeforeYesterday: function(e) {
      return e = e.getTime(), m((Date.now() - e) / 864e5) === 2;
    }, isWorkday: function() {
      var e = K();
      return e != 6 && e != 7;
    }, isWeekend: function() {
      var e = K();
      return e == 6 || e == 7;
    }, isLeapYear: We, isSameDay: function(e, n) {
      return ["getFullYear", "getMonth", "getDate"].every((r) => e[r]() === n[r]());
    }, isSameWeek: function(e, n) {
      return e = e.getTime() / 864e5, n = n.getTime() / 864e5, m((4 + e) / 7) == m((4 + n) / 7);
    }, isSameMonth: function(e, n) {
      return ["getFullYear", "getMonth"].every((r) => e[r]() === n[r]());
    }, isSameYear: function(e, n) {
      return ["getFullYear"].every((r) => e[r]() === n[r]());
    }, isFirstDayOfMonth: function() {
      return fe() == 1;
    }, isLastDayOfMonth: function() {
      return fe() == Re();
    }, getNow: function() {
      return /* @__PURE__ */ new Date();
    }, getDate: De, getDateTime: function(e = /* @__PURE__ */ new Date(), n = "-") {
      let r = e.getFullYear(), u = e.getMonth() + 1, l = e.getDate(), g = e.getHours(), w = e.getMinutes(), _ = e.getSeconds();
      return [r, u, l].map(oe).join(n) + " " + [g, w, _].map(oe).join(":");
    }, getTimestamp: function(e = /* @__PURE__ */ new Date()) {
      return e.getTime();
    }, getUnixTimestamp: function(e = /* @__PURE__ */ new Date()) {
      return Math.round(e / 1e3);
    }, getDay: fe, getMonth: function(e = /* @__PURE__ */ new Date()) {
      return e.getMonth() + 1;
    }, getYear: function(e = /* @__PURE__ */ new Date()) {
      return e.getFullYear();
    }, getYearMonth: function(e = /* @__PURE__ */ new Date(), n = "-") {
      let r = e.getFullYear(), u = e.getMonth() + 1;
      return [r, u].map(oe).join(n);
    }, getWeek: function(e = /* @__PURE__ */ new Date(), n = "EE") {
      var r = { 0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" };
      if (n == "E")
        return r[e.getDay()];
      if (n == "EE")
        return "周" + r[e.getDay()];
      if (n == "EEE")
        return "星期" + r[e.getDay()];
      throw new Error("Invalid week format!");
    }, getQuarter: function(e = /* @__PURE__ */ new Date(), n = "q") {
      var r = { 1: "一", 2: "二", 3: "三", 4: "四" };
      if (n == "q")
        return r[Math.floor((e.getMonth() + 3) / 3)] + "季度";
      if (n == "qq")
        return "第" + r[Math.floor((e.getMonth() + 3) / 3)] + "季度";
      throw new Error("Invalid quarter format!");
    }, getDayOfWeek: K, getDayOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return e.getDate();
    }, getDayOfYear: function(e = /* @__PURE__ */ new Date()) {
      return Math.ceil((e - new Date(e.getFullYear().toString())) / 864e5) + 1;
    }, getWeekOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return Math.ceil((e.getDate() + 6 - K(e)) / 7);
    }, getWeekOfYear: function(e = /* @__PURE__ */ new Date()) {
      var n = K(r = new Date(e.getFullYear(), 0, 1)), r = Math.round((e - r) / 864e5);
      return Math.ceil((r + n) / 7);
    }, getFirstDayOfWeek: function(e = /* @__PURE__ */ new Date()) {
      var n = K(e);
      return e.setDate(e.getDate() - n + 1), U(e);
    }, getLastDayOfWeek: function(e = /* @__PURE__ */ new Date()) {
      var n = K(e);
      return e.setDate(e.getDate() + (7 - n)), U(e);
    }, getFirstDayOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return e.setDate(1), U(e);
    }, getLastDayOfMonth: function(e = /* @__PURE__ */ new Date()) {
      return U(new Date(e.getFullYear(), e.getMonth() + 1, 0));
    }, getFullDayOfMonth: Re, getFullDayOfYear: function(e = /* @__PURE__ */ new Date()) {
      return We(e.getFullYear()) ? 366 : 365;
    }, getPastTime: function(g, n = "zh") {
      if (C(g))
        return "--";
      var r = { zh: { year: "年前", month: "个月前", day: "天前", beforeYestoday: "前天", yestoday: "昨天", today: "今天", hour: "小时前", minute: "分钟前", just: "刚刚" }, en: { year: " year ago", month: " month ago", day: " day ago", beforeYestoday: "before yestoday", yestoday: " yestoday", today: " today", hour: " hour ago", minute: " minute ago", just: " just" } }, w = (g = typeof g == "string" ? j(g) : g).getTime(), u = m((_ = Date.now() - w) / 31104e6), l = m(_ / 2592e6), g = m(_ / 864e5), w = m(_ / 36e5), _ = m(_ / 6e4);
      return u ? u + r[n].year : l ? l + r[n].month : g ? g === 1 ? r[n].yestoday : g === 2 ? r[n].beforeYestoday : g + r[n].day : w ? 12 < w ? r[n].today : w + r[n].hour : _ ? _ + r[n].minute : r[n].just;
    }, getOverTime: function(l) {
      if (C(l))
        return "--";
      typeof l == "string" && (l = j(l));
      var g = /* @__PURE__ */ new Date(), n = l.getTime() - g.getTime(), r = 0, u = 0, l = 0, g = 0;
      return 0 <= n && (r = Math.floor(n / 1e3 / 3600 / 24), u = Math.floor(n / 1e3 / 60 / 60 % 24), l = Math.floor(n / 1e3 / 60 % 60), g = Math.floor(n / 1e3 % 60)), r + `天 ${u}小时 ${l}分钟 ${g}秒`;
    }, addYear: function(e = /* @__PURE__ */ new Date(), n = 1) {
      return e.setFullYear(e.getFullYear() + n), e;
    }, addMonth: function(e = /* @__PURE__ */ new Date(), n = 1) {
      return e.setMonth(e.getMonth() + n), e;
    }, addDate: V, addHours: function(e = /* @__PURE__ */ new Date(), n = 1) {
      return e.setHours(e.getHours() + n), e;
    }, addMinutes: function(e = /* @__PURE__ */ new Date(), n = 1) {
      return e.setMinutes(e.getMinutes() + n), e;
    }, addSeconds: function(e = /* @__PURE__ */ new Date(), n = 1) {
      return e.setSeconds(e.getSeconds() + n), e;
    }, diffDay: function(e, n) {
      if (E(e) || E(n))
        return 0;
      let r = 0;
      return h(e) && h(n) && (e = j(e), n = j(n)), S(e) && S(n) && (r = m((n - e) / 864e5)), M(e) && M(n) && (String(e).length == 13 && String(n).length == 13 && (r = m((n - e) / 864e5)), String(e).length == 10 && String(n).length == 10 && (r = m((n - e) / 86400))), 0 <= r ? Math.abs(r) : r;
    }, diffWeek: function(e, n) {
      if (E(e) || E(n))
        return 0;
      let r = 0;
      return h(e) && h(n) && (e = j(e), n = j(n)), S(e) && S(n) && (r = m((n - e) / 6048e5)), M(e) && M(n) && (String(e).length == 13 && String(n).length == 13 && (r = m((n - e) / 6048e5)), String(e).length == 10 && String(n).length == 10 && (r = m((n - e) / 604800))), 0 <= r ? Math.abs(r) : r;
    }, diffMonth: function(e, n) {
      if (E(e) || E(n))
        return 0;
      let r = 0;
      return h(e) && h(n) && (e = j(e), n = j(n)), S(e) && S(n) && (r = m((n - e) / 2592e6)), M(e) && M(n) && (String(e).length == 13 && String(n).length == 13 && (r = m((n - e) / 2592e6)), String(e).length == 10 && String(n).length == 10 && (r = m((n - e) / 2592e3))), 0 <= r ? Math.abs(r) : r;
    }, diffYear: function(e, n) {
      if (E(e) || E(n))
        return 0;
      let r = 0;
      return h(e) && h(n) && (e = j(e), n = j(n)), S(e) && S(n) && (r = m((n - e) / 31104e6)), M(e) && M(n) && (String(e).length == 13 && String(n).length == 13 && (r = m((n - e) / 1306368e5)), String(e).length == 10 && String(n).length == 10 && (r = m((n - e) / 1296e3))), 0 <= r ? Math.abs(r) : r;
    }, betweenDays: function(e, n) {
      if (!E(e) && !E(n))
        return h(e) && h(n) && (e = j(e), n = j(n)), M(e) && M(n) && (String(e).length == 13 && String(n).length == 13 && (e = new Date(e), n = new Date(n)), String(e).length == 10 && String(n).length == 10 && (e = new Date(1e3 * e), n = new Date(1e3 * n))), function(r, u) {
          let l = [];
          for (; 0 <= u - r; ) {
            var g = r.getFullYear(), w = oe(r.getMonth() + 1), _ = oe(r.getDate());
            l.push(g + "-" + w + "-" + _), r.setDate(r.getDate() + 1);
          }
          return l;
        }(e, n);
    }, betweenMonths: function(e, n) {
      if (!E(e) && !E(n))
        return h(e) && h(n) && (e = j(e), n = j(n)), M(e) && M(n) && (String(e).length == 13 && String(n).length == 13 && (e = new Date(e), n = new Date(n)), String(e).length == 10 && String(n).length == 10 && (e = new Date(1e3 * e), n = new Date(1e3 * n))), function(r, u) {
          let l = [], g = /* @__PURE__ */ new Date(), w = /* @__PURE__ */ new Date();
          g.setFullYear(r.getFullYear(), r.getMonth() + 1), w.setFullYear(u.getFullYear(), u.getMonth() + 1);
          let _ = g, $ = "";
          for (; _ <= w; ) {
            var N = _.getMonth();
            $ = N === 0 ? _.getFullYear() - 1 + "-12" : _.getFullYear() + "-" + oe(N), l.push($), _.setMonth(N + 1);
          }
          return l;
        }(e, n);
    }, betweenYears: function(e, n) {
      if (!E(e) && !E(n))
        return h(e) && h(n) && (e = j(e), n = j(n)), M(e) && M(n) && (String(e).length == 13 && String(n).length == 13 && (e = new Date(e), n = new Date(n)), String(e).length == 10 && String(n).length == 10 && (e = new Date(1e3 * e), n = new Date(1e3 * n))), function(r, u) {
          let l = [];
          for (; 0 <= u - r; ) {
            var g = r.getFullYear();
            l.push(g), r.setFullYear(r.getFullYear() + 1);
          }
          return l;
        }(e, n);
    }, compareDate: function(e, n) {
      if (!E(e) && !E(n))
        return h(e) && h(n) && (e = j(e), n = j(n)), n < e;
    }, formatDate: U, parseDate: j });
    function Ie(w) {
      if (E(w))
        return 0;
      let n = 0;
      var _ = w.split("-"), $ = Number(_[0]), r = Number(_[1]), u = Number(_[2]);
      let l = /* @__PURE__ */ new Date();
      var g = l.getFullYear(), w = l.getMonth() + 1, _ = l.getDate(), $ = g - $;
      return 0 < $ && (n = w - r <= 0 && _ - u < 0 ? $ - 1 : $), n;
    }
    var X = Object.freeze({ __proto__: null, throttle: function(e, n = 1e3) {
      let r;
      return function() {
        const u = arguments;
        r = r || setTimeout(() => {
          r = null, e.apply(this, u);
        }, n);
      };
    }, debounce: function(e, n = 1e3, r = !0) {
      let u;
      return function() {
        const l = arguments;
        var g;
        u && clearTimeout(u), r ? (g = !u, u = setTimeout(function() {
          u = null;
        }, n), g && e.apply(this, l)) : u = setTimeout(function() {
          e.apply(this, l);
        }, n);
      };
    }, sleep: function(e = 1e3) {
      return new Promise((n) => setTimeout(n, e));
    }, getIdCardInfo: function(e) {
      if (!E(e)) {
        const n = {};
        return n.province = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }[e.substring(0, 2)], e.length == 15 && (n.birthday = "19" + e.substring(6, 8) + "-" + e.substring(8, 10) + "-" + e.substring(10, 12), n.age = Ie(n.birthday), n.sex = Number(e.substring(14)) % 2 == 0 ? "女" : "男"), e.length == 18 && (n.birthday = e.substring(6, 10) + "-" + e.substring(10, 12) + "-" + e.substring(12, 14), n.age = Ie(n.birthday), n.sex = Number(e.substring(16, 17)) % 2 == 0 ? "女" : "男"), n;
      }
    }, getAge: Ie, getZodiac: function(e) {
      if (!E(e)) {
        var n = ["摩羯座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"];
        let r = j(e);
        return e = r.getMonth() + 1, r.getDate() < [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22][e - 1] ? n[e - 1] : n[e];
      }
    }, getChineseZodiac: function(e) {
      if (!E(e)) {
        var n = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        return e = j(e).getFullYear(), e < 1900 ? "未知" : n[(e - 1900) % n.length];
      }
    } });
    const H = { CH: /^[\u4E00-\u9FA5]+$/, EN: /^[a-zA-Z]$/, LOWER_CASE: /^[a-z]+$/, UPPER_CASE: /^[A-Z]+$/, CH_NAME: /^(?:[\u4e00-\u9fa5·]{2,16})$/, EN_NAME: /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, NUMBER: /^(\-|\+)?\d+(\.\d+)?$/, INTEGER: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/, DECIMAL: /^\d+\.\d+$/, INT_OR_FLOAT: /(^[1-9][0-9]*$)|(^[1-9][0-9]*\.[0-9]{1,2}$)|(^0\.[0-9]{1,2}$)|(^0$)/, MOBILE: /^(?:(?:\+|00)86)?1[1-9]\d{9}$/, PHONE: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/, EMAIL: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, ID_CARD: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, ID_CARD15: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)/, ID_CARD18: /(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, BANK_CARD: /^[1-9]\d{9,29}$/, POST_CODE: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/, URL: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/, IP: /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/, EXTERNAL: /^(http?:|https?:|mailto:|tel:)/ };
    function W(e, n) {
      return new RegExp(n).test(e);
    }
    var de = Object.freeze({ __proto__: null, REGEXP: H, regexpTest: W, isChinese: function(e) {
      return W(e, H.CH);
    }, isEnglish: function(e) {
      return W(e, H.EN);
    }, isExternal: function(e) {
      return W(e, H.EXTERNAL);
    }, isLowerCase: function(e) {
      return W(e, H.LOWER_CASE);
    }, isUpperCase: function(e) {
      return W(e, H.UPPER_CASE);
    }, isMobile: function(e) {
      return W(e, H.MOBILE);
    }, isEmail: function(e) {
      return W(e, H.EMAIL);
    }, isIdCard: function(e) {
      return W(e, H.ID_CARD);
    }, isUrl: function(e) {
      return W(e, H.URL);
    } });
    function _e(e, n) {
      return n ? _e(n, e % n) : e;
    }
    var st = Object.freeze({ __proto__: null, add: function(e, n) {
      let r, u, l;
      try {
        r = e.toString().split(".")[1].length;
      } catch {
        r = 0;
      }
      try {
        u = n.toString().split(".")[1].length;
      } catch {
        u = 0;
      }
      return (e * (l = Math.pow(10, Math.max(r, u))) + n * l) / l;
    }, subtract: function(e, n) {
      let r, u, l, g;
      try {
        r = e.toString().split(".")[1].length;
      } catch {
        r = 0;
      }
      try {
        u = n.toString().split(".")[1].length;
      } catch {
        u = 0;
      }
      return l = Math.pow(10, Math.max(r, u)), g = r >= u ? r : u, ((e * l - n * l) / l).toFixed(g);
    }, multiply: function(e, n) {
      let r = 0, u = e.toString(), l = n.toString();
      try {
        r += u.split(".")[1].length;
      } catch {
      }
      try {
        r += l.split(".")[1].length;
      } catch {
      }
      return Number(u.replace(".", "")) * Number(l.replace(".", "")) / Math.pow(10, r);
    }, divide: function(e, n) {
      let r = 0, u = 0;
      try {
        r = e.toString().split(".")[1].length;
      } catch {
      }
      try {
        u = n.toString().split(".")[1].length;
      } catch {
      }
      return Number(e.toString().replace(".", "")) / Number(n.toString().replace(".", "")) * Math.pow(10, u - r);
    }, modulo: function(e, n) {
      let r = 0, u = 0, l;
      try {
        r = e.toString().split(".")[1].length;
      } catch {
      }
      try {
        u = n.toString().split(".")[1].length;
      } catch {
      }
      return l = Math.pow(10, Math.max(r, u)), Math.round(Number(e) * l) % Math.round(Number(n) * l) / l;
    }, gcd: _e, scm: function(e, n) {
      return e * n / _e(e, n);
    }, toFixed: function(e, n = 2, r = s.ROUND) {
      return r == s.ROUND ? function(u, l = 2) {
        if (p(u))
          return "--";
        let g = String(u);
        if (l = l || 0, g.indexOf(".") == -1 && (g += "."), g += new Array(l + 1).join("0"), new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (l + 1) + "})?)\\d*$").test(g)) {
          let w = "0" + RegExp.$2, _ = RegExp.$1, $ = RegExp.$3.length, N = !0;
          if ($ == l + 2) {
            if ($ = w.match(/\d/g), 4 < parseInt($[$.length - 1]))
              for (let T = $.length - 2; 0 <= T && ($[T] = parseInt($[T]) + 1, $[T] == 10); T--)
                $[T] = 0, N = T != 1;
            w = $.join("").replace(new RegExp("(\\d+)(\\d{" + l + "})\\d$"), "$1.$2");
          }
          return N && (w = w.substr(1)), (_ + w).replace(/\.$/, "");
        }
        return String(u);
      }(e, n) : r == s.ROUND_FLOOR ? function(_, w = 2) {
        if (p(_))
          return "--";
        var g = w, w = Number(_), _ = String(w).indexOf(".") + 1, $ = _ ? String(w).length - _ : 0;
        if (_ === 0 || $ <= g) {
          let N = w;
          if (_ === 0) {
            N += ".";
            for (let T = 0; T < g - $; T++)
              N += "0";
          } else
            for (let T = 0; T < g - $; T++)
              N += "0";
          return N;
        }
        return _ = "", _ = String(w).split(".")[0] + "." + String(w).split(".")[1].substring(0, g), String(_);
      }(e, n) : void 0;
    }, toDecimal: function(e, n = 2, r = s.ROUND) {
      return r == s.ROUND ? function(u, l = 2) {
        return p(u) ? "--" : (l = Math.pow(10, l), Math.round(u * l) / l);
      }(e, n) : r == s.ROUND_FLOOR ? function(u, l = 2) {
        return p(u) ? "--" : (l = Math.pow(10, l), Math.floor(u * l) / l);
      }(e, n) : void 0;
    } }), ut = Object.freeze({ __proto__: null, getRandom: function(e = 0, n = 9) {
      return Math.floor(Math.random() * (n - e + 1) + e);
    }, getRandomDigit: function(e = 1) {
      return Math.floor((Math.random() + Math.floor(9 * Math.random() + 1)) * Math.pow(10, e - 1));
    }, getUUID: function(e = 32, n = 16) {
      var r, u = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let l = [], g;
      if (n = n || u.length, e)
        for (g = 0; g < e; g++)
          l[g] = u[0 | Math.random() * n];
      else
        for (l[8] = l[13] = l[18] = l[23] = "-", l[14] = "4", g = 0; g < 36; g++)
          l[g] || (r = 0 | 16 * Math.random(), l[g] = u[g == 19 ? 3 & r | 8 : r]);
      return l.join("");
    }, getGUID: function() {
      function e() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
      }
      return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
    } }), lt = Object.freeze({ __proto__: null, formatFileSize: function(e) {
      return E(e) ? "0B" : e < 1024 ? e + "B" : e < 1048576 ? (e / 1024).toFixed(2) + "KB" : e < 1073741824 ? (e / 1048576).toFixed(2) + "MB" : (e / 1073741824).toFixed(2) + "GB";
    }, getFileName: function(e) {
      if (!E(e))
        return e.substring(0, e.lastIndexOf("."));
    }, getFileSuffix: function(e) {
      if (!E(e))
        return e.substring(e.lastIndexOf(".") + 1).toLowerCase();
    }, fileToBlob: function(e) {
      return new Promise((n, r) => {
        let u = new FileReader();
        u.readAsDataURL(e), u.onload = (l) => {
          l = new Blob([l.target.result], { type: e.type }), n(l);
        }, u.onerror = function(l) {
          console.error(l), r(l);
        };
      });
    }, fileToBase64: function(e) {
      return new Promise((n, r) => {
        let u = new FileReader();
        u.readAsDataURL(e), u.onload = function(l) {
          n(l.target.result);
        }, u.onerror = function(l) {
          console.error(l), r(l);
        };
      });
    }, fileToUrl: function(e) {
      return new Promise((n, r) => {
        try {
          n(URL.createObjectURL(e));
        } catch (u) {
          console.error(u), URL.revokeObjectURL(e), r(u);
        }
      });
    }, blobToFile: function(e, n = Date.now()) {
      return new Promise((r, u) => {
        try {
          const w = e.type;
          var l = e.size, g = w.split("/")[1];
          r(new File([e], Date.now() + "." + g, { type: w, size: l, name: n + "." + g, lastModified: Date.now(), lastModifiedDate: /* @__PURE__ */ new Date() }));
        } catch (w) {
          console.error(w), u(w);
        }
      });
    }, blobToBase64: function(e) {
      return new Promise((n, r) => {
        let u = new FileReader();
        u.readAsDataURL(e), u.onload = function(l) {
          n(l.target.result);
        }, u.onerror = function(l) {
          console.error(l), r(l);
        };
      });
    }, base64ToFile: function(e, n = Date.now()) {
      return new Promise((r, u) => {
        try {
          const g = e.split(","), w = g[0].match(/:(.*?);/)[1];
          var l = w.split("/")[1];
          const _ = window.atob(g[1]);
          let $ = _.length;
          const N = new Uint8Array($);
          for (; $--; )
            N[$] = _.charCodeAt($);
          r(new File([N], n + "." + l, { type: w }));
        } catch (g) {
          console.error(g), u(g);
        }
      });
    }, base64ToBlob: function(e) {
      return new Promise((n, r) => {
        try {
          const l = e.split(",");
          var u = l[0].match(/:(.*?);/)[1];
          const g = window.atob(l[1]);
          let w = g.length;
          const _ = new Uint8Array(w);
          for (; w--; )
            _[w] = g.charCodeAt(w);
          n(new Blob([_], { type: u }));
        } catch (l) {
          console.error(l), r(l);
        }
      });
    }, urlToBase64: function(e) {
      return new Promise((n, r) => {
        const u = new Image();
        u.src = e, u.onload = function() {
          const l = document.createElement("canvas"), g = l.getContext("2d");
          l.width = u.width, l.height = u.height, g.drawImage(u, 0, 0, u.width, u.height);
          var w = l.toDataURL("image/png");
          n(w);
        }, u.onerror = function(l) {
          console.error(l), r(l);
        };
      });
    }, downloadBlobFile: function(e, n) {
      try {
        var r = window.URL.createObjectURL(e);
        const u = window.document.createElement("a");
        u.download = n, u.href = r, u.click(), URL.revokeObjectURL(r);
      } catch (u) {
        console.error(u);
      }
    }, downloadFileUrl: function(e, n) {
      try {
        const r = window.document.createElement("a");
        r.download = n, r.href = e, window.document.body.appendChild(r), r.click(), window.document.body.removeChild(r);
      } catch (r) {
        console.error(r);
      }
    } });
    function ae(e) {
      if (255 < e)
        throw "'" + e + "'' is greater than 255(0xff);";
      return ("0" + Number(e).toString(16)).slice(-2);
    }
    var we = Object.freeze({ __proto__: null, rgbToHex: function(u) {
      u = u.split(",");
      var n = parseInt(u[0].split("(")[1]), r = parseInt(u[1]), u = parseInt(u[2].split(")")[0]);
      return "#" + ae(n) + ae(r) + ae(u);
    }, rgbaToHex: function(l) {
      l = l.split(",");
      var n = parseInt(l[0].split("(")[1]), r = parseInt(l[1]), u = parseInt(l[2]), l = parseFloat(l[3].split(")")[0]);
      return "#" + ae(Math.round(256 * l - 1)) + ae(n) + ae(r) + ae(u);
    }, rgbaToHsl: function(w) {
      w = w.split(",");
      var n = parseInt(w[0].split("(")[1]) / 255, r = parseInt(w[1]) / 255, u = parseInt(w[2]) / 255, l = parseFloat(w[3] && w[3].split(")")[0]), g = Math.max(n, r, u), w = Math.min(n, r, u);
      let _, $, N = (g + w) / 2;
      if (g === w)
        _ = $ = 0;
      else {
        var T = g - w;
        switch ($ = 0.5 < N ? T / (2 - g - w) : T / (g + w), g) {
          case n:
            _ = (r - u) / T + (r < u ? 6 : 0);
            break;
          case r:
            _ = (u - n) / T + 2;
            break;
          case u:
            _ = (n - r) / T + 4;
        }
        _ /= 6;
      }
      return l ? `hsla(${Math.round(360 * _)},${Math.round(100 * $)}%,${Math.round(100 * N)}%,${l})` : `hsl(${Math.round(360 * _)},${Math.round(100 * $)}%,${Math.round(100 * N)}%)`;
    }, hexToRgb: function(e) {
      let n = {};
      return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(r, u, l, g) {
        return u + u + l + l + g + g;
      }), e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), n.r = parseInt(e[1], 16), n.g = parseInt(e[2], 16), n.b = parseInt(e[3], 16), `rgb(${n.r},${n.g},${n.b})`;
    }, hexToRgba: function(e, n = 1) {
      let r = {};
      return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(u, l, g, w) {
        return l + l + g + g + w + w;
      }), e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), r.r = parseInt(e[1], 16), r.g = parseInt(e[2], 16), r.b = parseInt(e[3], 16), r.o = n, `rgba(${r.r},${r.g},${r.b},${r.o})`;
    }, hexToHsl: function(g) {
      var l = g.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(T, Je, ge, Xe) {
        return Je + Je + ge + ge + Xe + Xe;
      }), g = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(l), n = parseInt(g[1], 16) / 255, r = parseInt(g[2], 16) / 255, u = parseInt(g[3], 16) / 255, l = Math.max(n, r, u), g = Math.min(n, r, u);
      let w, _, $ = (l + g) / 2;
      if (l === g)
        w = _ = 0;
      else {
        var N = l - g;
        switch (_ = 0.5 < $ ? N / (2 - l - g) : N / (l + g), l) {
          case n:
            w = (r - u) / N + (r < u ? 6 : 0);
            break;
          case r:
            w = (u - n) / N + 2;
            break;
          case u:
            w = (n - r) / N + 4;
        }
        w /= 6;
      }
      return `hsl(${Math.round(360 * w)},${Math.round(100 * _)}%,${Math.round(100 * $)}%)`;
    }, getRandomHex: function() {
      return "#" + (e = (16777216 * Math.random() << 0).toString(16), new Array(7 - e.length).join("0") + e);
      var e;
    }, getRandomRgb: function() {
      return `rgb(${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())})`;
    }, getRandomRgba: function() {
      return `rgba(${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${(+Math.random()).toFixed(2)})`;
    } }), Ye = { 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "Caps Lock", 27: "Escape", 32: "Space", 33: "Page Up", 34: "Page Down", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 42: "Print Screen", 45: "Insert", 46: "Delete", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 91: "Windows", 93: "Right Click", 96: "Numpad 0", 97: "Numpad 1", 98: "Numpad 2", 99: "Numpad 3", 100: "Numpad 4", 101: "Numpad 5", 102: "Numpad 6", 103: "Numpad 7", 104: "Numpad 8", 105: "Numpad 9", 106: "Numpad *", 107: "Numpad +", 109: "Numpad -", 110: "Numpad .", 111: "Numpad /", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Num Lock", 145: "Scroll Lock", 182: "My Computer", 183: "My Calculator", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" }, ct = Object.freeze({ __proto__: null, getKeyName: function(e) {
      return Ye[e] || ("" + e, "");
    }, getKeyCode: function(e) {
      for (var n in Ye)
        if (Ye[n] == e)
          return n;
    } }), Se = Object.freeze({ __proto__: null, getQueryString: function(e, n = window.location.href) {
      return e = e.replace(/[\[\]]/g, "\\$&"), n = n.split("?")[1], e = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), (e = n.substring(0).match(e)) != null ? decodeURI(e[2]) : "";
    }, queryStringToObj: function(e = window.location.href) {
      if (e.indexOf("?") === -1)
        return {};
      let n = e[0] === "?" ? e.substr(1) : e.substring(e.lastIndexOf("?") + 1);
      n = n.split("&");
      let r = {};
      for (let l = 0; l < n.length; l++) {
        var u = n[l].split("=");
        r[decodeURIComponent(u[0])] = decodeURIComponent(u[1] || "");
      }
      return r;
    }, objToQueryString: function(e) {
      if (!e)
        return "";
      let n = [];
      for (var r in e) {
        var u = e[r];
        if (u instanceof Array)
          for (let l = 0; l < u.length; ++l)
            n.push(encodeURIComponent(r + "[" + l + "]") + "=" + encodeURIComponent(u[l]));
        else
          n.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
      }
      return n.join("&");
    } });
    function Ne(e, n, r = 864e5) {
      typeof document < "u" && (document.cookie = e + "=" + n + ";expires=" + new Date(Date.now() + r));
    }
    var Ge = Object.freeze({ __proto__: null, isSupportCookie: function() {
      return window.navigator.cookieEnabled;
    }, getCookie: function(e) {
      if (typeof document < "u") {
        let r = document.cookie ? document.cookie.replace(/\s/g, "").split(";") : [];
        for (var n in r)
          if (n = r[n].split("="), n[0] == e)
            return decodeURIComponent(n[1]);
        return "";
      }
    }, setCookie: Ne, removeCookie: function(e) {
      E(e) || Ne(e, "", -1);
    }, clearCookie: function(e = document.domain) {
      var n = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (n)
        for (let r = n.length; r--; )
          document.cookie = n[r] + "=0;path=/;" + e ? "domain=" + e + ";" : "expires=" + (/* @__PURE__ */ new Date(0)).toUTCString();
    } }), qe = Object.freeze({ __proto__: null, isSupportStorage: function() {
      return !(!window.localStorage || !window.sessionStorage);
    }, getLocalStorage: function(e) {
      return window.localStorage.getItem(e) || void 0;
    }, setLocalStorage: function(e, n) {
      window.localStorage.setItem(e, n);
    }, removeLocalStorage: function(e) {
      window.localStorage.removeItem(e);
    }, clearLocalStorage: function() {
      window.localStorage.clear();
    }, getSessionStorage: function(e) {
      return window.sessionStorage.getItem(e) || "";
    }, setSessionStorage: function(e, n) {
      window.sessionStorage.setItem(e, n);
    }, removeSessionStorage: function(e) {
      window.sessionStorage.removeItem(e);
    }, clearSessionStorage: function() {
      window.sessionStorage.clear();
    } });
    function ke(e, n) {
      return 0 < e.className.indexOf(n);
    }
    function Pe(e, n) {
      ke(e, n) || (e.className += " " + n);
    }
    function Ke(e, n) {
      ke(e, n) && (e.className = e.className.replace(new RegExp(n, "gm"), ""));
    }
    var Ze = Object.freeze({ __proto__: null, hasClass: ke, addClass: Pe, removeClass: Ke, replaceClass: function(e, n, r) {
      Ke(e, r), Pe(e, n);
    }, addStyle: function(e, n = {}) {
      if (e)
        for (var r in n)
          e.style[r] = n[r];
    }, getStyle: function(e, n) {
      if (e)
        return e.style[n];
    }, removeStyle: function(e, n) {
      e && e.style.removeProperty(n);
    }, htmlEncode: function(e) {
      const n = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "(": "&#40;", ")": "&#41;", "/": "&#47;", " ": "&nbsp;", '"': "&quot;", "'": "&#39;" };
      return e.replace(/[<>&|()\/ '"]/g, function(r) {
        return n[r];
      });
    }, htmlDecode: function(e) {
      const n = { "&lt;": "<", "&gt;": ">", "&amp;": "&", "&#40;": "(", "&#41;": ")", "&#47;": "/", "&nbsp;": " ", "&quot;": '"', "&#39;": "'" };
      return e.replace(/(&lt;|&gt;|&amp;|&#40;|&#41;|&#47;|&nbsp;|&quot;|&#39;)/gi, function(r, u) {
        return n[u];
      });
    }, copyText: function(e) {
      return new Promise((n, r) => {
        navigator.clipboard.writeText(e).then(() => {
          n(e);
        }).catch((u) => {
          console.error("copy error!"), r(u);
        });
      });
    }, getCopyText: function() {
      return new Promise((e, n) => {
        navigator.clipboard.readText().then((r) => {
          e(r);
        }).catch((r) => {
          n(r);
        });
      });
    } });
    function Qe() {
      var e = window.navigator.userAgent;
      return /Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|IEMobile/i.test(e);
    }
    var ft = Object.freeze({ __proto__: null, getBrowserInfo: function() {
      let e = window.navigator.userAgent.toLowerCase();
      var n = e.match(/rv:([\d.]+)\) like gecko/) || e.match(/msie ([\d\.]+)/), r = e.match(/edg\/([\d\.]+)/), u = e.match(/firefox\/([\d\.]+)/), l = e.match(/(?:opera|opr).([\d\.]+)/), g = e.match(/chrome\/([\d\.]+)/), w = e.match(/version\/([\d\.]+).*safari/);
      return n ? { name: "ie", version: n[1] } : r ? { name: "edge", version: r[1] } : u ? { name: "firefox", version: u[1] } : l ? { name: "opera", version: l[1] } : g ? { name: "chrome", version: g[1] } : w ? { name: "safari", version: w[1] } : "unknown";
    }, isPc: function() {
      return !Qe();
    }, isMobile: Qe, isAndroid: function() {
      var e = window.navigator.userAgent;
      return /Android|BlackBerry/i.test(e);
    }, isIos: function() {
      var e = window.navigator.userAgent;
      return /iPhone|iPad|iPod|iOS/i.test(e);
    }, isWindowsPhone: function() {
      var e = window.navigator.userAgent;
      return /Windows Phone/i.test(e);
    }, isWindows: function() {
      var e = window.navigator.userAgent;
      return /win/i.test(e);
    }, isLinux: function() {
      var e = window.navigator.userAgent;
      return /linux/i.test(e);
    }, isMac: function() {
      var e = window.navigator.userAgent;
      return /mac/i.test(e);
    }, isIphone: function() {
      var e = window.navigator.userAgent;
      return /iPhone/i.test(e);
    }, isIpad: function() {
      var e = window.navigator.userAgent;
      return /iPod/i.test(e);
    }, isWeixin: function() {
      var e = window.navigator.userAgent;
      return /MicroMessenger/i.test(e);
    }, isQQ: function() {
      var e = window.navigator.userAgent;
      return /QQ/i.test(e);
    } }), ze = Object.freeze({ __proto__: null, setStorageSync: function(e, n) {
      wx.setStorageSync(e, n);
    }, getStorageSync: function(e) {
      return wx.getStorageSync(e);
    }, getStorageInfoSync: function() {
      return wx.getStorageInfoSync();
    }, removeStorageSync: function(e) {
      wx.removeStorageSync(e);
    }, clearStorageSync: function() {
      wx.clearStorageSync();
    }, setStorage: function({ key: e, data: n, encrypt: r = !1 }) {
      return new Promise((u, l) => {
        wx.setStorage({ key: e, data: n, encrypt: r, success(g) {
          u(g);
        }, fail(g) {
          l(g);
        } });
      });
    }, getStorage: function({ key: e, encrypt: n = !1 }) {
      return new Promise((r, u) => {
        wx.getStorage({ key: e, encrypt: n, success(l) {
          r(l);
        }, fail(l) {
          u(l);
        } });
      });
    }, getStorageInfo: function() {
      return new Promise((e, n) => {
        wx.getStorageInfo({ success(r) {
          e(r);
        }, fail(r) {
          n(r);
        } });
      });
    }, removeStorage: function({ key: e }) {
      return new Promise((n, r) => {
        wx.removeStorage({ key: e, success(u) {
          n(u);
        }, fail(u) {
          r(u);
        } });
      });
    }, clearStorage: function() {
      return new Promise((e, n) => {
        wx.clearStorage({ success(r) {
          e(r);
        }, fail(r) {
          n(r);
        } });
      });
    } }), ze = { loadedTest: function() {
    }, ...c, ...d, ...O, ...He, ...ce, ...X, ...de, ...st, ...ut, ...lt, ...we, ...re, ...ct, ...Se, ...Ge, ...qe, ...Ze, ...ft, ...ze }, Ae = { loadedTest: function() {
    }, ...Ae };
    return { loadedTest: function() {
    }, ...ze, ...Ae };
  });
})(dn);
var Ma = dn.exports;
const Ca = /* @__PURE__ */ Object.assign({
  name: "Render"
}, {
  __name: "index",
  props: {
    data: { type: Object, default: () => ({}) }
  },
  setup(t) {
    const i = t, o = (d, m) => String(d).split("/").filter((O) => O.indexOf(m) > -1).shift(), s = le();
    Object.entries(/* @__PURE__ */ Object.assign({ "/src/platform/widgets/base-info-sets-widget/index.vue": Dn, "/src/platform/widgets/button-widget/index.vue": _o, "/src/platform/widgets/col-widget/index.vue": Oo, "/src/platform/widgets/data-table-widget/index.vue": Eo, "/src/platform/widgets/dept-list-tree-widget/index.vue": Io, "/src/platform/widgets/dialog-widget/index.vue": Fo, "/src/platform/widgets/extra-info-sets-widget/index.vue": To, "/src/platform/widgets/flow-step-widget/index.vue": Po, "/src/platform/widgets/form-item-widget/index.vue": Uo, "/src/platform/widgets/form-widget/index.vue": Yo, "/src/platform/widgets/input-widget/index.vue": qo, "/src/platform/widgets/menu-list-tree-widget/index.vue": Zo, "/src/platform/widgets/row-widget/index.vue": ea, "/src/platform/widgets/select-widget/index.vue": oa, "/src/platform/widgets/simple-container-widget/index.vue": ua, "/src/platform/widgets/slot-widget/index.vue": da, "/src/platform/widgets/table-widget/index.vue": va, "/src/platform/widgets/text-widget/index.vue": ya, "/src/platform/widgets/textarea-widget/index.vue": xa })).map(([d, m]) => {
      let O = m.default.name || Ma.toPascalCase(o(d, "-widget"));
      s.appContext.app.component(O, m.default);
    });
    const f = Be(null);
    return f.value = Oa({ props: { widgets: i.data.widgets, globalConfig: i.data.globalConfig } }), (d, m) => (D(), A(Ue, null, [
      Wt($e(t.data.globalConfig) + " ", 1),
      (D(), z(he(f.value), { class: "render" }))
    ], 64));
  }
});
export {
  En as BaseInfoSetsWidget,
  yo as ButtonWidget,
  xo as ColWidget,
  Co as DataTableWidget,
  Do as DeptListTreeWidget,
  Ao as DialogWidget,
  jo as ExtraInfoSetsWidget,
  Ro as FlowStepWidget,
  Lo as FormItemWidget,
  Wo as FormWidget,
  Go as InputWidget,
  Ko as MenuListTreeWidget,
  Ca as Render,
  Xo as RowWidget,
  ra as SelectWidget,
  sa as SimpleContainerWidget,
  fa as SlotWidget,
  ha as TableWidget,
  ba as TextWidget,
  Sa as TextareaWidget,
  $n as useDataSource,
  St as useGlobal,
  Cn as useWidget
};
