import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/forestage/home/HomePage.vue'
import Footer from '@/components/common/Footer.vue'
import Login from '@/components/backstage/Login.vue'
import Manager from '@/components/backstage/Manager.vue'


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
      name: 'Login',
      components: {
        default: Login,
      },
    },
    {
      path: '/admin',
      name: 'Manager',
      components: {
        default: Manager,
        footer: Footer,
      },
      meta:{
        requiresAuth:true
      }
    }
  ]
})
