// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate'
import Loading from 'vue-loading-overlay';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'bootstrap'
import 'vue-loading-overlay/dist/vue-loading.css';
import 'swiper/dist/css/swiper.css'


import router from './router'
import zh_tw from './i18n/zh_tw.json'
import './utils/Validate.js'
import './utils/Bus.js'

Vue.use(VueI18n);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(VueAwesomeSwiper, /* { default global options } */);
Vue.component("Loading", Loading);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;


const i18n = new VueI18n({
  locale: 'zh_tw',
  messages: {zh_tw}
});

Vue.filter("separator", function (num) {
  const n = Number(num);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => {
    return (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
  })}`;
});

Vue.filter("dollarSign", function (num) {
  return `$${num}`
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {App},
  template: '<App/>'
});
