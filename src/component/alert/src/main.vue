<template>
  <div v-show="showAlert">
    <p><i v-show="showIcon">@$&</i><span>{{ msg }}</span> <i @click="close">X</i></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showAlert: true
    }
  },
  props: {
    msg: {
      type: String,
      default: '',
      required: true
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.showAlert = false
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
  p {
    background: #8ccc66;
    width: 300px;
    margin-left: 30px;
    color: #ffffff;
    padding: 5px 20px;
  }
  p i {
    color:  #333333;
    float: right;
  }
</style>
