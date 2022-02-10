import { RouteRecordRaw } from "vue-router";
import { mediaSrtRoute } from "../views/MediaSrt/route";
import Layout from "../views/layouts/index.vue";
import MediaSrtLayout from "../views/layouts/MediaSrt.vue";
import Welcome from "../views/Welcome/index.vue";

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "首页",
    redirect: "/welcome",
    component: Layout,
    children: [
      {
        path: "welcome",
        name: "欢迎页",
        component: Welcome,
      },
      {
        path: "media-srt",
        name: "媒体字幕",
        redirect: "/media-srt/config",
        component: MediaSrtLayout,
        children: mediaSrtRoute,
      },
    ],
  },
];
