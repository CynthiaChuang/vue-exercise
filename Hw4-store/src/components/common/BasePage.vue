<template>

</template>

<script>
  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  export default {
    name: "BasePage",

    beforeRouteEnter(to, from, next) {
      if (to.meta.requiresAuth) {
        next(vm => {
          apiUtil.checkPermission(vm.$http).then((response) => {
            logger.debug(vm, "checkPermission", response.data);
            if (!response.data.success) {
              routerUtil.gotoLogin(vm.$router)
            }
          })
        });
      }
      next();
    },

  }
</script>

<style scoped>

</style>
