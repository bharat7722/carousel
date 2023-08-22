import { DOWNLOAD_FILE_FAIL, DOWNLOAD_FILE_REQUEST, DOWNLOAD_FILE_SUCCESS, DOWNLOAD_TOGGLE_FAIL, DOWNLOAD_TOGGLE_REQUEST, DOWNLOAD_TOGGLE_SUCCESS } from "../constants/DownloadFile"

export const downloadFileReducer = (state={elementRef:{}},{type,payload}) => {
	switch (type) {
		case DOWNLOAD_FILE_REQUEST: return { elementRef: {},isloading:true}
		case DOWNLOAD_FILE_SUCCESS : return{elementRef:payload,isloading:false}
		case DOWNLOAD_FILE_FAIL : return{elementRefError:payload,isloading:false}
		default:
			return state
	}
}

export const downloadModalToggle = (state={downloadModal:{show:false,hide:true}},{type,payload}) => {
	switch (type) {
		     case DOWNLOAD_TOGGLE_REQUEST: 
		return { downloadModal: {},isloading:true}
		     case DOWNLOAD_TOGGLE_SUCCESS : 
		return{downloadModal:payload,isloading:false}
		     case DOWNLOAD_TOGGLE_FAIL : 
		return{downloadModalfail:payload,isloading:false}
		default:
			return state
	}
}