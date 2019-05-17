// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import 'bootstrap'

import router from './router'
import zh_tw from './i18n/zh_tw.json'
import apiUtil from "./utils/ApiUtil.js"
import logger from "@/utils/LogUtil.js"

Vue.use(VueAxios, axios);
Vue.use(VueI18n);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;


const i18n = new VueI18n({
  locale: 'zh_tw',
  messages: {zh_tw}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {App},
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    apiUtil.checkPermission(axios).then((response) => {
      if (!response.data.success) {
        logger.info(this, response.data);
        return
      }
    })
  }
  next()
});
