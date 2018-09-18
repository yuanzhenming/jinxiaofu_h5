<template>
  <div class="add_card">
    <div class="warning"><img src="/static/images/basicData/warning.png" alt=""><span>请上传借贷认证截图</span></div>
    <div class="will_inf">
      <div class="will_inf_title first"><img src="/static/images/certification/titleMark.png" alt=""><div>借贷宝<em>（需上传收还款，已还清页面）</em></div></div>
      <div class="weill_con"><img src="/static/images/basicData/upload.png" alt=""></div>
    </div>
    <div class="will_inf">
      <div class="will_inf_title"><img src="/static/images/certification/titleMark.png" alt=""><div>今借到<em>（需上传收还款，已还清页面）</em></div></div>
      <div class="weill_con"><img src="/static/images/basicData/upload.png" alt=""></div>
    </div>
    <div class="will_inf">
      <div class="will_inf_title"><img src="/static/images/certification/titleMark.png" alt=""><div>米房<em>（需上传收还款，已还清页面）</em></div></div>
      <div class="weill_con"><img src="/static/images/basicData/upload.png" alt=""></div>
    </div>
    <div class="will_inf">
      <div class="will_inf_title"><img src="/static/images/certification/titleMark.png" alt=""><div>无忧<em>（需上传收还款，已还清页面）</em></div></div>
      <div class="weill_con"><img src="/static/images/basicData/upload.png" alt=""></div>
    </div>
    <div class="will_inf">
      <div class="will_inf_title"><img src="/static/images/certification/titleMark.png" alt=""><div>有凭证<em>（需上传收还款，已还清页面）</em></div></div>
      <div class="weill_con"><img src="/static/images/basicData/upload.png" alt=""></div>
    </div>
    <div class="will_inf">
      <div class="will_inf_title"><img src="/static/images/certification/titleMark.png" alt=""><div>支付宝<em>（需上传收还款，已还清页面）</em></div></div>
      <div class="weill_con"><img src="/static/images/basicData/upload.png" alt=""></div>
    </div>
    <div class="button" @click="achieve()">提交</div>
  </div>
</template>
<<script>
  export default{
    data() {
      return {

      }
    },
    methods: {
      achieve() {
        this.$router.push('/certification')
      }
    }
  }
</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .warning {
    background-color:#FFDFD1;
    color:#FE5F1B;
    height:px2rem(30px);
    font-size: px2rem(13px);
    position: relative;
    img {
      position: absolute;
      top:px2rem(8px);
      left: px2rem(100px);
    }
    span{
      position: absolute;
      top:px2rem(9px);
      left: px2rem(120px);
    }
  }
  .will_inf{
    background-color:#FFFFFF;
    .will_inf_title{
      margin-top: px2rem(10px);
      height: px2rem(46px);
      font-size:px2rem(15px);
      color:#333333;
      padding-left:px2rem(18px);
      border-bottom: px2rem(1px) solid #E6E6E6;
      position: relative;
      img {
        position: absolute;
        top:50%;
        transform: translateY(-50%);
      }
      div{
        margin-left: px2rem(15px);
        position: absolute;
        top:50%;
        transform: translateY(-50%);
      }
      em{
        color:#FE5F1B;
      }
    }
    .weill_con{
      width:px2rem(357px);
      height:px2rem(84px);
      margin-left:px2rem(18px);
      position: relative;
      img {
        position: absolute;
        top:50%;
        transform: translateY(-50%);
      }
    }
    .first {
      margin-top:0;
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
