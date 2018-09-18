<template>
  <div class="bill">
    <router-link to="/my" tag="div" class="black"><img width="8" src="/static/images/bank/black@2x.png" alt=""><span>我的账单</span></router-link>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">审核中</mt-tab-item>
      <mt-tab-item id="3">未通过</mt-tab-item>
      <mt-tab-item id="4">待还款</mt-tab-item>
      <mt-tab-item id="5">还款中</mt-tab-item>
      <mt-tab-item id="6">已还款</mt-tab-item>
    </mt-navbar>

    <!-- <mt-tab-container v-model="selected" style="margin-top:3px;">
      <mt-tab-container-item id="1">
        <mt-cell v-for="n in 10" :title="'content ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'content ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :title="'content ' + n" />
      </mt-tab-container-item>
    </mt-tab-container> -->
    <div class="loading"><img width="100" src="/static/images/bill/noBillLoading@2x.png" alt=""><p>暂无订单</p></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected:'1'
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
        left:px2rem(144px);
        transform: translateY(-50%);
      }
    }


  .mint-navbar .mint-tab-item {
    padding: px2rem(16px) 0;
    font-size: px2rem(13px);
  }
  .mint-navbar .mint-tab-item .is-selected {
    border-bottom: px2rem(1px) solid #FB5F48;
    color: #FB5F48;
    margin-bottom: -3px;
  }
  .loading{
    text-align: center;
    position: absolute;
    top:px2rem(180px);
    left:50%;
    transform:translateX(-50%);
    font-size:px2rem(15px);
    color:#B3B3B3;
    p{
      margin-top:px2rem(10px);
    }
  }
  

</style> 
