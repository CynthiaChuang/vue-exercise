<template>
  <div class="container">

    <Navbar></Navbar>
    <div class="margin">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from "./Navbar.vue"
  import BasePage from "@/components/common/BasePage.vue"


  export default {
    name: "ManagerPage",
    extends: BasePage,
    components: {
      Navbar
    }
  }
</script>

<style scoped>
  .margin {
    margin-top: 120px;
    margin-bottom: 120px;
  }
</style>
