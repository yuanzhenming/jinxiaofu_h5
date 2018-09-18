<template>
  <div class="mobile_validate">
    <div class="white_bg">
      <div class="title"><img src="/static/images/mobileOperato/security.png" alt=""><span> GlobalSign 国际安全认证</span></div>
      <div>手机验证码已经发送</div>
      <div><span>验证码</span><input type="text" placeholder="请输入手机验证码"><div>{{phoneCode}}</div></div>
    </div>
    <div class="agreement">
      <!-- 忘记密码服务 -->
      <router-link to="/forgetPswdServer" tag="div">
        <img src="/static/images/mobileOperato/forgetPassServer.png" alt=""><span>忘记服务密码</span>
      </router-link>
    </div>
    <!-- 下一步 -->
    <div class="button" @click="achived">下一步</div>
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
      achived() {
        this.$router.push('/mobileCompleted')
      }
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
    background-color:#FFFFFF;
    .title{
      position: relative;
      height: px2rem(90px);
      font-size: px2rem(13px);
      border-bottom:px2rem(1px) solid rgb(229,229,229);
      img{
        position: absolute;
        top:px2rem(38px);
        left: px2rem(106px);
      }
      span{
        position: absolute;
        top:px2rem(38px);
        left: px2rem(126px);
      }
    }
    div:nth-child(2) {
      height:px2rem(75px);
      line-height:px2rem(75px);
      text-align: center;
      color:#666666;
      font-size:px2rem(15px);
    }
    div:nth-child(3) {
      height:px2rem(48px);
      line-height:px2rem(48px);
      font-size:px2rem(15px);
      span{
        margin-left:px2rem(18px);
        margin-top:px2rem(17px);
        color:#333333;
      }
      input{
        margin-left:px2rem(10px);
        width:px2rem(180px);
        color:#B3B3B3;
        border-right:px2rem(1px) solid #0082E7;
      }
      div{
        box-sizing: border-box;
        width:px2rem(114px);
        padding-right:px2rem(18px);
        display: inline-block;
        text-align: right;
        color:#FE5F1B;
        
      }
    }
  }
  .agreement{
    margin-top:px2rem(12px);
    font-size: px2rem(13px);
    div {
      width:px2rem(115px);
      float: right;
      span {
        margin-left:px2rem(6px);
        height:px2rem(15px);
        line-height: px2rem(15px);
        vertical-align: top;
        color:#B3B3B3;
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
