<template>
  <div id="iteminput">
    <div class="iteminput">
      <span class="inputname">{{label}}</span>
      <input
        class="inputtext"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :min="min"
        :max="max"
        :step="step"
        :form="form"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </div>
    <p class="errots" :class="{'Hide':1 == isHide}">{{errots}}</p>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        isHide: 1,
        currentValue: this.value
      }
    },
    props: {
      label: String,
      value: [String, Number],
      placeholder: String,
      size: String,
      icon: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      form: String,
      maxlength: Number,
      minlength: Number,
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      errots: String
    },
    watch: {
      'value' (val, oldValue) {
        this.setCurrentValue(val)
      }
    },
    methods: {
      handleBlur (event) {
        this.$emit('blur', event)
        this.isHide = 0
      },
      handleInput (event) {
        const value = event.target.value
        this.$emit('input', value)
        this.setCurrentValue(value)
        this.$emit('change', value)
      },
      handleFocus (event) {
        this.$emit('focus', event)
      },
      setCurrentValue (value) {
        if (value === this.currentValue) return
        this.currentValue = value
      }
    }
  }
</script>
<style>
  .Hide {
    display: none
  }
  #iteminput {
    width: 500px;
    margin-bottom: 20px;
  }
  #iteminput .iteminput {
    line-height: 30px;
    display: -webkit-inline-box;
    display: -ms-inline-grid;
    width: 100%;
  }
  #iteminput .iteminput .inputname {
    display: block;
    width: 30%;
    text-align: right;
    padding-right: 20px;
    line-height: 34px;
  }
  #iteminput .iteminput .inputtext {
    display: block;
    width: 40%;
    height: 30px;
    padding: 0 4px;
  }
  #iteminput .errots {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    padding-left: 20px;
    margin-left: 30%;
    width: 40%;
  }
</style>
