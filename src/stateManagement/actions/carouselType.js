import { SET_CAROUSELTYPE_FAIL, SET_CAROUSELTYPE_REQUEST, SET_CAROUSELTYPE_SUCCESS, SET_SLIDETYPE_FAIL, SET_SLIDETYPE_REQUEST, SET_SLIDETYPE_SUCCESS } from "../constants/carouselType"

export const setCarouselTypeAction = (data) => async(dispatch) => {
    try {
        dispatch({ type:SET_CAROUSELTYPE_REQUEST})
		
        dispatch({ type: SET_CAROUSELTYPE_SUCCESS,payload:data })
    } catch (error) {
     dispatch({ type:SET_CAROUSELTYPE_FAIL,payload:error})
    }
} 

export const setSlideTypeAction = (data) => async(dispatch) => {
    try {
        dispatch({ type:SET_SLIDETYPE_REQUEST})
		
        dispatch({ type: SET_SLIDETYPE_SUCCESS,payload:data })
    } catch (error) {
     dispatch({ type:SET_SLIDETYPE_FAIL,payload:error})
    }
} 