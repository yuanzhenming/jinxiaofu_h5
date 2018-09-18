<template>
  <div class="home">
    <div class="banner">
      <img src="/static/images/home/banner@3x.png" alt="">
    </div>
    
     <!-- 快讯 -->
    <div class="alerts" >
      <div class="alerts_title">
        <img width="36" src="/static/images/home/alerts@3x.png" alt="">
        <div :style="{height:height*lineNum + 'px'}" class="rollScreen_container">
          <ul class="rollScreen_list" :style = {transform:transform} :class="{rollScreen_list_unanim:numbers===0}">
            <li class="rollScreen_once" v-for="(item,index) in arr" :key=index :style="{height:height+'px'}">
              {{item}}
            </li>
            <li class="rollScreen_once" v-for="(item,index) in arr" :key=index+arr.length :style="{height:height+'px'}">
             {{item}}
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- 我的账单 -->
    <div class="bill">
      <div class="bill_title">
        <img width="18" src="/static/images/home/bill@2x.png" alt="">
        <em>我的账单</em>
      </div>
      <div class="bill_content">
        <div class="bill_left"><span>0</span><em>30天内应还</em></div>
        <div class="line"></div>
        <div class="bill_right"><span>3000</span><em>可用额度</em></div>
      </div>
    </div>
    <!-- 我要借款 -->
    <div class="borrow">
      <div class="borrow_title">
        <img width="22" src="/static/images/home/borrowing@2x.png" alt="">
        我要借款
      </div>
      <mark class="ml" v-text="rangeValue"></mark>
      <em class="money_text ml">申请金额</em>
      <div class="progress ml">
        <div class="progress_mark">
          <mt-range
            v-model="rangeValue"
            :min="500"
            :max="3000"
            :step="100"
            :bar-height="5">
          </mt-range>
        </div>
        <div class="progress_text"><span>500</span><span>3000</span></div>
      </div>
      <button @click="popups()">立即申请</button>
      <!-- 弹窗 -->
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal='false'  style="border-radius:5px;">
        <div class="popup">
          <div class="popup_title">温馨提醒</div>
          <div>{{information}}</div>
          <div><span @click="cancle">取消</span><span @click="sure">确定</span></div>
        </div>
      </mt-popup>
      <!-- 弹窗借款人须知 -->
      <mt-popup v-model="popupVisible2" popup-transition="popup-fade" :closeOnClickModal='false' style="border-radius:5px;">
        <div class="popup2">
          <div class="popup_title">借款人须知</div>
          <ul class="popup_con">
            <li>1、借款人需年满18周岁，具备完全的民事行为能力，能独立的承担民事责任。</li>
            <li>2、借款时务必与出借人签订《借款协议》，务必妥善保管好《借款协议》原件（即借贷双方签字的合同原件，不是合同复印件或照片或传真件）。</li>
            <li>3、需通过借款协议指定的银行卡账户/微信账户/支付宝账户进行资金往来，避免使用存在风险的现金交易。</li>
            <li>4、需与借款协议中确定的出借人直接进行资金往来，如遇出借人要求资金借贷走第三方账户，需要重新签订借款协议或由出借人本人对此情况进行书面说明。</li>
            <li>5、年息24%（注意：此处是年息24%，月息就是2%=24%/2）以下系法律保护的利息标准，年息";</li>
          </ul>
          <div class="popup_btn"><span @click="sure2">确定</span></div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  export default {
     props: {
        height: {
          default: 40,
          type: Number
        },
        lineNum: {
          default: 5,
          type: Number
        }
      },
    data() {
      return {
        rangeValue:500,
        popupVisible:false,
        popupVisible2:true,
        arr:['134****456成功借款8000元','135****654成功借款8000元','136****600成功借款8000元','139****516成功借款8000元'],
        numbers: 0,//快讯轮播计时
        userId:0,//用户id
        information:'请在认证后进行申请哦!'
      }
    },
    watch:{
      $route(to,from) {
        if (to.path == "/home" && sessionStorage.getItem('certState')){
          this.information='信息已录完,正在人工审核'
        }
        
      }
    },
    methods:{
      //立即申请
      popups() {
        console.log("fff")
        this.popupVisible = true
      },
      cancle() {
        this.popupVisible = false;
      },
      sure() {
        this.popupVisible = false;
        console.log(sessionStorage.getItem('certState'))
        if(!sessionStorage.getItem('certState')){
          this.$router.replace('/certification')
        }
       
      },
      sure2() {
        this.popupVisible2 = false;
      }
    },
    computed: {
      transform() {
        return 'translate3d(0,-' + this.numbers * this.height + 'px,0)'
      }
    },
    mounted() {
      let _this = this
      //快讯轮播定时器
      setInterval(() => {
        if (_this.numbers !== _this.arr.length) {
          _this.numbers++
        } else {
          _this.numbers = 0
        }
      }, 2000);
      // 存储用户id
      if (window.location.href.indexOf('num=') >0){
        console.log(window.location.href.indexOf('num='))
        this.userId = window.location.href.substr(window.location.href.indexOf('num=')+4)
        sessionStorage.setItem('userId',this.userId);
      }
      if(!sessionStorage.getItem("userId") && window.location.href.indexOf('num=') < 0){
          console.log("mmmmm")
          this.$router.replace('/login');
          return false;
      }
      
    },
}

