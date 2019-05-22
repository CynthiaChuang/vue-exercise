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
          <slot>
            ...
          </slot>

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
    name: "Dialog",
    props: {
      title: {
        type: String,
        default: ""
      },
      dialogId: {
        type: String,
        required: true
      }
    },
    methods: {
      onDone() {
        this.$emit("done");
      },
      onCancel() {
        this.$emit("cancel");
      }
    }
  }
</script>

<style scoped>

</style>
