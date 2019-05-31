<template>
  <nav class="container nav-header navbar-light py-3 fixed-top">
    <div class="row flex-nowrap justify-content-between align-items-center">
      <button class="col-1 navbar-toggler" type="button" data-toggle="collapse" data-target="#managerNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="col-9">
        <a class="nav-header-logo web-title text-dark" href="#" @click.prevent="gotoHomePage">{{ $t("shopName") }}</a>
      </div>

      <div class="col-2 d-flex justify-content-end align-items-center">
        <a class="btn btn-sm btn-outline-primary" href="#" @click.prevent="logout">Sign up</a>
      </div>
    </div>
    <div class="collapse navbar-collapse" id="managerNavbar">
      <div class="row container">
        <div class="col-12 col-md">
        </div>

        <div class="col-6 col-md" v-for="(items,classification) in classifications" :key="classification">
          <h5>{{classification}}</h5>
          <ul class="list-unstyled text-small" v-for="(item,index) in items" :key="index">
            <li><a class="text-muted" style="line-height:1" href="#" @click.prevent="item.action"
                   data-toggle="collapse" data-target="#managerNavbar">{{item.name}}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  export default {
    name: "Navbar",
    data() {
      return {
        classifications: {
          "Shelves": [
            {
              name: this.$t("manager.products"),
              action: () => {
                routerUtil.gotoBackProducts(this.$router);
              }
            },
            {
              name: this.$t("manager.orders"),
              action: () => {
                routerUtil.gotoBackOrders(this.$router);
              }
            },
            {
              name: this.$t("manager.coupons"),
              action: () => {
                routerUtil.gotoCoupons(this.$router);
              }
            }],
          Resources: [
            {
              name: "Business",
              action: () => {
              }
            },
            {
              name: "Education",
              action: () => {
              }
            },
            {
              name: "Government",
              action: () => {
              }
            }],
          System: [
            {
              name: this.$t("common.logout"),
              action: () => {
                this.logout();
              }
            },
            {
              name: this.$t("manager.back"),
              action: () => {
                this.gotoHomePage()
              }
            }]
        }
      }
    },
    methods:
      {
        gotoHomePage() {
          routerUtil.gotoHomePage(this.$router);
        }
        ,
        // TODO: 要移到外層去做
        logout() {
          apiUtil.logout().then((response) => {
            logger.debug(this, "logout", response);
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
