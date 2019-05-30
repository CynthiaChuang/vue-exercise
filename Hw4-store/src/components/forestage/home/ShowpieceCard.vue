<template>
  <div class="customized-card">
    <div class="row no-gutters overflow-hidden
    flex-md-row mb-4 h-md-250 position-relative on-hover card-style"  @click.prevent="onCardClick(item)">
      <div class="col p-4 d-flex flex-column position-static">
        <div class="mb-1 text-muted">{{$t(`classification.${item.category}`)}}</div>
        <h5 class="mb-0 title-overflow">{{item.title}}</h5>
        <p class="d-inline-block mb-2 text-secondary">{{item.price | separator | dollarSign }}</p>
        <p class="card-text mb-auto text-muted description-overflow">{{item.description}}</p>
      </div>
      <div class="col-auto d-none d-lg-block">
        <img class="bd-placeholder-img rounded" width="200" height="250"
             img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
             :src="item.imageUrl" alt="">
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "ShowpieceCard",
    props: {
      item: {
        type: Object,
        request: true
      },
    },
    methods:{
      onCardClick(item){
        this.$emit("onCardClick", item);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/all.scss";

  .title-overflow{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .description-overflow{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .customized-card {
    .on-hover {
      transition: all 0.3s;

      &:hover {
        border: 1px solid $tertiary;
        box-shadow: 0 0.5rem 1rem $gray-300;
      }
    }

    .card-style {
      border: 1px solid $gray-400;
      border-radius: 0.25rem;


      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    }
  }

</style>
