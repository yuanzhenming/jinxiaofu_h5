<template>
  <div>
    <div class="certification">
      <div class="top">
        <div class="circle"><div></div></div>
        <!-- <div class="server"><img width="18" src="/static/images/certification/server@2x.png" alt=""><span>联系客服</span></div> -->
        <div class="top_text">
          <p>3000.00</p>
          <span class="use_max">可用额度</span>
          <hr>
          <div><em>总额度</em><span>3000.00</span></div>
        </div>
      </div>
      <div class="will_inf">
        <div class="will_inf_title"><img width="3" src="/static/images/certification/titleMark@2x.png" alt=""><div>必填信息<em>*</em></div></div>
        <div class="weill_con">
          <img width="22" src="/static/images/certification/basicInf@2x.png" alt="">
          <span>基础信息</span>
          <em @click="baseData" v-if="baseShow">待录入</em>
          <img class="succedEntry" width="22" v-else src="/static/images/certification/completCer@2x.png" alt="">
        </div>

        <div class="weill_con">
          <img width="22" src="/static/images/certification/contact@2x.png" alt="">
          <span>紧急联系人</span>
          <em @click="emergencyContact" v-if="contactShow">待录入</em>
          <img class="succedEntry" v-else width="22" src="/static/images/certification/completCer@2x.png" alt="">
        </div>
        <div class="weill_con">
          <img width="16" src="/static/images/certification/mobile@2x.png" alt="">
          <span>手机运营商</span>
          <em @click="mobileOperato" v-if="mobileShow">待录入</em>
          <img width="22" class="succedEntry" v-else src="/static/images/certification/completCer@2x.png" alt="">
        </div>
        <div class="weill_con">
          <img width="22" src="/static/images/certification/certificate@2x.png" alt="">
          <span>证件识别</span>
          <em @click="idDocument" v-if="certificateShow">待录入</em>
          <img width="22" class="succedEntry" v-else src="/static/images/certification/completCer@2x.png" alt="">
        </div>
        <div class="weill_con">
          <img width="20" src="/static/images/certification/phone@2x.png" alt="">
          <span>手机通讯录</span>
          <em @click="mobileAddressBook" v-if="phoneShow">待录入</em>
          <img width="22" class="succedEntry" v-else src="/static/images/certification/completCer@2x.png" alt="">
        </div>
      </div>
      <div class="optional_inf">
        <div class="optional_inf_title will_inf_title"><img width="3" src="/static/images/certification/titleMark@2x.png" alt=""><div>选填信息</div></div>
        <div class="optional_con">
          <img width="17" src="/static/images/certification/consumer@2x.png" alt="">
          <span>消费征信</span>
          <em @click="consumer" v-if="consumerShow">待录入</em>
          <img width="22" class="succedEntry" v-else src="/static/images/certification/completCer@2x.png" alt="">
        </div>
        <div class="optional_con">
          <img width="22" src="/static/images/my/myBank@2x.png" alt="">
          <span>选择支付类型</span>
          <em @click="addBankCard" v-if="bankShow">待录入</em>
          <img width="22" class="succedEntry" v-else src="/static/images/certification/completCer@2x.png" alt="">
        </div>
        <!-- <div class="optional_con">
          <img width="22" src="/static/images/certification/borCer@2x.png" alt="">
          <span>借贷认证</span>
          <router-link to="/creditCertification" tag="em" v-if="borCerShow">待录入</router-link>
          <img width="22" class="succedEntry" v-else src="/static/images/certification/completCer@2x.png" alt="">
        </div> -->
      </div>
    </div>
    <!-- 弹窗 -->
    <mt-popup v-model="popupVisible" :closeOnClickModal='false' style="border-radius:5px;">
      <div class="popup">
        <div class="popup_title">温馨提醒</div>
        <div>{{popupName}}</div>
        <div @click="sure">确定</div>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
  export default {
    data() {
      return {
        userId:'',//用户id
        popupVisible:true,//是否显示弹窗
        popupName:'必填信息请按顺序填写',//弹窗内容
        
      }
    },
    computed:mapGetters([
      'baseShow',//基础信息
      'contactShow',//紧急联系人
      'certificateShow',//证件识别
      'bankShow',//银行卡
      'mobileShow',//手机运营商
      'phoneShow',//手机通讯录
      'consumerShow',//消费征信
      'borCerShow',//贷款认证
    ]),
    mounted() {
      //获取用户id
      this.userId = sessionStorage.getItem('userId');
      console.log('userId',this.userId);
      
      if (!this.userId){
        return false;
      }
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
          console.log('datas',datas);
          if (!datas){
            return false;
          }
          this.state(datas);
          if(!this.baseShow && !this.contactShow && !this.certificateShow && !this.mobileShow  && !this.phoneShow){
            this.popupVisible = false;
            sessionStorage.setItem('certState',true)
          }
          
        }
      })
    },
    methods: {
      //判断信息状态
      state(datas){
        if(datas.base_info_status <= 1) { //基础信息未认证
          this.$store.dispatch('showBase');
        }else { //已认证
          this.$store.dispatch('hideBase');
        }
        if(datas.link_person_status <= 1) {//紧急联系人
          this.$store.dispatch('showContact');
        }else {
          this.$store.dispatch('hideContact');
        }
        if(datas.id_card_status <= 1) {//证件识别
          this.$store.dispatch('showCerti');
        }else {
          this.$store.dispatch('hideCerti');
        }
        if(datas.bank_card_status <= 1) {//银行卡
          this.$store.dispatch('showBank');
        }else {
          this.$store.dispatch('hideBank');
        }
        if(datas.custom_airtel_status <= 1) {//手机运营商
          this.$store.dispatch('showMobile');
        }else {
          this.$store.dispatch('hideMobile');
        }

        if(datas.custom_mobile_book_status <= 1) {//手机通讯录
          this.$store.dispatch('showPhone');
        }else {
          this.$store.dispatch('hidePhone');
        }
        if(datas.borrow_paper_status <= 1) {//五大借条认证
          this.$store.dispatch('showConsumer');
        }else {
          this.$store.dispatch('hideConsumer');
        }
        //if(datas.custom_online_retailers_status <= 1) {//借贷认证
         // this.$store.dispatch('showBorCer');
        //}else {
          // this.$store.dispatch('hideBorCer');
        //}
      },
      baseData(){//基础信息
        this.$router.replace('/basicData')
      },
      emergencyContact(){//紧急联系人
        this.$router.replace('/emergencyContact')
        // if (!this.baseShow){
        //   this.$router.replace('/emergencyContact')
        // }else{
        //   this.popupVisible = true;
        // }
      },
      mobileOperato(){//手机运行商
        this.$router.replace('/mobileOperato')
      },
      idDocument(){//证件识别
        this.$router.replace('/idDocument')
        // if (!this.contactShow){
        //   this.$router.replace('/idDocument')
        // }else{
        //   this.popupVisible = true;
        // }
      },
      mobileAddressBook(){//手机通讯录
        if (!this.mobileShow){
          this.$router.replace('/mobileAddressBook')
        }else{
          this.popupName = "等待手机运营商，标志变绿再认证!"
          this.popupVisible = true;
        }
      },
      consumer(){//消费征信
        this.$router.replace('/borrowPaper')
      },
      addBankCard(){//选着支付类型
        this.$router.replace('/addBankCard')
      },
      // 确定登陆
      sure() {
        this.popupVisible= false;
      }

    }
  }

