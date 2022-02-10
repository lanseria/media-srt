import { RouteRecordRaw } from "vue-router";

export const mediaSrtRoute: RouteRecordRaw[] = [
  {
    path: "config",
    name: "Config",
    meta: {
      title: "配置",
      icon: "icon-config",
    },
    component: () => import("./Config/index.vue"),
  },
  {
    path: "upload",
    name: "Upload",
    meta: {
      title: "上传音频",
      icon: "icon-upload",
    },
    component: () => import("./Upload/index.vue"),
  },
  {
    path: "analysis",
    name: "Analysis",
    meta: {
      title: "分析字幕",
      icon: "icon-analysis",
    },
    component: () => import("./Analysis/index.vue"),
  },
];
