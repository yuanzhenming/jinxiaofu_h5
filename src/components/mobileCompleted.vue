<template>
  <div class="mobile_validate">
    <div class="white_bg">
      <div>
        <img src="/static/images/mobileOperato/mobileComplete.png" alt="">
        <p>你已授权成功，请稍后查询</p>
      </div>
    </div>
    <!-- 下一步 -->
    <router-link to="/home" tag="div" class="button">返回首页</router-link>
    <!-- 更多帮助 -->
    <router-link to="/answerProblem" tag="div" class="more_help">
      <img src="/static/images/mobileOperato/moreHelp.png" alt=""><span>更多帮助</span>
    </router-link>
    <div class="privacy"><p>保护信息安全，杜绝隐私泄露</p>©本服务由杭州信川科技有限公司提供</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        phoneCode:'60秒'
      }
    },
    methods: {
      getShortCode(){
        let _this = this;
        this.checkNum();
        // http://jybapp.guoji1818.com/api/user/getPhoneCode?phone=18838515567
        if(/^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(this.form.phone)) {
          this.$http.get('').then((res) => {
            console.log("res",res)
          }).catch((err) => {
            console.log('err:',err);
          })
          
        } 
      },
    },
    created() {
      let _this = this;
      let s = 60;
      let time = setInterval(() =>{
        s -= 1;
        s <= 0 ? (_this.phoneCode="60秒",clearInterval(time)) : _this.phoneCode = s +'秒'
      },1000)
    }
   
  }
</script>       

<style scoped lang='scss'>
 @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .white_bg{
    box-sizing: border-box;
    height:px2rem(165px);
    background-color:#FFFFFF;
    padding-top:px2rem(42px);
    div{
      text-align: center;
      font-size:px2rem(13px);
      color:#666666;
      p{
        margin-top:px2rem(14px);
      }
    }
  }
  
  // 更多帮助
  .more_help{
    margin-top:px2rem(128px);
    text-align: center;
    font-size: px2rem(13px);
    color:#B3B3B3;
    span{
      height: px2rem(15px);
      line-height: px2rem(15px);
      vertical-align: top;
      margin-left:px2rem(6px);
    }
  }
  .privacy{
    margin-top:px2rem(22px);
    color:#B3B3B3;
    font-size: px2rem(12px);
    text-align: center;
    line-height: px2rem(20px);
  }
  // 下一步按钮
  .button {
    width:px2rem(339px);
    height: px2rem(45px);
    font-size: px2rem(17px);
    color:#FFFFFF;
    background:linear-gradient(to right,#FB5F48,#FE5F1B);
    border-radius: px2rem(4px);
    margin: 0 auto;
    text-align: center;
    line-height: px2rem(45px);
    margin-top:px2rem(50px);
  }
  // 弹窗
  .popup{
    width:px2rem(300px);
    height:px2rem(154px);
    border-top-left-radius: px2rem(4px);
    border-top-right-radius: px2rem(4px);
    text-align: center;
    .popup_title{
      height:px2rem(56px);
      line-height: px2rem(56px);
      border-top-left-radius: px2rem(4px);
      border-top-right-radius: px2rem(4px);
      text-align: center;
      background: url('/static/images/my/myBg.png')  100% 100%;
      color:#FFFFFF;
      font-size:px2rem(17px);
    }
    div:nth-child(2) {
      color:#666666;
      font-size:px2rem(13px);
      height: px2rem(52px);
      line-height: px2rem(52px);
      padding-left: px2rem(19px);
      border-bottom: px2rem(0.1px) solid #E0E0E0;
    }
    div:nth-child(3) {
      font-size:px2rem(20px);
      border:none;
      color:#666666;
      height:px2rem(46px);
      line-height: px2rem(46px);
    }
  }
</style>
