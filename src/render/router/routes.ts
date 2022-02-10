import { RouteRecordRaw } from "vue-router";
import Layout from "../views/layouts/index.vue";
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
    ],
  },
];
