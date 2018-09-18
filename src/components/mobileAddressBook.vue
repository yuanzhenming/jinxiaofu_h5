<template>
  <div class="add_card">
    <div class="prompt" v-if="WeChat">
     <p> 点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装</p>
    </div>
    <div class="fisrt">
      <div><img width="60" src="/static/images/mobileAddressBook/phoneBookOne@2x.png" alt=""></div>
      <div>下载安装【通讯录】小工具</div>
      <div><img width=73 src="/static/images/mobileAddressBook/bookCertification@2x.png" alt=""></div>
      <div><p>通讯录认证</p><button @click="download">点击开始下载</button></div>
    </div>
    <div class="second">
      <div>
        <img width="60" src="/static/images/mobileAddressBook/phoneBookTwo.png" alt="">
      </div>
      <div>完成安装后需要<em>按下面操作步骤</em>信任下工具哦！</div>
      <div><img width="100%" src="/static/images/mobileAddressBook/stop.png" alt=""></div>
    </div>
    <div class="third">
      <div>
        <img width="60" src="/static/images/mobileAddressBook/phoneBookThird.png" alt="">
      </div>
      <p>现在可以正常使用工具了哦！打开应用，输入当前所注册的手机号，点击“一键认证”即可完成认证!</p>
    </div>
    <div class="button">一键认证</div>
    <!-- 弹窗 -->
    <mt-popup v-model="popupVisible" style="border-radius:5px;">
      <div class="popup">
        <div class="popup_title">温馨提醒</div>
        <div>请用浏览器打开</div>
        <div @click="sure">确定</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      WeChat:false,
      popupVisible:false,
    }
  },
  created() {
    let ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      this.WeChat = true;
      this.popupVisible = true;
    }
    
  },
  methods:{
    download(){ // 判断设备类型
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
        this.popupVisible = true;
      }
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && !this.popupVisible) {
        console.log('ios');
        // alert("iitms-services://?action=download-manifest&url=https://jybapi.jinxfu.com/app/mobile_help_TargetKT.plist");

        window.location.href='itms-services://?action=download-manifest&url=https://jybapi.jinxfu.com/app/mobile_help_TargetKT.plist'
      } else if (/(Android)/i.test(navigator.userAgent) && !this.popupVisible) {
        console.log('Android');
        window.location.href='http://c7.gg/avce3'
      } 
    },
    // 弹框提示
    sure() {
      this.popupVisible= false;
    }
  },
  created(){
    this.download()
  }
}
  
</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .add_card{
    text-align: center;
    .prompt{
      height: px2rem(100px);
      background-size: 100%;
      background-repeat: no-repeat;
      background-image:url('/static/images/mobileAddressBook/bg@2x.png');
      box-sizing: border-box;
      p{
        margin-left:px2rem(30px);
        padding-top:px2rem(30px);
        font-size:px2rem(14px);
        color:#FFFFFF;
        text-align: left;
        line-height: px2rem(20px);
        width:px2rem(283px);
      }
    }
    .fisrt{
      padding:px2rem(20px) px2rem(18px) 0;
      background-color: #FFFFFF;
      padding-bottom: px2rem(26px);
      div:nth-child(2) {
        color:#333333;
        font-size:px2rem(15px);
        text-align: left;
        margin-top:px2rem(30px);
      }
      div:nth-child(3) {
        margin-top:px2rem(20px);
      }
      div:nth-child(4) {
        margin-top:px2rem(10px);
        font-size:px2rem(15px);
        color:#333333;
        p{
          margin-bottom:px2rem(20px);
        }
        a{
          color:#3397F9;
          text-decoration:underline;
        }
      }
    }
    .second{
      margin-top:px2rem(10px);
      background-color: #FFFFFF;
      padding-top:px2rem(20px);
      div:nth-child(2) {
        margin-top:px2rem(20px);
        font-size:px2rem(15px);
       em{
         color:#FE5F1B;
         font-size:px2rem(18px);
         margin:0 px2rem(3px);
       }
      }
      div:nth-child(3){
        margin-top:px2rem(20px);
        width: 100%;
        img{
          width:100%;
        }
      }
    }
    .third{
      padding-top:px2rem(40px);
      background-color: #FFFFFF;
      p{
        margin:0 auto;
        margin-top:px2rem(20px);
        font-size:px2rem(15px);
        color:#333333;
        width:px2rem(338px);
        height:px2rem(39px);
        line-height: px2rem(20px);
        padding-bottom:px2rem(30px);
      }
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
      border-bottom: px2rem(0.1px) solid #E0E0E0;
    }
    div:nth-child(3) {
      font-size:px2rem(20px);
      text-align: center;
      border:none;
      color:#666666;
      height:px2rem(46px);
      line-height: px2rem(46px);
    }
  }

</style> 
