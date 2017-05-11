<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <iteminput placeholder="输入手机号" label="手机号" errots="输入手机号"></iteminput>
  </div>
</template>

<script>
import iteminput from '@/component/iteminput.vue'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { iteminput }
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
