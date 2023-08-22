import { LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, SET_USER_FAIL, SET_USER_REQUEST, SET_USER_SUCCESS } from "../constants/userConstant"

export const setUserAction = (info) => async(dispatch) => {
    try {
        dispatch({ type:SET_USER_REQUEST})
		localStorage.setItem("logedUser",JSON.stringify(info))
        dispatch({ type: SET_USER_SUCCESS, payload:info })
    } catch (error) {
     dispatch({ type:SET_USER_FAIL,payload:error})
    }
} 
export const logOutAction = () => async(dispatch) => {
    try {
		localStorage.removeItem("logedUser")
        dispatch({ type: LOGOUT_USER_SUCCESS,})
    } catch (error) {
     dispatch({ type:LOGOUT_USER_FAIL,payload:error})
     console.info(error)
    }
} 