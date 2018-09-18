<template>
  <div class="registe">
    <div class="banner">
      <img src="/static/images/home/banner.png" alt="">
    </div>
    <div class="forms">
      <!-- 输入手机号 -->
      <div class="phone_num">
        <img v-if="mobile" width="16" src="/static/images/login/phone@2x.png" alt="">
        <img v-else width="16" src="/static/images/login/phone-gray@2x.png" alt="">
        <input v-model="mobile" type="number" placeholder="请输入手机号码">
      </div>
      <!-- 输入验证码 -->
      <div class="verify">
        <img v-if="verify_code" width="22" src="/static/images/registe/email@2x.png" alt="">
        <img v-else width="22" src="/static/images/registe/email-gray@2x.png" alt="">
        <input v-model="verify_code" type="number" placeholder="请输入验证码">
        <div v-if="shortCode" @click="getShortCode">{{phoneCode}}</div>
        <p v-else class="getCode">{{phoneCode}}</p>
      </div>
      <input style="display:none" type="text" v-model="randomNum">
      <!-- 输入密码 -->
      <!-- <div class="passwd">
        <img v-if="form.pasd" class="clock" src="/static/images/login/clock.png" alt="">
        <img v-else class="clock" src="/static/images/login/clock-gray.png" alt="">
        <input v-if="ifPasdDisplay1" type="password" v-model="form.pasd" placeholder="请输入密码">
        <input v-else type="text" v-model="form.pasd" placeholder="请输入密码">

        <img v-if="ifPasdDisplay1" class="paswd_eye" @click="ifPasdDisplay1=!ifPasdDisplay1" src="/static/images/login/psw-hide.png" alt="">
        <img v-else class="paswd_eye" @click="ifPasdDisplay1=!ifPasdDisplay1" src="/static/images/login/psw-show.png" alt="">
      </div> -->
      <!-- 再次输入密码 -->
      <!-- <div class="passwd">
        <img v-if="form.pasdAgain" class="clock" src="/static/images/login/clock.png" alt="">
        <img v-else class="clock" src="/static/images/login/clock-gray.png" alt="">

        <input v-if="ifPasdDisplay2" type="password" v-model="form.pasdAgain" placeholder="请再次输入密码">
        <input v-else type="text" v-model="form.pasdAgain" placeholder="请再次输入密码">

        <img v-if="ifPasdDisplay2" class="paswd_eye" @click="ifPasdDisplay2=!ifPasdDisplay2" src="/static/images/login/psw-hide.png" alt="">
        <img v-else class="paswd_eye" @click="ifPasdDisplay2=!ifPasdDisplay2" src="/static/images/login/psw-show.png" alt="">
      </div> -->

      <div class="agree">
        <img v-if="ifRembDisplay" width="15"  src="/static/images/login/rem-psw@2x.png" alt="">
        <img v-else width="15" src="/static/images/login/rem-psw-gray@2x.png" alt="">
        <span @click="rembPaswd()">同意</span><em>《授权服务协议》</em>
      </div>
    </div>
    <div class="regin_button" @click="registe">立即加入</div>
    <router-link to="/login" tag="div" class="declaraction">已有账户？立即登录</router-link>
    <!-- 弹出框 -->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" style="border-radius:5px;">
      <slot>
        <div class="popup">
          <div class="popup_title">温馨提醒</div>
          <div> {{popupName}}</div>
          <div @click="sure()">确定</div>
         </div>
      </slot>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        platform:'',
        randomNum:0,//随机验证码
        mobile:'',//手机号
        verify_code:'', //验证码
        phoneCode:'获取验证码',
        shortCode:true,//短信验证码按钮是否置灰
        num:'',//运营商
        plus:0,//注册按钮点击次数
        // ifClockDisplay: true,
        // ifPasdDisplay1: true,
        // ifPasdDisplay2: true,
        // ifEyeDisplay1: false,
        // ifEyeDisplay2: false,
        ifRembDisplay: true,
        popupVisible:false,//是否弹出弹框
        popupName: '',//弹窗内容
      }
    },
    methods:{
      //是否同意协议
      rembPaswd() {
        this.ifRembDisplay =! this.ifRembDisplay
        if(this.ifRembDisplay) {
          console.log("true",this.ifRembDisplay)
        }else{
          console.log(this.ifRembDisplay)
        }
      },
      //验证手机号是否为真
      checkNum(){
        let reg = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/; 
        if(!reg.test(this.mobile)){
          this.popupVisible = true;
          this.popupName = "手机号格式不正确"
        }
      },
      //获取手机验证码
      getShortCode(){
        this.randomNums()//手机验证码
        let _this = this;
        this.checkNum();
        if(/^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(this.mobile)) {
          this.$http({
              url: '/util/smg',
              method: 'post',
              data: {
                mobile:this.mobile,
                verify_code:this.randomNum
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
            console.log('短信接口',res);
            if (res.data.error_code = 200) {
              this.shortCode = false;
              this.popupVisible = true;
              this.popupName = "短信发送成功OK!";
            }
          })
          let s = 60;
          this.phoneCode= "重发(60)";
          let time = setInterval(() =>{
            s -= 1;
            s <= 0 ? (_this.phoneCode="获取验证码",clearInterval(time),_this.shortCode = true,_this.plus=0) : _this.phoneCode = "重发(" + s + ")"
          },1000)
        }
      },
      //申请注册接口
      registe() {
        if(String(this.randomNum) === this.verify_code && this.mobile && this.verify_code && this.ifRembDisplay) {
          console.log('验证码',this.randomNum);
          this.plus++;
          console.log('plus',this.plus);
        }
        
        if (String(this.randomNum) === this.verify_code && this.mobile && this.verify_code && this.ifRembDisplay && this.plus== 1) {
          this.$http({
            url: '/login/registe',
            method: 'post',
            data: {
              mobile:this.mobile,
              channel:this.channel,
              platform:this.platform
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
             console.log('注册接口',res);
            if(res.data.error_code == 200) {
              window.location.href= res.data.url;
            }
            if(res.data.error_code == 500) {
              this.popupVisible = true;
              this.popupName = "手机号已注册!"
            }
            if(res.data.error_code == 10001) {
              this.popupVisible = true;
              this.popupName = "手机号注册失败!";
            }
          })
        } 
        
        if (String(this.randomNum) != String(this.verify_code) && this.mobile && this.ifRembDisplay) {
          this.popupVisible = true;
          this.popupName = "验证码输入错误"
        }
        if (String(this.randomNum) === this.verify_code && this.mobile && this.ifRembDisplay == false) {
          this.popupVisible = true;
          this.popupName = "请同意服务协议"
        }
      },

      randomNums() { //随机验证码
        this.randomNum = Math.floor(Math.random()*8999)+1000;
        console.log('random',this.randomNum);
        // 判断设备类型
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.platform = 2
        } else if (/(Android)/i.test(navigator.userAgent)) {
          this.platform = 1
        } else {
          this.platform = 3
        };
        console.log(this.platform)
      },
      // 确定按钮
      sure() {
        this.popupVisible = false;
      },
     
    },
    created() {
      if (window.location.href.indexOf('channel=')>0){
        this.channel = window.location.href.substr(window.location.href.indexOf('channel=')+8)
        // 设置商户id
        sessionStorage.setItem('channel',this.channel)
        console.log(this.channel)
      }
      
    }

  }
