<template>
  <div id="app">
    <router-view/>
    <router-view name="footer"/>
  </div>
</template>

<script>
  import routerUtil from "./utils/RouterUtil.js"

  export default {
    name: 'App',
    created() {
      this.initClNameAndRouter();
    },
    methods:{
      initClNameAndRouter() {
        this.$store.commit('initClNameAndRouter', {
          clNameAndRouter: [
            {
              name: this.$t("home.classification.maskingTape"),
              action: () => {
                routerUtil.gotoForeProducts(this.$router)
              }
            },
            {
              name: this.$t("home.classification.stamp"),
              action: ""
            },
            {
              name: this.$t("home.classification.sticker"),
              action: ""
            },
            {
              name: this.$t("home.classification.postcard"),
              action: ""
            },
            {
              name: this.$t("home.classification.notebook"),
              action: ""
            },
            {
              name: this.$t("home.classification.drawing"),
              action: ""
            },
            {
              name: this.$t("home.classification.storage"),
              action: ""
            },
            {
              name: this.$t("home.classification.handmade"),
              action: ""
            }]
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/all.scss";
</style>
