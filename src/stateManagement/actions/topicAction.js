import { SET_TOPIC_FAIL, SET_TOPIC_REQUEST, SET_TOPIC_SUCCESS } from "../constants/topicConstant"

export const setTopicAction = (topic) => async(dispatch) => {
    try {
        dispatch({ type:SET_TOPIC_REQUEST})
        dispatch({ type: SET_TOPIC_SUCCESS, payload:topic })
    } catch (error) {
     dispatch({ type:SET_TOPIC_FAIL,payload:error})
    }
} 