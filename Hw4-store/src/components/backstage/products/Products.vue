<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="row flex-nowrap justify-content-between align-items-center">
      <h2 class="col-9">{{$t("manager.products")}}</h2>
      <div class="col-2 d-flex justify-content-end ">
        <a class="btn btn-sm btn-secondary" href="#" @click.prevent="showUploadDialog">
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
        <td class="text-right">{{props.item.originPrice | separator | dollarSign}}</td>
        <td class="text-right">{{props.item.price | separator | dollarSign}}</td>
        <td class="text-center">{{props.item.inventory}}</td>
        <td>
          <span v-if="props.item.isEnabled" class="text-success">
            {{$t("products.tableBody.status.putOnSale")}}
          </span>
          <span v-else>{{$t("products.tableBody.status.pullOffShelves")}}</span>
        </td>
        <td>
          <a class="btn btn-sm btn-outline-primary" href="#" @click.prevent="showModifyDialog(props.item)">
            {{$t("products.tableBody.edit")}}
          </a>
        </td>
      </template>

      <div slot="no-data" class="text-center mt-5">
        <div>
          <i class="fas fa-box-open fa-4x" style="color:rgba(108,117,125,0.31);"></i>
        </div>
        <p class="text-center mt-3" style="color:rgba(108,117,125,0.38);">
          {{$t("products.NoProducts")}}</p>
        <a class="btn btn-sm btn-secondary" href="#" @click.prevent="showUploadDialog">
          {{$t("products.newArrivals")}}</a>
      </div>

    </DataTable>

    <!-- Upload Dialog -->
    <ProductDialog
      :dialogId="uploadDialogId"
      :title="$t('products.dialogTitles.upload')"
      @done="uploadProduct"
    />

    <!-- Modify Dialog -->
    <ProductDialog
      :dialogId="modifyDialogId"
      :title="$t('products.dialogTitles.modify')"
      :product="modifyItem"
      @done="modifyProduct"
    />

  </div>
</template>

<script>
  import $ from "jquery"

  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"

  import DataTable from "@/components/common/DataTable.vue"
  import ProductDialog from "@/components/backstage/products/ProductDialog.vue"

  export default {
    name: "Products",
    components: {
      DataTable,
      ProductDialog
    },
    data: () => ({
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasNext: false,
        hasPre: false,
      },
      products: [],
      headers: [],
      isLoading: false,
      uploadDialogId: "uploadDialog",
      modifyDialogId: "modifyDialog",
      modifyItem: {}
    }),
    created() {
      this.getProducts();
      this.initHeaders();
    },
    methods: {
      initHeaders() {
        // TODO:庫存
        this.headers = [
          {name: this.$t("products.tableHeaders.classification"), width: 120},
          {name: this.$t("products.tableHeaders.productName"), width: ""},
          {name: this.$t("products.tableHeaders.originalPrice"), width: 120},
          {name: this.$t("products.tableHeaders.price"), width: 120},
          {name: this.$t("products.tableHeaders.inventory"), width: 80},
          {name: this.$t("products.tableHeaders.status"), width: 100},
          {name: this.$t("products.tableHeaders.edit"), width: 100}
        ]
      },
      pageTurning(from, to) {
        if (from === to) {
          return ""
        }
        this.getProducts(to);
      },
      getProducts(index = 1) {
        this.isLoading = true;
        let vm = this;
        apiUtil.getProducts(this.$http, index).then((response) => {
          logger.debug(this, "getProducts", response);
          if (response.data.success) {
            vm.products = response.data.products.map((item) => {
              return {
                id: item.id,
                title: item.title,
                category: item.category,
                content: item.content,
                description: item.description,
                inventory: item.inventory ? item.inventory : 1,
                unit: item.unit,
                originPrice: item.origin_price,
                price: item.price,
                isEnabled: item.is_enabled,
                imageUrl: item.image,
              }
            });

            vm.pagination = {
              currentPage: response.data.pagination.current_page,
              totalPages: response.data.pagination.total_pages,
              hasNext: response.data.pagination.has_next,
              hasPre: response.data.pagination.has_pre,
            };
          }
          this.isLoading = false;
        })
      },
      showUploadDialog() {
        $(`#${this.uploadDialogId}`).modal("show");
      },
      hideUploadDialog() {
        $(`#${this.uploadDialogId}`).modal("hide");
      },
      uploadProduct(item) {
        this.isLoading = true;
        this.hideUploadDialog();

        item = {
          id: item.id,
          title: item.title,
          category: item.category,
          content: item.content,
          description: item.description,
          inventory: item.inventory,
          unit: item.unit,
          origin_price: item.originPrice,
          price: item.price,
          is_enabled: item.isEnabled,
          image: item.imageUrl,
        };

        apiUtil.uploadProduct(this.$http, item).then((response) => {
          logger.debug(this, "uploadProduct", response);
          this.$bus.$emit('message:push', `${response.data.message}:${item.title}`,
            response.data.success ? "success" : "danger");

          this.isLoading = false;
          this.getProducts(this.pagination.currentPage)
        });

      },
      showModifyDialog(item) {
        this.modifyItem = item;
        $(`#${this.modifyDialogId}`).modal("show");
      },
      hideModifyDialog() {
        $(`#${this.modifyDialogId}`).modal("hide");
      },
      modifyProduct(item) {
        this.isLoading = true;
        this.hideModifyDialog();

        item = {
          id: item.id,
          title: item.title,
          category: item.category,
          content: item.content,
          description: item.description,
          inventory: item.inventory,
          unit: item.unit,
          origin_price: item.originPrice,
          price: item.price,
          is_enabled: item.isEnabled,
          image: item.imageUrl,
        };

        apiUtil.modifyProduct(this.$http, item).then((response) => {
          logger.debug(this, "modifyProduct", response);
          this.$bus.$emit('message:push', `${response.data.message}:${item.title}`,
            response.data.success ? "success" : "danger");

          this.isLoading = false;
          this.getProducts(this.pagination.currentPage)
        });
      },
    }
  }
</script>

<style scoped>

</style>
