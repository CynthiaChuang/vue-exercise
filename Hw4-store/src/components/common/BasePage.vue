<template>

</template>

<script>
  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  export default {
    name: "BasePage",

    beforeRouteUpdate (to, from, next) {
      logger.debug(this,"beforeRouteUpdate", to);
      if (to.meta.requiresAuth) {
        apiUtil.checkPermission().then((response) => {
          logger.debug(this, "checkPermission", response.data);
          if (!response.data.success) {
            routerUtil.gotoLogin(this.$router)
          }
        })
      }
      next();
    },

    beforeRouteEnter(to, from, next) {
      logger.debug(this,"beforeRouteEnter", to);

      // does NOT have access to `this` component instance,
      // because it has not been created yet when this guard is called!

      if (to.meta.requiresAuth) {
        next(vm => {
          apiUtil.checkPermission().then((response) => {
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
