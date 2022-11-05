import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import helper from "./plugins/helper";
import "./assets/scss/styles.scss";

import LayoutDefault from "@/layouts/default.vue";
import ContentWrapper from "@/components/organism/content";

Vue.component("LayoutDefault", LayoutDefault);
Vue.component("ContentWrapper", ContentWrapper);
Vue.use(helper);

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
