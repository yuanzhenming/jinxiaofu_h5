<template>
  <div class="set">
    <router-link to="/my" tag="div" class="black"><img src="/static/images/bank/black.png" alt=""><span>设置</span></router-link>
    <!-- <router-link to="/revisePaswd" tag="div" class="revise"><span>修改密码</span><img src="/static/images/basicData/skip.png" alt=""></router-link> -->
    <router-link to="/login" tag="div" class="button">安全退出</router-link>
  </div>
</template>
<script>
  export default{
   watch:{
     $route(to,from){
       if (to.path == "/login"){
          sessionStorage.removeItem('userId')
          this.$router.go(0)
       }
     }
   }
     
  }
</script>
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
        left:50%;
        transform: translate(-50%,-50%);
      }
    }
  .revise{
    height: px2rem(50px);
    margin-top:px2rem(1px);
    background-color: #FFFFFF;
    font-size: px2rem(15px);
    color:#333333;
    position: relative;
    span {
      position: absolute;
      top:px2rem(18px);
      left:px2rem(18px);
    }
    img {
      position: absolute;
      top:px2rem(18px);
      left:px2rem(349px);
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
    margin-top:px2rem(50px);
  }
</style> 
