"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const s=require("vue");function f({props:r,emits:b}){s.computed(()=>r.globalConfig||{});const a=function(e,n){return e.find(t=>t.name===n)},g=function(e,n,t,o){let l=i(e,n);return new Function("$globalVars",l.code).bind(t,o)()},i=function(e,n){return e.find(t=>t.name===n)},d=function(e,n,t,o){let l=i(e,n);return new Function("$globalVars",l.code).bind(t,o)()},c=function(e,n){return e.find(t=>t.name===n)};return{getGlobalFn:a,executeGlobalFn:g,getGlobalAction:c,executeGlobalAction:function(e,n,t,o){let l=c(e,n);return new Function("$globalVars",l.code).bind(t,o)()},getGlobalEvent:i,executeGlobalEvent:d,getFlatWidgets:function(){const e=n=>{let t=[];for(let o of n)if(o.widgets&&!o.widgets.length&&delete o.widgets,t.push(o),o.widgets&&o.widgets.length){let l=e(o.widgets);l&&t.push(...l)}return t};return e(r.designer.widgets)},getGlobalProperties:function(){const{proxy:e}=s.getCurrentInstance();return e}}}exports.default=f;