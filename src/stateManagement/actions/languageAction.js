import axios from "axios"
import { GET_TRANSLATION_FAIL, GET_TRANSLATION_REQUEST, GET_TRANSLATION_SUCCESS, SET_LANGUAGE_FAIL, SET_LANGUAGE_REQUEST, SET_LANGUAGE_SUCCESS } from "../constants/languageConstant"

export const setLanguageAction= (language) => async(dispatch) => {
    try {
        dispatch({ type:SET_LANGUAGE_REQUEST})
        dispatch({ type: SET_LANGUAGE_SUCCESS,payload:{selectedLanguage:language,detectLanguage:"en"} })
    } catch (error) {
     dispatch({ type:SET_LANGUAGE_FAIL,payload:error})
    }
} 

export const getLanguageResultAction = (textInput) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_TRANSLATION_REQUEST });
      const { selectedLanguage } = getState().lanuage;
      let params = {
        q: textInput,
        source: "en",
        target: selectedLanguage.selectedLanguage,
      };
      console.info(selectedLanguage);
      if (selectedLanguage.selectedLanguage) {
        const { data } = await axios.post(
          `https://libretranslate.de/translate`,
          params
        );
        console.info(data)
        if(data.translatedText){
          dispatch({ type: GET_TRANSLATION_SUCCESS, payload: data.translatedText });
        }
      }
    } catch (error) {
        console.info(error)
      dispatch({ type: GET_TRANSLATION_FAIL, payload: error });
    }
  };