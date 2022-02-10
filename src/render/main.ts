import { createApp } from "vue";
import App from "./App.vue";

import { setupRouter } from "./router";
import { setupStore } from "./store/";

async function bootstrap() {
  const app = createApp(App);
  // Configure store
  setupStore(app);

  // Configure routing
  setupRouter(app);

  app.mount("#app", true);
}

void bootstrap();
