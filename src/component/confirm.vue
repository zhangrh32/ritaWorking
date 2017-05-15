<<template>
  <div>
    <div class="confirmBox" :class="{'Hide':true == isConfirm}" v-model="isConfirm">
        <div class="Mb"></div>
        <div class="conBox">
            <div>
                <p class="conBoxTop clear">
                  <i class="close fr">X</i>
                </p>
                <p class="text">{{ con }}</p>
                <p class="Btn">
                  <button>确定</button>
                  <button>取消</button>
                </p>
            </div>
        </div>
    </div>
  </div>
</template>
<<script>
export default {
  props: {
    isConfirm: {
      default: false
    },
    con: String
  }
}
</script>

<style scope>
  .Hide {
    display: none;
  }
  .confirmBox, .confirmBox .Mb {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .confirmBox .Mb {
    background: rgba(0, 0, 0, .4)
  }
  .confirmBox .conBox {
    background: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -120px;
    margin-left: -250px;
    height: 240px;
    width: 500px;
    border-radius: 12px;
  }
  .conBoxTop {
    padding: 20px;
  }
  .fr {
    float: right;
  }
  .clear {
    clear: both;
    overflow: hidden;
  }
  .conBox .close {
    margin-right: 20px;
  }
  .conBox .text {
    line-height: 24px;
    margin-top: 30px;
    text-align: center;
  }
  .conBox .Btn {
    padding-top: 30px;
    text-align: center;
  }
</style>
