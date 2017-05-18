<<template>
  <div id="login">
    <div class="login-body">
      <p class="pageName">
        {{pageName}}
      </p>
      <ul class="login-form">
        <li class="login-item">
          <span class="itemname">手机号</span>
          <input class="iteminput" v-model="form.phone" placeholder="输入手机号"/>
        </li>
        <li class="login-item">
          <span class="itemname">密码</span>
          <input class="iteminput" v-model="form.pwd" placeholder="输入6-12位密码"/>
        </li>
        <li class="login-item">
          <span class="itemname">验证</span>
          <div id="slider">
            <div class="drag_bg"></div>
            <div class="drag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div>
            <div class="handler handler_bg"></div>
          </div>
        </li>
        <button class="itembutton" @click="Login">登录</button>
      </ul>
    </div>
    <!--提示信息-->
    <div class="showMessageCon">
      <p><span>请将信息输入完整</span></p>
    </div>
  </div>
</template>
<script>
import apiAddress from '@/stroe.js'
export default {
  data () {
    return {
      pageName: '登录',
      form: {
        phone: '',
        pwd: ''
      }
    }
  },
  mounted: function () {
    this.useSlider()
  },
  methods: {
    Login () {
      if (apiAddress.checkSlider && this.form.phone && this.form.pwd ) {
        // let md5 = require('md5')
        this.$router.push('/index')
      } else {
        alert('请将信息填写完整')
      }
      // let _this = this
    },
    // 滑块验证的函数
    useSlider () {
      (function(window,document,undefined){
          var dog = {//声明一个命名空间，或者称为对象
              $:function(id){
                  return document.querySelector(id);
              },
              on:function(el,type,handler){
                  el.addEventListener(type,handler,false);
              },
              off:function(el,type,handler){
                  el.removeEventListener(type,handler,false);
              }
          };
          //封装一个滑块类
          function Slider(){
              var args = arguments[0];
              for(var i in args){
                  this[i] = args[i];  //一种快捷的初始化配置
              }
              //直接进行函数初始化，表示生成实例对象就会执行初始化
              this.init();
          }
          Slider.prototype = {
              constructor:Slider,
              init:function(){
                this.getDom();
                this.dragBar(this.handler);
              },
              getDom:function(){
                this.slider = dog.$('#'+this.id);
                this.handler = dog.$('.handler');
                this.bg = dog.$('.drag_bg');
              },
              dragBar:function(handler){
                var that = this,
                    startX = 0,
                    lastX = 0,
                    doc = document,
                    width = this.slider.offsetWidth,
                    max = width - handler.offsetWidth,
                    drag = {
                        down:function(e){
                          var e = e||window.event;
                          that.slider.classList.add('unselect');
                          startX = e.clientX - handler.offsetLeft;
                          // console.log('startX: '+startX+' px');
                          dog.on(doc,'mousemove',drag.move);
                          dog.on(doc,'mouseup',drag.up);
                          return false;
                        },
                        move:function(e){
                          var e = e||window.event;
                          lastX = e.clientX - startX;
                          lastX = Math.max(0,Math.min(max,lastX)); //这一步表示距离大于0小于max，巧妙写法
                          // console.log('lastX: '+lastX+' px');
                          if(lastX>=max){
                              handler.classList.add('handler_ok_bg');
                              that.slider.classList.add('slide_ok');
                              dog.off(handler,'mousedown',drag.down);
                              drag.up();
                              apiAddress.checkSlider = true
                          }
                          that.bg.style.width = lastX + 'px';
                          handler.style.left = lastX + 'px';
                        },
                        up:function(e){
                          var e = e||window.event;
                          that.slider.classList.remove('unselect');
                          if(lastX < width){
                              that.bg.classList.add('ani');
                              handler.classList.add('ani');
                              that.bg.style.width = 0;
                              handler.style.left = 0;
                              setTimeout(function(){
                                that.bg.classList.remove('ani');
                                handler.classList.remove('ani');
                              },300);
                          }
                          dog.off(doc,'mousemove',drag.move);
                          dog.off(doc,'mouseup',drag.up);
                        }
                    };
                dog.on(handler,'mousedown',drag.down);
              }
          };
          window.S = window.Slider = Slider;
        })(window,document);
        var defaults = {
          id:'slider'
        };
        new S(defaults);
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
  .ani{transition:all .3s;}
  .inner{ padding:15px; }
  .clearfix{ overflow:hidden; _zoom:1; }
  .none{ display:none; }
  #slider{position:relative;background-color:#e8e8e8;width:200px;height:30px;line-height:30px;text-align:center;}
  #slider .handler{position:absolute;top:0px;left:0px;width:40px;height:28px;border:1px solid #ccc;cursor:move;}
  .handler_bg{background:#fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;}
  .handler_ok_bg{background:#fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;}
  #slider .drag_bg{background-color:#7ac23c;height:30px;width:0px;}
  #slider .drag_text{position:absolute;top:0px;width:200px;-moz-user-select:none;-webkit-user-select:none;user-select:none;-o-user-select:none;-ms-user-select:none;}
  .unselect{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;}
  .slide_ok{color:#fff;}
</style>
<style>
  .pageName {
    text-align: center;
    line-height: 80px;
    font-size: 24px;
    letter-spacing: 8px;
  }
</style>
<style scope>
  .showMessageCon {
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -75px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: lightcoral;
    color: #fff;
  }
</style>
