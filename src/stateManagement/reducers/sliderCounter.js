import { SET_SLIDECOUNTER_FAIL, SET_SLIDECOUNTER_REQUEST, SET_SLIDECOUNTER_SUCCESS } from "../constants/slideCounter"

export const slideCounterReducer = (state={slideCounterInfo:{status:true,position:"top"}},{type,payload}) => {
	switch (type) {
		case SET_SLIDECOUNTER_REQUEST : return { slideCounterInfo: "",isloading:true}
		case SET_SLIDECOUNTER_SUCCESS : return{slideCounterInfo:payload,isloading:false}
		case SET_SLIDECOUNTER_FAIL : return{slideError:payload,isloading:false}
		default:
			return state
	}
}