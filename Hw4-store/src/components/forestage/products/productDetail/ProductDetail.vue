<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row mb-0">
      <div class="col-md-6">
        <a :href="detail.imageUrl">
          <img
            width="500" height="350"
            :src="detail.imageUrl"
            class="rounded" alt="" :title="detail.title"
            data-caption=""/>
        </a>
      </div>
      <div class="product-info summary col-fit col entry-summary product-summary form-flat">

        <ol class="breadcrumb small text-gray">
          <li v-for="item in breadcrumbs" class="breadcrumb-item">
            <a href="#">{{item.name}}</a>
          </li>
        </ol>

        <h5>{{detail.title}}</h5>
        <hr>
        <p v-if="detail.originPrice === detail.price">
          <span class="font-weight-bold h4 align-items-center">
            {{ detail.originPrice | separator  | dollarSign }}
          </span>
        </p>
        <p v-else>
          <del class="h6 mr-2">{{ detail.originPrice| separator | dollarSign }}</del>
          <span class="font-weight-bold h4 align-items-center text-secondary">{{ detail.price | separator  | dollarSign }}</span>
        </p>

        <p class="text-muted">{{detail.description}}</p>

        <div class="row  mt-5 align-items-center no-gutters">
          <div class="col-md-8">
            <div class="qty ">
              <span class="sign" :class="{disabled:quantity===1}" @click.prevent="counter('minus')">-</span>
              {{$t("detail.want")}}
              <input type="number" class="count" min="1" :max="detail.inventory" name="qty"
                     v-model="quantity">
              {{detail.unit}}
              <span class="sign" :class="{disabled:quantity===detail.inventory}"
                    @click.prevent="counter('plus')">+</span>
            </div>

          </div>
          <div class="col-md-4 d-flex justify-content-end">
            <a class="btn  btn-outline-primary radius-btn" href="#" @click.prevent="addToCart(detail,quantity)">
              <i class="fas fa-cart-plus" aria-hidden="true"></i>
              {{$t("detail.addToCart")}}
            </a>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="row container">
      <div class="col pb-0 mb-0">
        <h5 class="uppercase mt">描述</h5>
      </div>

      <p v-html="detail.newContent" class="col-md-9 pb-0 mb-0"></p>
    </div>


  </div>
</template>

<script>
  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  export default {
    name: "ProductDetail",
    data: () => ({
      breadcrumbs: [],
      isLoading: false,
      productId: "",
      detail: {},
      quantity: 1,
    }),
    created() {
      this.productId = this.$route.params.id;
      this.getForeProductDetail();
      this.initBreadcrumbs();
    },
    methods: {
      pushAlertMessage(message = "", style = "warning") {
        this.$bus.$emit('message:push', message, style);
      },
      getForeProductDetail() {
        this.isLoading = true;
        let vm = this;
        apiUtil.getForeProductDetail(this.$http, this.productId).then((response) => {
          logger.debug(this, "getForeProductDetail", response);
          if (response.data.success) {
            vm.detail = apiUtil.productToLocalFormat(response.data.product);
            vm.detail.newContent = vm.parserContent(vm.detail.content);

            this.breadcrumbs.push({
              name: this.$t(`classification.${this.detail.category}`),
              action: () => {
                routerUtil.gotoCategory(vm.$route, vm.detail.category)
              }
            })

          } else {
            this.pushAlertMessage(this.$t("detail.error"), "danger");
            routerUtil.gotoBack(this.$router);
          }
          this.isLoading = false;
        })
      },
      initBreadcrumbs() {
        this.breadcrumbs = [
          {
            name: this.$t(`common.home`),
            action: () => {
              routerUtil.gotoHomePage(this.$route)
            }
          },
        ]
      },
      counter(type = "plus") {
        if (type !== "plus" && type !== "minus") {
          return
        }

        this.quantity = type === "plus" ? this.quantity + 1 : this.quantity - 1;
        this.quantity = Math.max(this.quantity, 1);
        this.quantity = Math.min(this.quantity, this.detail.inventory);
      },
      parserContent(content) {
        return content.replace(/\n/g, "<br>")
      },
      addToCart(item, qty) {
        console.log("addToCart", item, qty)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/all.scss";

  .breadcrumb {
    background: transparent;
    padding: 0;
  }

  .radius-btn {
    border-radius: 2rem;
  }


  .qty {
    background: transparent;

    .count {
      color: black;
      display: inline-block;
      vertical-align: top;
      font-size: 25px;
      font-weight: 700;
      line-height: 30px;
      padding: 0 2px;
      min-width: 35px;
      text-align: center;
    }

    .sign {
      background: $primary;
      cursor: pointer;
      display: inline-block;
      vertical-align: top;
      color: white;
      width: 30px;
      height: 30px;
      font: 30px/1 Arial, sans-serif;
      text-align: center;
      border-radius: 50%;

      &:hover {
        background-color: $secondary !important;
      }
    }

    .disabled {
      background: $disabled;

      &:hover {
        background-color: $disabled !important;
      }
    }

    span {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    input {
      border: 0;
      width: 2%;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input:disabled {
      background-color: white;
    }
  }
</style>
