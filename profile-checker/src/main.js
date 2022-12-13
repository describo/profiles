import "regenerator-runtime";
import "@/assets/tailwind.css";
import "element-plus/dist/index.css";
import "@fortawesome/fontawesome-free/js/all";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import ElementPlus from "element-plus";

import log from "loglevel";
import prefix from "loglevel-plugin-prefix";
const level = process.env.NODE_ENV === "development" ? "debug" : "warn";
log.setLevel(level);
const prefixer = prefix.noConflict();
prefixer.reg(log);
prefixer.apply(log);
import { HTTPService } from "./components/http.service";
export const $http = new HTTPService({
    router,
    loginPath: "/login",
});

export const app = createApp(App);

(async () => {
    app.config.globalProperties.$http = $http;
    app.provide("$http", app.config.globalProperties.$http);

    app.config.globalProperties.$log = log;
    app.provide("$log", app.config.globalProperties.$log);

    app.use(router);
    app.use(ElementPlus);

    app.config.productionTip = false;
    app.mount("#app");
})();
