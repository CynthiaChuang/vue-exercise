<template>
  <div class="container">
    <div class="d-flex flex-row align-items-center mt-3 mb-4">
      <div class="h4 mr-auto text-dark">{{ category }}</div>
      <div>
        <button
          class="btn btn-outline-secondary ml-2"
          @click="showModel = 'gallery'"
          :class="{'active':showModel ==='gallery'}">
          <i class="fas fa-th-large"></i>
        </button>
        <button
          class="btn btn-outline-secondary ml-2"
          @click="showModel = 'list'"
          :class="{'active':showModel ==='list'}">
          <i class="fas fa-list-ul"></i>
        </button>
      </div>
    </div>


    <!--gallery view-->
    <section v-if="showModel ==='gallery'" class="row mb-4">
      <GalleryCard
        v-for="item in products"
        :key="item.id"
        :item="item"/>
    </section>

    <!--list view-->
    <section v-else class="mb-4">
      <ListCard
        v-for="item in products"
        :key="item.id"
        :item="item"/>
    </section>
  </div>
</template>

<script>
  import GalleryCard from "./GalleryCard.vue"
  import ListCard from "./ListCard.vue"
  import fakeDataUtils from "@/utils/FakeDataUtils.js"

  export default {
    name: "category",
    components: {
      GalleryCard,
      ListCard
    },
    data: () => ({
      category: "all",
      showModel: "gallery",
      products:  fakeDataUtils.getProducts(),
    }),
    created() {
      this.category = this.$route.query.category;
    },
    beforeRouteUpdate(to, from, next) {
      this.category = to.query.category;
      next();
    },
  };
</script>

<style scoped>
</style>
