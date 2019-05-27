<template>
  <div>
    <swiper :options="swiperOption" class="topSwiper rounded" ref="mySwiper">

      <swiper-slide
        class="slide"
        v-for="(banner, idx) in banners"
        :key="idx"
        :style="{backgroundImage:`url('${banner.url}')`}">
      </swiper-slide>

      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'

  export default {
    name: "BannerSwiper",
    data: () => ({
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
    props: {
      banners: {
        type: Array,
        request: true
      },
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      this.swiper.el.onmouseover = function () {
        this.swiper.autoplay.stop();
      };
      this.swiper.el.onmouseout = function () {
        this.swiper.autoplay.start();
      };
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 550px;
  }

  .slide {
    height: 100%;
    background-position: center center;
    background-size: cover;
  }
</style>
<style>
  .swiper-pagination-bullet-custom {
    width: 10px;
    height: 10px;
    text-align: center;
    line-height: 10px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }

  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #fff;
    background: #fff;
  }
</style>
