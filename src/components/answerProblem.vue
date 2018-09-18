<template>
  <div class="answer_problem">
    <div class="answer_con">
      <router-link to="/forgetPswdServer" tag="div"><span>忘记服务密码？</span><img src="/static/images/basicData/skip.png" alt=""></router-link>
      <router-link to="/unableVerifying" tag="div"><span>无法收到验证码？</span><img src="/static/images/basicData/skip.png" alt=""></router-link>
      <router-link to="/moreValidation" tag="div"><span>为什么有多次验证码？</span><img src="/static/images/basicData/skip.png" alt=""></router-link>
      <router-link to="/certificationProcess" tag="div"><span>认证过程需要多久？</span><img src="/static/images/basicData/skip.png" alt=""></router-link>
    </div>
    <router-link to="/mobileOperato" tag="div" class="button">返回</router-link>
    <div class="privacy"><p>保护信息安全，杜绝隐私泄露</p>©本服务由杭州信川科技有限公司提供</div>
  </div>
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .answer_con{
    background-color:#FFFFFF;
    div{
      height: px2rem(48px);
      line-height: px2rem(48px);
      font-size: px2rem(15px);
      color:#333333;
      position: relative;
      span{
        margin-left:px2rem(18px);
      }
      img {
        position: absolute;
        top:px2rem(18px);
        left:px2rem(349px);
      }
    }
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
  .privacy{
    margin-top:px2rem(152px);
    color:#B3B3B3;
    font-size: px2rem(12px);
    text-align: center;
    line-height: px2rem(20px);
  }
</style>

