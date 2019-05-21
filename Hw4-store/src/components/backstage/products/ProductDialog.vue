<template>

  <div class="modal fade" :id="dialogId" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">

        <!--header-->
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="onCancel">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!--body-->
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">{{$t("products.productDialog.imgLink")}}</label>
                <input type="text" class="form-control" id="image"
                       :placeholder="$t('products.productDialog.imgLinkHint')"
                       v-model="cloneProduct.imageUrl">
              </div>
              <div class="form-group">
                <label for="customFile">{{$t("products.productDialog.imgUplaod")}}
                  <i class="fas fa-spinner fa-spin" v-show="isImageUploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control"
                       ref="files" @change="uploadImage">
              </div>
              <img
                img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid" :src="cloneProduct.imageUrl" alt="">
            </div>

            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">{{$t("products.productDialog.title")}}</label>
                <input type="text" class="form-control" id="title"
                       :placeholder="$t('products.productDialog.titleHint')"
                       v-model="cloneProduct.title">
              </div>


              <div class="form-group">
                <label for="category">{{$t("products.productDialog.category")}}</label>
                <input type="text" class="form-control" id="category"
                       :placeholder="$t('products.productDialog.categoryHint')"
                       v-model="cloneProduct.category">
              </div>


              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="num">{{$t("products.productDialog.num")}}</label>
                  <input type="number" class="form-control" id="num"
                         :placeholder="$t('products.productDialog.numHint')"
                         v-model="cloneProduct.num">
                </div>

                <div class="form-group col-md-6">
                  <label for="unit">{{$t("products.productDialog.unit")}}</label>
                  <input type="unit" class="form-control" id="unit"
                         :placeholder="$t('products.productDialog.unitHint')"
                         v-model="cloneProduct.unit">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">{{$t("products.productDialog.originPrice")}}</label>
                  <input type="number" class="form-control" id="origin_price"
                         :placeholder="$t('products.productDialog.originPriceHint')"
                         v-model="cloneProduct.originPrice">
                </div>

                <div class="form-group col-md-6">
                  <label for="price">{{$t("products.productDialog.price")}}</label>
                  <input type="number" class="form-control" id="price"
                         :placeholder="$t('products.productDialog.priceHint')"
                         v-model="cloneProduct.price">
                </div>
              </div>
            </div>
          </div>

          <hr>
          <div class="form-group">
            <label for="description">{{$t("products.productDialog.description")}}</label>
            <textarea type="text" class="form-control" id="description"
                      :placeholder="$t('products.productDialog.descriptionHint')"
                      v-model="cloneProduct.description"></textarea>
          </div>
          <div class="form-group">
            <label for="content">{{$t("products.productDialog.content")}}</label>
            <textarea type="text" class="form-control" id="content"
                      :placeholder="$t('products.productDialog.contentHint')"
                      v-model="cloneProduct.content"></textarea>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     id="is_enabled"
                     v-model="cloneProduct.isEnabled"
                     :true-value="1"
                     :false-value="0">
              <label class="form-check-label" for="is_enabled">
                {{$t("products.productDialog.directlyPutOnSale")}}
              </label>
            </div>
          </div>

        </div>

        <!--footer-->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onCancel">Close</button>
          <button type="button" class="btn btn-secondary" @click="onDone">Save</button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import apiUtil from "@/utils/ApiUtil.js"
  import logger from "@/utils/LogUtil.js"

  export default {
    name: "ProductDialog",
    data: () => ({
      cloneProduct: {},
      isImageUploading: false
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
      product: {
        type: Object,
        default: () => {
        }
      }
    },
    watch: {
      product() {
        this.cloneProduct = Object.assign({}, this.product)
      }
    },
    methods: {
      onDone() {
        this.$emit("done", this.cloneProduct)
      },
      uploadImage() {
        this.isImageUploading = true;
        const img = this.$refs.files.files[0];
        const formData = new FormData();
        formData.append("file-to-upload", img);

        apiUtil.uploadImage(this.$http, formData).then((response) => {
          logger.debug(this, "uploadImage", response);
          this.isImageUploading = false;
          if (response.data.success) {
            this.cloneProduct.imageUrl = response.data.imageUrl
          }
        })
      },
      onCancel() {
        this.cloneProduct = Object.assign({}, this.product)
      }
    }
  }
</script>

<style scoped>

</style>
