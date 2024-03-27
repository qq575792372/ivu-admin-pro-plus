import * as e from "./components/index.mjs";
import "vue";
import "@vue/composition-api";
import "./components/base-info-sets-widget/index.mjs";
import { default as h } from "./components/base-info-sets-widget/index.vue.mjs";
import "./components/button-widget/index.mjs";
import { default as y } from "./components/button-widget/index.vue.mjs";
import "./components/col-widget/index.mjs";
import { default as O } from "./components/col-widget/index.vue.mjs";
import "./components/data-table-widget/index.mjs";
import { default as k } from "./components/data-table-widget/index.vue.mjs";
import "./components/dept-list-tree-widget/index.mjs";
import { default as v } from "./components/dept-list-tree-widget/index.vue.mjs";
import "./components/dialog-widget/index.mjs";
import { default as A } from "./components/dialog-widget/index.vue.mjs";
import "./components/easy-form/index.mjs";
import { default as H } from "./components/easy-form/index.vue.mjs";
import "./components/extra-info-sets-widget/index.mjs";
import { default as K } from "./components/extra-info-sets-widget/index.vue.mjs";
import "./components/flow-step-widget/index.mjs";
import { default as P } from "./components/flow-step-widget/index.vue.mjs";
import "./components/form-item-widget/index.mjs";
import { default as U } from "./components/form-item-widget/index.vue.mjs";
import "./components/form-widget/index.mjs";
import { default as X } from "./components/form-widget/index.vue.mjs";
import "./components/input-widget/index.mjs";
import { default as Z } from "./components/input-widget/index.vue.mjs";
import "./components/menu-list-tree-widget/index.mjs";
import { default as tt } from "./components/menu-list-tree-widget/index.vue.mjs";
import "./components/render/index.mjs";
import { default as ot } from "./components/render/index.vue.mjs";
import "./components/row-widget/index.mjs";
import { default as at } from "./components/row-widget/index.vue.mjs";
import "./components/select-widget/index.mjs";
import { default as mt } from "./components/select-widget/index.vue.mjs";
import "./components/simple-container-widget/index.mjs";
import { default as ft } from "./components/simple-container-widget/index.vue.mjs";
import "./components/slot-widget/index.mjs";
import { default as st } from "./components/slot-widget/index.vue.mjs";
import "./components/table-widget/index.mjs";
import { default as ut } from "./components/table-widget/index.vue.mjs";
import "./components/text-widget/index.mjs";
import { default as gt } from "./components/text-widget/index.vue.mjs";
import "./components/textarea-widget/index.mjs";
import { default as nt } from "./components/textarea-widget/index.vue.mjs";
const r = function (o) {
    console.log("安装", o);
    Object.keys(e).forEach((t) => {
      o.component(t, e[t]);
    });
  },
  C = { install: r };
export {
  h as BaseInfoSetsWidget,
  y as ButtonWidget,
  O as ColWidget,
  k as DataTableWidget,
  v as DeptListTreeWidget,
  A as DialogWidget,
  H as EasyForm,
  K as ExtraInfoSetsWidget,
  P as FlowStepWidget,
  U as FormItemWidget,
  X as FormWidget,
  Z as InputWidget,
  tt as MenuListTreeWidget,
  ot as Render,
  at as RowWidget,
  mt as SelectWidget,
  ft as SimpleContainerWidget,
  st as SlotWidget,
  ut as TableWidget,
  gt as TextWidget,
  nt as TextareaWidget,
  C as default,
};
