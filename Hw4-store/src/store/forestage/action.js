import logger from "@/utils/LogUtil.js"
import apiUtil from "@/utils/ApiUtil.js"

export default {
  getAllProducts({commit}, payload) {
    commit("setLoading", {isLoading: true});
    return apiUtil.getAllForeProducts().then((response) => {
      logger.debug(this, "getAllForeProducts", response);
      commit("setAllProducts", {products: response.data.products});
      commit("setLoading", {isLoading: false});
    })
  },
}
