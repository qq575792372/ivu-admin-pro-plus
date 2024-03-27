import { computed as g } from "vue";
import q from "./global.mjs";
function $({ props: u, emits: m }) {
  const { getGlobalProperties: p } = q({ props: u, emits: m }), { $request: b, $message: c } = p(), d = g(() => u.globalConfig.dataSources), i = g(() => u.globalConfig || {}), F = async function(r, t = {}, l) {
    let o = y(r);
    try {
      let n = C(o, t, l, i.value.globalVars), e = await b.request(n);
      return new Function("result", "DSV", "$globalVars", o.responseCode).bind(l).call(null, e, t, i.value.globalVars);
    } catch (n) {
      new Function(
        "error",
        "DSV",
        "$globalVars",
        "$message",
        o.responseErrorCode
      ).bind(l).call(null, n, t, i.value.globalVars, c);
    }
  }, y = function(r) {
    return d.value.find((t) => t.name === r);
  }, C = function(r, t = {}, l, o) {
    let n = {};
    if (r.urlType === "String")
      n.url = String(r.url);
    else if (r.urlType === "VarFx") {
      let h = new Function("DSV", "$globalVars", "return " + String(r.url)).bind(l);
      n.url = h(t, o);
    }
    n.method = r.method;
    let e = a(r.headers, t, l, o);
    e && (n.headers = e);
    let s = a(r.params, t, l, o);
    s && (n.params = s);
    let f = a(r.data, t, l, o);
    return f && (n.data = f), new Function("config", "DSV", "$globalVars", r.requestCode).bind(l).call(null, n, t, o);
  }, a = function(r, t = {}, l, o) {
    if (!r || r.length <= 0)
      return;
    let n = {};
    for (let e of r)
      if (e.type === "String")
        n[e.name] = String(e.value);
      else if (e.type === "Number")
        n[e.name] = Number(e.value);
      else if (e.type === "Boolean")
        n[e.name] = !!e.value;
      else if (e.type === "VarFx") {
        let s = new Function("DSV", "$globalVars", "return " + e.value).bind(l);
        n[e.name] = s(t, o);
      } else {
        console.error("data source not support type!");
        return;
      }
    return n;
  };
  return {
    requestData: F
  };
}
export {
  $ as default
};
