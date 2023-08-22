import { SET_SLIDECOUNTER_FAIL, SET_SLIDECOUNTER_REQUEST, SET_SLIDECOUNTER_SUCCESS } from "../constants/slideCounter"

export const setSlideCounterAction = (info) => async(dispatch) => {
    try {
        dispatch({ type:SET_SLIDECOUNTER_REQUEST})
        dispatch({ type: SET_SLIDECOUNTER_SUCCESS, payload:info })
    } catch (error) {
     dispatch({ type:SET_SLIDECOUNTER_FAIL,payload:error})
    }
} 