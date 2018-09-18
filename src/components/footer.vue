<template>
  <div class="tabbar">
    <router-link to="/home" tag="div" active-class="red_class">
      <img width="22" v-if="imgSrc1" src="/static/images/footer/icon-borrowinggray@2x.png">
      <img width="22" v-else src="/static/images/footer/icon-borrowing@2x.png">
      <em>借款</em>
    </router-link>
    <router-link to="/certification" tag="div" active-class="red_class">
      <img v-if="imgSrc2" width="17" src="/static/images/footer/icon-certificationgray@2x.png">
      <img width="17" v-else src="/static/images/footer/icon-certification@2x.png">
      <em>认证</em>
    </router-link>

    <router-link to="/my" tag="div" active-class="red_class">
      <img width="17" v-if="imgSrc3" src="/static/images/footer/icon-my@2x.png">
      <img width="17" v-else src="/static/images/footer/icon-my-xuanzhong@2x.png">
      <em>我的</em>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc1: false,
      imgSrc2: true,
      imgSrc3: true,
    }
  },
  methods: {
    
  },
  mounted() {
    if (this.$route.path == '/'){
      this.imgSrc1 = false;
      this.imgSrc2 = true;
      this.imgSrc3 = true;
      this.$router.push('/login');
      if(!sessionStorage.getItem('userId')){
        this.$router.replace('/login');
      }
    }
    if (this.$route.path == '/certification'){
      this.imgSrc1 = true;
      this.imgSrc2 = false;
      this.imgSrc3 = true;
      //如果未登录，调到登录页面
      if(!sessionStorage.getItem('userId')){
        this.$router.replace('/login');
      }
    }
    if (this.$route.path == '/my'){
      this.imgSrc1 = true;
      this.imgSrc2 = true;
      this.imgSrc3 = false;
      if(!sessionStorage.getItem('userId')){
        this.$router.replace('/login');
      }
    }
  },
  watch: {
    $route(to,from) {
      if(to.path == '/home') {
        this.imgSrc1 = false;
        this.imgSrc2 = true;
        this.imgSrc3 = true;
        if(!sessionStorage.getItem('userId')){
          this.$router.replace('/login');
        }
      }
      if(to.path == '/certification') {
        this.imgSrc1 = true;
        this.imgSrc2 = false;
        this.imgSrc3 = true;
        if(!sessionStorage.getItem('userId')){
          this.$router.replace('/login');
        }
      }
      if(to.path == '/my') {
        this.imgSrc1 = true;
        this.imgSrc2 = true;
        this.imgSrc3 = false;
        if(!sessionStorage.getItem('userId')){
          this.$router.replace('/login');
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
 @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  .tabbar {
    position: fixed;
    left: 0;
    right:0;
    bottom:0;
    display: flex;
    justify-content: space-around;
    background-color: #FFFFFF;
    align-content: center;
    margin-top: px2rem(14px);
    height:px2rem(49px);
    padding-top: px2rem(8px);
    border-top:px2rem(1px) solid #DCDCDC;
    color: #B3B3B3;
    div {
      font-size: px2rem(11px);
      width: px2rem(40px);
      height:px2rem(50px);
      text-align: center;
      em {
        display: block;
        margin-top: px2rem(4px);
      }
    }
    .red_class {
      color: #FE5F1B;
    }
  }
</style>
