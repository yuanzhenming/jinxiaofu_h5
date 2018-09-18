<template>
  <div class="revise_paswd">
    <div class="inputs">
      <div class="old_paswd paswd">
      <span>旧 密 码</span>
      <input v-if="ifoldDisplay" type="text" v-model="oldpsd" placeholder="请输入旧密码">
      <input v-else type="password" v-model="oldpsd" placeholder="请输入旧密码">
      <i v-show="oldpsd" @click="clearPassword1()" class="clear_psd">×</i>
      <img v-show="ifoldDisplay" @click="ifoldDisplay=!ifoldDisplay" class="paswd_eye" src="/static/images/login/psw-show.png" alt="">
      <img v-show="!ifoldDisplay" @click="ifoldDisplay=!ifoldDisplay"  class="paswd_eye" src="/static/images/login/psw-hide.png" alt="">
      </div>
      <div class="new_passwd paswd">
        <span>新 密 码</span>
        <input v-if="ifnewDisplay" type="text" v-model="newpsd" placeholder="请输入6-16位新密码">
        <input v-else type="password" v-model="newpsd" placeholder="请输入6-16位新密码">
        <i v-show="newpsd" @click="clearPassword2()" class="clear_psd">×</i>
        <img v-show="ifnewDisplay" @click="ifnewDisplay=!ifnewDisplay" class="paswd_eye" src="/static/images/login/psw-show.png" alt="">
        <img v-show="!ifnewDisplay" @click="ifnewDisplay=!ifnewDisplay" class="paswd_eye" src="/static/images/login/psw-hide.png" alt="">
      </div>
      
      <div class="sure_passwd paswd">
        <span>确认密码</span>
        <input v-if="ifsureDisplay" v-model="surepsd" type="text" placeholder="请再次输入新密码">
        <input v-else type="password" v-model="surepsd" placeholder="请再次输入新密码">
        <i v-show="surepsd" @click="clearPassword3()" class="clear_psd">×</i>
        <img v-show="ifsureDisplay" @click="ifsureDisplay=!ifsureDisplay" class="paswd_eye" src="/static/images/login/psw-show.png" alt="">
        <img v-show="!ifsureDisplay" @click="ifsureDisplay=!ifsureDisplay" class="paswd_eye" src="/static/images/login/psw-hide.png" alt="">
      </div>
    </div>
    <div class="button" @click="achieve()">完成</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ifoldDisplay:false,
        ifnewDisplay:false,
        ifsureDisplay:false,
        oldpsd:'',
        newpsd:'',
        surepsd:'',
      }
    },
    methods: {
      clearPassword1(){
        this.oldpsd='';
      },
      clearPassword2(){
        this.newpsd='';
      },
      clearPassword3(){
        this.surepsd='';
      },
      achieve() {
        this.$router.push('/login')
      }
    }

  }
</script>
<style scoped lang='scss'>
 @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .inputs {
    background-color:#FFFFFF;  
    .paswd {
      width:px2rem(358px);
      height:px2rem(50px);
      line-height: px2rem(50px);
      font-size: px2rem(15px);
      margin-left:px2rem(17px);
      border-bottom:px2rem(1px) solid #E6E6E6;
      
      .clear_psd{
        margin-left:px2rem(52px);
      }
      span {
        width:px2rem(70px);
        display: inline-block;
      }
      input {
        width:px2rem(140px);
        margin-left:px2rem(15px);
      }
      img {
        float: right;
        margin-right: px2rem(18px);
        margin-top:px2rem(21px);
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
</style>
