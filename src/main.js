// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/index.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(MintUI)


//关于axios的配置
axios.interceptors.request.use(function(config){
  //配置发送请求的文件
    // store.dispatch('showLoading')
    return config;
  },function(error){
    return Promise.reject(error);
  });
axios.interceptors.response.use(function(response){//请求回来
  // store.dispatch('hideLoading')
  return response;
},function(error){
  return Promise.reject(error);
});

axios.defaults.baseURL = 'http://api.h5.jinxfu.com'  //上线地址
//axios.defaults.baseURL = 'http://api.h5.com'  //测试地址

Vue.prototype.$http = axios;  //其他页面在使用axios的时候直接  this.$http就可以了

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  MintUI,
  store,
  components: { App },
  template: '<App/>'
})
      