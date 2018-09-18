<template>
  <div class="add_card">
    <div class="warning"><img width="15" src="/static/images/basicData/warning@2x.png" alt=""><span>请绑定持卡人本人的银行卡</span></div>
    
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">银行卡支付</mt-tab-item>
      <mt-tab-item id="2">微信支付</mt-tab-item>
      <mt-tab-item id="3">支付宝支付</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="identity_data">
          <div><span>银行卡号</span><input v-model="bank_card" type="text" placeholder="请输入你的银行卡号"></div>

          <div @click="actionSheet()"><span>所属银行</span><input v-model="bank_name" type="text" placeholder="请选择"><img src="/static/images/basicData/skip.png" alt=""></div>

          <div><span>预留手机号</span><input v-model="bank_phone" type="text" placeholder="请输入您的手机号码"></div>
          
          <div><span>身份证号</span><input v-model="bank_id_card" type="text" placeholder="请输入您的身份证号码"></div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="identity_data">
          <div><span>微信账号</span><input v-model="wechat" type="text" placeholder="请输入您的微信号"></div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="identity_data">
          <div><span>支付宝账号</span><input v-model="alipay" type="text" placeholder="请输入您的支付宝号"></div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="button" @click="achive">提交</div>
    <!-- 选择城市弹出框 -->
    <mt-popup style="width:100%;" v-model="popupVisible" popup-transition="popup-fade" position="bottom">
      <slot>
        <div>
          <mt-button @click.native="handleClick">取消</mt-button>
          <mt-button @click.native="sureClick">确定</mt-button>
        </div>
       <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </slot>
    </mt-popup>
    <!-- 弹出框 -->
    <mt-popup v-model="popupVisible2" popup-transition="popup-fade" style="border-radius:5px;">
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
  data () {
    return {
      selected:'1',
      bank_code:'',//	银行代号
      bank_card:'',//银行卡号
      bank_phone:'',//手机号码
      bank_name:'',//银行名称
      bank_id_card:'',//身份证号
      bank_copy:'银行卡',
      wechat:'',
      alipay:'',
      popupName:'',
      popupVisible:false,
      popupVisible2:false,
      active: 'tab-container1',
      slots: [
        {
          values: [],
          className: 'slot1',
          textAlign: 'center',
        },
      ],
      arrCode:[]
    }
  },
  methods:{
    actionSheet(){//显示弹窗
      this.popupVisible = true;
    },
    handleClick(){//取消选择银行卡
      this.popupVisible = false;
    },
    sureClick(){//确实选择银行卡
      this.popupVisible = false;
      this.bank_name = this.bank_copy;
    },
   
    onValuesChange(picker, valuess){//银行卡选择
      this.bank_copy = valuess[0];
      console.log('fff',valuess);
      if(valuess == '中国工商银行'){
        this.bank_code = 'ICBC'
      }
      if(valuess == '中国农业银行'){
        this.bank_code = 'ABC'
      }
      if(valuess == '中国银行'){
        this.bank_code = 'BOC'
      }
      if(valuess == '中国建设银行'){
        this.bank_code = 'CCB'
      }
      if(valuess == "交通银行"){
        this.bank_code = "BOCOM"
      }
      if(valuess == "中信银行"){
        this.bank_code = "CITIC"
      }
      if(valuess == "中国光大银行"){
        this.bank_code = "CEB"
      }
      if(valuess == "上海浦东发展银行"){
        this.bank_code = "SPDB"
      }
      if(valuess == "中国民生银行"){
        this.bank_code = "CMBC"
      }
      if(valuess == "招商银行"){
        this.bank_code = "CMB"
      }
      if(valuess == "兴业银行"){
        this.bank_code = "CIB"
      }
      if(valuess == "广发银行"){
        this.bank_code = "CGB"
      }
      if(valuess =="平安银行"){
        this.bank_code = "PAB"
      }
    },
    //对身份证校验
    checkNum(){
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!reg.test(this.bank_id_card)){
        this.popupVisible2= true;
        this.popupName="请输入正确的身份证号码";
      }
    },
    //手机号检验函数
    checkNum2(){
      let reg = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/; 
      if(!reg.test(this.bank_phone)){
        this.popupVisible2= true;
        this.popupName="请输入真实手机号";
      }
    },
    //银行卡号检验函数
    checkNum3(){
      let pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
      if(!pattern.test(this.bank_card)){
         this.popupVisible2 = true;
         this.popupName = "银行卡号输入有误"
      }
    },
    //请求接口api
    httpApi(){
      this.$http({
        url: '/certification/bank_card',
        method: 'post',
        data: {
          num: sessionStorage.getItem('userId'),
          bank_code:this.bank_code,//银行代号
          bank_card:this.bank_card,//银行卡号
          bank_id_card:this.bank_id_card,//银行卡身份证号码
          bank_phone:this.bank_phone,//银行卡绑定手机号
          wechat:this.wechat,//微信账号
          alipay:this.alipay,//支付宝账号
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
        let _this = this;
        let datas = res.data;
        if(res.status == 200) {
          this.$router.replace('/certification');
          this.$router.go(0)
        }
      })
    },
    // 提交
    achive(){
      if(this.selected == 1){
        this.checkNum();//对身份证校验
        this.checkNum2(); //手机号检验函数
      }
      if(this.selected == 2 && !this.wechat){
        this.popupVisible2 = true;
        this.popupName = "请输入微信号"
      }
      if(this.selected == 3 && !this.alipay){
        this.popupVisible2 = true;
        this.popupName = "请输入支付宝"
      }
     
      if (this.bank_card && this.bank_phone && this.bank_name && this.bank_id_card && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.bank_id_card) && /^([1-9]{1})(\d{14}|\d{18})$/.test(this.bank_card) && /^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(this.bank_phone)){//银行卡
        console.log('mm')
        this.httpApi()
      }
      if(this.wechat){//微信
        this.httpApi()
      }
      if(this.alipay){//支付宝
        this.httpApi()
      }
    },
     // 确定按钮
    sure() {
      this.popupVisible2 = false;
    },
  },
  created(){
    this.$http({
      url: '/admin/banks',
      method: 'post',
      data: {
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
      let _this = this;
      if(res.status == 200) {
        let datas = res.data;
        datas.forEach(function(value,i){
          console.log(value)
      　_this.slots[0].values.push(value.name)
        _this.arrCode.push(value.code);
       })
      }
    })
  },
  mounted(){
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.slots[0].defaultIndex = 0    
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });
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
   .identity_data{
    background:#FFFFFF;
    font-size: px2rem(15px);
    color:#333333;
    margin-top:px2rem(10px);
    margin-bottom:px2rem(10px); 
    div {
      width:px2rem(358px);
      height:px2rem(50px);
      line-height: px2rem(50px);
      font-size: px2rem(15px);
      margin-left:px2rem(17px);
      border-bottom:px2rem(1px) solid #E6E6E6;
      position: relative;
      span {
        width:px2rem(85px);
        display: inline-block;
      }
      input {
        margin-left: px2rem(20px);
        color:#B3B3B3;
      }
      img {
        position:absolute;
        top:px2rem(18px);
        right:px2rem(18px);
      }
      &:last-child {
        border:none;
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
    margin-top:px2rem(50px);
  }
  .picker{
    /deep/ .picker-item{
      text-align: center;
    }
  }
 .mint-button--default{
    border:none;
    color:#B3B3B3;
    background-color: white;
    box-shadow: 0 0 1px white;
    -webkit-box-shadow:0 0 1px white;
    &:last-child{
      float: right;
      color:#333333;
    }
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
  .mint-button--default[data-v-99018626]:last-child {
    float: none;
    color: #B3B3B3;
}

</style> 
