import axios from 'axios'

export default {
  // common
  login(username, password) {
    const API = `${process.env.SERVER_URL}/admin/signin`;
    return axios.post(API, {username, password})
  },
  logout() {
    const API = `${process.env.SERVER_URL}/logout`;
    return axios.post(API)
  },
  checkPermission() {
    const API = `${process.env.SERVER_URL}/api/user/check`;
    return axios.post(API)
  },
  productToLocalFormat(item) {
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      content: item.content,
      description: item.description,
      inventory: item.hasOwnProperty('inventory') ? item.inventory : 1,
      unit: item.unit,
      originPrice: item.origin_price,
      price: item.price,
      isEnabled: item.is_enabled,
      isRecommend: item.hasOwnProperty('is_recommend') ? item.is_recommend : 0,
      imageUrl: item.image,
    }
  },
  productToServerFormat(item) {
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      content: item.content,
      description: item.description,
      inventory: item.inventory,
      unit: item.unit,
      origin_price: item.originPrice,
      price: item.price,
      is_enabled: item.isEnabled,
      is_recommend: item.isRecommend,
      image: item.imageUrl,
    };
  },
  paginationToLocalFormat(pagination) {
    return {
      currentPage: pagination.current_page,
      totalPages: pagination.total_pages,
      hasNext: pagination.has_next,
      hasPre: pagination.has_pre,
    }
  },
  couponToServerFormat(coupon) {
    return {
      id: coupon.id,
      title: coupon.title,
      code: coupon.code,
      percent: coupon.percent,
      due_date: coupon.floor(new Date(coupon.dueDate) / 1000),
      is_enabled: coupon.isEnabled
    }
  },
  couponToLocalFormat(coupon) {
    return {
      id: coupon.id,
      title: coupon.title,
      code: coupon.code,
      percent: coupon.hasOwnProperty('percent') ? item.percent : 100,
      dueDate: coupon.hasOwnProperty('due_date') ? new Date(item.due_date * 1000).toISOString().split('T')[0] : new Date(),
      isEnabled: coupon.is_enabled
    }
  },


  // product
  getAllForeProducts() {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/products/all`;
    return axios.get(API)
  },
  getForeProducts(page) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/products?page=${page}`;
    return axios.get(API)
  },
  getForeProductDetail(id) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/product/${id}`;
    return axios.get(API)
  },

  // admin product
  getProducts(page) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/products?page=${page}`;
    return axios.get(API)
  },
  modifyProduct(product) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/product/${product.id}`;
    return axios.put(API, {data: product})
  },
  async modifyBatchProducts(idx = 0, products = [], message = [], callback) {
    if (idx >= products.length) {
      callback(message);
      return
    }
    await this.modifyProduct(products[idx]).then((response) => {
      console.log("modifyProduct", response);
      response.data.name = products[idx].title;
      message.push(response.data);
    });

    await this.modifyBatchProducts(idx + 1, products, message, callback);
  },
  uploadImage(formData) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/upload`;
    return axios.post(API, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  createProduct(product) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/product`;
    return axios.post(API, {data: product})
  },
  deleteProduct(id) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/product/${id}`;
    return axios.delete(API)
  },
  async deleteBatchProducts(idx = 0, items = [], message = [], callback) {
    if (idx >= items.length) {
      callback(message);
      return
    }
    await this.deleteProduct(items[idx].id).then((response) => {
      console.log("deleteProduct", response);
      response.data.name = items[idx].title;
      message.push(response.data);
    });

    await this.deleteBatchProducts(idx + 1, items, message, callback);
  },


  // admin order
  getOrders(page) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/orders?page=${page}`;
    return axios.get(API)
  },


  // admin coupon
  createCoupon(coupon) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupon`;
    return axios.post(API, {data: coupon})
  },
  getCoupons(page) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupons?page=${page}`;
    return axios.get(API)
  },
  deleteCoupon(id) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupon/${id}`;
    return axios.delete(API)
  },
  async deleteBatchCoupons(idx = 0, items = [], message = [], callback) {
    if (idx >= items.length) {
      callback(message);
      return
    }
    await this.deleteCoupon(items[idx].id).then((response) => {
      console.log("deleteCoupon", response);
      response.data.name = items[idx].title;
      message.push(response.data);
    });

    await this.deleteBatchCoupons(idx + 1, items, message, callback);
  },
  modifyCoupon(item) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/coupon/${item.id}`;
    return axios.put(API, {data: item})
  },
  async modifyBatchCoupons(idx = 0, items = [], message = [], callback) {
    if (idx >= items.length) {
      callback(message);
      return
    }
    await this.modifyCoupon(items[idx]).then((response) => {
      console.log("modifyCoupon", response);
      response.data.name = items[idx].title;
      message.push(response.data);
    });

    await this.modifyBatchCoupons(idx + 1, items, message, callback);
  },

}
