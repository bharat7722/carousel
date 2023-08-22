import { SET_COLORPALATE_FAIL, SET_COLORPALATE_REQUST, SET_COLORPALATE_SUCCESS } from "../constants/themeConstant";

export const setColorPalateAction = (palate) => async(dispatch) => {
    try {
        dispatch({ type:SET_COLORPALATE_REQUST})
        dispatch({ type: SET_COLORPALATE_SUCCESS, payload:palate })
    } catch (error) {
     dispatch({ type:SET_COLORPALATE_FAIL,payload:error})
    }
} 