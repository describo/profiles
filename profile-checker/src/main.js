import "regenerator-runtime";
import "./assets/tailwind.css";
import "element-plus/dist/index.css";
import "@fortawesome/fontawesome-free/js/all";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import ElementPlus from "element-plus";

export const app = createApp(App);

(async () => {
    app.use(router);
    app.use(ElementPlus);
    app.config.productionTip = false;
    app.mount("#app");
})();
