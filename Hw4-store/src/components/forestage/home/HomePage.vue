<template>
  <div>
    <div class="container">
      <Navbar
        :menus="navbarMenus"/>

      <div class="jumbotron p-4 p-md-5 text-white rounded bg-dark">
        <div class="col-md-6 px-0">
          <h1 class="display-4 font-italic">Title of a longer featured blog post</h1>
          <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently
            about what’s most interesting in this post’s contents.</p>
          <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-md-6">
          <div
            class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-primary">World</strong>
              <h3 class="mb-0">Featured post</h3>
              <div class="mb-1 text-muted">Nov 12</div>
              <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to
                additional content.</p>
              <a href="#" class="stretched-link">Continue reading</a>
            </div>
            <div class="col-auto d-none d-lg-block">
              <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg"
                   preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                   aria-label="Placeholder: Thumbnail"><title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"/>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
              </svg>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-success">Design</strong>
              <h3 class="mb-0">Post title</h3>
              <div class="mb-1 text-muted">Nov 11</div>
              <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional
                content.</p>
              <a href="#" class="stretched-link">Continue reading</a>
            </div>
            <div class="col-auto d-none d-lg-block">
              <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg"
                   preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                   aria-label="Placeholder: Thumbnail"><title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"/>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main role="main" class="container">
      <div class="row">
        <div class="col-md-8 blog-main">
          <h3 class="pb-4 mb-4 font-italic border-bottom">
            From the Firehose
          </h3>

          <div class="blog-post">
            <h2 class="blog-post-title">Sample blog post</h2>
            <p class="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>

            <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>
          </div><!-- /.blog-post -->


          <nav class="blog-pagination">
            <a class="btn btn-outline-primary" href="#">Older</a>
            <a class="btn btn-outline-secondary disabled" href="#" tabindex="-1" aria-disabled="true">Newer</a>
          </nav>

        </div><!-- /.blog-main -->

        <aside class="col-md-4 blog-sidebar">
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="font-italic">About</h4>
            <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit
              amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
          </div>

          <div class="p-4">
            <h4 class="font-italic">Archives</h4>
            <ol class="list-unstyled mb-0">
              <li><a href="#">March 2014</a></li>

            </ol>
          </div>

          <div class="p-4">
            <h4 class="font-italic">Elsewhere</h4>
            <ol class="list-unstyled">
              <li><a href="#">GitHub</a></li>
            </ol>
          </div>
        </aside><!-- /.blog-sidebar -->

      </div><!-- /.row -->

    </main><!-- /.container -->
  </div>
</template>

<script>
  import routerUtil from "@/utils/RouterUtil.js"

  import Navbar from "./Navbar.vue"
  import BasePage from "@/components/common/BasePage.vue"

  export default {
    name: 'HomePage',
    extends: BasePage,
    components: {
      Navbar
    },
    data: () => ({
      navbarMenus: []
    }),
    created() {
      this.initNavbarMenus();
    },
    methods: {
      initNavbarMenus() {
        this.navbarMenus = [
          {
            name: this.$t("home.classification.maskingTape"),
            action: ""
          },
          {
            name: this.$t("home.classification.stamp"),
            action: ""
          },
          {
            name: this.$t("home.classification.sticker"),
            action: ""
          },
          {
            name: this.$t("home.classification.postcard"),
            action: ""
          },
          {
            name: this.$t("home.classification.notebook"),
            action: ""
          },
          {
            name: this.$t("home.classification.drawing"),
            action: ""
          },
          {
            name: this.$t("home.classification.storage"),
            action: ""
          },
          {
            name: this.$t("home.classification.handmade"),
            action: ""
          },
          {
            name: this.$t("home.backstage"),
            action: this.gotoManagerPage
          }]
      },
      gotoManagerPage(){
        routerUtil.gotoManagerPage(this.$router)
      }

    }
  }
</script>
<style scoped>

  .display-4 {
    font-size: 2.5rem;
  }

  @media (min-width: 768px) {
    .display-4 {
      font-size: 3rem;
    }
  }

  /*
   * Blog name and description
   */
  .blog-title {
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: 400;
  }

  .blog-description {
    font-size: 1.1rem;
    color: #999;
  }

  @media (min-width: 40em) {
    .blog-title {
      font-size: 3.5rem;
    }
  }

  /* Pagination */
  .blog-pagination {
    margin-bottom: 4rem;
  }

  .blog-pagination > .btn {
    border-radius: 2rem;
  }

  /*
   * Blog posts
   */
  .blog-post {
    margin-bottom: 4rem;
  }

  .blog-post-title {
    margin-bottom: .25rem;
    font-size: 2.5rem;
  }

  .blog-post-meta {
    margin-bottom: 1.25rem;
    color: #999;
  }

</style>
