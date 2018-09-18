<template>
  <div class="unable_verifying">
    <div class="title">无法收到验证码？</div>
    <div class="first">如果您无法收到手机短信验证码，请尝试下面的方法解决:</div>
    <div class="one">1. 检查您的手机是否暂无信号或者已经欠费;</div>
    <div class="two">2. 确认您的手机上是否安装了安全软件，导致短信验证码被拦截或屏蔽;</div>
    <div class="three">3. 访问您手机运营商的官方网站，并尝试登录营业厅，确认您的手机是否因为验证码发送过于频繁导致收不到验证码。各手机运营商官方网站为:</div>
    <div class="website">移动的官方网站：http://www.10086.cn/</div>
    <div class="website">联通的官方网站：http://www.10010.com/</div>
    <div class="website">电信的官方网站：http://www.189.cn/</div>
    <div class="last_leg">如果以上方法都没有解决，可能是暂时的网络延迟，您可以稍后尝试重新获取。</div>
    <router-link to="/answerProblem" tag="div" class="button">返回</router-link>
  </div>
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .unable_verifying{
    font-size: px2rem(15px);
    color:#666666;
     background-color:#FFFFFF;
     padding:px2rem(20px) px2rem(17px) px2rem(70px);
    .title {
      font-size: px2rem(16px);
      color:#333333;
      font-weight: Bold;
    }
    .first, .last_leg{
      margin-top:px2rem(30px);
      text-indent:2em;
      line-height: px2rem(22px);
    }
    .one ,.two,.three{
      margin-top:px2rem(19px);
      text-indent:1em;
      line-height: px2rem(22px);
    }
    .phone,.website{
      margin-top:px2rem(15px);
      text-indent:2em;
      line-height: px2rem(22px);
    }
  }
  .last_leg{
    margin-top:px2rem(19px);
  }
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
    margin-top:px2rem(30px);
  }
  
</style>

