<template>
  <div class="account_information">
    <div class="account_con">
      <div>
        <!-- <img width="56" class="head" src="/static/images/accountInformation/head@2x.png" alt=""><span>头像</span>
        <img width="8" src="/static/images/basicData/skip@2x.png" @click="action()"> -->
      </div>
      <div><span>手机号</span><em>{{mobile}}</em></div>
      <div><span>姓名</span><em>{{real_name}}</em></div>
      <div><span>身份证号</span><em>{{id_card}}</em></div>


      <router-link v-if="idState == '已认证'" to="" tag="div"><span>信息认证</span><em>{{idState}}</em>
       <img width="8" src="/static/images/basicData/skip@2x.png">
      </router-link>
      <router-link v-else to="/certification" tag="div"><span>信息认证</span><em>{{idState}}</em>
       <img width="8" src="/static/images/basicData/skip@2x.png">
      </router-link>
      
    </div>
    <img :src="imgSrc">
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mobile:'',
        real_name:'',
        id_card:'',
        idState:'',//信息认证状态
        imgSrc:'',//展示的图片路径,
        actions:[
          {
            name:'从手机相册选择',
            method : this.getLibrary	// 调用methods中的函
          },{
            name:'拍照',
            method : this.getCamera	// 调用methods中的函数
          }
        ],
        sheetVisible: false,
      }
    },
    methods: {
      action() {
        this.sheetVisible = true
      },
      getLibrary(){
        console.log("打开相册");
      },
      getCamera(){
        console.log("打开照相机");
      },
    },
     created(){
      //获取用户id
      this.userId = sessionStorage.getItem('userId');
      this.idState = sessionStorage.getItem('idState');
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
          let mobileStr= datas.mobile;  
          let id_cardStr= datas.id_card; 
          let real_nameStr = datas.real_name;

          let mobile = mobileStr.substr(0,3)+"****"+mobileStr.substr(7);  
          let id_card = id_cardStr.substr(0,6)+"********"+id_cardStr.substr(14);
          let real_name = "*"+real_nameStr.substr(1);
          this.mobile = mobile;
          this.real_name = real_name;
          this.id_card = id_card;
          console.log('datas',datas);
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
  .account_con{
    background-color:#FFFFFF;
    div {
      height: px2rem(50px);
      line-height: px2rem(48px);
      font-size: px2rem(15px);
      color:#333333;
      position: relative;
      // &:first-child{
        // position: relative;
        // height: px2rem(75px);
        // .head{
        //   position: absolute;
        //   top:50%;
        //   left:px2rem(18px);
        //   transform: translateY(-50%);
        //   width:px2rem(56px);
        // }
        // span {
        //   position: absolute;
        //   top:50%;
        //   left:px2rem(71px);
        //   transform: translateY(-50%);
        // }
      // }
      &:nth-child(2),&:nth-child(3),&:nth-child(4){
        position: relative;
        border-bottom:px2rem(1px) solid #B3B3B3;
        em {
          position: absolute;
          top:50%;
          right:px2rem(15px);
          transform: translateY(-50%);
          color:#B3B3B3;
        }
      }
      &:nth-child(5){
        position: relative;
        em {
          position: absolute;
          top:50%;
          left:px2rem(295px);
          transform: translateY(-50%);
          color:#FE5F1B;
        }
      }
      span{
        margin-left:px2rem(18px);
      }
      img {
        position: absolute;
        top:50%;
        left:px2rem(349px);
        transform: translateY(-50%);
      }
    }
  }
  
  
</style>

