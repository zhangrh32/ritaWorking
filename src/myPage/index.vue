<template id="index">
	<div class="main mainBox" ref="main">
   <!--顶部导航栏-->
    <div class="headerWrapper">
        <div class="headleft flex">
            <img class="logo" src="./../assets/logo.png"/>
        </div>
        <div class="headright">
            <span>{{ userName }}</span><i>|</i><span>{{ orgsName }}</span><span class="exit" @click="loginOut">退出</span>
        </div>
    </div>
		<main ref="mainCon">
			<!--主内容区 -->
			<div class="mianCon" ref="Con">
        <router-view class="view"></router-view>
      </div>
		</main>
    <!--弹框-->
    <div id="confirm" v-show="popupLogin">
      <div class="mb"></div>
      <div class="confirmCon">
        <p class="tishi">提示</p>
        <p id="msg">{{ msgconLogin }}</p>
        <ul class="epBtn clearfix">
          <li class="conBtn fr" id="rightBtn" @click="sureBtnLogin">确定</li>
          <li class="conBtn fr" id="leftBtn" @click="cancleLogin">取消</li>
        </ul>
      </div>
    </div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      userName: '',
      orgsName: '',
      token: '',
      popupLogin: '',
      msgconLogin: ''
    }
  },
  mounted: function () {
    let _this = this
    _this.openReminded()
    // _this.checkLogin()
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    _this.$refs.main.style.height = h + 'px'
    _this.$refs.mainCon.style.height = h - 64 - 26 + 'px'
    // _this.$refs.Con.style.height = h - 64 - 26 + 'px'
    _this.$refs.Con.style.width = w - 40 + 'px'
  },
  methods: {
    // 判断页面是否登录
    checkLogin () {
      let _this = this
      // 检查是否存在session
      if (!sessionStorage.userinfo) {
        _this.$router.push('/')
      } else {
        // _this.$router.push('/triageList')
        let user = JSON.parse(sessionStorage.userinfo)
        _this.userName = user.mc
        _this.orgsName = user.organization.mc
      }
    },
    // 退出登录
    loginOut () {
      let _this = this
      _this.msgconLogin = '确定退出登录？'
      _this.popupLogin = true
    },
    // 确定
    sureBtnLogin () {
      let _this = this
      sessionStorage.removeItem('userinfo')
      _this.$router.push('/')
      window.location.reload()
      _this.popupLogin = false
    },
    // 取消
    cancleLogin () {
      let _this = this
      _this.popupLogin = false
    },
    // 消失showM
    checkshowM () {
      if (this.showM === true) {
        setTimeout(function () {
          this.showM = false
        }, 2000)
      }
    },
    openReminded () {
      let _this = this
      setInterval(function () {
        if (sessionStorage.setRemined) {
          let newstr = JSON.parse(sessionStorage.getItem('setRemined'))
          let con = '您负责的患者' + newstr.name + newstr.xm + '即将结束'
          let date = new Date()
          let currentTime = date.getHours() * 60 * 60 * 1000 + date.getMinutes() * 60 * 1000 + date.getSeconds() * 1000
          if (currentTime === newstr.endTime) {
            sessionStorage.removeItem('setRemined')
            _this.$alert(con, {
              confirmButtonText: '确定',
              callback: action => {
                return false
              }
            })
          }
        } else {
          return false
        }
        _this.checkshowM()
      }, 0.1)
    }
  }
}
</script>
<style>
  body, p, ul {
    padding: 0;
    margin: 0;
  }
  button {
    padding: 0px;
    outline: none;
  }
  input {
    outline: none;
  }
  select {
    outline: none;
    border: 1px solid #d2d2d2;
  }
  .headerWrapper {
    height:63px;
    line-height:63px;
    width:100%;
    background:#fff;
    color:#030303;
    border-bottom: 1px solid rgba(214, 214, 214, 0.32);
    box-shadow: 0 2px 8px 0 rgba(233, 233, 233, 0.60);
  }
  .el-dialog__body {
    padding:30px 20px 0 !important;
  }
  .Btn{
    margin-left:20px;
    width:120px;
  }
  .headleft {
    float:left;
  }
  .headleft img.logo{
    width: 73px;
    height: 64px;
  }
  .headleft span {
    margin-left:14px;
    font-family: SFUIText-Bold;
    font-size: 17px;
    color: #030303;
    letter-spacing: 0;
    line-height: 64px;
    display: block;
  }
  .headright {
    float:right;
    padding:0 20px;
    cursor: default;
  }
  .headright .exit {
    margin-left: 40px;
  }
  .headright i {
    margin:0 20px;
  }
  .modulars li {
    padding: 0 20px 0 50px !important;
  }
  .modulars .el-menu-item-group__title i {
    margin-right: 14px;
  }
  /* 主内容区 */
  .mainBox {
    overflow: hidden;
  }
  .mianCon {
    background: #ffffff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(203,203,203,0.50);
    margin: auto;
  }
  /*::-webkit-scrollbar {
    display: none;
  }*/
  main {
    /*display: -webkit-box;
    display: -ms-flexbox;
    display: flex;*/
    width: 100%;
    background: #fbfbfb;
    padding-top: 26px;
    overflow: auto;
  }
  main .main-left {
    width: 200px;
    overflow: auto;
    overflow-x: hidden;
    cursor: default;
  }
  main .main-left li {
    cursor: default;
  }
  main .main-right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  main .main-right .main-right-top {
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: solid 1px #E9ECF1;
  }
  main .main-right .main-right-view {
    padding-left: 20px;
    padding-top: 20px;
    overflow: auto;
    overflow-x: hidden;
  }
  main .el-menu {
    background-color: transparent !important;
  }
  .el-dialog__header {
    text-align:center;
    padding:20px !important;
    border-bottom:1px solid rgb(227, 236, 223);
  }
  .clear {
    clear:both;
    overflow:hidden;
  }
  .el-tabs__header {
    margin:0 !important;
  }
  .el-table th>.cell {
    text-align: center;
  }
</style>
