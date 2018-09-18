<template>
  <div class="id_document">
    <div class="warning"><img width="15" src="/static/images/basicData/warning@2x.png" alt=""><span>请上传借条</span></div>
    <div class="fisrt stop">
      <div><em></em><span>借贷宝</span></div>
      <div>
        <!-- <img v-if="!id_card_pic1" width="100%" src="/static/images/idDocument/positive@2x.png" alt=""> -->
        <img class="photograph" v-if="!id_card_pic1" width="56" src="/static/images/idDocument/photograph@2x.png" alt="">
        <p v-if="!id_card_pic1">请点击拍照上传借条</p>
        <!-- 上传正面照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update1" multiple v-if='clearShow'/>
        <img v-if="id_card_pic1" class="uploadImg" :src="id_card_pic1" alt="">
      </div>
    </div>
    <div class="second stop">
      <div><em></em><span>有凭证</span></div>
      <div>
        <!-- <img v-if="!id_card_pic2" width="100%" src="/static/images/idDocument/side@2x.png" alt=""> -->
        <img v-if="!id_card_pic2" class="photograph" width="56" src="/static/images/idDocument/photograph@2x.png" alt="">
        <p v-if="!id_card_pic2">请点击拍照上传借条</p>
        <!-- 上传反面照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update2" multiple v-if='clearShow'/>
        <img class="uploadImg" :src="id_card_pic2" alt="">
      </div>
    </div>
    <div class="third stop">
      <div><em></em><span>无忧借条</span></div>
      <div>
        <!-- <img v-if="!id_card_pic3" width="100%" src="/static/images/idDocument/hold@2x.png" alt=""> -->
        <img v-if="!id_card_pic3" class="photograph" width="56" src="/static/images/idDocument/photograph@2x.png" alt="" >
        <p v-if="!id_card_pic3">请点击拍照上传借条</p>
        <!-- 上传手持照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update3" multiple v-if='clearShow'/>
        <img class="uploadImg" :src="id_card_pic3" alt="">
      </div>
    </div>
    <div class="four stop">
      <div><em></em><span>今借到</span></div>
      <div>
        <!-- <img v-if="!id_card_pic4" width="100%" src="/static/images/idDocument/hold@2x.png" alt=""> -->
        <img v-if="!id_card_pic4" class="photograph" width="56" src="/static/images/idDocument/photograph@2x.png" alt="">
        <p v-if="!id_card_pic4">请点击拍照上传借条</p>
        <!-- 上传手持照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update4" multiple v-if='clearShow'/>
        <img class="uploadImg" :src="id_card_pic4" alt="">
      </div>
    </div>
    <div class="five stop">
      <div><em></em><span>米房</span></div>
      <div>
        <!-- <img v-if="!id_card_pic4" width="100%" src="/static/images/idDocument/hold@2x.png" alt=""> -->
        <img v-if="!id_card_pic5" class="photograph" width="56" src="/static/images/idDocument/photograph@2x.png" alt="">
        <p v-if="!id_card_pic5">请点击拍照上传借条</p>
        <!-- 上传手持照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update5" multiple v-if='clearShow'/>
        <img class="uploadImg" :src="id_card_pic5" alt="">
      </div>
    </div>
    <div class="button"  @click="achieve()">提交</div>
    <!-- 弹窗 -->
    <mt-popup v-model="popupVisible" :closeOnClickModal='false' style="border-radius:5px;">
      <div class="popup">
        <div class="popup_title">温馨提醒</div>
        <div>{{popupName}}</div>
        <div @click="sure">确定</div>
      </div>
    </mt-popup>
    <mt-popup v-model="popupVisible3" popup-transition="popup-fade" style="border-radius:5px;">
      <slot>
        <div class="popup">
          <div class="popup_title">温馨提醒</div>
          <div>{{popupName3}}</div>
          <div @click="sure3()">确定</div>
         </div>
      </slot>
    </mt-popup>
  </div>
