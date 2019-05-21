export default {
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
  uploadImage(http, formData) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/upload`;
    return http.post(API, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  uploadProduct(http, product) {
    let API = `${process.env.SERVER_URL}/api/${process.env.API_PATH}/admin/product`;
    return http.post(API, {data: product})
  }
}
