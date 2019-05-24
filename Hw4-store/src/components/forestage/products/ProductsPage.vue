<template>
  <div>
    <Navbar
      :menus="navbarMenus"/>
    <div class="margin">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from "./Navbar.vue"
  import BasePage from "@/components/common/BasePage.vue"

  export default {
    name: 'ProductsPage',
    extends: BasePage,
    components: {
      Navbar
    },
    data: () => ({
      navbarMenus: []
    }),
    created() {
      this.initNavbarMenus();
    },
    methods: {
      initNavbarMenus() {
        this.navbarMenus = this.$store.getters["getClNameAndRouter"];
      },
    }
  }
</script>

<style scoped>
  .margin {
    margin-top: 120px;
    margin-bottom: 120px;
  }
</style>
