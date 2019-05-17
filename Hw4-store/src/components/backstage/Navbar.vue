<template>
  <div class="container fixed-top">
    <header class="nav-header py-3 ">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="col-4">
          <a class="nav-header-logo web-title text-dark" href="#" @click.prevent="gotoHomePage">{{ $t("shopName") }}</a>
        </div>

        <div class="col-4 d-flex justify-content-end align-items-center">
          <a class="btn btn-sm btn-outline-primary" href="#" @click.prevent="logout">Sign up</a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  export default {
    name: "Navbar",
    methods: {
      gotoHomePage() {
        routerUtil.gotoHomePage(this.$router);
      },
      logout() {
        apiUtil.logout(this.$http).then((response) => {
          logger.debug(this, "logout" ,response);
          routerUtil.gotoHomePage(this.$router);
        })
      }
    }
  }
</script>

<style scoped>
  .nav-header {
    line-height: 1;
    background: white;
    border-bottom: 1px solid #e5e5e5;
  }

  .nav-header-logo {
    font-size: 1.5rem;
  }

  .nav-header-logo:hover {
    text-decoration: none;
  }
</style>
