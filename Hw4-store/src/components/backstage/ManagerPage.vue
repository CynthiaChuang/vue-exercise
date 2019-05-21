<template>
  <div class="container">

    <Navbar></Navbar>
    <Alert></Alert>
    <div class="margin">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from "./Navbar.vue"
  import BasePage from "@/components/common/BasePage.vue"
  import Alert from "@/components/common/Alert.vue"

  export default {
    name: "ManagerPage",
    extends: BasePage,
    components: {
      Navbar,
      Alert
    }
  }
</script>

<style scoped>
  .margin {
    margin-top: 120px;
    margin-bottom: 120px;
  }
</style>
