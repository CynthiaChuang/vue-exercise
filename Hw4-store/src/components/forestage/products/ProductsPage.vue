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
  import routerUtil from "@/utils/RouterUtil.js"

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
        this.navbarMenus = [{
          name:"全部商品",
          action: () => {
            routerUtil.gotoCategory(this.$router, "all")
          }
        }, ...this.$store.getters["forestage/getClNameAndRouter"]];
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
