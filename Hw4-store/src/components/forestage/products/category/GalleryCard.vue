<template>
  <div class="col-12 col-md-4 mb-3 text-dark customized-card"
       :class="{'sellout-badge':item.isEnabled === 0}">

    <div class="card gallery-style on-hover">
      <img class="card-img-top" :src="item.imageUrl" alt="Card image cap">

      <div class="card-body">
        <h5 class="card-title"> {{item.title}}</h5>

        <div class="row">
          <div class="p-2 flex-fill">
            <template v-if="item.originPrice === item.price">
              {{`${$t("foreProducts.card.originalPrice")}:`}}
              <span
                class="font-weight-bold h3 align-items-center">{{ item.originPrice | separator  | dollarSign}}</span>
            </template>

            <template v-else>
              {{`${$t("foreProducts.card.discountPrice")}:`}}
              <span class="text-secondary font-weight-bold h3 align-items-center">{{ item.price | separator  | dollarSign}}</span>
            </template>
          </div>

          <a class="btn m-2 btn-tertiary" href="#">
            <i class="fas fa-cart-plus"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GalleryCard",
    props: {
      item: {
        type: Object,
        default: {}
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/all.scss";

  .sellout-badge {
    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-color: rgba($white, .70);
    }

    &::before {
      content: "已售完";
      display: block;
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 80px;
      width: 80px;
      height: 80px;
      border-radius: 500px;
      font-size: 18px;
      color: $text-muted;
      background-color: rgba($tertiary, .65);
    }
  }

  .customized-card {
    .on-hover {
      transition: all 0.3s;

      &:hover {
        border: 1px solid $tertiary;
        box-shadow: 0 0.5rem 1rem $gray-300;
      }
    }

    .product-card {
      border: 1px solid $gray-400;

      .card-img-top {
        height: 200px;
      }
    }

  }
</style>
