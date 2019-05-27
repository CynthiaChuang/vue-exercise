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
      this.initBanners();
    },
    methods:{
      initClNameAndRouter() {
        this.$store.commit('initClNameAndRouter', {
          clNameAndRouter: [
            {
              name: this.$t("home.classification.maskingTape"),
              category:"maskingTape",
              action: () => {
                routerUtil.gotoCategory(this.$router, "maskingTape")
              }
            },
            {
              name: this.$t("home.classification.stamp"),
              category:"stamp",
              action:() => {
                routerUtil.gotoCategory(this.$router, "stamp")
              }
            },
            {
              name: this.$t("home.classification.sticker"),
              category:"sticker",
              action:() => {
                routerUtil.gotoCategory(this.$router, "sticker")
              }
            },
            {
              name: this.$t("home.classification.postcard"),
              category:"postcard",
              action:() => {
                routerUtil.gotoCategory(this.$router, "postcard")
              }
            },
            {
              name: this.$t("home.classification.notebook"),
              category:"notebook",
              action:() => {
                routerUtil.gotoCategory(this.$router, "notebook")
              }
            },
            {
              name: this.$t("home.classification.drawing"),
              category:"drawing",
              action:() => {
                routerUtil.gotoCategory(this.$router, "drawing")
              }
            },
            {
              name: this.$t("home.classification.storage"),
              category:"storage",
              action:() => {
                routerUtil.gotoCategory(this.$router, "storage")
              }
            },
            {
              name: this.$t("home.classification.handmade"),
              category:"handmade",
              action:() => {
                routerUtil.gotoCategory(this.$router, "handmade")
              }
            }]
        });
      },
      initBanners(){
        this.$store.commit('initBanners',{
          imageUrls:[
            require("./assets/image/banner_1.jpg"),
            require("./assets/image/banner_2.jpg"),
            require("./assets/image/banner_3.jpg"),
            require("./assets/image/banner_4.jpg"),
            require("./assets/image/banner_5.jpg")],
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/all.scss";
</style>
