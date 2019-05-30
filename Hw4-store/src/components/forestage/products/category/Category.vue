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


    <template v-if="showProducts.length>0">
      <!--gallery view-->
      <section v-if="showModel ==='gallery'" class="row mb-4">
        <GalleryCard
          v-for="(item, idx) in showProducts"
          :key="item.id"
          :item="item"
          @onAdd="addToCart"
          @onCardClick="toProductDetail"/>

      </section>

      <!--list view-->
      <section v-else class="mb-4">
        <ListCard
          v-for="item in showProducts"
          :key="item.id"
          :item="item"
          @onAdd="addToCart"
          @onCardClick="toProductDetail"/>
      </section>

      <nav v-if="pagination.totalPages >1" aria-label="Page navigation example">
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

  import {mapGetters} from 'vuex';

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
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasNext: false,
        hasPre: false,
      },
      products: [],
    }),
    created() {
      this.category = this.$route.query.category;
      this.fetchData();
      // this.getProducts()
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
    methods: {
      pageTurning(from, to) {
        if (from === to) {
          return ""
        }

        this.$set(this.pagination, "currentPage", to);
        this.$set(this.pagination, "hasNext", to !== this.pagination.totalPages);
        this.$set(this.pagination, "hasPre",  to !== 1);
      },
      fetchData() {
        this.$store.dispatch("forestage/getAllProducts").then(() => {
          this.products = this.getProductsByCategory(this.category);
          this.$set(this.pagination, "currentPage", 1);
          this.$set(this.pagination, "totalPages", Math.ceil(this.products.length / 9.0));
          this.$set(this.pagination, "hasNext", this.products > 9);
          this.$set(this.pagination, "hasPre", false);
        })
      },

      addToCart(item) {
        console.log("addToCart", item)
      }
      ,
      toProductDetail(item) {
        routerUtil.gotoForeProductDetail(this.$router, item.id);
      }
    },
    watch: {
      category(newVal, oldVal) {
        this.products = this.getProductsByCategory(newVal);
        this.$set(this.pagination, "currentPage", 1);
        this.$set(this.pagination, "totalPages", Math.ceil(this.products.length / 9.0));
        this.$set(this.pagination, "hasNext", this.products > 9);
        this.$set(this.pagination, "hasPre", false);
      },
    },
    computed: {
      ...mapGetters("forestage", [
        "isLoading",
        "getAllProducts",
        "getProductsByCategory"
      ]),
      displayTitle() {
        return this.$t(`foreProducts.categoryName.${this.category}`);
      },
      showProducts() {

        let start =  9 * (this.pagination.currentPage  - 1);
        // let end = Math.min(start + 9, this.products.length) ;
        let end =start + 9;
        return this.products.slice(start, end)
      }

    }
  };
</script>

<style scoped>
</style>
