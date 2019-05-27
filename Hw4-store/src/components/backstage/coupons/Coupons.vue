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
      ref="couponsTable"
      :headers="headers"
      :tableItem="coupons"
      :pagination="pagination"
      @pageTurning="pageTurning">

      <template slot-scope="props">
        <td class="text-left">{{props.item.title}}</td>
        <td>{{props.item.code}}</td>
        <td>{{props.item.percent}}</td>
        <td>{{props.item.dueDate}}</td>

        <td>
          <span v-if="props.item.isEnabled" class="text-success">
            {{$t("coupons.tableBody.status.give")}}
          </span>
          <span v-else>{{$t("coupons.tableBody.status.ungive")}}</span>
        </td>

        <td>
          <a class="btn btn-sm btn-outline-primary" href="#"
             @click.prevent.stop="showModifyCouponDialog(props.item)">
            {{$t("products.tableBody.edit")}}
          </a>
        </td>
      </template>

      <div slot="no-data" class="text-center mt-5">
        <div>
          <i class="fas fa-file-invoice-dollar fa-4x" style="color:rgba(108,117,125,0.31);"></i>
        </div>
        <p class="text-center mt-3" style="color:rgba(108,117,125,0.38);">
          {{$t("coupons.noCoupons.message")}}</p>
        <a class="btn btn-sm btn-secondary" href="#" @click.prevent="showCreateCouponDialog">
          <i class="fas fa-plus"></i>
          {{$t("coupons.noCoupons.btn")}}
        </a>
      </div>

    </DataTable>

    <!-- Created Dialog -->
    <CouponDialog
      :dialogId="createCouponDialogId"
      :title="$t('coupons.dialogTitles')"
      @done="createCoupon"
    />

    <!-- Modify Dialog -->
    <CouponDialog
      :dialogId="modifyCouponDialogId"
      :title="$t('coupons.dialogTitles')"
      :coupon="modifyItem"
      @done="modifyCoupon"
    />
  </div>
</template>

