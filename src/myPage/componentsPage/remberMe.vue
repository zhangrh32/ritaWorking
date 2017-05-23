<template>
  <div>
    <!--<p class="pageTitle">
        <a onclick="history.go( -1 )"> < </a>
        <span>{{ title }}</span>
    </p>-->
    <!--页面主体-->
    <div class="visitCon clear">
        <p class="patientInfo">
          <span class="patientName">当前患者：{{ Pname }}</span>
          <span class="clickText" @click="goRecord">查看病历</span>
          <span class="clickText fr" @click="hung">挂起</span>
        </p>
        <!--左-->
        <div class="visitCon-item left fl">
           <div class="con">
              <p class="status clear">待处理
                <!--<img class="reFresh" src="./../../assets/logo.png"/>-->
                <span class="clickText" @click="reFresh">刷新</span>
              </p>
              <p class="taskItem task clear">
                <span class="item">体格检查</span>
                <span class="clickText fr" @click="goTgjc">去完成</span>
              </p>
              <!--还没有待完成事项-->
              <p class="taskItem task clear" v-show="isShowL">
                <span class="item">还没有待完成事项</span>
              </p>
              <ul class="taskItemCon">
                <li class="clear" v-for="item in arrXm" v-show="item.status === 0" :class="getColor(item.type)">
                  <p class="fl"><span class="part">{{ item.xm }}</span><i>|</i><span class="name">{{ item.label }}</span></p>
                  <p class="fr">
                    <select v-model="selected" @change="setReminded(item.label)">
                        <option v-for="option in timeArr" :value="option.time">{{ option.time }}</option>
                    </select>
                    <span class="checkBox fr" @click="manage(item.label)"></span>
                  </p>
                </li>
              </ul>
           </div>
        </div>
        <!--右-->
        <div class="visitCon-item right fl porel">
          <div class="con">
              <p class="status">已完成</p>
              <p class="taskItem task clear" v-show="isShowR">
                <span class="item">还没有已完成事项</span>
              </p>
              <ul class="taskItemCon">
                <li class="clear" v-for="item in arrXm" v-show="item.status === 1" :class="getColor(item.type)">
                  <p class="fl"><span class="part">{{ item.xm }}</span><i>|</i><span class="name">{{ item.label }}</span></p>
                  <p class="fr">
                    <span class="checkBox checked fr">v</span>
                  </p>
                </li>
              </ul>
              <p class="endVisit">
                <span class="clickText" @click="endVisit">结束陪诊</span>
              </p>
           </div>
        </div>
    </div>
    <!--弹框-->
    <div id="confirm" v-show="popup">
      <div class="mb"></div>
      <div class="confirmCon">
        <p class="tishi">提示</p>
        <p id="msg">{{ msgcon }}</p>
        <ul class="epBtn clearfix">
          <li class="conBtn fr" id="rightBtn" @click="sureBtn">确定</li>
          <li class="conBtn fr" id="leftBtn" @click="cancle">取消</li>
        </ul>
      </div>
    </div>
    <!--showMsg-->
    <div class="showMessage flex lineC downC" v-show="show">
      <p class="flex downC">{{ msg }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      label: '',
      popup: false,
      msgcon: '',
      msg: '',
      show: false,
      selected: '不提醒',
      isShowL: true,
      isShowR: true,
      title: '陪诊',
      Pname: '王五五',
      timeArr: [],
      arrXm: [],
      pending: [], // 待处理
      completed: [], // 已完成
      // 页面信息
      dataInfo: {

      }
    }
  },
  components: {},
  mounted: function () {
    let _this = this
    _this.showMsg()
    _this.getColor()
    _this.getTime()
  },
  methods: {
    // 获取页面数据
    showMsg () {
      let _this = this
      _this.arrXm = [{
        type: 'jc',
        xm: '检查',
        label: '腹部B超',
        status: 0
      }, {
        type: 'jc',
        xm: '检查',
        label: '眼外及眼底检查',
        status: 1
      }, {
        type: 'jy',
        xm: '检验',
        label: '尿常规检验',
        status: 1
      }, {
        type: 'cf',
        xm: '处方',
        label: '胃温舒胶囊等',
        status: 1
      }, {
        type: 'cz',
        xm: '处置',
        label: '葡萄糖静滴',
        status: 1
      }, {
        type: 'jf',
        xm: '缴费',
        label: '缴费',
        status: 1
      }, {
        type: 'jy',
        xm: '检验',
        label: '血常规',
        status: 1
      }]
      // _this.pending = []
      // _this.completed = []
      _this.arrXm.forEach(function (item) {
        if (item.status === 0) {
          // _this.pending.push(item)
          _this.isShowL = false
        } else {
          // _this.completed.push(item)
          _this.isShowR = false
        }
      })
    },
    // 匹配各种项目的颜色
    getColor (type) {
      if (type === 'jc') {
        return 'jc'
      } else if (type === 'jy') {
        return 'jy'
      } else if (type === 'cf') {
        return 'cf'
      } else if (type === 'cz') {
        return 'cz'
      } else if (type === 'jf') {
        return 'jf'
      }
    },
    // 处理项目
    manage (label) {
      let _this = this
      _this.msgcon = '是否确认该项目已完成？'
      _this.popup = true
      _this.label = label
    },
    // 确定
    sureBtn () {
      let _this = this
      let newarr = [] // 待完成
      _this.arrXm.forEach(function (item) {
        if (item.label === _this.label) {
          item.status = 1
        }
        if (item.status === 0) {
          newarr.push(item)
        }
      })
      // 如果都已处理，显示’没有待完成‘
      if (newarr.length === 0) {
        _this.isShowL = true
      }
      _this.isShowR = false
      _this.popup = false
      _this.show = true
      _this.msg = '操作成功！'
      setTimeout(function () {
        _this.show = false
      }, 3000)
    },
    // 取消
    cancle () {
      let _this = this
      _this.popup = false
    },
    // 刷新
    reFresh () {
      let _this = this
      _this.showMsg()
    },
    // 挂起
    hung () {
      this.$router.push('/triageList')
    },
    // 去完成---体格检查
    goTgjc () {
      this.$router.push('/examination')
    },
    // 查看病历
    goRecord () {
      this.$router.push('/viewRecord')
    },
    // 结束分诊
    endVisit () {
      let _this = this
      let newarr = []
      _this.arrXm.forEach(function (item) {
        if (item.status === 0) {
          newarr.push(item)
        }
      })
      if (newarr.length > 0) {
        _this.$message({
          message: '请完成全部待处理事项后再结束',
          type: 'warning'
        })
      } else {
        this.$router.push('/triageList')
      }
    },
    // 设置提醒
    setReminded (val) {
      let _this = this
      if (_this.selected !== '不提醒') {
        let str = {}
        // 获取当前的时间  提醒时间(endTime) = 当前的时间(currentTime) + 选择的时间(selectedTime)
        let date = new Date()
        let currentTime = date.getHours() * 60 * 60 * 1000 + date.getMinutes() * 60 * 1000 + date.getSeconds() * 1000
        let selectedTime = 0
        let unit = _this.selected.slice(-2, 5)
        if (unit === '小时') {
          selectedTime = 1 * 60 * 60 * 1000 // ms
        } else if (unit === '分钟') {
          selectedTime = _this.selected.split(unit)[0] * 60 * 1000 // ms
        }
        let endTime = currentTime * 1 + selectedTime * 1 // ms
        str.time = selectedTime
        str.endTime = endTime
        str.name = _this.Pname
        str.xm = val
        sessionStorage.removeItem('setRemined')
        sessionStorage.setItem('setRemined', JSON.stringify(str))
        // 开启提醒
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
        }, 0.1)
      }
    },
    // 获得提醒的时间
    getTime () {
      let _this = this
      let newTime = {
        time: '不提醒'
      }
      _this.timeArr = [{
        time: '5分钟'
      }, {
        time: '10分钟'
      }, {
        time: '15分钟'
      }, {
        time: '20分钟'
      }, {
        time: '30分钟'
      }, {
        time: '1小时'
      }]
      _this.timeArr.splice(0, 0, newTime)
    }
  }
}
</script>
<style scope>
  .visitCon-item {
    width: 40%;
    background: #fafafa;
    height: 500px;
    border-radius: 12px;
  }
  .visitCon .left {
    margin-right: 5%;
  }
  .patientInfo {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .patientInfo .clickText {
    margin-left: 30px;
  }
  .visitCon-item .con {
    width: 90%;
    margin: 10px auto;
  }
  .visitCon-item .status {
    font-size: 16px;
    line-height: 40px;
    font-weight: bold;
  }
  .visitCon-item .task{
    background: #ffffff;
  }
  .taskItemCon p.fl {
    display: -webkit-box;
    display: -webkit-inline-box;
    display: inline-flex;
  }
  .taskItem, .taskItemCon li {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .taskItemCon .jc {
    background: lightskyblue;
  }
  .taskItemCon .jy {
    background: lightblue;
  }
  .taskItemCon .cf {
    background: navajowhite;
  }
  .taskItemCon .cz {
    background: lightpink;
  }
  .taskItemCon .jf {
    background: lightcoral;
  }
  .visitCon-item .task .item {
    color: #000000;
    font-size: 12px;
  }
  .visitCon-item .task .clickText {
    font-size: 14px;
  }
  .taskItemCon li .part {
    font-size: 14px;
  }
  .taskItemCon li i {
    margin: 0 8px;
  }
  .taskItemCon li .name {
    font-size: 13px;
    min-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .taskItemCon li select {
    width: 100px;
  }
  .taskItemCon li input[name = checkTask] {
    margin: 0;
    font-size: 40px;
  }
  .endVisit {
    text-align: end;
    position: absolute;
    bottom: 10px;
    width: 90%;
  }
  .endVisit .clickText {
    font-size: 12px;
  }
  .checkBox {
    display: block;
    width: 18px;
    height: 18px;
    border: 1px solid #a2a2a2;
    margin: 10px;
    border-radius: 4px;
  }
  .checked {
    text-align: center;
    line-height: 18px;
  }
</style>

<style>
  .pageTitle {
    font-size: 14px;
    line-height: 30px;
    background: gainsboro;
    color: #000000;
    padding-left: 10px;
  }
  .pageTitle span {
    margin-left: 10px;
  }
  .visitCon {
    width: 94%;
    margin: 20px auto 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  ul li {
    list-style: none;
  }
  .clickText {
    color: cornflowerblue;
    cursor: pointer;
  }
  i {
    font-style: normal;
  }
  .porel {
    position: relative;
  }
  .reFresh {
    width: 20px;
    float: right;
    margin-top: 10px;
  }
  select, select option {
    outline: none;
  }
  /*confirm弹框*/
  .confirmCon {
      width: 380px;
      height: 214px;
      background: #FFFFFF;
      border: 1px solid #979797;
      border-radius: 8px;
      text-align: center;
      z-index: 9;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -110.5px;
      margin-left: -191px;
  }
  .confirmCon .tishi {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #353535;
      line-height: 33px;
      margin-top: 46px;
  }
  .confirmCon #msg {
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: rgba(53,53,53,.69);
      line-height: 22px;
      margin: 14px 0 41px;
  }
  .confirmCon ul li {
      width: 49.5%;
      height: 18px;
      line-height: 18px;
      margin-top: 19px;
      cursor: pointer;

  }
  .confirmCon ul li:active {
    background: #fff !important;
  }
  .confirmCon #leftBtn {
      border-right: 1px solid #E8ECEA;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: rgba(255,0,0,.69);
  }
  .confirmCon #rightBtn {
      font-family: PingFangSC-Light;
      font-size: 16px;
      color: rgba(53,53,53,.69);
  }
  /*蒙版*/
  #bodyMb,.mb,#chargep{
      width:100%;
      height: 100%;
      background: rgba(19,19,19,.5);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
  }
  #confirm {
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  #popBox,#payBox {
      width: 672px;
      background: #ffffff;
      position: absolute;
      top: 10%;
      left: 50%;
      margin-left: -336px;
      border: 1px solid #ececec;
      border-radius: 8px;
      padding-top: 10px;

  }
  .epBtn {
      border-top:1px solid rgba(232,232,232,.6);
  }
</style>
