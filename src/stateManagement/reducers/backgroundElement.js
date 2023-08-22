import { SET_BACKGROUNDESIGNELEMENT_FAIL, SET_BACKGROUNDESIGNELEMENT_REQUEST, SET_BACKGROUNDESIGNELEMENT_SUCCESS } from "../constants/backgroundelement"

export const setBackgroundElementReducer = (state={backgroundElement:{element:"wave",status:true}},{type,payload}) => {
	switch (type) {
		case SET_BACKGROUNDESIGNELEMENT_REQUEST: return { backgroundElement: {},isloading:true}
		case SET_BACKGROUNDESIGNELEMENT_SUCCESS : return{backgroundElement:payload,isloading:false}
		case SET_BACKGROUNDESIGNELEMENT_FAIL : return{backgroundElementError:payload,isloading:false}
		default:
			return state
	}
}