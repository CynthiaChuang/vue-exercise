export default {
  // common
  login(http, username, password) {
    const API = `${process.env.SERVER_URL}/admin/signin`;
    return http.post(API, {username, password})
  },
  logout(http) {
    const API = `${process.env.SERVER_URL}/logout`;
    return http.post(API)
  },
  checkPermission(http) {
    const API = `${process.env.SERVER_URL}/api/user/check`;
    return http.post(API)
  },


  // admin product
  getProducts(http, page) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/products`;
    if (page) {
      API = API + `?page=${page}`
    }

    return http.get(API)
  },
  modifyProduct(http, product) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/product/${product.id}`;
    return http.put(API, {data: product})
  },
  async modifyBatchProducts(http, idx = 0, products = [], message = [], callback) {
    if (idx >= products.length) {
      callback(message);
      return
    }
    await this.modifyProduct(http, products[idx]).then((response) => {
      console.log("modifyProduct", response);
      response.data.name = products[idx].title;
      message.push(response.data);
    });

    await this.modifyBatchProducts(http, idx + 1, products, message, callback);
  },
  uploadImage(http, formData) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/upload`;
    return http.post(API, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  createProduct(http, product) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/product`;
    return http.post(API, {data: product})
  },
  deleteProduct(http, id) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/product/${id}`;
    return http.delete(API)
  },
  async deleteBatchProducts(http, idx = 0, items = [], message = [], callback) {
    if (idx >= items.length) {
      callback(message);
      return
    }
    await this.deleteProduct(http, items[idx].id).then((response) => {
      console.log("deleteProduct", response);
      response.data.name = items[idx].title;
      message.push(response.data);
    });

    await this.deleteBatchProducts(http, idx + 1, items, message, callback);
  },


  // admin order
  getOrders(http, page) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/orders`;
    if (page) {
      API = API + `?page=${page}`
    }

    return http.get(API)
  },


  // admin coupon
  createCoupon(http, coupon) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupon`;
    return http.post(API, {data: coupon})
  },
  getCoupons(http, page) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupons`;
    if (page) {
      API = API + `?page=${page}`
    }
    return http.get(API)
  },
  deleteCoupon(http, id) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupon/${id}`;
    return http.delete(API)
  },
  async deleteBatchCoupons(http, idx = 0, items = [], message = [], callback) {
    if (idx >= items.length) {
      callback(message);
      return
    }
    await this.deleteCoupon(http, items[idx].id).then((response) => {
      console.log("deleteCoupon", response);
      response.data.name = items[idx].title;
      message.push(response.data);
    });

    await this.deleteBatchCoupons(http, idx + 1, items, message, callback);
  },
  modifyCoupon(http, item) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupon/${item.id}`;
    return http.put(API, {data: item})
  },
  async modifyBatchCoupons(http, idx = 0, items = [], message = [], callback) {
    if (idx >= items.length) {
      callback(message);
      return
    }
    await this.modifyCoupon(http, items[idx]).then((response) => {
      console.log("modifyCoupon", response);
      response.data.name = items[idx].title;
      message.push(response.data);
    });

    await this.modifyBatchCoupons(http, idx + 1, items, message, callback);
  },

}