</template>
<script>
import axios from 'axios'
  export default{
    data() {
      return {
        id_card_pic1:'',//借条1
        id_card_pic2:'',//借条2
        id_card_pic3:'',//借条3
        id_card_pic4:'',//借条4
        id_card_pic5:'',//借条5
        popupVisible:false,//是否显示弹窗
        popupName:'',//提示信息
        popupName3:'',
        time:'',
        clearShow:true,
        popupVisible3:false,
      }
    },
    methods: {
      imgTime(){//图片定时器
        let s = 35;
        this.time = setInterval(() =>{
          s -= 1;
          s <= 0 ? ( this.popupVisible3= true,this.popupName3="上传图片过大，请耐心等待",clearInterval(this.time),this.$indicator.close()) : console.log(s)
        },1000)
      },
       //上传图片事件
      update1 (e) {   // 上传正面照片
        let _this = this;
        let file = e.target.files[0]
        console.log("ffff",file.name)
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        this.clearShow = false;
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$indicator.open('加载中...');
        this.imgTime();//调用定时器
        // 添加请求头
        axios.post('/util/uploadTicketFile',param, config).then(res => {
          console.log(res.data)
          if (res.data.error_code === 200) {
            this.id_card_pic1 = res.data.url
            this.$indicator.close();
            clearInterval(this.time)
            this.file = '';
            this.clearShow = true;
          }
          if(res.data.error_code === 400){
            this.$indicator.close();
            this.popupVisible= true;
            this.popupName="上传失败，上传文件格式错误";
            this.clearShow = true;
          }
        })
      },
       //上传图片事件
      update2 (e) {   // 上传反面照片
        let _this = this;
        let file = e.target.files[0]
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        this.clearShow = false;
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$indicator.open('加载中...');
        this.imgTime();//调用定时器
        // 添加请求头
        axios.post('/util/uploadTicketFile', param, config).then(res => {
          console.log(res.data)
          if (res.data.error_code === 200) {
            _this.id_card_pic2 = res.data.url
            this.$indicator.close();
            clearInterval(this.time)
            this.clearShow = true;
          }
          if(res.data.error_code === 400){
            this.$indicator.close();
            this.popupVisible= true;
            this.popupName="上传失败，上传文件格式错误";
            this.clearShow = true;
          }
        })
      },
       //上传图片事件
      update3 (e) {   // 上传手持面照片
        let _this = this;
        let file = e.target.files[0]
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        this.clearShow = false;
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$indicator.open('加载中...');
        this.imgTime();//调用定时器
        // 添加请求头
        axios.post('/util/uploadTicketFile', param, config).then(res => {
          console.log(res.data)
          if (res.data.error_code === 200) {
            _this.id_card_pic3 = res.data.url
            console.log( _this.id_card_pic3)
            this.$indicator.close();
            clearInterval(this.time)
            this.clearShow = true;
          }
          if(res.data.error_code === 400){
            this.$indicator.close();
            this.popupVisible= true;
            this.popupName="上传失败，上传文件格式错误";
            this.clearShow = true;
          }
        })
      },
       //上传图片事件
      update4 (e) {   // 上传手持面照片
        let _this = this;
        let file = e.target.files[0]
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        this.clearShow = false;
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$indicator.open('加载中...');
        this.imgTime();//调用定时器
        // 添加请求头
        axios.post('/util/uploadTicketFile', param, config).then(res => {
          console.log(res.data)
          if (res.data.error_code === 200) {
            _this.id_card_pic4 = res.data.url
            console.log( _this.id_card_pic4)
            this.$indicator.close();
            clearInterval(this.time)
            this.clearShow = true;
          }
          if(res.data.error_code === 400){
            this.$indicator.close();
            this.popupVisible= true;
            this.popupName="上传失败，上传文件格式错误";
            this.clearShow = true;
          }
        })
      },
       //上传图片事件
      update5 (e) {   // 上传手持面照片
        let _this = this;
        let file = e.target.files[0]
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        this.clearShow = false;
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$indicator.open('加载中...');
        this.imgTime();//调用定时器
        // 添加请求头
        axios.post('/util/uploadTicketFile', param, config).then(res => {
          console.log(res.data)
          if (res.data.error_code === 200) {
            _this.id_card_pic5 = res.data.url
            console.log( _this.id_card_pic5)
            this.$indicator.close();
            clearInterval(this.time)
            this.clearShow = true;
          }
          if(res.data.error_code === 400){
            this.$indicator.close();
            this.popupVisible= true;
            this.popupName="上传失败，上传文件格式错误";
            this.clearShow = true;
          }
        })
      },
      achieve() {//上传借条

        if(this.id_card_pic1 || this.id_card_pic2 || this.id_card_pic3 || this.id_card_pic4 ||this.id_card_pic5){
          this.$http({
            url: '/certification/borrow_paper',
            method: 'post',
            data: {
              num: sessionStorage.getItem('userId'),//用户num
              pic1:this.id_card_pic1,
              pic2:this.id_card_pic2,
              pic3:this.id_card_pic3,
              pic4:this.id_card_pic4,
              pic5:this.id_card_pic5
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
            console.log(res)
            if (res.data.error_code == 200) {
              this.$router.push('/certification')
              this.$router.go(0)
            }
            if (res.data.error_code == 400) {
              this.popupVisible= true;
             this.popupName = "借条上传失败!"
            }
          })
        }else{
          this.popupVisible= true;
          this.popupName = "必须至少上传一张借条!"
        }
      },
      // 确定
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
  .warning {
    background-color:#FFDFD1;
    color:#FE5F1B;
    height:px2rem(30px);
    font-size: px2rem(13px);
    position: relative;
    img {
      position: absolute;
      top:px2rem(8px);
      left: px2rem(93px);
    }
    span{
      position: absolute;
      top:px2rem(9px);
      left:50%;
      transform: translateX(-50%);
    }
  }
  .stop{
    width:px2rem(263px);
    margin:0 auto;
    text-align: center;
    font-size: px2rem(13px);
    margin-top:px2rem(20px);
    em {
      color:#FE5F1B;
    }
    div:nth-child(2){
      margin-top:px2rem(10px);
      position: relative;
      width:px2rem(263px);
      height: px2rem(150px);
      overflow: hidden;
      border:px2rem(1px) solid #cfe2f3;
      background-color:#cfe2f3;
      position: relative;
      .photograph{
        position: absolute;
        top:px2rem(36px);
        left:px2rem(104px);
      }
      p{
        position: absolute;
        top:px2rem(102px);
        left:50%;
        transform: translateX(-50%);
        width:px2rem(170px);
      }
      .uploadInput{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        height: px2rem(90px);
        opacity: 0;
        z-index: 1000;
      }
      .uploadImg{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        max-width:100%;
        max-height: px2rem(150px);
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
    margin-top:px2rem(30px);
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
