<template>
  <div id="setlabel">
    <p class="fl" v-show="labelArr.length > 0">
      <label v-for="(item, index) in labelArr">{{ item }}<i @click="labelArr.splice(index, 1)">X</i></label>
    </p>
    <input v-model="label" type="text" @keydown="getLabel"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      label: '',
      labelArr: []
    }
  },
  methods: {
    getLabel (event) {
      let _this = this
      if (!event) event = window.event
      if ((event.keyCode || event.which) === 13) {
        _this.labelArr.push(_this.label)
        _this.label = ''
        console.log(_this.labelArr, _this.label)
      } else {
        // 调用搜索
      }
    }
  }
}
</script>
<style>
  #setlabel {
    width: 500px;
    border: 1px solid #d2d2d2;
    height: 30px;
  }
  #setlabel input {
    border: none;
    outline: none;
  }
  #setlabel p {
    line-height: 30px;
  }
  #setlabel label {
    padding: 2px 4px;
    background: #8ccc66;
    color: #ffffff;
    margin-left: 4px;
  }
</style>
