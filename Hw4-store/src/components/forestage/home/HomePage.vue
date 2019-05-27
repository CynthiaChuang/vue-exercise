<template>
  <div>
    <div class="container">
      <Navbar
        :menus="navbarMenus"/>

      <BannerSwiper
        class="pb-4 pt-1"
        :banners="banners"
        :swiperOption="swiperOption"/>

    </div>

    <main role="main" class="container">

      <Showcase v-for="(display, idx) in showcases" :key="idx"
                :title="display.title"
                :showpieces="display.showpieces"/>


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
      this.initShowcases();
    },
    methods: {
      initNavbarMenus() {
        this.navbarMenus = [...this.$store.getters["getClNameAndRouter"],
          {
            name: this.$t("home.backstage"),
            action: () => {
              routerUtil.gotoManagerPage(this.$router)
            }
          }];
      },
      initBanners() {
        this.banners = this.$store.getters["getBanners"];
      },
      initShowcases() {
        this.showcases = fakeDataUtils.getShowcases(this)
      }
    },
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
