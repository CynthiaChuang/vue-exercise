import apiUtil from "@/utils/ApiUtil.js"

export default {
  initClNameAndRouter(state, payload) {
    if (!payload.hasOwnProperty("clNameAndRouter")) {
      return
    }
    state.clNameAndRouter = payload.clNameAndRouter;
  },
  initBanners(state, payload) {
    if (!payload.hasOwnProperty("imageUrls")) {
      return
    }
    state.banners = payload.imageUrls.map((imageUrl) => {
      return {url: imageUrl}
    });
  },
  setLoading(state, payload) {
    if (!payload.hasOwnProperty("isLoading")) {
      return
    }
    state.isLoading = payload.isLoading;
  },
  setAllProducts(state, payload) {
    if (!payload.hasOwnProperty("products")) {
      return
    }

    state.allProducts = payload.products.map(item => apiUtil.productToLocalFormat(item) )

  }

}
