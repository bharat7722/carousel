import { SET_TEXTALIGN_FAIL, SET_TEXTALIGN_REQUEST, SET_TEXTALIGN_SUCCESS, SET_TEXTSIZE_FAIL, SET_TEXTSIZE_REQUEST, SET_TEXTSIZE_SUCCESS } from "../constants/textSize";

export const addTextSizeAction= (textSizeData) => async(dispatch) => {
    try {
        dispatch({ type:SET_TEXTSIZE_REQUEST})
		console.log(textSizeData)
        dispatch({ type: SET_TEXTSIZE_SUCCESS, payload:textSizeData })
    } catch (error) {
     dispatch({ type:SET_TEXTSIZE_FAIL,payload:error})
    }
} 

export const setTextAlignmentAction= (align) => async(dispatch) => {
    try {
        dispatch({ type:SET_TEXTALIGN_REQUEST})

        dispatch({ type: SET_TEXTALIGN_SUCCESS, payload:align })
    } catch (error) {
     dispatch({ type:SET_TEXTALIGN_FAIL,payload:error})
    }
} 