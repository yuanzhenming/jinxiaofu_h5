<template>
  <div class="login">
    <div class="forms">
      <div class="phone_title">手机号登录</div>
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
      <div class="agree">
        <img v-if="ifRembDisplay" @click="rembPaswd" width="15"  src="/static/images/login/rem-psw@2x.png" alt="">
        <img v-else width="15" @click="rembPaswd" src="/static/images/login/rem-psw-gray@2x.png" alt="">
        <span @click="rembPaswd">同意</span><em @click="agreement">《授权服务协议》</em>
      </div>
      <!-- 输入密码/ -->
      <!-- <div class="passwd">
        <img v-if="verify_code" src="/static/images/login/clock.png" alt="">
        <img v-else src="/static/images/login/clock-gray.png" alt="">
        <input v-if="ifPasdDisplay" type="password" v-model="verify_code" placeholder="请输入密码">
        <input v-else type="text" v-model="verify_code" placeholder="请输入密码">
        <img v-if="ifPasdDisplay" class="paswd_eye" @click="ifPasdDisplay=!ifPasdDisplay" src="/static/images/login/psw-hide.png" alt="">
        <img v-else class="paswd_eye" @click="ifPasdDisplay=!ifPasdDisplay" src="/static/images/login/psw-show.png" alt="">
      </div> -->

      <!-- <div class="pass_certifion"> -->
        <!-- 记住密码按钮 -->
        <!-- <div>
          <img v-if="ifRembDisplay"  src="/static/images/login/rem-psw.png" alt="">
          <img v-else src="/static/images/login/rem-psw-gray.png" alt="">
          <span @click="rembPaswd">记住密码</span>
        </div> -->
        <!-- 忘记密码按钮 -->
        <!-- <div><img src="/static/images/login/forget-psw.png" alt=""><router-link to="/revisePaswd" tag="span">忘记密码</router-link></div> -->
      <!-- </div> -->
    </div>
    <!-- 登陆按钮 -->
    <div class="loin_button" @click='login'>立即登录</div>
    <!-- 注册按钮 -->
    <div class="regin_button" @click="registes">我要注册</div>
    <!-- 弹窗 -->
    <mt-popup v-model="popupVisible" :closeOnClickModal='false' style="border-radius:5px;">
      <div class="popup">
        <div class="popup_title">温馨提醒</div>
        <div>{{popupName}}</div>
        <div @click="sure">确定</div>
      </div>
    </mt-popup>
    <!-- 弹窗借款人须知 -->
    <mt-popup v-model="popupVisible2" popup-transition="popup-fade" :closeOnClickModal='false' style="border-radius:5px;">
      <div class="popup2">
        <div class="popup_title">借款人须知</div>
        <div class="popup_con">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特别提醒：您在被授权人提供的网络页面或客户端界面上或在被授权人授权的第三方提供的网络页面或客户端界面上点击同意或确认的按钮即表明本授权书由本人签署并生效。</p>
          <h1>个人信息使用和个人信用报告查询授权书</h1>
          <div>xXxxx股份有限公司:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人（或称授权人）充分理解并同意，贵司（或称被授权人)为本人提供贷款服务，为客观、准确地评估本人的信用等级和授信额度，并为本人提供优质的服务，就使用本人的相关必要信息及第三方数据查询事宜，本人同意并授权如下：</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人同意并不可撤销地授权: <span>贵司按照国家相关规定，通过金融信用信息基础数据库、其他依法成立的征信机构、数据信息机构采集符合法律法规规定的本人个人信息及包括信贷信息在内的信用信息（包括但不限于负债信息及偿债履约能力判断信息以及含本人在贷款人处办理业务时产生的不良信息），并可以将本人信用信息报送金融信用信息基础数据库、其他依法成立的征信机构、数据信息机构。</span>用途仅限于：</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、被授权人受理本人贷款业务（包括申请审查、提款审查业务等贷前、贷中、贷后各阶段）；
          </div>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、授权人申请征信异议处理；</h4>
          <div>上述授权期限为本人签署本授权书之日起至授权所涉及个人贷款相关业务结束及授权人履行完毕全部义务之日止。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;授权人已经完全知晓并理解上述授权条款</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特此授权。</div>
        </div>
        <div class="popup_btn"><span @click="sure2">确定</span></div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mobile:'', //手机号
        randomNum:'0',//随机验证码
        verify_code:'', //验证码
        phoneCode:'获取验证码',
        shortCode:true,//短信验证码按钮是否置灰
        plus:0,//注册按钮点击次数
        ifRembDisplay: false,
        //ifClockDisplay: true,//密码是否为空
        //ifPasdDisplay: true,//是否输入密码
        //ifEyeDisplay: false,//是否看密码
        //ifRembDisplay: false,//是否记同意协议
        popupVisible:false,//是否显示弹窗
        popupVisible2:false,//服务协议
        popupName:'',//弹窗内容
        num:'',
      }
    },
    methods:{

      //是否记同意协议
      rembPaswd() {
        this.ifRembDisplay =! this.ifRembDisplay
        if(this.ifRembDisplay) {
          console.log("true",this.ifRembDisplay)
        }else{
          console.log(this.ifRembDisplay)
        }
      },

      //手机号检验函数
      checkNum(){
        let reg = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/; 
        if(!reg.test(this.mobile)){
          this.popupVisible= true;
          this.popupName="请输入真实手机号";
        }
      },
      randomNums() { //随机验证码
        this.randomNum = Math.floor(Math.random()*8999)+1000;
        console.log('random',this.randomNum);
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

      //登陆接口
      login() {
        console.log(typeof(String(this.randomNum)))
        console.log(typeof(this.verify_code))
        if(String(this.randomNum) === this.verify_code && this.mobile && this.verify_code && this.ifRembDisplay) {
          console.log('验证码',this.randomNum);
          this.plus++;
          console.log('plus',this.plus);
        }
        if (String(this.randomNum) === this.verify_code && this.mobile && this.verify_code && this.ifRembDisplay && this.plus== 1) {
          this.$http({
            url: '/login/do_login',
            method: 'post',
            data: {
              mobile:this.mobile,
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
              console.log('登陆接口',res);
              if(res.data.error_code == 200) {
                window.location.href= res.data.url
              }
              if(res.data.error_code == 400) {
                this.popupVisible= true;
                this.popupName="手机号未注册";
              }
          })
        }
        if (String(this.randomNum) != String(this.verify_code) && this.mobile && this.ifRembDisplay) {
          this.popupVisible = true;
          this.popupName = "验证码输入错误"
        }
        if (this.verify_code && this.mobile && this.ifRembDisplay == false) {
          this.popupVisible = true;
          this.popupName = "请同意服务协议"
        }
      },
      //注册
      registes() {
        console.log('注册');
        this.$router.push('/registe');
      },
      // 确定登陆
      sure() {
        console.log("确定登陆");
        this.popupVisible= false;
      },
      sure2() {
        this.popupVisible2 = false;
      },
      agreement(){
        this.popupVisible2 = true;
      }
      
    }
  }
</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .login {
    background-color: #FFFFFF;
    text-align: center;
    width:100%;
    height: 100%;
    .forms{
      .phone_title{
        color:#333333;
        font-size:px2rem(24px);
        font-weight: Bold;
        text-align: left;
        padding-left:px2rem(15px);
        padding-top:px2rem(12px);
      }
      .phone_num,.verify{
        margin:0 auto;
        margin-top:px2rem(50px);
        width:px2rem(339px);
        height: px2rem(50px);
        font-size:px2rem(15px);
        border-bottom: px2rem(1px) solid #E6E6E6;
        color:#B3B3B3;
        position: relative;
        img {
          position:absolute;
          top:50%;
          left: px2rem(3px);
          transform: translateY(-50%);
        }
        input {
          width:px2rem(307px);
          height: 100%;
          position:absolute;
          top:px2rem(0px);
          left: px2rem(30px);
          padding-left: px2rem(2px);
        }
      }
      .verify{
        margin-top:px2rem(10px);
        img {
          position: absolute;
          top:50%;
          left:0;
          transform: translateY(-50%);
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
      .agree {
        margin: 0 auto;
        position: relative;
        width:px2rem(339px);
        height: px2rem(30px);
        font-size:px2rem(15px);
        img {
          position: absolute;
          left: 0;
          margin-top:px2rem(15px);
          margin-left:0;
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
    .loin_button {
      margin: px2rem(31px) auto;
      width:px2rem(339px);
      height:px2rem(45px);
      line-height: px2rem(45px);
      font-size: px2rem(17px);
      color: #FFFFFF;
      border-radius: px2rem(4px);
      background:linear-gradient(to right,#FB5F48, #FE5F1B);
    }
    .regin_button {
      position: absolute;
      bottom:px2rem(30px);
      left:px2rem(151px);
      color:#FE5F1B;
      font-size:px2rem(15px);
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
      font-size:px2rem(20px);
      text-align: center;
      border:none;
      color:#666666;
      height:px2rem(46px);
      line-height: px2rem(46px);
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
      text-align: left;
      p{
        font-weight: bold;
        text-align: left;
        text-indent:2px;
        line-height: px2rem(20px);
      }
      h1{
        text-align: center;
        font-weight: bold;
        font-size:px2rem(14px);
        line-height: px2rem(22px);
      }
      div{
        line-height: px2rem(20px);
        span{
          font-weight: bold;
        }
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
