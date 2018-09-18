<template>
  <div class="bank">
    <div  class="black">
      <router-link to="/my" tag="div" class="blackBtn">
        <img src="/static/images/bank/black.png" alt="">
      </router-link>
      <span>我的银行卡</span>
    </div>
    <div class="card" v-if="bankShow">
      <!-- 建行 -->
      <div class="card_con">
        <!-- <img width="351" src="/static/images/bank/jianshe@2x.png" alt=""> -->
        <div class="bank_bg"></div>
        <mark>{{bank_name}}</mark>
        <p>****&nbsp;****&nbsp;****&nbsp;<em>{{bank_card}}</em></p>
      </div>
    </div>
    <div class="loading" v-else><img width="100" src="/static/images/bank/noBankLoading@2x.png" alt=""><p>暂无可用银行卡</p></div>
    <router-link v-if="false" to="/addBankCard" tag="div" class="add_button"><img src="/static/images/bank/add.png" alt=""><span>添加银行卡</span></router-link>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bankShow:false,
        bank_card:'',//银行卡号
        bank_code:'',//银行卡类型
        bank_name:'',//银行卡名字
      }
    },
    created(){
      //获取用户id
      this.userId = sessionStorage.getItem('userId');
      console.log('userId',this.userId);
      //请求数据信息
      this.$http({
        url: '/certification/index',
        method: 'post',
        data: {
          num:this.userId,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) =>{
        console.log('res',res);
        let datas = res.data;

        if(res.status == 200) {
          this.bank_card = datas.bank_card.substr(datas.bank_card.length-4) ;
          this.bankName(datas.bank_code)
          if(datas.bank_code && datas.bank_card){
            this.bankShow = true
          }
        }
      })
      
    },
    methods:{
      //请求银行卡名字接口
      bankName(bank_code){
          this.$http({
            url: '/admin/bank',
            method: 'post',
            data: {
              bank_code: bank_code,
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) =>{
            console.log('bank',res);
            let datas = res.data;
            if(res.status == 200) {
              console.log(datas.name)
              this.bank_name = datas.name
            }
          })

      }
    }
  }
</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .bank {
    .black{
      height:px2rem(40px);
      color:#333333;
      font-size: px2rem(18px);
      background-color:#FFFFFF;
      border-bottom: px2rem(1px) solid rgb(229, 229, 229);
      position: relative;
      .blackBtn{
        width:20%;
      }
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
    .card{
      position: absolute;
      left:50%;
      transform: translateX(-50%);
      height: px2rem(580px);
      overflow: scroll;
    }
    .card_con{
      margin-top:px2rem(10px);
      font-size:px2rem(20px);
      text-align: center;
      position: relative;
      .bank_bg{
        width:px2rem(351px);
        height: px2rem(113px);
        background-color:#009AEA;
        border-radius:px2rem(12px);
      }
      mark{
        position: absolute;
        top:px2rem(12px);
        left:px2rem(64px);
        color:#FFFFFF;
        font-size:px2rem(15px);
      }
      p{
        position: absolute;
        top:px2rem(59px);
        left: px2rem(157px);
        color:#FFFFFF;
        height: px2rem(16px);
      }
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
    .add_button{
      background-color:#FFFFFF;
      font-size: px2rem(17px);
      height:px2rem(45px);
      position: absolute;
      left: 0;
      bottom:0;
      width:100%;
      img{
        position: absolute;
        top:50%;
        left:px2rem(135px);
        transform: translateY(-50%);
      }
      span{
        position: absolute;
        top:50%;
        left:px2rem(157px);
        transform: translateY(-50%);
      }
    }
  }
  

</style> 
