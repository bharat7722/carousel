import { SET_SINGLESILDETEMPLATE_FAIL, SET_SINGLESILDETEMPLATE_REQUEST, SET_SINGLESILDETEMPLATE_SUCCESS, SET_TEMPLATE_FAIL, SET_TEMPLATE_REQUEST, SET_TEMPLATE_SUCCESS } from "../constants/template"

export const setTemplateAction = (template) => async (dispatch) => {
	try {
		dispatch({ type: SET_TEMPLATE_REQUEST })
		
		dispatch({ type: SET_TEMPLATE_SUCCESS, payload: template })
	} catch (error) {
		dispatch({ type: SET_TEMPLATE_FAIL, payload: error })
	}
} 

export const setSingleSlideTemplateAction = (template) => async (dispatch) => {
	try {
		dispatch({ type: SET_SINGLESILDETEMPLATE_REQUEST })
		console.log(template)
		dispatch({ type: SET_SINGLESILDETEMPLATE_SUCCESS, payload: template })
	} catch (error) {
		dispatch({ type: SET_SINGLESILDETEMPLATE_FAIL, payload: error })
	}
} 