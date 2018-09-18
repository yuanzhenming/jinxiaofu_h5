import getters from './getters'

const state={
	footer:true,
	base:true,
	contact:true,
	certi:true,
	bank:true,
	mobile:true,
	phone:true,
	consumer:true,
	borCer:true,
};
const mutations={
	showFooter(state){
		state.footer=true;
	},
	hideFooter(state){
		state.footer=false;
	},
	showBase(state){//基础信息
		state.base=true;
	},
	hideBase(state){
		state.base=false;
	},
	showContact(state){//紧急联系人
		state.contact=true;
	},
	hideContact(state){
		state.contact=false;
	},
	showCerti(state){//证件识别
		state.certi=true;
	},
	hideCerti(state){
		state.certi=false;
	},
	showBank(state){//银行卡
		state.bank=true;
	},
	hideBank(state){
		state.bank=false;
	},
	showMobile(state){//手机运营商
		state.mobile=true;
	},
	hideMobile(state){
		state.mobile=false;
	},
	showPhone(state){//手机通讯录
		state.phone=true;
	},
	hidePhone(state){
		state.phone=false;
	},
	showConsumer(state){//四大借条
		state.consumer=true;
	},
	hideConsumer(state){
		state.consumer=false;
	},
	showBorCer(state){//借贷认证
		state.borCer=true;
	},
	hideBorCer(state){
		state.borCer=false;
	},

	
};
export default{
	state,
	mutations,
	getters
}
