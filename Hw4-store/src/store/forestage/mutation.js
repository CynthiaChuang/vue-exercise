export default {
  initClNameAndRouter(state, payload) {
    if (!payload.hasOwnProperty("clNameAndRouter")) {
      return
    }
    state.clNameAndRouter = payload.clNameAndRouter;
  }
}
