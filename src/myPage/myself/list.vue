<template>
  <div>
    {{ title }}
    <div>
      <h1>我是父组件的标题</h1>
      <my-component>
         <h1 slot="header">这里可能是一个页面标题</h1>
          <p>主要内容的一个段落。</p>
          <p>另一个主要段落。</p>
          <p slot="footer">这里有一些联系信息</p>
      </my-component>
    </div>
    <button @click="showmessage">点我</button>
    <r-alert v-show="showM===true" message="hhhhhhhhh"></r-alert>
  </div>
</template>
<script>
// import list from '@/component/list.vue'
// import alert from '@/component/alert.js'
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
  }
  // components: {'my-component': list}
}
</script>

