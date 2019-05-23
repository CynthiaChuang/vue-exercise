// initial state
import action from "./action.js";
import mutation from "./mutation.js";

const state = {
  clNameAndRouter: '',
};

// getters
const getters = {
  getClNameAndRouter: (state) => {
    return state.clNameAndRouter
  },
};

export default {
  state: state,
  getters: getters,
  actions: action,
  mutations: mutation
}