</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .home {
    padding-bottom:px2rem(70px);
    .banner{
      height: px2rem(150px);
      img {
        width: 100%;
      }
    }
    // 快讯
    .alerts {
      background-color:#FFFFFF;
      .alerts_title {
        color: #333333;
        font-size: px2rem(13px);
        position: relative;
        overflow: hidden;
        height: px2rem(40px);
        img{
          position: absolute;
          left:px2rem(25px);
          top: px2rem(14px);
        }
        .rollScreen_container{
          position: absolute;
          padding-top:px2rem(16px);
          left:px2rem(72px);
          .rollScreen_list{
            transition: 1s linear;
          }
          .rollScreen_list_unanim{
            transition: none
          }
        }
      }
    }
    // 账单
    .bill {
      background-color: #FFFFFF;
      width: px2rem(351px);
      height: px2rem(95px);
      border-radius: px2rem(8px);
      margin: 0 auto;
      margin-top: px2rem(10px);
      padding-bottom:px2rem(10px);
      .bill_title {
        position: relative;
        img {
          margin-left:px2rem(12px); 
          margin-top:px2rem(10px);
          margin-right:px2rem(12px);
        }
        em {
          position: absolute;
          top: px2rem(14px);
          left: px2rem(42px);
          font-size: px2rem(15px);
          color: #333333;
        }
      }
      .bill_content {
        margin-top: px2rem(20px);
        display: flex;
        align-items:flex-end;
        text-align: center;
        width: 100%;
        height: px2rem(33px);
        span {
          font-size: px2rem(16px);
          color: #333333;
        }
        em {
          font-size: px2rem(12px);
          color:#B3B3B3;
          display: block;
          margin-top: px2rem(5px)
        }
        .bill_left{
          width: 50%;
        }
        .bill_right{
          width: 50%;
        }
        .line {
          border-left: px2rem(1px) solid#E6E6E6;
          height: px2rem(33px);
        }
      }
    }
    // 借款
    .borrow {
      margin: 0 auto;
      margin-top: px2rem(14px);
      background-color: #FFFFFF;
      border-radius: px2rem(8px);
      width: px2rem(351px);
      padding-bottom: px2rem(10px);
      .borrow_title {
        font-size: px2rem(15px);
        color: #333333;
        // line-height: px2rem(19px);
        img {
          margin-left:px2rem(12px); 
          margin-top:px2rem(10px);
          margin-right:px2rem(12px); 
          margin-right: px2rem(8px);
          vertical-align:bottom;
        }
      }
      .ml {
        margin-left: px2rem(43px);
      }
      mark {
        display: block;
        margin-top: px2rem(20px);
        font-size:px2rem(24px);
        color:#333333;
      }
      em {
        font-size:px2rem(12px);
        color:#B3B3B3;
        display: block;
        margin-top:px2rem(10px);
      }
      .progress {
        margin-top: px2rem(20px);
        width: px2rem(266px);
        font-size: px2rem(12px);
        color: #B3B3B3;
        .progress_mark {
          border-radius:px2rem(2px);
          .mt-range{
            /deep/ .mt-range-content{
              border-radius:20px;
              .mt-range-runway{
                border-radius:20px;
              }
              .mt-range-progress{
                background:linear-gradient(to right,#FB5F48,#FE5F1B);
                border-radius: px2rem(200px);
               }
               .mt-range-thumb {
                  box-shadow: 0px 0px 0px rgba(0,0,0,.4);
                  background-size:cover;
                  background-image: url('/static/images/home/slider@3x.png');
                }
             }
          }
        }
        .progress_text{
           margin-top: px2rem(12px);
          span:first-child {
           float: left;
          }
          span:last-child {
           float: right;
          }
        }
      }
      button {
        background-color:#FE5F1B;
        border-radius: px2rem(4px);
        width:px2rem(290px);
        height: px2rem(45px);
        margin-left: px2rem(31px);
        margin-top: px2rem(30px);
        color: #FFFFFF;
        font-size: px2rem(17px);
      }
    }
  }
  .popup{
    width:px2rem(300px);
    height:px2rem(154px);
    border-top-left-radius: px2rem(4px);
    border-top-right-radius: px2rem(4px);
    .popup_title{
      height:px2rem(56px);
      line-height: px2rem(56px);
      border-top-left-radius: px2rem(4px);
      border-top-right-radius: px2rem(4px);
      text-align: center;
      background: url('/static/images/my/myBg.png')  100% 100%;
      color:#FFFFFF;
      font-size:px2rem(17px);
    }
    div:nth-child(2) {
      color:#666666;
      font-size:px2rem(13px);
      height: px2rem(52px);
      line-height: px2rem(52px);
      padding-left: px2rem(19px);
      border-bottom: px2rem(0.1px) solid #E0E0E0;
    }
    div:nth-child(3) {
      display: flex;
      align-items:center; 
      font-size:px2rem(17px);
      text-align: center;
      border:none;
      span:first-child{
        color:#B3B3B3;
        border-right:px2rem(1px) solid #E0E0E0;
        width:50%;
        height:px2rem(46px);
        line-height: px2rem(46px);
      }
      span:last-child{
        width:50%;
        color:#FE5F1B;
      }
    }
    
  }
  .popup2{
    position: relative;
    width:px2rem(300px);
    height:px2rem(420px);
    font-size: px2rem(13px);
    color:#333333;
    .popup_title{
      height:px2rem(56px);
      line-height: px2rem(56px);
      border-top-left-radius: px2rem(4px);
      border-top-right-radius: px2rem(4px);
      text-align: center;
      background: url('/static/images/my/myBg.png')  100% 100%;
      color:#FFFFFF;
      font-size:px2rem(17px);
    }
    .popup_con{
      box-sizing: border-box;
      padding:px2rem(20px) px2rem(18px) px2rem(6px) px2rem(18px);
      height: px2rem(318px);
      overflow-y: scroll;
      li{
        color: #333333;
        font-size:px2rem(13px);
        line-height: px2rem(20px);
      }
    }
    .popup_btn{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
      span{
        display:block;
        height: px2rem(46px);
        line-height: px2rem(46px);
        color:#FFFFFF;
        font-size: px2rem(17px);
        text-align: center;
        background: linear-gradient(to right, #FB5F48, #FE5F1B);
      }
    }
  }
</style>

