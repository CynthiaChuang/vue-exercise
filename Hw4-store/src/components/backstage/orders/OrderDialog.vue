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
                <input type="file" id="customFile" class="form-control" name="file"
                       :class="{'is-invalid':imageUploadingError.has}"
                       ref="files" @change="uploadImage">
                <span class="text-danger" v-show="imageUploadingError.has">
                  {{imageUploadingError.message}}</span>
              </div>
              <img
                img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid" :src="cloneProduct.imageUrl" alt="">
            </div>

            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">{{$t("products.productDialog.title")}}</label>
                <input type="text" id="title" name="title" class="form-control"
                       :class="{'is-invalid':errors.has('title')}"
                       :placeholder="$t('products.productDialog.titleHint')"
                       v-model="cloneProduct.title"
                       v-validate="'required'">
                <span class="text-danger" v-show="errors.has('title')">
                  {{$t("products.productDialog.titleError")}}
                </span>
              </div>


              <div class="form-group">
                <label for="category">{{$t("products.productDialog.category")}}</label>
                <input type="text" class="form-control" id="category" name="category"
                       :class="{'is-invalid':errors.has('category')}"
                       :placeholder="$t('products.productDialog.categoryHint')"
                       v-model="cloneProduct.category"
                       v-validate="'required'">
                <span class="text-danger" v-show="errors.has('category')">
                  {{$t("products.productDialog.categoryError")}}
                </span>
              </div>


              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inventory">{{$t("products.productDialog.inventory")}}</label>
                  <input type="number" class="form-control" id="inventory" name="inventory"
                         :class="{'is-invalid':errors.has('inventory')}"
                         :placeholder="$t('products.productDialog.inventoryHint')"
                         v-model="cloneProduct.inventory"
                         v-validate="'required|numeric'">
                  <span class="text-danger" v-show="errors.has('inventory')">
                    {{$t("products.productDialog.inventoryError")}}
                  </span>
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
                  <input type="number" class="form-control" id="origin_price" name="origin_price"
                         :class="{'is-invalid':errors.has('origin_price')}"
                         :placeholder="$t('products.productDialog.originPriceHint')"
                         v-model="cloneProduct.originPrice"
                         v-validate="'required|positive-number'">
                  <span class="text-danger" v-show="errors.has('origin_price')">
                    {{$t("products.productDialog.originPriceError")}}
                  </span>
                </div>

                <div class="form-group col-md-6">
                  <label for="price">{{$t("products.productDialog.price")}}</label>
                  <input type="number" class="form-control" id="price" name="price"
                         :class="{'is-invalid':errors.has('price')}"
                         :placeholder="$t('products.productDialog.priceHint')"
                         v-model="cloneProduct.price"
                         v-validate="'required|positive-number'">
                  <span class="text-danger" v-show="errors.has('price')">
                    {{$t("products.productDialog.priceError")}}
                  </span>
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

  const MAX_FILENAME_LEN = 32 ;
  const VALID_IMAGE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

  export default {
    name: "ProductDialog",
    data: () => ({
      cloneProduct: {},
      isImageUploading: false,
      imageUploadingError: {
        has: false,
        message:""
      }
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
        this.$validator.validate().then((valid) => {
          if (valid) {
            this.$emit("done", this.cloneProduct);
            this.onCancel();
          }
        });

      },
      isValidImage(img) {
        let valid = true;
        let message = "";
        if (img.name.length >= MAX_FILENAME_LEN) {
          valid = false;
          message = this.$t("products.productDialog.imgErrorLen")
        } else if (img.size >= 1024 * 1024) {
          valid = false;
          message = this.$t("products.productDialog.imgErrorSize")
        } else if (!VALID_IMAGE_TYPES.includes(img.type)) {
          valid = false;
          message = this.$t("products.productDialog.imgErrorType")
        }
        return {valid, message}
      },
      uploadImage() {
        this.isImageUploading = true;
        const img = this.$refs.files.files[0];

        let {valid, message} = this.isValidImage(img);
        this.imageUploadingError.has = !valid;
        this.imageUploadingError.message = message;

        if (!valid) {
          return
        }

        const formData = new FormData();
        formData.append("file-to-upload", img);

        apiUtil.uploadImage(formData).then((response) => {
          logger.debug(this, "uploadImage", response);
          this.isImageUploading = false;
          if (response.data.success) {
            this.cloneProduct.imageUrl = response.data.imageUrl
          } else{
            this.$bus.$emit('message:push',response.data.message, "danger");
          }
        })
      },
      onCancel() {
        this.cloneProduct = Object.assign({}, this.product);
        this.errors.clear();
        this.isImageUploading = false;
        this.imageUploadingError = {has: false, message: ""}
      }
    }
  }
</script>

<style scoped>

</style>
