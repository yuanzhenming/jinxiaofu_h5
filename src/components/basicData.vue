<template>
  <div class="basic_data">
    <div class="warning"><img width="15" src="/static/images/basicData/warning@2x.png" alt=""><span>请谨慎填写您的真实身份信息，一旦提交不可更改</span></div>
    <div class="identity_data">
      <div><em>*</em><span> 姓名</span><input v-model="real_name" type="text" placeholder="请输入姓名"></div>
      <div><em>*</em><span>身份证号码</span><input v-model="id_card" type="text" placeholder="请输入身份证号"></div>
      <div @click="actionSheet1()"><em>*</em><span> 教育程度</span><input v-model="qualifications" type="text" placeholder="请选择教育程度"><img width="8" src="/static/images/basicData/skip@2x.png" alt=""></div>
      <div @click="actionSheet2()"><em>*</em><span> 婚姻状况</span><input v-model="marry" type="text" placeholder="请选择婚姻状况"><img width="8" src="/static/images/basicData/skip@2x.png" alt=""></div>

      <!-- 城市选择 -->
      <div @click="actionSheet3()"><em>*</em><span> 现居城市</span><input v-model="city" type="text" placeholder="请选择现居城市"><img width="8" src="/static/images/basicData/skip@2x.png" alt=""></div>
    </div>
    <div class="contact_way">
      <div><em>*</em><span> 常用QQ</span><input v-model="qq" type="text" placeholder="请输入QQ"><img src="" alt=""></div>
      <div><em>*</em><span> 微信</span><input v-model="wechat" type="text" placeholder="请输入微信号"><img src="" alt=""></div>

      <!-- 图片上传 -->
      <!-- <div><em></em><span> 芝麻分截图</span>
        <div class="uploadDiv">
          <img v-if='!ant_credit_pic' class="uploadImg" src="/static/images/basicData/upload@2x.png" alt="">
          <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update" multiple/>
         
          <img v-if='ant_credit_pic' class="uploadImg" :src="ant_credit_pic" alt="">
        </div>
        <div v-if='ant_credit_pic' class="removeImg" @click="removeImg"><img src="/static/images/basicData/cancel@2x.png" alt=""></div>
      </div> -->
    </div>
    <!-- 选填信息 -->
    <div class="work_data">
      <!-- 图片上传 -->
      <div><em></em><span> 芝麻分截图</span>
        <div class="uploadDiv">
          <img v-if='!ant_credit_pic' class="uploadImg" src="/static/images/basicData/upload@2x.png" alt="">
          <input class="uploadInput" name="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="update" multiple v-if='clearShow'/>
         
          <img v-if='ant_credit_pic' class="uploadImg" :src="ant_credit_pic" alt="">
        </div>
        <div v-if='ant_credit_pic' class="removeImg" @click="removeImg"><img src="/static/images/basicData/cancel@2x.png" alt=""></div>
      </div>
      <div><em></em><span>公司名称</span><input v-model="company_name" type="text" placeholder="请输入公司名称"><img src="" alt=""></div>
      <div @click="actionSheet4()"><em></em><span>职业</span><input v-model="job" type="text" placeholder="请选择职业"><img width="8" src="/static/images/basicData/skip@2x.png" alt=""></div>
      <div @click="actionSheet5()"><em></em><span>月收入</span><input v-model="income_money" type="text" placeholder="请选择月收入"><img width="8" src="/static/images/basicData/skip@2x.png" alt=""></div>
    </div>
    <div class="button" @click="achieve()">完成</div>
    <!-- 教育程度 -->
    <mt-actionsheet
      :actions="actions1"
      v-model="sheetVisible1">
    </mt-actionsheet>
    <!-- 婚姻状况 -->
    <mt-actionsheet
      :actions="actions2"
      v-model="sheetVisible2">
    </mt-actionsheet>
    
    <!-- 职业 -->
    <mt-actionsheet
      :actions="actions4"
      v-model="sheetVisible4">
    </mt-actionsheet>
    <!-- 月收入 -->
    <mt-actionsheet
      :actions="actions5"
      v-model="sheetVisible5">
    </mt-actionsheet>
    <!-- 弹出框 -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" style="border-radius:5px;">
      <slot>
        <div class="popup">
          <div class="popup_title">温馨提醒</div>
          <div>{{popupName}}</div>
          <div @click="sure()">确定</div>
         </div>
      </slot>
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
    <!-- 选择城市弹出框 -->
    <mt-popup style="width:100%;" v-model="popupVisible2" popup-transition="popup-fade" position="bottom">
      <slot>
        <div>
          <mt-button @click.native="handleClick">取消</mt-button>
          <mt-button @click.native="sureClick">确定</mt-button>
        </div>
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      </slot>
    </mt-popup>
  </div>
