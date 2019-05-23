export default {
  gotoCoupons(router, replace = false) {
    this._goto(router, replace, {
      name: "Coupons"
    })
  },
  gotoBackOrders(router, replace = false) {
    this._goto(router, replace, {
      name: "BackOrders"
    })
  },
  gotoBackProducts(router, replace = false) {
    this._goto(router, replace, {
      name: "BackProducts"
    })
  },
  gotoManagerPage(router, replace = false) {
    this.gotoBackOrders(router, replace)
  },
  gotoHomePage(router, replace = false) {
    this._goto(router, replace, {
      name: "HomePage"
    })
  },
  gotoForeProducts(router, replace = false) {
    this._goto(router, replace, {
      name: "ForeProducts"
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
