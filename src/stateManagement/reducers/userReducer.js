import { LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, SET_USER_FAIL, SET_USER_REQUEST, SET_USER_SUCCESS } from "../constants/userConstant"

export const userReducer = (state={user:""},{type,payload}) => {
	switch (type) {
		case SET_USER_REQUEST: return { user: {},isloading:true}
		case SET_USER_SUCCESS : return{user:payload,isloading:false}
		case SET_USER_FAIL : return{userError:payload,isloading:false}
		case LOGOUT_USER_SUCCESS: return {user:""}
		case LOGOUT_USER_FAIL: return {logoutError:payload}
		default:
			return state
	}
}