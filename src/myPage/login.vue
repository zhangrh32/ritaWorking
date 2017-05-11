<<template>
  <div id="login">
    <div class="login-body">
      <p class="pageName">
        {{pageName}}
      </p>
      <div class="login-form">
        <p class="login-item">
          <span class="itemname">手机号</span>
          <input class="iteminput" placeholder="输入手机号"/>
        </p>
        <p class="login-item">
          <span class="itemname">密码</span>
          <input class="iteminput" placeholder="输入6-12位密码"/>
        </p>
        <button class="itembutton" @click="Login">登录</button>
      </div>
    </div>
  </div>
</template>
<<script>
export default {
  data () {
    return {
      pageName: '登录'
    }
  },
  methods: {
    Login () {
      // let _this = this
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped>
  #login {
    height: 100%;
    background: #fffcec;
  }
  .login-body {
    width: 60%;
    padding-top: 10%;
    margin: auto;
  }
  .login-form {
    text-align: center;
  }
  .login-item {
    line-height: 30px;
    display: -webkit-inline-box;
    display: -ms-inline-grid;
    width: 100%;
    margin-bottom: 20px;
  }
  .login-item .itemname {
    display: block;
    width: 30%;
    text-align: right;
    margin-right: 20px;
  }
  .login-item .iteminput {
    display: block;
    width: 40%;
    height: 30px;
    padding: 0 4px;
  }
  .login-form .itembutton {
    background: coral;
    padding: 3px 20px;
    color: white;
    font-size: 16px;
    border: none;
  }
</style>
<style>
  .pageName {
    text-align: center;
    line-height: 80px;
    font-size: 24px;
    letter-spacing: 8px;
  }
</style>
