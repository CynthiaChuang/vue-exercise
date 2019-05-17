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
  @import "./assets/all.css";
</style>
