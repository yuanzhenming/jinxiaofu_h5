import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import registe from '@/components/registe'
import home from '@/components/home'
import certification from '@/components/certification'
import my from '@/components/my'
import bank from '@/components/bank'
import bill from '@/components/bill'
import newsCenter from '@/components/newsCenter'
import set from '@/components/set'
import revisePaswd from '@/components/revisePaswd'
import basicData from '@/components/basicData'
import emergencyContact from '@/components/emergencyContact'
import idDocument from '@/components/idDocument'
import mobileOperato from '@/components/mobileOperato'
import zServicePassword from '@/components/zServicePassword'
import answerProblem from '@/components/answerProblem'
import forgetPswdServer from '@/components/forgetPswdServer'
import certificationProcess from '@/components/certificationProcess'
import moreValidation from '@/components/moreValidation'
import unableVerifying from '@/components/unableVerifying'
import addBankCard from '@/components/addBankCard'
import creditCertification from '@/components/creditCertification'
import mobileAddressBook from '@/components/mobileAddressBook'
import accountInformation from '@/components/accountInformation'
import mobileValidate from '@/components/mobileValidate'
import mobileCompleted from '@/components/mobileCompleted'
import borrowPaper from '@/components/borrowPaper'
import noFond from '@/components/noFond'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
    path: '/home',
    name: 'home',
    component: home
  },{
    path: '/certification',
    name: 'certification',
    component:certification
  },{
    path: '/my',
    name: 'my',
    component: my,
  },{
    path: '/set',
    name: 'set',
    component: set
  },,{
    path: '/login',
    name: 'login',
    component: login
  },{
    path: '/registe',
    name: 'registe',
    component: registe
  },{
    path: '/bank',
    name: 'bank',
    component: bank
  },{
    path: '/bill',
    name: 'bill',
    component: bill
  },{
    path: '/newsCenter',
    name: 'newsCenter',
    component: newsCenter
  },{
    path: '/revisePaswd',
    name: 'revisePaswd',
    component: revisePaswd
  },{
    path: '/basicData',
    name: 'basicData',
    component: basicData
  },{
    path: '/emergencyContact',
    name: 'emergencyContact',
    component: emergencyContact
  },{
    path: '/idDocument',
    name: 'idDocument',
    component: idDocument
  },{
    path: '/mobileOperato',
    name: 'mobileOperato',
    component: mobileOperato
  },{
    path: '/zServicePassword',
    name: 'zServicePassword',
    component: zServicePassword
  },{
    path: '/answerProblem',
    name: 'answerProblem',
    component: answerProblem
  },{
    path: '/forgetPswdServer',
    name: 'forgetPswdServer',
    component: forgetPswdServer
  },{
    path: '/certificationProcess',
    name: 'certificationProcess',
    component: certificationProcess
  },{
    path: '/moreValidation',
    name: 'moreValidation',
    component: moreValidation
  },{
    path: '/unableVerifying',
    name: 'unableVerifying',
    component: unableVerifying
  },{
    path: '/addBankCard',
    name: 'addBankCard',
    component: addBankCard
  },{
    path: '/creditCertification',
    name: 'creditCertification',
    component: creditCertification
  },{
    path: '/mobileAddressBook',
    name: 'mobileAddressBook',
    component: mobileAddressBook
  },{
    path: '/accountInformation',
    name: 'accountInformation',
    component: accountInformation
  },{
    path: '/mobileValidate',
    name: 'mobileValidate',
    component: mobileValidate
  },{
    path: '/mobileCompleted',
    name: 'mobileCompleted',
    component: mobileCompleted
  },{
    path: '/borrowPaper',
    name: 'borrowPaper',
    component: borrowPaper
  },{
    path: '*',
    name: 'noFond',
    component: noFond
  }]
})
