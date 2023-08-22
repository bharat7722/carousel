import { SET_BRANDINGTYPE_FAIL, SET_BRANDINGTYPE_REQUEST, SET_BRANDINGTYPE_SUCCESS, SET_COMPANY_INFO_FAIL, SET_COMPANY_INFO_REQUEST, SET_COMPANY_INFO_SUCCESS, SET_PERSONAL_INFO_FAIL, SET_PERSONAL_INFO_REQUEST, SET_PERSONAL_INFO_SUCCESS } from "../constants/brandingPersonal"

export const setBrandingPersonal = (info) => async (dispatch) => {
	try {
		dispatch({ type: SET_PERSONAL_INFO_REQUEST })
		dispatch({ type: SET_PERSONAL_INFO_SUCCESS, payload: info })
	} catch (error) {
		dispatch({ type: SET_PERSONAL_INFO_FAIL, payload: error })
	}
}

export const setBrandingComapny = (info) => async (dispatch) => {
	try {
		dispatch({ type: SET_COMPANY_INFO_REQUEST })
		dispatch({ type: SET_COMPANY_INFO_SUCCESS, payload: info })
	} catch (error) {
		dispatch({ type: SET_COMPANY_INFO_FAIL, payload: error })
	}
}

export const setBrandingTypeAction = (type) => async (dispatch) => {
	try {
		dispatch({ type: SET_BRANDINGTYPE_REQUEST })
		dispatch({ type: SET_BRANDINGTYPE_SUCCESS, payload: type })
	} catch (error) {
		dispatch({ type: SET_BRANDINGTYPE_FAIL, payload: error })
	}
}
