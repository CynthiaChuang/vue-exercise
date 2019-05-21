<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="row flex-nowrap justify-content-between align-items-center">
      <h2 class="col-9">{{$t("manager.products")}}</h2>
      <div class="col-2 d-flex justify-content-end ">
        <a class="btn btn-sm btn-secondary" href="#" @click.prevent="onNewArrivals">
          {{$t("products.newArrivals")}}
        </a>
      </div>
    </div>

    <DataTable
      :headers="headers"
      :tableItem="products"
      :pagination="pagination"
      @pageTurning="pageTurning">

      <template slot-scope="props">
        <td>{{props.item.category}}</td>
        <td>{{props.item.title}}</td>
        <td class="text-right">{{props.item.originPrice | separator | dollarSign}} </td>
        <td class="text-right">{{props.item.price | separator | dollarSign}}</td>
        <td>
          <span v-if="props.item.isEnabled" class="text-success">
            {{$t("products.status.putOnSale")}}
          </span>
          <span v-else>{{$t("products.status.pullOffShelves")}}</span>
        </td>
        <td>
          <a class="btn btn-sm btn-outline-primary" href="#" @click.prevent="onEdit">
            {{$t("products.edit")}}
          </a>
        </td>
      </template>


      <div slot="no-data" class="text-center mt-5">
        <div>
          <i class="fas fa-box-open fa-4x" style="color:rgba(108,117,125,0.31);"></i>
        </div>
        <p class="text-center mt-3" style="color:rgba(108,117,125,0.38);">
          {{$t("products.NoProducts")}}</p>
        <a class="btn btn-sm btn-secondary" href="#" @click.prevent="onNewArrivals">
          {{$t("products.newArrivals")}}</a>
      </div>

    </DataTable>
  </div>
</template>

<script>
  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"

  import DataTable from "@/components/common/DataTable.vue"

  export default {
    name: "Products",
    components: {DataTable},
    data: () => ({
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasNext: false,
        hasPre: false,
      },
      products: [],
      headers: [],
      isLoading: false
    }),
    created() {
      this.getProducts();
      this.initHeaders();
    },
    methods: {
      initHeaders() {
        this.headers = [
          {name: this.$t("products.headers.classification"), width: 120},
          {name: this.$t("products.headers.productName"), width: ""},
          {name: this.$t("products.headers.originalPrice"), width: 120},
          {name: this.$t("products.headers.price"), width: 120},
          {name: this.$t("products.headers.status"), width: 100},
          {name: this.$t("products.headers.edit"), width: 100}
        ]
      },
      pageTurning(from, to) {
        if (from === to) {
          return ""
        }
        this.getProducts(to);
      },
      getProducts(index = 1) {
        this.isLoading = true ;
        let vm = this;
        apiUtil.getProducts(this.$http, index).then((response) => {
          logger.debug(this, "getProducts", response);
          if (response.data.success) {
            vm.products = response.data.products.map((item) => {
              return {
                id: item.id,
                category: item.category,
                title: item.title,
                originPrice: item.origin_price,
                price: item.price,
                isEnabled: item.is_enabled
              }
            });

            vm.pagination = {
              currentPage: response.data.pagination.current_page,
              totalPages: response.data.pagination.total_pages,
              hasNext: response.data.pagination.has_next,
              hasPre: response.data.pagination.has_pre,
            };
          }
          this.isLoading = false ;
        })
      },
      onEdit() {

      },
      onNewArrivals() {

      }
    }
  }
</script>

<style scoped>

</style>
