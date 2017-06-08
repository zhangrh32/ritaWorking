<template>
  <div>
    <ul>
      <li>{{num}}</li>
      <li>{{num * 1 + 1}}</li>
      <li>{{num * 1 + 2}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: 0
    }
  },
  props: {
    num: {
      default: 0
    }
  }
}
</script>

