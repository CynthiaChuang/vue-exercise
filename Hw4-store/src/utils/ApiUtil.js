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
  }
}
