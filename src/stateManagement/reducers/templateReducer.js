import { SET_SINGLESILDETEMPLATE_FAIL, SET_SINGLESILDETEMPLATE_REQUEST, SET_SINGLESILDETEMPLATE_SUCCESS, SET_TEMPLATE_FAIL, SET_TEMPLATE_REQUEST, SET_TEMPLATE_SUCCESS } from "../constants/template"

export const templateReducer = (state={templateNo:"1"},{type,payload}) => {
	switch (type) {
		case SET_TEMPLATE_REQUEST: return { templateNo:"",isloading:true}
		case SET_TEMPLATE_SUCCESS : return{templateNo:payload,isloading:false}
		case SET_TEMPLATE_FAIL : return{fontError:payload,isloading:false}
		default:
			return state
	}
}

export const singleSlideTemplateReducer = (state={templateNo:"1"},{type,payload}) => {
	switch (type) {
		case SET_SINGLESILDETEMPLATE_REQUEST: return { templateNo:"",isloading:true}
		case SET_SINGLESILDETEMPLATE_SUCCESS : return{templateNo:payload,isloading:false}
		case SET_SINGLESILDETEMPLATE_FAIL : return{templateNoError:payload,isloading:false}
		default:
			return state
	}
}