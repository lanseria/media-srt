import { createApp } from "vue";
import App from "./App.vue";

import { setupStore } from "./store/";

async function bootstrap() {
  const app = createApp(App);
  // Configure store
  setupStore(app);

  app.mount("#app", true);
}

void bootstrap();
