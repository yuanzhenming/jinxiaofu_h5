<template>
  <div class="my">
    <div class="my_top">
      <img width="56" class="my_head" src="/static/images/my/myHead@2x.png" alt="">
      <div class="my_text">
        <span>{{mobile}}</span>
        <mark>{{idState}}</mark>
      </div>
      <router-link to="/accountInformation" tag="div" class="my_info"><em>账户信息</em><img width="8" src="/static/images/my/myMore@2x.png" alt=""></router-link>
    </div>
    <div class="tables">
      <div class="table_content">
        <!-- <router-link to="/bill" tag="div" class="my_bill"><div><img widh="18" src="/static/images/my/myBill@2x.png" alt=""></div><div><p>我的账单</p><em>借款与还款</em></div></router-link> -->
        <router-link to="/bank" tag="div" class="my_bank"><div><img widh="22" src="/static/images/my/myBank@2x.png" alt=""></div><div><p>我的银行卡</p><em>银行卡绑定</em></div></router-link>
        
        <div class="line"></div>

        <router-link to="/set" tag="div" class="my_set">
          <div>
            <img widh="22" src="/static/images/my/mySet@2x.png" alt=""></div>
            <div>
              <p>设置</p>
              <!-- <em>密码修改等</em> -->
            </div>
        </router-link>
      </div>
      <!-- <div class="table_content"> -->
        <!-- <router-link to="/newsCenter" tag="div" class="my_news"><div><img widh="22" src="/static/images/my/myNews@2x.png" alt=""></div><div><p>消息中心</p><em>最新消息</em></div></router-link> -->
        <!-- <div class="line"></div> -->
        <!-- <router-link to="/set" tag="div" class="my_set"><div><img widh="22" src="/static/images/my/mySet@2x.png" alt=""></div><div><p>设置</p><em>密码修改等</em></div></router-link> -->
      <!-- </div> -->
    </div>
    <!-- 客服 -->
    <div class="my_server">
      <!-- <img widh="56" src="/static/images/my/myServer@2x.png" alt=""> -->
    </div>
  </div>
</template>
<script>
  export default {
    data(){
     return {
        userId:'',//用户id
        mobile:'',//手机号
        idState:'',//认证状态
     }
    },
    methods:{
      //判断信息状态
      state(datas){
        console.log(datas.base_info_status,"ffffffffffffff");
        if(datas.base_info_status == 1) { //基础信息
          console.log('mmm')
          this.$store.dispatch('showBase');
        }else {
          this.$store.dispatch('hideBase');
        }
      },
    },
    created(){
      //获取用户id
      this.userId = sessionStorage.getItem('userId');
      console.log('userId',this.userId);
      if(!sessionStorage.getItem('userId')){
        this.$router.replace('/login');
        console.log("mmmm");
        return false;
      }
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
          let str= datas.mobile;  
          let mobile = str.substr(0,3)+"****"+str.substr(7);  
          this.mobile = mobile;
          console.log('datas',datas);
          if(datas.base_info_status == 1 && datas.link_person_status == 1 && datas.id_card_status == 1 && datas.custom_airtel_status == 1 && datas.custom_mobile_book_status == 1){
            this.idState = '未认证'
          }else if(datas.base_info_status == 1 || datas.link_person_status == 1 || datas.id_card_status == 1 || datas.custom_airtel_status == 1 || datas.custom_mobile_book_status == 1){
            this.idState = '认证中'
          }else{
            this.idState = '已认证'
          }
          sessionStorage.setItem('idState',this.idState);
        }
      })
    }
  }

</script>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .my_top {
    background-image: url('/static/images/my/myBg.png');
    height: px2rem(98px);
    position: relative;
    .my_head {
      margin-top:px2rem(21px);
      margin-left:px2rem(18px);
    }
    .my_text {
      position: absolute;
      top: px2rem(33px);
      left: px2rem(90px);
      span {
        position: absolute;
        color:#FFFFFF;
        font-size:px2rem(18px);
      }
      mark {
        position: absolute;
        top: px2rem(25px);
        left: px2rem(0);
        background-color:rgba(225,225,225,0.4);
        color: #FFFFFF;
        font-weight: Regular;
        font-family: PingFang-SC-Regular,;
        border-radius: px2rem(4px);
        font-size:px2rem(12px);
        width: px2rem(50px);
        height: px2rem(22px);
        line-height: px2rem(22px);
        text-align: center;
      }
    }
    .my_info {
      position: absolute;
      top:px2rem(43px);
      left: px2rem(286px);
      font-size: px2rem(13px);
      color:#FFFFFF;
      img {
        position:absolute;
        top:0;
        left:px2rem(58px);
      }
    }
  }
  .tables {
    .line {
      border: none;
      border-left: px2rem(1px) solid#E6E6E6;
      height: px2rem(50px);
    }
    .table_content {
      border-bottom:1px solid #E6E6E6;
      width:px2rem(351px);
      height: px2rem(80px);
      display:flex;
      text-align: center;
      align-items: center;
      .my_bill, .my_bank, .my_news, .my_set {
        width:50%;
        text-align: center;
        display: flex;
        height: px2rem(38px);
        div:first-child {
          width:px2rem(22px);
          margin-left: px2rem(18px);
          img {
           width:100%;
          }
        }
        div:last-child {
          margin-left: px2rem(16px);
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            font-size: px2rem(16px);
          }
          em {
            font-size: px2rem(12px);
            color:#B3B3B3;
            margin-top: px2rem(10)px;
          }
        }
      }
      .my_bill{
        div:first-child {
          width:px2rem(18px);
          img {
           width:100%;
          }
        }
      }
    }
  }
  .my_server {
    margin-left: px2rem(301px);
    margin-top: px2rem(120px);
    img{
      width:px2rem(56px);
    }
  }
</style>
