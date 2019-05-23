<template>
  <Dialog
    :dialogId="dialogId"
    :title="title"
    @cancel="onCancel"
    @done="onDone">

    <slot>
      <div class="form-group">
        <label for="title">{{$t("coupons.couponsDialog.title")}}</label>
        <input type="text" class="form-control" id="title" name="title"
               :class="{'is-invalid':errors.has('title')}"
               :placeholder="$t('coupons.couponsDialog.titleHint')"
               v-model="cloneCoupon.title"
               v-validate="'required'">
        <span class="text-danger" v-show="errors.has('title')">
          {{$t("coupons.couponsDialog.titleError")}}
        </span>
      </div>

      <div class="row">
        <div class="col-sm-7">
          <div class="form-group">
            <label for="code">{{$t("coupons.couponsDialog.code")}}</label>
            <input type="text" class="form-control" id="code" name="code"
                   :class="{'is-invalid':errors.has('code')}"
                   :placeholder="$t('coupons.couponsDialog.codeHint')"
                   v-model="cloneCoupon.code"
                   v-validate="'required|alpha_dash'">
            <span class="text-danger" v-show="errors.has('code')">
                {{$t("coupons.couponsDialog.codeError")}}
            </span>
          </div>

          <div class="form-group">
            <label for="percent">{{$t("coupons.couponsDialog.percent")}}</label>
            <input type="number" class="form-control" id="percent" name="percent"
                   :class="{'is-invalid':errors.has('percent')}"
                   :placeholder="$t('coupons.couponsDialog.percentHint')"
                   v-model="cloneCoupon.percent"
                   v-validate="'required|positive-number'">
            <span class="text-danger" v-show="errors.has('percent')">
              {{$t("coupons.couponsDialog.percentError")}}
            </span>
          </div>

          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     id="is_enabled"
                     v-model="cloneCoupon.isEnabled"
                     :true-value="1"
                     :false-value="0">
              <label class="form-check-label" for="is_enabled">
                {{$t("coupons.couponsDialog.directlyGive")}}
              </label>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <div class="form-group">
            <label>{{$t("coupons.couponsDialog.dueDate")}}</label>
            <datepicker :inline="true" v-model="cloneCoupon.dueDate"></datepicker>
            <span class="text-danger" v-show="errors.has('dueDate')">
                {{$t("coupons.couponsDialog.dueDateError")}}
            </span>
          </div>
        </div>
      </div>
    </slot>
  </Dialog>


</template>

<script>
  import Datepicker from 'vuejs-datepicker';

  import Dialog from "@/components/common/Dialog.vue"

  export default {
    name: "CouponDialog",
    components: {
      Dialog,
      Datepicker
    },
    data: () => ({
      cloneCoupon: {
        dueDate: new Date(),
        percent: 100,
      },
    }),
    props: {
      title: {
        type: String,
        default: ""
      },
      dialogId: {
        type: String,
        required: true
      },
      coupon: {
        type: Object,
        default: () => {
        }
      }
    },
    watch: {
      coupon() {
        this.setCloneCoupon(this.coupon)
      }
    },
    methods: {
      setCloneCoupon(originCoupon){
        this.cloneCoupon={
          dueDate: new Date(),
          percent: 100,
        };
        if(originCoupon){
          this.cloneCoupon = Object.assign({}, originCoupon);
        }
      },
      onDone() {
        this.$validator.validate().then((valid) => {
          if (valid) {
            this.$emit("done", this.cloneCoupon);
            this.onCancel();
          }
        });
      },
      onCancel() {
        this.setCloneCoupon(this.coupon)
        this.errors.clear();
      }
    }
  }
</script>

<style scoped>

</style>
