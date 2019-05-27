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
  }
}
