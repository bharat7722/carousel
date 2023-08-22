import { SET_TOPIC_FAIL, SET_TOPIC_REQUEST, SET_TOPIC_SUCCESS } from "../constants/topicConstant"

export const topicReducer = (state={topic:""},{type,payload}) => {
	switch (type) {
		case SET_TOPIC_REQUEST: return { topic: {},isloading:true}
		case SET_TOPIC_SUCCESS : return{topic:payload,isloading:false}
		case SET_TOPIC_FAIL : return{topicError:payload,isloading:false}
		default:
			return state
	}
}