</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .certification {
    position: relative;
    // overflow: scroll;
    padding-bottom:px2rem(70px);
  }
  .top{
    height: px2rem(177px);
    background-color: #FFFFFF;
    text-align: center;
    position: relative;
    .circle {
      height:px2rem(145px);
      overflow: hidden;
      div {
        border:px2rem(5px) solid #FC5F3E;
        width: px2rem(290px);
        height:px2rem(290px);
        border-radius: 50%;
        margin: px2rem(15px) auto;
      }
    }
    .server {
      width: px2rem(94px);
      height: px2rem(30px);
      border-top-left-radius: px2rem(30px);
      border-bottom-left-radius:px2rem(30px);
      background-color:#FE5F1B;
      color:#FFFFFF;
      font-size: px2rem(12px);
      position: absolute;
      top: px2rem(15px);
      right: 0;
      line-height: px2rem(30px);
      img {
        position: absolute;
        top: px2rem(6px);
        left: px2rem(15px);
      }
      span {
        margin-left: px2rem(35px);
      }
    }
    .top_text {
      position: absolute;
      top:px2rem(68px);
      left: px2rem(131px);
      text-align: center;
      p {
        font-size: px2rem(30px);
        color:#333333;
        font-weight:Bold; 
        font-family: "PingFang-SC-Bold";
      }
      .use_max{
        font-size: px2rem(12px);
        color:#B3B3B3;
        display: block;
        margin-top: px2rem(12px);
      }
      hr {
        margin-top: px2rem(10px);
        border-top:px2rem(1px) solid #E6E6E6;
        width:100%;
      }
      div {
        color:#333333;
        font-size: px2rem(15px);
        margin-top:px2rem(10px);
        text-align: center;
        span {
          font-size: px2rem(15px);
        }
      }
    }
  }
  .will_inf{
    margin-top: px2rem(10px);
    background-color:#FFFFFF;
    .will_inf_title{
      height: px2rem(47px);
      font-size:px2rem(15px);
      color:#333333;
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
        em {
          color:#FB5F48;
          font-size:px2rem(15px);
        }
      }
    }
    .weill_con{
      width:px2rem(357px);
      height:px2rem(50px);
      border-bottom: px2rem(1px) solid #E6E6E6;
      margin-left:px2rem(18px);
      position: relative;
      img {
        position: absolute;
        top:50%;
        transform: translateY(-50%);
      }
      span {
        color: #333333;
        font-size: px2rem(16px);
        position: absolute;
        top:50%;
        left:px2rem(32px);
        transform: translateY(-50%);
      }
      em {
        width: px2rem(50px);
        height: px2rem(22px);
        background-color:#FB5F48;
        border-radius: px2rem(4px);
        color:#FFFFFF;
        font-size:px2rem(12px);
        position: absolute;
        top:50%;
        left:px2rem(295px);
        transform: translateY(-50%);
        text-align: center;
        line-height: px2rem(22px);
      }
      .succedEntry{
        position: absolute;
        top:50%;
        left:px2rem(323px);
        transform: translateY(-50%);
      }
    }

  }
  .optional_inf{
    margin-top: px2rem(10px);
    background-color:#FFFFFF;
    height: px2rem(147px);
    .optional_inf_title{
      height: px2rem(47px);
      font-size:px2rem(15px);
      color:胖#333333;
      border-bottom: px2rem(1px) solid #E6E6E6;
      position: relative;
      img {
        position: absolute;
        top:50%;
        transform: translateY(-50%);
      }
      div {
        margin-left: px2rem(15px);
        position: absolute;
        top:50%;
        transform: translateY(-50%);
      }
    }
    .optional_con{
      width:px2rem(357px);
      height:px2rem(50px);
      border-bottom: px2rem(1px) solid #E6E6E6;
      margin-left:px2rem(18px);
      position: relative;
      img {
        position: absolute;
        top:50%;
        transform: translateY(-50%);
      }
      span {
        color: #333333;
        font-size: px2rem(16px);
        position: absolute;
        top:50%;
        left:px2rem(32px);
        transform: translateY(-50%);
      }
      em {
        width: px2rem(50px);
        height: px2rem(22px);
        background-color:#FB5F48;
        border-radius: px2rem(4px);
        color:#FFFFFF;
        font-size:px2rem(12px);
        position: absolute;
        top:50%;
        left:px2rem(295px);
        transform: translateY(-50%);
        text-align: center;
        line-height: px2rem(22px);
      }
      .succedEntry{
        position: absolute;
        top:50%;
        left:px2rem(323px);
        transform: translateY(-50%);
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
      font-size:px2rem(20px);
      text-align: center;
      border:none;
      color:#666666;
      height:px2rem(46px);
      line-height: px2rem(46px);
    }
  }
</style>
