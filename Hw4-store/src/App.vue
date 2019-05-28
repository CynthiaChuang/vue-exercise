<template>
  <div id="app">
    <Alert></Alert>
    <router-view/>
    <router-view name="footer"/>
  </div>
</template>

<script>
  import routerUtil from "./utils/RouterUtil.js"
  import Alert from "@/components/common/Alert.vue"

  export default {
    name: 'App',
    components: {
      Alert
    },
    created() {
      this.initClNameAndRouter();
      this.initBanners();
    },
    methods: {
      initClNameAndRouter() {
        let clNameAndRouter = [];
        for (let [key, value] of Object.entries(this.$t("home.classification"))) {
          clNameAndRouter.push({
            name: value,
            category: key,
            action: () => {
              routerUtil.gotoCategory(this.$router, key)
            }
          });
        }

        this.$store.commit('initClNameAndRouter', {clNameAndRouter});
      },
      initBanners() {
        this.$store.commit('initBanners', {
          imageUrls: [
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
