import router from "../router";

export default {
  gotoManagerPage(router, replace = false) {
    this._goto(router, replace, {
      name: "Orders"
    })
  },
  gotoHomePage(router, replace = false) {
    this._goto(router, replace, {
      name: "HomePage"
    })
  },
  gotoLogin(router, replace = false) {
    this._goto(router, replace, {
      name: "LoginPage"
    })
  },
  gotoBack(router) {
    router.back()
  },
  _goto(router, replace, location) {
    if (replace) {
      this._replace(router, location);
    } else {
      this._push(router, location);
    }
  },
  _push(router, location) {
    router.push(location);
  },
  _replace(router, location) {
    router.replace(location);
  }
}
