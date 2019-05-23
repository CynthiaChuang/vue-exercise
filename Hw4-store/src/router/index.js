import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/common/LoginPage.vue'

import HomePage from '@/components/forestage/home/HomePage.vue'
import ForeFooter from '@/components/forestage/Footer.vue'
import ForeProducts from '@/components/forestage/products/ProductsPage.vue'

import ManagerPage from '@/components/backstage/ManagerPage.vue'
import BackFooter from '@/components/backstage/Footer.vue'
import BackOrders from '@/components/backstage/orders/Orders.vue'
import BackProducts from '@/components/backstage/products/Products.vue'
import Coupons from '@/components/backstage/coupons/Coupons.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      components: {
        default: HomePage,
        footer: ForeFooter,
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
      path: '/',
      name: 'HomePage',
      components: {
        default: HomePage,
        footer: ForeFooter,
      },
    },
    {
      path: '/products',
      name: 'ForeProducts',
      components:{
        default: ForeProducts,
        footer: ForeFooter,
      },
    },
    {
      path: '/admin',
      components: {
        default: ManagerPage,
        footer: BackFooter,
      },
      children: [
        {

          path: "",
          component: BackOrders,
          name: "BackOrders",
          meta: {
            requiresAuth: true
          },
        },
        {

          path: "products",
          component: BackProducts,
          name: "BackProducts",
          meta: {
            requiresAuth: true
          },
        },
        {

          path: "coupons",
          component: Coupons,
          name: "Coupons",
          meta: {
            requiresAuth: true
          },
        }]

    }
  ]
})