</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .registe{
    background-color: #FFFFFF;
    padding-bottom: px2rem(134px);
  }
  .banner{
    height: px2rem(150px);
    img {
      width: 100%;
    }
  }
  .forms{
    margin:0 auto;
    margin-top:px2rem(11px);
    width: px2rem(339px);
    input {
        font-size:px2rem(15px);
        color:#B3B3B3;
    }
    .phone_num ,.verify,.passwd{
      height: px2rem(50px);
      border-bottom: px2rem(1px) solid #E6E6E6;
      color:#B3B3B3;
      position: relative;
      img {
        position: absolute;
        top:px2rem(14px);
        left:px2rem(3px);
      }
      input {
        position:absolute;
        top:px2rem(18px);
        left: px2rem(30px);
        padding-left: px2rem(2px);
      }
    }
    .verify{
      margin-top:px2rem(10px);
      img {
        position: absolute;
        top:px2rem(17px);
        left:0;
      }
      input {
        position: absolute;
        top: px2rem(18px);
      }
      div {
        background:linear-gradient(to right,#FB5F48, #FE5F1B);
        border-radius: px2rem(2px);
        width: px2rem(70px);
        height: px2rem(30px);
        line-height: px2rem(30px);
        font-size: px2rem(12px);
        color:#FFFFFF;
        position: absolute;
        top:px2rem(10px);
        left: px2rem(269px);
        text-align: center;
      }
      .getCode{
        background-color:#E6E6E6;
        border-radius: px2rem(2px);
        width: px2rem(70px);
        height: px2rem(30px);
        line-height: px2rem(30px);
        font-size: px2rem(12px);
        color:black;
        position: absolute;
        top:px2rem(10px);
        left: px2rem(269px);
        text-align: center;
      }
    }
    .passwd{
      margin-top:px2rem(10px);
      .clock {
        position: absolute;
        left:px2rem(1px);
      }
      .paswd_eye {
        position:absolute;
        left:px2rem(322px);
        top:px2rem(21px);
      }
    }
    .agree {
      font-size:px2rem(15px);
      position: relative;
      img {
        margin-top:px2rem(15px);
      }
      span {
        color:#666666;
        position: absolute;
        top:px2rem(15px);
        left:px2rem(22px);
      }
      em {
        color:#FE5F1B;
        position: absolute;
        top:px2rem(15px);
        left: px2rem(55px);
      }
      
    }
  }
  .regin_button{
    margin: 0 auto;
    margin-top:px2rem(31px);
    width: px2rem(339px);
    height:px2rem(45px);
    line-height: px2rem(45px);
    border-radius: px2rem(4px);
    background:linear-gradient(to right,#FB5F48, #FE5F1B);
    font-size:px2rem(17px);
    color:#FFFFFF;
    text-align: center;
  }
  // 立即登陆
  .declaraction{
    color:#666666;
    font-size: px2rem(15px);
    margin-top:px2rem(20px);
    text-align: center;
  }
  // 弹窗
  .popup{
    width:px2rem(300px);
    height:px2rem(154px);
    border-top-left-radius: px2rem(4px);
    border-top-right-radius: px2rem(4px);
    text-align: center;
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
      font-size:px2rem(20px);
      border:none;
      color:#666666;
      height:px2rem(46px);
      line-height: px2rem(46px);
    }
  }
</style>