<script>
  import $ from "jquery"

  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"

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
      createCouponDialogId: "createCouponDialog",
      modifyCouponDialogId: "modifyCouponDialog",
      modifyItem: {},
      buttons:[],
    }),
    created() {
      this.getCoupons();
      this.initHeaders();
      this.initButtons();
    },
    mounted () {
      this.$watch(
        () => {
          return this.$refs.couponsTable.checkedValues.length
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
          {name: this.$t("coupons.tableHeaders.title"), width: ""},
          {name: this.$t("coupons.tableHeaders.code"), width: 120},
          {name: this.$t("coupons.tableHeaders.percent"), width: 100},
          {name: this.$t("coupons.tableHeaders.dueDate"), width: 140},
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
            action: this.showCreateCouponDialog
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
            action: this.giveCoupons
          },
          {
            name: this.$t("coupons.buttons.cancel"),
            disabled: true,
            highlight: false,
            icon: ["fas fa-strikethrough"],
            action: this.cancelCoupons
          },
          {
            name: this.$t("common.buttons.delete"),
            disabled: true,
            highlight: false,
            icon: ["far fa-trash-alt"],
            action: this.deleteBatchCoupons
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
        this.getCoupons(to);
      },
      getCoupons(index = 1) {
        this.isLoading = true;
        let vm = this;
        apiUtil.getCoupons(this.$http, index).then((response) => {
          logger.debug(this, "getCoupons", response);
          if (response.data.success) {

            vm.coupons = response.data.coupons.map((item) => {
              return {
                id: item.id,
                title: item.title,
                code: item.code,
                percent: item.percent ? item.percent : 100,
                // dueDate: item.due_date,
                dueDate: item.due_date ? new Date(item.due_date * 1000).toISOString().split('T')[0] : new Date(),
                isEnabled: item.is_enabled
              }
            });

            vm.pagination = apiUtil.paginationToLocalFormat(response.data.pagination);
          }
          this.isLoading = false;
        })
      },
      refresh(){
        this.getCoupons(this.pagination.currentPage)
      },
      showModifyCouponDialog(item) {
        this.modifyItem = item;
        $(`#${this.modifyCouponDialogId}`).modal("show");
      },
      hideModifyCouponDialog(){
        $(`#${this.modifyCouponDialogId}`).modal("hide");
      },
      modifyCoupon(item){
        this.isLoading = true;
        this.hideModifyCouponDialog();

        item = {
          id: item.id,
          title: item.title,
          code: item.code,
          percent: item.percent,
          due_date: Math.floor(new Date(item.dueDate) / 1000),
          is_enabled: item.isEnabled,
        };

        apiUtil.modifyCoupon(this.$http, item).then((response) => {
          logger.debug(this, "modifyCoupon", response);
          this.pushAlertMessage(`${response.data.message}:${item.title}`,
            response.data.success ? "success" : "danger");

          this.isLoading = false;
          this.getCoupons(this.pagination.currentPage)
        });

      },
      showCreateCouponDialog() {
        $(`#${this.createCouponDialogId}`).modal("show");
      },
      hideCreateCouponDialog(){
        $(`#${this.createCouponDialogId}`).modal("hide");
      },
      createCoupon(item){
        this.isLoading = true;
        this.hideCreateCouponDialog();

        item = {
          id: item.id,
          title: item.title,
          code: item.code,
          percent: item.percent,
          due_date: Math.floor(new Date(item.dueDate) / 1000),
          is_enabled: item.isEnabled,
        };

        apiUtil.createCoupon(this.$http, item).then((response) => {
          logger.debug(this, "createCoupon", response);
          this.pushAlertMessage(`${response.data.message}:${item.title}`,
            response.data.success ? "success" : "danger");

          this.isLoading = false;
          this.getCoupons(this.pagination.currentPage)
        });

      },
      deleteBatchCoupons() {
        this.isLoading = true;
        let deleteItems = this.$refs.couponsTable.checkedValues.map((item) => {
          return {id: item.id, title: item.title}
        });

        apiUtil.deleteBatchCoupons(this.$http, 0, deleteItems, [], (responses) => {
          logger.debug(this, "deleteBatchCoupons", responses);

          let failed = [];

          for (let res of responses) {
            if (!res.message) {
              failed.push(res.title);
            }
          }

          let alertStyle = failed.length <= 0 ? "success" : "danger";
          let message = "";
          if (failed.length === 0) {
            message = this.$t("coupons.deleteError.success");
          } else if (failed.length > 0 && failed.length !== deleteItems.length) {
            message = `${this.$t("coupons.deleteError.someFail")}:${failed}`;
          } else {
            message = this.$t("coupons.deleteError.fail");
          }

          this.pushAlertMessage(message, alertStyle);

          this.isLoading = false;
          this.getCoupons(this.pagination.currentPage)
        });
      },
      getSelectedCoupons(status = "giveCoupons") {
        let enabled = status !== "giveCoupons";

        return this.$refs.couponsTable.checkedValues
          .filter((item) => {
            return enabled
          })
          .map((item) => {
            return {
              id: item.id,
              title: item.title,
              code: item.code,
              percent: item.percent ,
              due_date: Math.floor(new Date(item.dueDate) / 1000),
              is_enabled: !enabled
            };
          });
      },
      cancelCoupons(){
        this.isLoading = true;
        let items = this.getSelectedCoupons("cancelCoupons");
        this.isLoading = false;
        this.modifyBatchCoupons(items, "cancelCoupons");
      },
      giveCoupons(){
        this.isLoading = true;
        let items = this.getSelectedCoupons("giveCoupons");
        this.isLoading = false;
        this.modifyBatchCoupons(items, "giveCoupons");
      },
      modifyBatchCoupons(items, messageType = 'giveCoupons') {
        this.isLoading = true;
        apiUtil.modifyBatchCoupons(this.$http, 0, items, [], (responses) => {
          logger.debug(this, "modifyBatchCoupons", responses);

          let failed = [];
          for (let res of responses) {
            if (!res.message) {
              failed.push(res.title);
            }
          }

          let alertStyle = failed.length <= 0 ? "success" : "danger";
          let message = "";
          if (failed.length === 0) {
            message = this.$t(`coupons.${messageType}.success`);

          } else if (failed.length > 0 && failed.length !== items.length) {
            message = `${this.$t(`coupons.${messageType}..someFail`)}:${failed}`;

          } else {
            message = this.$t(`coupons.${messageType}.fail`);
          }

          this.pushAlertMessage(message, alertStyle);
          this.isLoading = false;
          this.getCoupons(this.pagination.currentPage)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/all.scss";

  .not-active {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: $gray-300;
  }
</style>
