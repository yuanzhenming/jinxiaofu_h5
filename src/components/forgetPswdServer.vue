<template>
  <div class="forget_pswd_server">
    <div class="title">忘记服务密码？</div>
    <div class="first">服务密码是中国联通、中国移动、中国电信客户的身份识别密码，由6位数字组合（0～9）。如果忘记了密码，可以选择下面的方式来找回密码:</div>
    <div class="one">1. 致电运营商的客服号码，选择人工服务，核实您的身份信息后即可找回密码。</div>
    <div class="phone">移动客服电话 10086</div>
    <div class="phone">联通客服电话 10010</div>
    <div class="phone">电信客服电话 10000</div>
    <div class="two">2. 打开电脑浏览器，访问运营商的网站，您可以在运营商的官网上重置密码。</div>
    <div class="website">移动的官方网站：http://www.10086.cn/</div>
    <div class="website">联通的官方网站：http://www.10010.com/</div>
    <div class="website">电信的官方网站：http://www.189.cn/</div>
    <div class="three">3. 请携带您的身份证等证件，前往各地的运营商营业厅柜台办理。</div>
    <router-link to="/answerProblem" tag="div" class="button">返回</router-link>
  </div>
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .forget_pswd_server{
    font-size: px2rem(15px);
    color:#666666;
     background-color:#FFFFFF;
     padding:px2rem(20px) px2rem(17px) 0px;
    .title {
      font-size: px2rem(16px);
      color:#333333;
      font-weight: Bold;
    }
    .first{
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

