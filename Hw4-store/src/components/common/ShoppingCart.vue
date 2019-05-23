<template>
  <div class="dropdown">

    <a v-if="cartStyle==='iconOnly'" class="icon-link p-2" href="#"
       data-toggle="dropdown">
      <i class="fa fa-shopping-basket" aria-hidden="true">({{countTotalOrder}})</i>
    </a>

    <a v-if="cartStyle==='button'" class="btn btn-sm btn-outline-primary"
       href="#" data-toggle="dropdown">
      <i class="fa fa-shopping-basket" aria-hidden="true"></i>
      {{ $t("shoppingCart.shoppingCart")}}({{countTotalOrder}})
    </a>

    <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px" data-offset="400">
      <h6>{{$t("shoppingCart.selectedItem")}}</h6>
      <table class="table table-sm">
        <tbody>
        <tr v-for="(item,index) in getOrderList" :key="index">
          <td class="align-middle text-center">
            <a href="#removeModal" class="text-muted" data-toggle="modal" :data-title="item.name">
              <i class="far fa-trash-alt" aria-hidden="true"></i>
            </a>
          </td>
          <td class="align-middle">{{item.name}}</td>
          <td class="align-middle">{{item.quantityWithUnit}}</td>
          <td class="align-middle text-right">{{item.amount}}</td>
        </tr>
        </tbody>
      </table>
      <a class="btn btn-sm btn-outline-secondary btn-block" href="#">
        <i class="fa fa-cart-plus" aria-hidden="true"></i>  {{ $t("shoppingCart.checkOut")}}
      </a>
    </div>

  </div>

</template>

<script>
  export default {
    name: "ShoppingCart",
    props: {
      cartStyle:{
        type: String,
        default: "button"
      },
      orderList: {
        type: Array,
        default: function () {
          return [
            {
              item: "金牌女裝",
              quantity: 1,
              unit: "件",
              amount: '480'
            },
            {
              item: "金牌西裝",
              quantity: 1,
              unit: "件",
              amount: '520'
            }
          ]
        }
      }
    },
    computed: {
      // TODO: 尚未實做
      getOrderList() {
        return this.orderList.map((item) => {
          let name = item.item;
          let quantityWithUnit = `${item.quantity}  ${item.unit}`;
          let amount = item.amount;
          return {name, quantityWithUnit, amount}
        });
      },
      countTotalOrder() {
        return this.orderList.length;
      }
    }
  }

</script>

<style scoped>

</style>
