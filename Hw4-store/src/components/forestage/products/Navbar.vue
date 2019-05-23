<template>
  <div class="container fixed-top bg-white">
      <nav class="py-1 mb-2 nav d-flex justify-content-between">

        <a class="header-logo web-title  btn btn-sm btn-outline-primary"
           href="#" data-toggle="dropdown" @click.prevent="gotoHomePage">
          {{ $t("shopName") }}
        </a>

        <a v-for="(item,idx) in menus" :key="idx"
           class="p-2 text-muted" href="#"
           @click.prevent="item.action">
          {{item.name}}
        </a>

        <ShoppingCart
          cartStyle="iconOnly"
          class="icon-link p-2"/>


        <a class="icon-link p-2" href="#"
           @click.prevent="gotoManagerPage">
          <i class="fas fa-users-cog" aria-hidden="true"></i>
        </a>
      </nav>
    </div>
</template>

<script>

  import routerUtil from "@/utils/RouterUtil.js"
  import ShoppingCart from "@/components/common/ShoppingCart.vue"

  export default {
    name: "Navbar",
    components: {
      ShoppingCart
    },
    props: {
      menus: {
        type: Array,
        request: true
      }
    },
    methods:{
      gotoManagerPage(){
        routerUtil.gotoManagerPage(this.$router)
      },
      gotoHomePage(){
        routerUtil.gotoHomePage(this.$router)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/all.scss";

  .header-logo {
    font-size: 1.25rem;
  }

  .header-logo:hover {
    text-decoration: none;
  }

  .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
  }

  .nav-scroller .nav {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .nav-scroller .icon-link {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: .875rem;
  }

  .icon-link {
    padding-right: .5rem;
    padding-left: .5rem;
    color: $gray-600;
  }

  .icon-link:hover {
    color: $black;
    background-color: transparent
  }

</style>
