<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <h2>{{$t("manager.coupons")}}</h2>

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
      ref="ordersTable"
      :headers="headers"
      :tableItem="coupons"
      :pagination="pagination"
      @pageTurning="pageTurning">

<!--      <template slot-scope="props">-->
<!--        <td>{{props.item.category}}</td>-->
<!--        <td>{{props.item.title}}</td>-->
<!--        <td class="text-right">{{props.item.originPrice | separator | dollarSign}}</td>-->
<!--        <td class="text-right">{{props.item.price | separator | dollarSign}}</td>-->
<!--        <td class="text-center">{{props.item.inventory}}</td>-->
<!--        <td>-->
<!--          <span v-if="props.item.isEnabled" class="text-success">-->
<!--            {{$t("products.tableBody.status.putOnSale")}}-->
<!--          </span>-->
<!--          <span v-else>{{$t("products.tableBody.status.pullOffShelves")}}</span>-->
<!--        </td>-->
<!--        <td>-->
<!--          <a class="btn btn-sm btn-outline-primary" href="#" @click.prevent.stop="showModifyDialog(props.item)">-->
<!--            {{$t("products.tableBody.edit")}}-->
<!--          </a>-->
<!--        </td>-->
<!--      </template>-->

      <div slot="no-data" class="text-center mt-5">
        <div>
          <i class="fas fa-file-invoice-dollar fa-4x" style="color:rgba(108,117,125,0.31);"></i>
        </div>
        <p class="text-center mt-3" style="color:rgba(108,117,125,0.38);">
          {{$t("coupons.noCoupons.message")}}</p>
        <a class="btn btn-sm btn-secondary" href="#" @click.prevent="gotoProducts">
          <i class="fas fa-plus"></i>
          {{$t("coupons.noCoupons.btn")}}
        </a>
      </div>

    </DataTable>

    <!-- Modify Dialog -->
    <CouponDialog
      :dialogId="orderDialogId"
      :title="$t('orders.dialogTitles')"
      :product="modifyItem"
      @done="modifyOrder"
    />

  </div>
</template>

<script>
  import $ from "jquery"

  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  import DataTable from "@/components/common/DataTable.vue"
  import CouponDialog from "./CouponDialog.vue"

  export default {
    name: "Coupons",
    components: {
      DataTable,
      CouponDialog
    },
    data: () => ({
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasNext: false,
        hasPre: false,
      },
      coupons: [],
      headers: [],
      isLoading: false,
      orderDialogId: "orderDialog",
      modifyItem: {},
      buttons:[],
    }),
    created() {
      this.getOrders();
      this.initHeaders();
      this.initButtons();
    },
    methods: {
      initHeaders() {
        this.headers = [
          {name: this.$t("coupons.tableHeaders.title"), width: ""},
          {name: this.$t("coupons.tableHeaders.code"), width: 120},
          {name: this.$t("coupons.tableHeaders.percent"), width: 120},
          {name: this.$t("coupons.tableHeaders.dueDate"), width: ""},
          {name: this.$t("coupons.tableHeaders.status"), width: 100},
          {name: this.$t("coupons.tableHeaders.edit"), width: 100}
        ]
      },
      initButtons() {
        this.buttons = [
          {
            name: this.$t("common.buttons.add"),
            disabled: false,
            highlight: true,
            icon: ["fas fa-plus"],
            action: this.refresh
          },
          {
            name: this.$t("common.buttons.refresh"),
            disabled: false,
            highlight: false,
            icon: ["fas fa-sync"],
            action: this.refresh
          },
          {
            name: this.$t("coupons.buttons.give"),
            disabled: true,
            highlight: false,
            icon: ["fas fa-dollar-sign"],
            action: this.refresh
          },
          {
            name: this.$t("coupons.buttons.cancel"),
            disabled: true,
            highlight: false,
            icon: ["fas fa-strikethrough"],
            action: this.refresh
          },
          {
            name: this.$t("common.buttons.delete"),
            disabled: true,
            highlight: false,
            icon: ["far fa-trash-alt"],
            action: this.refresh
          }
          ]
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
        this.getOrders(to);
      },
      getOrders(index = 1) {
        this.isLoading = true;
        let vm = this;
        apiUtil.getOrders(this.$http, index).then((response) => {
          logger.debug(this, "getOrders", response);
          if (response.data.success) {
            // vm.orders = response.data.orders;
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
      refresh(){
        this.getOrders(this.pagination.currentPage)
      },
      gotoProducts(){
        routerUtil.gotoProducts(this.$router);
      },
      showOrderDialog(item) {
        this.modifyItem = item;
        $(`#${this.orderDialogId}`).modal("show");
      },
      hideOrderDialog(){
        $(`#${this.orderDialogId}`).modal("hide");
      },
      modifyOrder(){
        this.isLoading = true;
        this.hideModifyDialog();
      }
    }
  }
</script>

<style scoped>
  .not-active {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color:  #dee2e6;
  }
</style>
