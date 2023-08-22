import { GET_TRANSLATION_FAIL, GET_TRANSLATION_REQUEST, GET_TRANSLATION_SUCCESS, SET_LANGUAGE_FAIL, SET_LANGUAGE_REQUEST, SET_LANGUAGE_SUCCESS } from "../constants/languageConstant"

export const setLanguageReducer = (state={selectedLanguage:{selectedLanguage:"",detectLanguage:"en"}},{type,payload}) => {
	switch (type) {
		case SET_LANGUAGE_REQUEST : return { selectedLanguage: "",isloading:true}
		case SET_LANGUAGE_SUCCESS : return{selectedLanguage:payload,isloading:false}
		case SET_LANGUAGE_FAIL : return{selectedLanguageError:payload,isloading:false}
		default:
			return state
	}
}

export const getLanguageResultReducer = (state={output:""},{type,payload}) => {
	switch (type) {
		case GET_TRANSLATION_REQUEST : return { output: "",isloading:true}
		case GET_TRANSLATION_SUCCESS : return{output:payload,isloading:false}
		case GET_TRANSLATION_FAIL : return{outputError:payload,isloading:false}
		default:
			return state
	}
}