</template>
<script>
import axios from 'axios'
import myaddress from '../assets/pca'
  export default {
    data() {
      return {
        real_name:'',//真实姓名
        id_card:'',//身份证
        marry:'',//婚姻状态
        qq:'',//
        wechat:'',//
        ant_credit_pic:'',//蚂蚁信用分截图
        qualifications:'',//学历
        job:'',//职业
        company_name:'',//公司名字
        income_money:'',//月收入
        city:'',//所在城市
        popupName:'',
        popupName3:'',
        time:'',
        clearShow:true,
        popupVisible:false,
        popupVisible2:false,
        popupVisible3:false,
        actions1:[ //教育程度
          {
            name:'硕士及以上',
            method:this.getEducation
          },{
            name:'本科',
            method:this.getEducation
          },{
            name:'大专',
            method:this.getEducation
          },{
            name:'高中/中专',
            method:this.getEducation
          },{
            name:'初中及以下',
            method:this.getEducation
          }
        ],
        actions2:[ //婚姻状况
          {
            name:'未婚',
            method:this.getMarriage
          },{
            name:'已婚',
            method:this.getMarriage
          }
        ],
        actions4:[ //职业
          {
            name:'无工作',
            method:this.getProfession
          },{
            name:'程序员',
            method:this.getProfession
          },{
            name:'设计师',
            method:this.getProfession
          },{
            name:'教师',
            method:this.getProfession
          },{
            name:'服务员',
            method:this.getProfession
          },{
            name:'其他',
            method:this.getProfession
          }
        ],
        actions5:[ //收入
          {
            name:'小于1000元',
            method:this.getIncome
          },{
            name:'1001-2000元',
            method:this.getIncome
          },{
            name:'2001-4000元',
            method:this.getIncome
          },{
            name:'4001-6000元',
            method:this.getIncome
          },{
            name:'6001-10000元',
            method:this.getIncome
          },{
            name:'10000元以上',
            method:this.getIncome
          }
        ],
        sheetVisible1: false,
        sheetVisible2: false,
        sheetVisible4: false,
        sheetVisible5: false,
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,    
            values: Object.keys(myaddress),  //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince:'省',
        myAddressCity:'市',
        myAddresscounty:'区/县',
      }
    },
    methods: {
      // 教育程度
      actionSheet1() {
        this.sheetVisible1 = true
      },
      getEducation(index) {
        this.qualifications = index.name
      },
      //婚姻状况
      actionSheet2() {
        this.sheetVisible2 = true
      },
      getMarriage(index) {
        this.marry = index.name
      },
      actionSheet3(){
        this.popupVisible2 = true;
      },
      //职业
      actionSheet4() {
        this.sheetVisible4 = true
      },
      getProfession (index) {
        this.job = index.name
      },
      //月收入
      actionSheet5() {
        this.sheetVisible5 = true
      },
      getIncome (index) {
        this.income_money  = index.name
      },

      //对身份证校验
      checkNum(){
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/;
        if(!reg.test(this.id_card)){
          this.popupVisible= true;
          this.popupName="请输入正确的身份证号码";
        }
      },
      // checkWeChat(){//对微信号验证
      //   let reg=/^[a-zA-Z\d_]{5,}$/;
      //   if (!reg.test(this.wechat)){
      //     this.popupVisible= true;
      //     this.popupName="请输入正确的微信号";
      //   }    
      // },
      checkQQ(){//对QQ号验证
        let reg=/^[1-9][0-9]{5,14}$/;
        if (!reg.test(this.qq)){
          this.popupVisible= true;
          this.popupName="请输入正确的QQ号";
        }    
      },
      imgTime(){//图片定时器
        let s = 35;
        this.time = setInterval(() =>{
          s -= 1;
          s <= 0 ? ( this.popupVisible3= true,this.popupName3="上传图片过大，请耐心等待",clearInterval(this.time),this.$indicator.close()) : console.log(s)
        },1000)
      },
      //上传图片事件
      update (e) {   // 上传照片
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
          if (res.data.error_code === 200) {
            _this.ant_credit_pic = res.data.url
            console.log( _this.ant_credit_pic)
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
      update2 (e) {   // 用base64格式上传照片
        let _this = this;
        let imgFile = new FileReader();  
        let file = e.target.files[0]
        imgFile.readAsDataURL(file);  
        /* eslint-disable no-undef */
        imgFile.onload = function (){
          let param = this.result; //base64数据    
          console.log(param); 
          // 添加请求头
          axios.post('/util/uploadTicketFile', param).then(res => {
            console.log("res.data",res.data)
            alert(res.data)
            if (res.data.error_code === 200) {
              _this.ant_credit_pic = res.data.url
              console.log( _this.ant_credit_pic)
            }
          })
        }
        
      },
      //重新上传图片
      removeImg(){
        this.ant_credit_pic = ''
      },
      //信息提交
      achieve() {
        this.checkNum();
        // this.checkWeChat();
        this.checkQQ();
        if (this.real_name && this.id_card && this.marry && this.qq && this.wechat && this.qualifications && this.city && !this.popupVisible) {
          console.log("信息提交")
          this.$http({
            url: '/certification/base_info',
            method: 'post',
            data: {
              num:sessionStorage.getItem('userId'),
              real_name:this.real_name,//真实姓名
              id_card:this.id_card,//身份证
              marry:this.marry,//婚姻状态
              qq:this.qq,//
              wechat:this.wechat,//
              ant_credit_pic:this.ant_credit_pic,//蚂蚁信用分截图
              qualifications:this.qualifications,//学历
              job:this.job,//职业
              company_name:this.company_name,//公司名字
              income_money:this.income_money,//月收入
              city:this.city,//所在城市
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
        if (!this.real_name || !this.id_card || !this.marry || !this.qq || !this.wechat || !this.qualifications || !this.city) {
          this.popupVisible= true;
          this.popupName="信息未输入完整";
        }

      },
      // 确定按钮
      sure() {
        this.popupVisible = false;
      },
      sure3() {
        this.popupVisible3 = false;
        this.$indicator.open('加载中...');
      },
      handleClick(){
        this.popupVisible2 = false;
      },
      sureClick(){
        this.city = this.myAddressProvince + this.myAddressCity +this.myAddresscounty;
        this.popupVisible2 = false;
      },
      onMyAddressChange(picker, values) {
       if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }
      },

    },
    mounted(){
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0   
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
      left: px2rem(35px);
    }
    span{
      position: absolute;
      top:px2rem(9px);
      left: px2rem(55px);
    }
  }
  .identity_data,.contact_way,.work_data {
    background:#FFFFFF;
    font-size: px2rem(15px);
    color:#333333;
    div {
      width:px2rem(358px);
      height:px2rem(50px);
      line-height: px2rem(50px);
      font-size: px2rem(15px);
      margin-left:px2rem(5px);
      border-bottom:px2rem(1px) solid #E6E6E6;
      position: relative;
      em {
        color:#FE5F1B;
        margin-left: px2rem(16px);
        margin-right: px2rem(4px);
      }
      span {
        width:px2rem(90px);
        display: inline-block;
        color:#333333;
      }
      input {
        margin-left: px2rem(px);
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
  .contact_way{
    margin-top:px2rem(10px);
  }
  .work_data{
    div:first-child{
      height:px2rem(75px);
      color:#333333;
      .uploadDiv{
        position: absolute;
        top:px2rem(8px);
        left:px2rem(122px);
        width:px2rem(60px);
        height:px2rem(60px);
        overflow:hidden;
        border:px2rem(1px) dashed #B3B3B3;
        border-radius: px2rem(4px);
        .uploadImg {
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%);
          max-width:100%;
          max-height: px2rem(60px);
        }
        .uploadInput{
          margin:0 auto;
          height: 100%;
          position: absolute;
          top:px2rem(15px);
          left:0;
          cursor:pointer;
          opacity: 0;
        }
      }
      .removeImg{
        width:px2rem(45px);
        height:px2rem(45px);
        line-height: px2rem(30px);
        text-align: center;
        color:white;
        position: absolute;
        top:px2rem(-13px);
        left:px2rem(160px);
        img{
          width:px2rem(25px);
          position: absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
        }
      }
    }
  }
  .work_data{
    margin-top:px2rem(10px);
    div{
      span{
        width:px2rem(95px);
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
  //城市选择
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
</style>
