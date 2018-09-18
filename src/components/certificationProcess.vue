<template>
  <div class="certification_process">
    <div class="title">认证过程需要多久？</div>
    <div class="leg">根据运营商网络情况不同，认证服务需要1-3分钟时间才能完成，请耐心等待。 如果您发现等待时间过长，请选择非网络高峰期的时间重新认证。</div>
    <router-link to="/answerProblem" tag="div" class="button">返回</router-link>
  </div>
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .certification_process{
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

