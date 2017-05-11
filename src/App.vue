<template>
  <div id="app" ref="Height">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: function () {
    let _this = this
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    _this.$refs.Height.style.height = h + 'px'
  }
}
</script>

<style>
html, body, p {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
