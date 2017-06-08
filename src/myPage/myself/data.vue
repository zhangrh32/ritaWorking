<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <li class="arrow" @click="pickPre(currentYear,currentMonth)"></li>
        <li class="year-month" @click="pickYear(currentYear,currentMonth)">
          <span class="choose-year">{{ currentYear }}</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNext(currentYear,currentMonth)"></li>
      </ul>
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
      <li @click="pick(day)" v-for="day in days">
        <!--本月-->
        <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span v-else>
        <!--今天-->
        <span v-if="day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() === new Date().getDate()" class="active">{{ day.getDate() }}</span>
        <span v-else>{{ day.getDate() }}</span>
        </span>
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
      days: []
    }
  },
  created: function () {
    this.initData(null)
  },
  mounted: function () {},
  methods: {
    // 执行日历
    initData: function (cur) {
      var date
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
      }
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentWeek = date.getDay() // 1...6,0
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      console.log('today:' + str + ',' + this.currentWeek)
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      console.log(this.currentWeek)
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        console.log('y:' + d.getDate())
        this.days.push(d)
      }
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    },
    // 当前日期
    pick: function (date) {
      alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    },
    // 上一月
    pickPre: function (year, month) {
      //  setDate(0) 上月最后一天
      //  setDate(-1) 上月倒数第二天
      //  setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    // 下一月
    pickNext: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    // 当前年月
    pickYear: function (year, month) {
      alert(year + ',' + month)
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function (year, month, day) {
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

