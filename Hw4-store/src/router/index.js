import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/home/HomePage.vue'
import Footer from '@/components/common/Footer.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      components: {
        default: HomePage,
        footer: Footer,
      },
    }
  ]
})
