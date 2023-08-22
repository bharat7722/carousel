import { SET_TEXTALIGN_FAIL, SET_TEXTALIGN_REQUEST, SET_TEXTALIGN_SUCCESS, SET_TEXTSIZE_FAIL, SET_TEXTSIZE_REQUEST, SET_TEXTSIZE_SUCCESS } from "../constants/textSize"

export const textSizeReducer = (state={textSize:'small'},{type,payload}) => {
	switch (type) {
		case SET_TEXTSIZE_REQUEST: return { textSize: {},isloading:true}
		case SET_TEXTSIZE_SUCCESS : return{textSize:payload,isloading:false}
		case SET_TEXTSIZE_FAIL : return{textSizeError:payload,isloading:false}
		default:
			return state
	}
}

export const textAliginment = (state={alignment:"center"},{type,payload}) => {
	switch (type) {
		case SET_TEXTALIGN_REQUEST: return { alignment: {},isloading:true}
		case SET_TEXTALIGN_SUCCESS : return{alignment:payload,isloading:false}
		case SET_TEXTALIGN_FAIL : return{alignmentError:payload,isloading:false}
		default:
			return state
	}
}

