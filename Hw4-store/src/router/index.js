import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/common/LoginPage.vue'

import HomePage from '@/components/forestage/home/HomePage.vue'
import ForeFooter from '@/components/forestage/Footer.vue'

import ManagerPage from '@/components/backstage/ManagerPage.vue'
import Orders from '@/components/backstage/order/Orders.vue'
import BackFooter from '@/components/backstage/Footer.vue'

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
      path: '/',
      name: 'HomePage',
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
      path: '/admin',
      components: {
        default: ManagerPage,
        footer: BackFooter,
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
