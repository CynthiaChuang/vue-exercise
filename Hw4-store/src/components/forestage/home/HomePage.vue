<template>
  <div>
    <div class="container">
      <Navbar
        :menus="navbarMenus"/>

      <BannerSwiper
        class="pb-4 pt-1"
        :banners="banners"
        :swiperOption="swiperOption"/>


      <div class="row mb-2">
        <Card/>
        <Card/>
      </div>
    </div>

    <main role="main" class="container">
      <Temp/>
    </main>
  </div>
</template>

<script>

  import routerUtil from "@/utils/RouterUtil.js"

  import Navbar from "./Navbar.vue"
  import BannerSwiper from "./BannerSwiper.vue"

  import BasePage from "@/components/common/BasePage.vue"
  import Card from "@/components/forestage/home/Card.vue"

  import Temp from "@/components/forestage/home/Temp.vue"

  export default {
    name: 'HomePage',
    extends: BasePage,
    components: {
      Navbar,
      BannerSwiper,
      Card,
      Temp,
    },
    data: () => ({
      banners: [],
      navbarMenus: [],
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        slidesPerView: 1,
      },
    }),
    created() {
      this.initNavbarMenus();
      this.initBanners();
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
