<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <div style="display:-webkit-box;">
        <p class="arrow" @click="pickPre(currentYear,currentMonth)"> < </p>
        <p class="year-month" @click="pickYear(currentYear,currentMonth)">
          <span class="choose-year">{{ currentYear }}</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </p>
        <p class="arrow" @click="pickNext(currentYear,currentMonth)"> > </p>
      </div>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="color:red">六</li>
      <li style="color:red">日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <li @click="pick(day)" v-for="day in newDays">
        <span :class="{'other-month':day.time.getMonth()+1 != currentMonth}" >{{ day.time.getDate() }}</span>
        <p class="dayMessage" v-if="day.shis">
          <span>实收：{{ day.shis }}</span>
          <span>实退：{{ day.shit }}</span>
        </p>
        <p v-else></p>
        <!--非本月
        <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span v-else>
          今天
          <span v-if="day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() === new Date().getDate()" class="active">{{ day.getDate() }}</span>
          本月其他天
          <span v-else>{{ day.getDate() }}</span>
        </span>
        -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      newDays: [],
      // 页面显示内容
      tableData: []
    }
  },
  created: function () {
    let _this = this
    let date = new Date()
    _this.initData(_this.formatDate(date.getFullYear(), date.getMonth() + 1, 1))
  },
  mounted: function () {
    this.showDataMessage()
  },
  methods: {
    // 得到页面显示内容的数据
    showDataMessage () {
      let _this = this
      _this.tableData = [{
        shis: '20.00',
        shit: '180.00',
        day: '2017-6-1'
      }, {
        shis: '20.00',
        shit: '180.00',
        day: '2017-6-5'
      }, {
        shis: '20.00',
        shit: '180.00',
        day: '2017-6-8'
      }, {
        shis: '20.00',
        shit: '180.00',
        day: '2017-6-20'
      }, {
        shis: '20.00',
        shit: '180.00',
        day: '2017-6-23'
      }, {
        shis: '20.00',
        shit: '180.00',
        day: '2017-6-28'
      }]
      // 如果需要将showDataMessage 与days合并
      _this.newDays = []
      _this.days.forEach(function (row) {
        let str = {}
        _this.tableData.forEach(function (item) {
          let dataTime = row.getFullYear() + '-' + parseInt(row.getMonth() + 1) + '-' + row.getDate()
          if (dataTime === item.day) {
            str.time = row
            str.shis = item.shis
            str.shit = item.shit
          } else {
            str.time = row
          }
        })
        _this.newDays.push(str)
      })
    },
    // 执行日历
    initData (cur) {
      var date
      date = new Date(cur)
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentWeek = date.getDay() // 1...6,0
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        this.days.push(d)
      }
      // if days>30 天，且要求显示一个月完整的天数，则需要判断days，从而得到i<=35 or i<=42
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    },
    // 当前日期
    // pick: function (date) {
    //   alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    // },
    // 上一月
    pickPre (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      this.showDataMessage()
    },
    // 下一月
    pickNext (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      this.showDataMessage()
    },
    // 当前年月
    pickYear (year, month) {
      alert(year + ',' + month)
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate (year, month, day) {
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
  }
}
</script>
<style>
  .active {
    color: #8ccc66;
  }
  .other-month {
    color: #cccccc;
  }
  .weekdays li,.days li {
    float: left;
    width: 120px;
    height: 120px;
    text-align: center;
  }
  ul {
    clear: both;
    overflow: hidden;
    width: 854px;
  }
  .dayMessage {
    width: 100px;
    color: red;
  }
  #calendar li:nth-child(n) {
    border-top: 1px solid #d2d2d2;
    border-left: 1px solid #d2d2d2;
  }
  #calendar li:nth-child(7n) {
    border-right: 1px solid #d2d2d2;
  }
  #calendar .days {
    border-bottom: 1px solid #d2d2d2;
  }
</style>

