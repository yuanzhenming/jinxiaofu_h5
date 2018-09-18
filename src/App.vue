<template>
  <div id="app" style="width:100%;height:100%;">
    <keep-alive>
      <router-view style="width:100%;height:100%;"></router-view>
    </keep-alive>
    <Footer v-show='footerShow'></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Certification from './components/certification.vue'
import My from './components/my.vue'
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
    Footer,
  },
  computed:mapGetters([
    'footerShow'
  ]),
  
  watch:{
    $route(to,from){
      if(to.path == '/accountInformation' || to.path == '/basicData'|| to.path == '/emergencyContact'||to.path == '/idDocument'||to.path == '/mobileOperato'||to.path == '/mobileAddressBook'||to.path == '/creditCertification'||to.path == '/bank'||to.path == '/bill'||to.path == '/newsCenter'||to.path == '/set'||to.path == '/revisePaswd'||to.path == '/login'||to.path == '/forgetPswdServer'||to.path == '/answerProblem'||to.path == '/unableVerifying'||to.path == '/moreValidation'||to.path == '/certificationProcess'||to.path == '/mobileValidate'||to.path == '/mobileCompleted'||to.path == '/zServicePassword'|| to.path == '/addBankCard' || to.path == '/borrowPaper'){
        this.$store.dispatch('hideFooter');
        if(!sessionStorage.getItem('userId')){
          this.$router.replace('/login');
        }
      }else if(to.path == '/registe'){
         this.$store.dispatch('hideFooter');
      }else{
        this.$store.dispatch('showFooter');
      }
    }
  },
  created() {
    if(this.$route.path == '/accountInformation' || this.$route.path == '/basicData'|| this.$route.path == '/emergencyContact'||this.$route.path == '/idDocument'||this.$route.path == '/mobileOperato'||this.$route.path == '/mobileAddressBook'||this.$route.path == '/creditCertification'||this.$route.path == '/bank'||this.$route.path == '/bill'||this.$route.path == '/newsCenter'||this.$route.path == '/set'||this.$route.path == '/revisePaswd'|| this.$route.path == '/login'|| this.$route.path == '/forgetPswdServer'|| this.$route.path == '/answerProblem'|| this.$route.path == '/unableVerifying'|| this.$route.path == '/moreValidation'|| this.$route.path == '/certificationProcess'|| this.$route.path == '/mobileValidate'||this.$route.path == '/mobileCompleted'||this.$route.path == '/zServicePassword'||this.$route.path == '/addBankCard'||this.$route.path == '/borrowPaper'){

      this.$store.dispatch('hideFooter');
      // 如果用户id不存在,跳到登录页面
      if(!sessionStorage.getItem('userId')){
        this.$router.replace('/login')
      }

    }else if(this.$route.path == '/registe'){

      this.$store.dispatch('hideFooter');

    }else{
      this.$store.dispatch('showFooter');
    }
  }
}
</script>



