<template>
  <div class="more_validation">
    <div class="title">为什么有多次验证？</div>
    <div class="leg">根据您的手机运营商不同，会需要不同的验证码次数，通常为1-2次验证码，请耐心等待。由于运营商对验证码的限制非常严格，请输入验证码前仔细确认，避免因为验证码错误耽误您的宝贵时间。</div>
    <router-link to="/answerProblem" tag="div" class="button">返回</router-link>
  </div>
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .more_validation{
    font-size: px2rem(15px);
    color:#666666;
     background-color:#FFFFFF;
     padding:px2rem(20px) px2rem(17px) px2rem(390px);
    .title {
      font-size: px2rem(16px);
      color:#333333;
      font-weight: Bold;
    }
    .leg{
      margin-top:px2rem(30px);
      text-indent:2em;
      line-height: px2rem(22px);
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
  
</style>

