<template>
  <div class="emergencyContact">
    <div class="warning"><img width="15" src="/static/images/basicData/warning@2x.png" alt=""><span>请谨慎填写您的真实身份信息，一旦提交不可更改</span></div>
    <div class="identity_data">
      <div>
        <em>*</em><span>与本人关系</span>
        <input v-model="link_person_relation_one" type="text" placeholder="请选择">
        <!-- <img src="/static/images/basicData/skip.png" alt=""> -->
      </div>
      <div><em>*</em><span>姓名</span><input v-model="link_person_name_one" type="text" placeholder="请输入TA的姓名"></div>
      <div><em>*</em><span>手机号</span><input v-model="link_person_phone_one" type="number" placeholder="请输入TA的手机号"></div>
    </div>
    <div class="identity_data">
      <div>
        <em>*</em><span>与本人关系</span>
        <input v-model="link_person_relation_two" type="text" placeholder="请选择">
        <!-- <img src="/static/images/basicData/skip.png" alt=""> -->
      </div>
      <div><em>*</em><span>姓名</span><input v-model="link_person_name_two" type="text" placeholder="请输入TA的姓名"></div>
      <div><em>*</em><span>手机号</span><input v-model="link_person_phone_two" type="number" placeholder="请输入TA的手机号"></div>
    </div>
    <div class="button" @click="achieve()">提交</div>
    <!-- 弹窗 -->
    <mt-popup v-model="popupVisible" :closeOnClickModal='false'>
      <div class="popup">
        <div class="popup_title">温馨提醒</div>
        <div>{{popupName}}</div>
        <div @click="sure">确定</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        link_person_name_one:'',
        link_person_phone_one:'',
        link_person_relation_one:'',
        link_person_name_two:'',
        link_person_phone_two:'',
        link_person_relation_two:'',
        popupVisible:false,//是否显示弹窗
        popupName:'',//弹窗内容
      }
    },
    methods: {
      //手机号检验函数
      checkNum(){
        let reg = /^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/; 
        if(!reg.test(this.link_person_phone_one) || !reg.test(this.link_person_phone_two)){
          this.popupVisible= true;
          this.popupName="请输入真实手机号";
        }
      },
      achieve() {
        let reg = /^1[2|3|4|5|6|7|8|9][0-9]{9}$/; 
        this.checkNum()
        console.log(this.link_person_name_one)
        if (this.link_person_relation_one && this.link_person_phone_one && this.link_person_relation_one && this.link_person_name_one&& this.link_person_relation_two&& this.link_person_phone_two&& this.link_person_name_two && reg.test(this.link_person_phone_one) && reg.test(this.link_person_phone_two)) {
          this.$http({
            url: '/certification/link_person',
            method: 'post',
            data: {
              num: sessionStorage.getItem('userId'),
              link_person_name_one: this.link_person_name_one,
              link_person_phone_one: this.link_person_phone_one,
              link_person_relation_one: this.link_person_relation_one,
              link_person_name_two: this.link_person_name_two,
              link_person_phone_two: this.link_person_phone_two,
              link_person_relation_two: this.link_person_relation_two,
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
            console.log('res',res)
            if(res.data.error_code == 200){
              this.$router.push('/certification')
              this.$router.go(0)
            
            }
          })
        }
      },
       // 确定登陆
      sure() {
        this.popupVisible= false;
      }
    },
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
      left: px2rem(35px);
    }
    span{
      position: absolute;
      top:px2rem(9px);
      left: px2rem(55px);
    }
  }
  .identity_data{
    background:#FFFFFF;
    font-size: px2rem(15px);
    color:#333333;
    margin-bottom:px2rem(10px); 
    div {
      width:px2rem(358px);
      height:px2rem(50px);
      line-height: px2rem(50px);
      font-size: px2rem(15px);
      margin-left:px2rem(15px);
      border-bottom:px2rem(1px) solid #E6E6E6;
      position: relative;
      em {
        color:#FE5F1B;
        margin-left: px2rem(16px);
        margin-right: px2rem(4px);
      }
      span {
        width:px2rem(80px);
        display: inline-block;
      }
      input {
        margin-left: px2rem(32px);
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