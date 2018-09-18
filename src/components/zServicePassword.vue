<template>
  <div class="zserver_paswd">
    <div class="top"><img src="/static/images/mobileOperato/forgetPassServer.png" alt=""><span>找回服务密码</span></div>
    <div class="phone"><img src="/static/images/mobileOperato/phone.png" alt=""><input type="number" placeholder="请输入手机号"></div>
    <div class="button">下一步</div>
    <div class="privacy"><p>保护信息安全，杜绝隐私泄露</p>©本服务由杭州信川科技有限公司提供</div>
  </div>
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .top {
    line-height: px2rem(20px);
    height:px2rem(90px);
    font-size: px2rem(13px);
    border-bottom:px2rem(1px) solid rgb(229,229,229);
    background-color:#FFFFFF;
    img {
      margin-left:px2rem(139px);
      margin-top:px2rem(38px);
    }
    span {
      margin-left:px2rem(6px);
      margin-top:px2rem(38px);
      display: inline-block;
      height:px2rem(15px);
      line-height: px2rem(15px);
      vertical-align: top;
    }
  }
  .phone{
    height: px2rem(48px);
    font-size: px2rem(15px);
    background-color:#FFFFFF;
    position: relative;
    img{
      position: absolute;
      left:px2rem(20px);
      top:px2rem(14px);
    }
    input{
      position: absolute;
      left:px2rem(48px);
      top:50%;
      transform: translateY(-50%);
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
    margin-top:px2rem(331px);
    color:#B3B3B3;
    font-size: px2rem(12px);
    text-align: center;
    line-height: px2rem(20px);
  }
</style>

