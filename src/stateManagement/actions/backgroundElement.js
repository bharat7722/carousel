import { SET_BACKGROUNDESIGNELEMENT_FAIL, SET_BACKGROUNDESIGNELEMENT_REQUEST, SET_BACKGROUNDESIGNELEMENT_SUCCESS } from "../constants/backgroundelement"

export const setBackgroundElement = (element) => async(dispatch) => {
try {
	dispatch({type:SET_BACKGROUNDESIGNELEMENT_REQUEST})
	dispatch({type:SET_BACKGROUNDESIGNELEMENT_SUCCESS,payload:element})
} catch (error) {
	dispatch({type:SET_BACKGROUNDESIGNELEMENT_FAIL,payload:error})
}
}