<template>
  <div class="newsCenter">
    <router-link to="/my" tag="div" class="black"><img src="/static/images/bank/black.png" alt=""><span>消息中心</span></router-link>
    <ul>
      <li>
        <div class="title">借贷成功</div>
        <p>您已成功借款1000.00元，请及时查询到账信息，如有任何问题，请随时登录联系在线客服。</p>
      </li>
      <li>
        <div class="title">还款成功</div>
        <p>您已成功借款1000.00元，请及时查询到账信息，如有任何问题，请随时登录联系在线客服。</p>
      </li>
    </ul>
  </div>
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .black{
      height:px2rem(40px);
      color:#333333;
      font-size: px2rem(18px);
      background-color:#FFFFFF;
      border-bottom: px2rem(1px) solid rgb(229, 229, 229);
      position: relative;
      img {
        position: absolute;
        top:50%;
        left:px2rem(12px);
        transform: translateY(-50%);
      }
      span {
        position: absolute;
        top:50%;
        left:px2rem(144px);
        transform: translateY(-50%);
      }
    }
  ul{
    position: relative;
    li {
      position: relative;
      height: px2rem(96px);
      background-color: #FFFFFF;
      .title{
        position: absolute;
        top:px2rem(20px);
        left: px2rem(36px);
        color:#333333;
        font-size: px2rem(15px);
        &:after{
          width:px2rem(8px);
          height:px2rem(8px);
          background-color:#ED3D25;
          border-radius: 50%;
          content: '';
          position: absolute;
          top:px2rem(2px);
          left:px2rem(-18px);
        }
      }
      p {
        position: absolute;
        top:px2rem(46px);
        left: px2rem(36px);;
        color:#666666;
        font-size:px2rem(13px);
        width: px2rem(322px);
        line-height: px2rem(18px);
      }
    }
  }

  
</style> 
