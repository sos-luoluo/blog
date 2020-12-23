import "@/utils/extensions";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale/index";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "@/filters/index";
import "./icons"; // icon
import "animate.css";
import "@/styles/index.less";
import logManager from "@/utils/log";
import "@/directive/index";

logManager.pushMsg({
  msg: "web Init",
  time: Date.now(),
  type: "log"
});

Vue.config.productionTip = false;
Vue.use(Element);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
