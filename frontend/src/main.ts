import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import VueAxios from "vue-axios";
import { ins as axios } from "../utils/axios";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueToast, { position: "top-right" });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
