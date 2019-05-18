<template>
  <div class="container">

    <Navbar></Navbar>

    <div class="margin-top">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from "./Navbar.vue"
  import Sidebar from "./Sidebar.vue"
  import BasePage from "@/components/common/BasePage.vue"

  export default {
    name: "Manager",
    extends: BasePage,
    components: {
      Navbar,
      Sidebar
    },
  }
</script>

<style scoped>
  .margin-top {
    margin-top: 120px;
  }
</style>
