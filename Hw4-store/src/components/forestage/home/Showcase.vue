<template>
  <div class="py-3">
    <h4 class="text-muted">{{title}}</h4>
    <div class="row my-2">
      <swiper :options="swiperOption" class="container">
        <swiper-slide v-for="item in showpieces" :key="item.id">
          <ShowpieceCard :item="item"/>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>

  import ShowpieceCard from "@/components/forestage/home/ShowpieceCard.vue"

  export default {
    name: "Showcase",
    components: {
      ShowpieceCard
    },
    data: () => ({
      swiperOption: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }),
    props: {
      title: {
        type: String,
        default: "title"
      },
      showpieces: {
        type: Object,
        request: true
      }
    }
  }
</script>

<style scoped>
  .swiper-container {
    height: auto !important;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    height: 300px;
  }

</style>

