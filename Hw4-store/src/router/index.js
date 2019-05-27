import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/common/LoginPage.vue'

import HomePage from '@/components/forestage/home/HomePage.vue'
import ForeFooter from '@/components/forestage/Footer.vue'
import ForeProducts from '@/components/forestage/products/ProductsPage.vue'
import Category from '@/components/forestage/products/category/Category.vue'


import ManagerPage from '@/components/backstage/ManagerPage.vue'
import BackFooter from '@/components/backstage/Footer.vue'
import BackOrders from '@/components/backstage/orders/Orders.vue'
import BackProducts from '@/components/backstage/products/Products.vue'
import Coupons from '@/components/backstage/coupons/Coupons.vue'

Vue.use(Router);

export default new Router({

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
      components:{
        default: ForeProducts,
        footer: ForeFooter,
      },
      children: [
        {
          path: "",
          component: Category,
          name: "Category",
        }
      ]
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
