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
    path: "task",
    name: "Task",
    meta: {
      title: "我的任务",
      icon: "icon-upload",
    },
    component: () => import("./Task/index.vue"),
  },
  // {
  //   path: "analysis",
  //   name: "Analysis",
  //   meta: {
  //     title: "分析字幕",
  //     icon: "icon-analysis",
  //   },
  //   component: () => import("./Analysis/index.vue"),
  // },
];

export const mediaSrtStaticRoute: RouteRecordRaw[] = [
  {
    path: "upload",
    name: "Upload",
    meta: {
      title: "上传媒体",
      icon: "icon-upload",
    },
    component: () => import("./Upload/index.vue"),
  },
  {
    path: "analysis/:id",
    name: "Analysis",
    meta: {
      title: "分析字幕",
      icon: "icon-analysis",
    },
    component: () => import("./Analysis/index.vue"),
  },
];
