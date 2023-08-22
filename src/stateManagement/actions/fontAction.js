import { CUSTOM_FONT_FAIL, CUSTOM_FONT_REQUEST, CUSTOM_FONT_SUCCESS, GET_FONT_FAIL, GET_FONT_REQUEST, GET_FONT_SUCCESS, SET_CUSTOMFONT_FAIL, SET_CUSTOMFONT_REQUEST, SET_CUSTOMFONT_SUCCESS, SET_FONT_FAIL, SET_FONT_REQUEST, SET_FONT_SUCCESS } from "../constants/fontFamily"

export const addFontFamilyAction= (font) => async(dispatch) => {
    try {
        dispatch({ type:SET_FONT_REQUEST})
		console.log(font)
        dispatch({ type: SET_FONT_SUCCESS, payload:font })
    } catch (error) {
     dispatch({ type:SET_FONT_FAIL,payload:error})
    }
} 

export const addCustomeFontFamilyAction= (status) => async(dispatch) => {
    try {
        dispatch({ type:CUSTOM_FONT_REQUEST})

        dispatch({ type: CUSTOM_FONT_SUCCESS, payload:status })
    } catch (error) {
     dispatch({ type:CUSTOM_FONT_FAIL,payload:error})
    }
}  

export const setCustomeFontFamilyAction= (fonts) => async(dispatch) => {
    try {
        dispatch({ type:SET_CUSTOMFONT_REQUEST})

        dispatch({ type: SET_CUSTOMFONT_SUCCESS, payload:fonts })
    } catch (error) {
     dispatch({ type:SET_CUSTOMFONT_FAIL,payload:error})
    }
} 

export const getFontFamilyAction = () => async(dispatch,getState) => {
    try {
        dispatch({ type:GET_FONT_REQUEST})
		const { fontFamily } = getState().fonts;
		console.log(fontFamily)
        dispatch({ type: GET_FONT_SUCCESS, payload:fontFamily })
    } catch (error) {
     dispatch({ type:GET_FONT_FAIL,payload:error})
    }
} 