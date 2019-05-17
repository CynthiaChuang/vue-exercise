import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/forestage/home/HomePage.vue'
import Footer from '@/components/common/Footer.vue'
import LoginPage from '@/components/backstage/LoginPage.vue'
import ManagerPage from '@/components/backstage/ManagerPage.vue'
import Orders from '@/components/backstage/order/Orders.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      components: {
        default: HomePage,
        footer: Footer,
      },
    },
    {
      path: '/',
      name: 'HomePage',
      components: {
        default: HomePage,
        footer: Footer,
      },
    },
    {
      path: '/login',
      name: 'LoginPage',
      components: {
        default: LoginPage,
      },
    },
    {
      path: '/admin',
      components: {
        default: ManagerPage,
        footer: Footer,
      },
      children: [
        {

          path: "",
          component: Orders,
          name: "Orders",
          meta: {
            requiresAuth: true
          },
        },
      ]

    }
  ]
})
