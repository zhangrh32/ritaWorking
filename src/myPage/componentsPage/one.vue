<template>
  <div class="hello">
    <my-component my-messag="1" con="2"></my-component>
    <my-component2></my-component2>
  </div>
</template>
<script>
import Vue from 'vue'
var Child = {
  template: '<div>A custom component!</div>'
}
Vue.component('my-component', {
  template: '<div>{{myMessag}} + {{con}} = {{myMessag * 1 + con * 1}}</div>',
  props: ['myMessag', 'con']
})
export default {
  data () {
    return {}
  },
  components: {'my-component2': Child}
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

