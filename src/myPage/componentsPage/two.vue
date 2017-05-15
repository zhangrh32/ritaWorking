<template>
  <div class="hello">
    <div id="example-2">
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>
    </div>
    <span>{{total}}</span>
    <button-on v-on:sub="add"></button-on>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们返回给每个组件的实例的却引用了同一个data对象
  data: function () {
    return {
      counter: 0
    }
  }
})
Vue.component('button-on', {
  template: '<button v-on:click="sub">{{num}}</button>',
  data: function () {
    return {
      num: 0
    }
  },
  methods: {
    sub () {
      this.num += 1
      this.$emit('sub')
    }
  }
})
export default {
  data () {
    return {
      total: 0
    }
  },
  components: {},
  methods: {
    add () {
      this.total += 2
    }
  }
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

