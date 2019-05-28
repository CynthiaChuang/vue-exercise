<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>

    <div class="d-flex flex-row align-items-center mt-3 mb-4">
      <h4 class="text-muted mr-auto">{{displayTitle}}</h4>
      <div>
        <button
          class="btn btn-outline-secondary ml-2"
          @click="showModel = 'gallery'"
          :class="{'active':showModel ==='gallery'}">
          <i class="fas fa-th-large"></i>
        </button>
        <button
          class="btn btn-outline-secondary ml-2"
          @click="showModel = 'list'"
          :class="{'active':showModel ==='list'}">
          <i class="fas fa-list-ul"></i>
        </button>
      </div>
    </div>


    <template v-if="products.length>0">
      <!--gallery view-->
      <section v-if="showModel ==='gallery'" class="row mb-4">
        <GalleryCard
          v-for="(item, idx) in products"
          :key="item.id"
          :item="item"
          @onAdd="addToCart"
          @onCardClick="toProductDetail"/>

      </section>

      <!--list view-->
      <section v-else class="mb-4">
        <ListCard
          v-for="item in products"
          :key="item.id"
          :item="item"
          @onAdd="addToCart"
          @onCardClick="toProductDetail"/>
      </section>

      <nav v-if="products.length >1" aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{'disabled':!pagination.hasPre}">
            <a class="page-link" href="#" aria-label="Previous"
               @click.prevent="pageTurning(pagination.currentPage, pagination.currentPage-1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li class="page-item" v-for="index in pagination.totalPages" :key="index"
              :class="{'active':index === pagination.currentPage}">
            <a class="page-link" href="#" @click.prevent="pageTurning(pagination.currentPage, index)">{{index}}</a>
          </li>

          <li class="page-item" :class="{'disabled':!pagination.hasNext}">
            <a class="page-link" href="#" aria-label="Next"
               @click.prevent="pageTurning(pagination.currentPage, pagination.currentPage+1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </template>

    <template v-else>
      <div class="text-center mt-5">
        <div>
          <i class="fas fa-heart-broken fa-4x" style="color:rgba(108,117,125,0.31);"></i>
        </div>
        <p class="text-center mt-3" style="color:rgba(108,117,125,0.38);">{{$t("foreProducts.NoData")}}</p>
      </div>

    </template>


  </div>
</template>

<script>

  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  import GalleryCard from "./GalleryCard.vue"
  import ListCard from "./ListCard.vue"

  export default {
    name: "category",
    components: {
      GalleryCard,
      ListCard
    },
    data: () => ({
      category: "all",
      showModel: "gallery",
      isLoading: false,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasNext: false,
        hasPre: false,
      },
      products:[]
    }),
    created() {
      this.category = this.$route.query.category;
      this.getProducts()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (!(to.query.category in vm.$t(`foreProducts.categoryName`))) {
          routerUtil.gotoCategory(vm.$router, "all")
        }
      });
    },
    beforeRouteUpdate(to, from, next) {
      if (!(to.query.category in this.$t(`foreProducts.categoryName`))) {
        next(false);

      } else {
        this.category = to.query.category;
        next();
      }
    },
    methods:{
      pageTurning(from, to) {
        if (from === to) {
          return ""
        }
        this.getProducts(to);
      },
      getProducts(index = 1) {
        this.isLoading = true;
        let vm = this;
        apiUtil.getForeProducts(this.$http, index).then((response) => {
          logger.debug(this, "getForeProducts", response);
          if (response.data.success) {
            vm.products = response.data.products.map((item) => {
                return apiUtil.productToLocalFormat(item)
            });

            vm.pagination = apiUtil.paginationToLocalFormat(response.data.pagination);
          }
          this.isLoading = false;
        })
      },
      addToCart(item){
        console.log("addToCart", item)
      },
      toProductDetail(item){
        routerUtil.gotoForeProductDetail(this.$router, item.id);
      }
    },
    computed: {
      displayTitle() {
        return this.$t(`foreProducts.categoryName.${this.category}`);
      }
    }
  };
</script>

<style scoped>
</style>
