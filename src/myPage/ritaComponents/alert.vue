<template>
  <div>
    <rita-alert msg="这是一个alert信息" :howIcon="false"></rita-alert>
  </div>
</template>
<script>
import Alert from '@/component/alert/index.js'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {'rita-alert': Alert}
}
</script>
