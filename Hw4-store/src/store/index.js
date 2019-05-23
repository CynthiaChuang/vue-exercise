import Vue from 'vue';
import Vuex from 'vuex';

import forestage from './forestage/module';

const debug = process.env.NODE_ENV === 'dev';
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    forestage
  },
  strict: debug
})
