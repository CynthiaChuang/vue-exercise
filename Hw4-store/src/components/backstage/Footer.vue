<template>
  <footer class="blog-footer">
    <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
    <p>
      <a href="#">Back to top</a>
    </p>
  </footer>
</template>

<script>


  export default {
    name: "Footer"
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

  .flex-equal > * {
    -ms-flex: 1;
    flex: 1;
  }
  @media (min-width: 768px) {
    .flex-md-equal > * {
      -ms-flex: 1;
      flex: 1;
    }
  }
</style>
