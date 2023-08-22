import { SET_COLORPALATE_FAIL, SET_COLORPALATE_REQUST, SET_COLORPALATE_SUCCESS } from "../constants/themeConstant"

export const colorPalateReducer = (state={colorPalate:{first:"#09213E",second:"#4A00E0",third:"#FFFFFF"}},{type,payload}) => {
	switch (type) {
		case SET_COLORPALATE_REQUST: return { colorPalate: {},isloading:true}
		case SET_COLORPALATE_SUCCESS : return{colorPalate:payload,isloading:false}
		case SET_COLORPALATE_FAIL : return{colorPalateError:payload,isloading:false}
		default:
			return state
	}
}