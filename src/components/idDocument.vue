<template>
  <div class="id_document">
    <div class="warning"><img width="15" src="/static/images/basicData/warning@2x.png" alt=""><span>请上传有效的二代身份证相片</span></div>
    <div class="fisrt stop">
      <div><em>*</em><span>第一步 &nbsp;上传身份证正面</span></div>
      <div>
        <img v-if="!id_card_pic1" width="100%" src="/static/images/idDocument/positive@2x.png" alt="">
        <img class="photograph" v-if="!id_card_pic1" width="56" src="/static/images/idDocument/photograph@2x.png" alt="">
        <p v-if="!id_card_pic1">请点击拍照上传头像页</p>
        <!-- 上传正面照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update1" multiple v-if='clearShow'/>
        <img v-if="id_card_pic1" class="uploadImg" :src="id_card_pic1" alt="">
      </div>
    </div>
    <div class="second stop">
      <div><em>*</em><span>第二步 &nbsp;上传身份证反面</span></div>
      <div>
        <img v-if="!id_card_pic2" width="100%" src="/static/images/idDocument/side@2x.png" alt="">
        <img v-if="!id_card_pic2" class="photograph" width="56" src="/static/images/idDocument/photograph@2x.png" alt="">
        <p v-if="!id_card_pic2">请点击拍照上传国徽页</p>
        <!-- 上传反面照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update2" multiple v-if='clearShow'/>
        <img class="uploadImg" :src="id_card_pic2" alt="">
      </div>
    </div>
    <div class="third stop">
      <div><em>*</em><span>第三步 &nbsp;上传身份证手持照</span></div>
      <div>
        <img v-if="!face_pic" width="100%" src="/static/images/idDocument/hold@2x.png" alt="">
        <img v-if="!face_pic" class="photograph" width="56" src="/static/images/idDocument/photograph@2x.png" alt="">
        <p v-if="!face_pic">请点击拍照上传身份证手持照</p>
        <!-- 上传手持照片 -->
        <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update3" multiple v-if='clearShow'/>
        <img class="uploadImg" :src="face_pic" alt="">
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
        id_card_pic1:'',//正面照
        id_card_pic2:'',//反面照
        face_pic:'',//手持证件照
        id_card:'',//身份证号码
        real_name:'',//真实姓名
        sex: '',//性别
        nation: '',//民族
        born:'',//出生年月
        address:'',//身份证地址
        department:'',//公安局
        begin:'',//生效时间
        end:'',//失效时间
        popupVisible:false,//是否显示弹窗
        popupName:'',//提示信息
        popupVisible3:false,
        popupName3:'',
        time:'',
        clearShow:true,
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
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        // param.append('side', 'front')
        this.clearShow = false;
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$indicator.open('加载中...');
        this.imgTime();//调用定时器
        // 添加请求头
        axios.post('/util/uploadTicketFile?side=front',param, config).then(res => {
          this.clearShow = true;
          console.log(res.data)
          if (res.data.error_code === 200) {
            this.id_card_pic1 = res.data.url
            this.$indicator.close();
             clearInterval(this.time)
            console.log(res.data.reason)
            this.clearShow = true;
            if(res.data.reason == "识别失败"){
              this.popupVisible= true;
              this.popupName = '识别失败!'
            }
            if(res.data.reason == "成功"){
              this.popupVisible= true;
              this.popupName = '识别成功!';
              console.log(res.data.result)
              this.id_card = res.data.result.idcard
              this.real_name = res.data.result.realname
              this.sex = res.data.result.sex
              this.nation = res.data.result.nation
              this.born = res.data.result.born
              this.address = res.data.result.address
            }
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
        param.append('side', 'back')
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        this.clearShow = false;
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$indicator.open('加载中...');
        this.imgTime();//调用定时器
        // 添加请求头
        axios.post('/util/uploadTicketFile?side=back', param, config).then(res => {
          this.clearShow = true;
          console.log(res.data)
          if (res.data.error_code === 200) {
            _this.id_card_pic2 = res.data.url
            this.$indicator.close();
            clearInterval(this.time)
            if(res.data.reason == "识别失败"){
              this.popupVisible= true;
              this.popupName = '识别失败!'
            }
            if(res.data.reason == "成功"){
              this.popupVisible= true;
              this.popupName = '识别成功!'
              this.department = res.data.result.department
              this.begin = res.data.result.begin
              this.end = res.data.result.end
            }
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
          this.clearShow = true;
          console.log(res.data)
          if (res.data.error_code === 200) {
            _this.face_pic = res.data.url
            console.log( _this.face_pic)
            this.$indicator.close();
            clearInterval(this.time)
          }
        })
      },
       //重新上传图片
      removeImg1(){//正面照
        this.id_card_pic1 = ''
      },
       removeImg2(){//反面照
        this.id_card_pic2 = ''
      },
       removeImg3(){//手持证件照
        this.face_pic = ''
      },
      achieve() {//身份证信息提交接口
        if(this.id_card_pic1 && this.id_card_pic2 && this.face_pic){
          this.$http({
            url: '/certification/id_card',
            method: 'post',
            data: {
              num: sessionStorage.getItem('userId'),//用户num
              id_card_pic1: this.id_card_pic1,//身份证正面照	
              id_card_pic2: this.id_card_pic2,//身份证反面照
              face_pic: this.face_pic,//真人头像
              id_card: this.id_card,//身份证号码
              real_name: this.real_name,//真实姓名
              sex: this.sex,//性别
              nation: this.nation,//民族
              born:this.born,//出生年月
              address:this.address,//身份证地址
              department:this.department,//公安局
              begin:this.begin,//生效时间
              end:this.end,//失效时间
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
          })
        }
      },
      // 确定登陆
      sure() {
        console.log("确定登陆");
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
      left: px2rem(114px);
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
