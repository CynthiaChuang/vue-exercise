<template>
  <div>
    <footer class="blog-footer">
      <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.
      </p>
      <p>
        <a href="#" @click.prevent="topFunction">Back to top</a>
      </p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    methods:{
      topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    }
  }
</script>

<style scoped>
  .blog-footer {
    padding: 2.5rem 0;
    color: #999;
    text-align: center;
    background-color: #f9f9f9;
    border-top: .05rem solid #e5e5e5;
  }

  .blog-footer p:last-child {
    margin-bottom: 0;
  }
</style>
