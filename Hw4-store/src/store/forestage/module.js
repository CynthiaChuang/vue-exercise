// initial state
import action from "./action.js";
import mutation from "./mutation.js";

const state = {
  isLoading: false,
  clNameAndRouter: '',
  banners: [],
  allProducts: [],
};

// getters
const getters = {
  getClNameAndRouter: (state) => {
    return state.clNameAndRouter
  },
  getBanners: (state) => {
    return state.banners
  },
  isLoading: (state) => {
    return state.isLoading
  },
  getAllProducts: (state) => {
    return state.allProducts
  },
  getProductsByCategory: (state) => (category = "all") => {
    if (category === "all") {
      return state.allProducts
    }

    return state.allProducts.filter((item) => {

      return item.category === category
    });
  },
  getRecommendProducts: (state) => {
    return state.allProducts.filter((item) => {
      return item.isRecommend
    });
  },
  getRecentlyProducts: (state) => {
    let end = state.allProducts.length;
    let start = Math.max(end - 8 + 1, 0);

    return state.allProducts.slice(start,end).reverse()
  }
};

export default {
  namespaced: true,
  state: state,
  getters: getters,
  actions: action,
  mutations: mutation
}
