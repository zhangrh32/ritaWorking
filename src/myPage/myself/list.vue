<template>
  <div>
    {{ title }}
    <r-list num="1"></r-list>
    <r-list num="4"></r-list>
    <r-list num="7"></r-list>
    <r-list num="10"></r-list>
    <r-list num="13"></r-list>
    <button @click="showmessage">点我</button>
    <r-alert v-show="showM===true" message="hhhhhhhhh"></r-alert>
  </div>
</template>
<script>
import list from '@/component/list.vue'
import alert from '@/component/alert.js'
import Vue from 'vue'
Vue.prototype.$Message = alert
export default {
  data () {
    return {
      title: '列表的组件',
      showM: false
    }
  },
  mounted: function () {},
  methods: {
    showmessage () {
      let _this = this
      _this.showM = true
      setTimeout(function () {
        _this.showM = false
      }, 2000)
      _this.$Message('000')
    }
  },
  components: {'r-list': list}
}
</script>

