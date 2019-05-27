// initial state
import action from "./action.js";
import mutation from "./mutation.js";

const state = {
  clNameAndRouter: '',
  banners:[]
};

// getters
const getters = {
  getClNameAndRouter: (state) => {
    return state.clNameAndRouter
  },
  getBanners: (state) => {
    return state.banners
  },
};

export default {
  state: state,
  getters: getters,
  actions: action,
  mutations: mutation
}
