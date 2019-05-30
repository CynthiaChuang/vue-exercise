<template>
  <div>
    <div class="container">
      <Navbar
        :menus="navbarMenus"/>

      <BannerSwiper
        class="pb-4 pt-1"
        :banners="banners"/>

    </div>

    <main role="main" class="container">

      <Showcase class="mt-3"
                v-for="(display, idx) in showcases" :key="idx"
                :title="display.title"
                :showpieces="display.showpieces"
                @onShowpieceClick="toProductDetail"/>

      <Temp/>
    </main>
  </div>
</template>

<script>

  import routerUtil from "@/utils/RouterUtil.js"
  import fakeDataUtils from "@/utils/FakeDataUtils.js"

  import Navbar from "./Navbar.vue"
  import BannerSwiper from "./BannerSwiper.vue"

  import BasePage from "@/components/common/BasePage.vue"
  import Showcase from "@/components/forestage/home/Showcase.vue"

  import Temp from "@/components/forestage/home/Temp.vue"

  export default {
    name: 'HomePage',
    extends: BasePage,
    components: {
      Navbar,
      BannerSwiper,
      Showcase,
      Temp,
    },
    data: () => ({
      banners: [],
      navbarMenus: [],
      showcases: [],
    }),
    created() {
      this.initNavbarMenus();
      this.initBanners();
      // this.initShowcases();
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.$store.dispatch('forestage/getAllProducts').then(() => {

          this.showcases = [
            {
              title: this.$t('home.tab.recommend'),
              showpieces: this.$store.getters["forestage/getRecommendProducts"]
            }
            ,
            {
              title: this.$t('home.tab.recently'),
              showpieces: this.$store.getters["forestage/getRecentlyProducts"]
            }];
        })
      },
      initNavbarMenus() {
        this.navbarMenus = [...this.$store.getters["forestage/getClNameAndRouter"],
          {
            name: this.$t("home.user"),
            action: () => {
              routerUtil.gotoManagerPage(this.$router)
            }
          }];
      },
      initBanners() {
        this.banners = this.$store.getters["forestage/getBanners"];
      },
      // initShowcases() {
      //   this.showcases = fakeDataUtils.getShowcases(this)
      // },
      toProductDetail(item) {
        routerUtil.gotoForeProductDetail(this.$router, item.id);
      }
    },
    // computed: {
    //   ...mapGetters("forestage", [
    //     "getRecommendProducts",
    //     "getAllProducts",
    //     "getProductsByCategory"
    //   ])
    // }
  }
</script>

<style lang="scss" scoped>

  .display-4 {
    font-size: 2.5rem;
  }

  @media (min-width: 768px) {
    .display-4 {
      font-size: 3rem;
    }
  }
</style>
