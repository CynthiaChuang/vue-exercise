<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <h2>{{$t("manager.products")}}</h2>

    <div class="row mt-4 container justify-content-end ">
      <a v-for="(btn,idx) in buttons" :key="idx"
         href="#" @click.prevent="btn.action"
         class="btn btn-sm ml-2"
         :class="getButtonClass(btn.highlight,btn.disabled )">
        <i :class="btn.icon"></i>
        {{btn.name}}
      </a>

    </div>

    <DataTable
      ref="productsTable"
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
          <a class="btn btn-sm btn-outline-primary" href="#" @click.prevent.stop="showModifyDialog(props.item)">
            {{$t("products.tableBody.edit")}}
          </a>
        </td>
      </template>

      <div slot="no-data" class="text-center mt-5">
        <div>
          <i class="fas fa-box-open fa-4x" style="color:rgba(108,117,125,0.31);"></i>
        </div>
        <p class="text-center mt-3" style="color:rgba(108,117,125,0.38);">
          {{$t("products.noProducts.message")}}</p>
        <a class="btn btn-sm btn-secondary" href="#" @click.prevent="showUploadDialog">
          <i class="fas fa-plus"></i>
          {{$t("products.noProducts.btn")}}
        </a>
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
      modifyItem: {},
      buttons:[],
    }),
    created() {
      this.getProducts();
      this.initHeaders();
      this.initButtons();
    },
    mounted () {
      this.$watch(
        () => {
          return this.$refs.productsTable.checkedValues.length
        },
        (val) => {
          this.buttons.forEach((item) => {
            if (item.name !== this.$t("common.buttons.add") &&  item.name !== this.$t("common.buttons.refresh")) {
              item.disabled = val === 0;
            }
          })
        })
    },
    methods: {
      initHeaders() {
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
      initButtons() {
        this.buttons = [
          {
            name: this.$t("common.buttons.add"),
            disabled: false,
            highlight: true,
            icon: ["fas fa-plus"],
            action: this.showUploadDialog
          },
          {
            name: this.$t("common.buttons.refresh"),
            disabled: false,
            highlight: false,
            icon: ["fas fa-sync"],
            action: this.refresh
          },
          {
            name: this.$t("products.buttons.putOnSale"),
            highlight: false,
            disabled: true,
            icon: ["fas fa-upload"],
            action: this.putProductsOnSale
          },
          {
            name: this.$t("products.buttons.pullOffShelves"),
            highlight: false,
            disabled: true,
            icon: ["fas fa-download"],
            action: this.pullOffProducts
          },
          {
            name: this.$t("common.buttons.delete"),
            highlight: false,
            disabled: true,
            icon: ["far fa-trash-alt"],
            action: this.deleteBatchProducts
          }]
      },
      getButtonClass(highlight, disabled) {
        let bynClass = [];

        if (disabled) {
          bynClass.push("not-active");
          bynClass.push("btn-outline-disabled");

        } else if (highlight) {
          bynClass.push("btn-outline-secondary");

        } else {
          bynClass.push("btn-outline-primary");
        }
        return bynClass
      },
      pushAlertMessage(message = "", style = "warning") {
        this.$bus.$emit('message:push', message, style);
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
              return apiUtil.productToLocalFormat(item)
            });
            vm.pagination = apiUtil.paginationToLocalFormat(response.data.pagination);
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

        item = apiUtil.productToServerFormat(item);
        apiUtil.createProduct(this.$http, item).then((response) => {
          logger.debug(this, "createProduct", response);
          this.pushAlertMessage(`${response.data.message}:${item.title}`,
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

        item = apiUtil.productToServerFormat(item);
        apiUtil.modifyProduct(this.$http, item).then((response) => {
          logger.debug(this, "modifyProduct", response);
          this.pushAlertMessage(`${response.data.message}:${item.title}`,
            response.data.success ? "success" : "danger");

          this.isLoading = false;
          this.getProducts(this.pagination.currentPage)
        });
      },
      deleteBatchProducts() {
        this.isLoading = true;
        let deleteItems = this.$refs.productsTable.checkedValues.map((item) => {
          return {id: item.id, title: item.title}
        });

        apiUtil.deleteBatchProducts(this.$http, 0, deleteItems, [], (responses) => {
          logger.debug(this, "deleteBatchProducts", responses);

          let failed = [];

          for (let res of responses) {
            if (!res.message) {
              failed.push(res.title);
            }
          }

          let alertStyle = failed.length <= 0 ? "success" : "danger";
          let message = "";
          if (failed.length === 0) {
            message = this.$t("products.deleteError.success");
          } else if (failed.length > 0 && failed.length !== deleteItems.length) {
            message = `${this.$t("products.deleteError.someFail")}:${failed}`;
          } else {
            message = this.$t("products.deleteError.fail");
          }

          this.pushAlertMessage(message, alertStyle);

          this.isLoading = false;
          this.getProducts(this.pagination.currentPage)
        });
      },
      pullOffProducts(){
        this.isLoading = true;
        let items = this.$refs.productsTable.checkedValues
          .filter((item) => {
            return item.isEnabled
          })
          .map((item) => {
            item.isEnabled = false ;
            return apiUtil.productToServerFormat(item);
          });

        this.isLoading = false;
        this.modifyBatchProducts(items, "pullOffError");
      },
      putProductsOnSale(){
        this.isLoading = true;
        let items = this.$refs.productsTable.checkedValues
          .filter((item) => {
            return !item.isEnabled
          })
          .map((item) => {
            item.isEnabled = true ;
            return apiUtil.productToServerFormat(item);
          });
        this.isLoading = false;
        this.modifyBatchProducts(items, "putOnSaleError");
      },
      modifyBatchProducts(items, messageType = 'pullOffError') {
        this.isLoading = true;
        apiUtil.modifyBatchProducts(this.$http, 0, items, [], (responses) => {
          logger.debug(this, "modifyBatchProducts", responses);

          let failed = [];
          for (let res of responses) {
            if (!res.message) {
              failed.push(res.title);
            }
          }

          let alertStyle = failed.length <= 0 ? "success" : "danger";
          let message = "";
          if (failed.length === 0) {
            message = this.$t(`products.${messageType}.success`);

          } else if (failed.length > 0 && failed.length !== items.length) {
            message = `${this.$t(`products.${messageType}..someFail`)}:${failed}`;

          } else {
            message = this.$t(`products.${messageType}.fail`);
          }

          this.pushAlertMessage(message, alertStyle);
          this.isLoading = false;
          this.getProducts(this.pagination.currentPage)
        })
      },
      refresh(){
        this.getProducts(this.pagination.currentPage)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/all.scss";

  .not-active {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color:  $gray-300;
  }
</style>
