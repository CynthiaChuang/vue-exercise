<template>
  <div class="py-3">
    <h4 class="text-muted">{{title}}</h4>
    <div class="row my-3">
      <swiper :options="swiperOption" class="container">
        <swiper-slide v-for="item in showpieces" :key="item.id">
          <ShowpieceCard :item="item"
                         @onCardClick="onShowpieceClick"/>
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
        spaceBetween: 25,
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
        type: Array,
        request: true
      }
    },
    methods:{
      onShowpieceClick(item){
        this.$emit("onShowpieceClick", item);
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
    height: 320px;
  }

</style>

