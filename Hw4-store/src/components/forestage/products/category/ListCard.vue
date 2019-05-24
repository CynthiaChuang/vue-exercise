<template>
  <div class="p-0 customized-card"
       :class="{'sellout-badge':item.isEnabled === 0}">
    <li class="row mb-3 on-hover no-gutters list-style"
        >
      <div class="col-3">
        <div class="card-img-left"
             :style="{backgroundImage:`url('${item.imageUrl}')`}"></div>
      </div>
      <div class="col">
        <div class="row ml-1 p-3 no-gutters">
          <div class="col">
            <div class="h5">{{item.title}}</div>
            <div class="samll mb-4 d-none d-md-block">{{item.description}}</div>

            <p v-if="item.originPrice === item.price" class="mb-0">
              {{`${$t("foreProducts.card.originalPrice")}:`}}
              <span class="font-weight-bold h3 align-items-center">
                  {{ item.originPrice | separator  | dollarSign }}
                </span>
            </p>

            <p v-else class="mb-0">
              {{`${$t("foreProducts.card.originalPrice")}:`}}
              <del class="h6 mr-2">{{ item.originPrice| separator | dollarSign }}</del>
              {{`${$t("foreProducts.card.discountPrice")}:`}}
              <span class="font-weight-bold h3 align-items-center text-secondary">{{ item.price | separator  | dollarSign }}</span>
            </p>

          </div>
          <div class="col-2 d-flex justify-content-center align-items-center cursor-pointer">
            <div class="">
              <a class="btn m-2 btn-tertiary" href="#">
                <i class="fas fa-cart-plus"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
  export default {
    name: "ListCard",
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

    .list-style {
      border: 1px solid $gray-400;
      border-radius: 0.25rem;

      .card-img-left {
        height: 100%;
        background-size: cover;
        background-position: center center;
      }
    }
  }
</style>
