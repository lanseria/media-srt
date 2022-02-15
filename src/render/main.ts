import { createApp } from "vue";
import App from "./App.vue";

import { setupRouter } from "./router";
import { setupStore } from "./store/";

import "@render/styles/index.css";

async function bootstrap() {
  const app = createApp(App);
  // Configure store
  setupStore(app);
  // 注册一个全局自定义指令 `v-focus`
  app.directive("advanceClick", {
    mounted(el: HTMLElement, binding) {
      let move = false;
      el.addEventListener("mousemove", () => {
        move = true;
      });
      el.addEventListener("mousedown", () => {
        move = false;
      });
      el.addEventListener("mouseup", (e) => {
        move ? e.preventDefault() : binding.value();
      });
    },
  });
  // Configure routing
  setupRouter(app);

  app.mount("#app", true);
}

void bootstrap();
