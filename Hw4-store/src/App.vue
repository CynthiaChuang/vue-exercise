<template>
  <div id="app">
    <router-view/>
    <router-view  name="footer"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./assets/all.scss";
  h1, h2, h3, h4, h5, h6 {
    font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  }

</style>
