<template>
  <div class="container">
    <header class="homepage-header py-3">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="col-4 pt-1">
        </div>

        <div class="col-4 text-center">
          <a class="homepage-header-logo web-title text-dark" href="#">{{ $t("shopName") }}</a>
        </div>

        <div class="col-4 d-flex justify-content-end align-items-center">
          <ShoppingCart></ShoppingCart>
        </div>
      </div>
    </header>

    <div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-between">
        <a v-for="(item,idx) in menus" :key="idx"
           class="p-2 text-muted" href="#"
           @click.prevent="item.action">
          {{item.name}}
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>
  .homepage-header {
    line-height: 1;
    border-bottom: 1px solid #e5e5e5;
  }

  .homepage-header-logo {
    font-size: 2.25rem;
  }

  .homepage-header-logo:hover {
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

  .nav-scroller .nav-link {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: .875rem;
  }
</style>
