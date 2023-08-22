import { DOWNLOAD_FILE_FAIL, DOWNLOAD_FILE_REQUEST, DOWNLOAD_FILE_SUCCESS, DOWNLOAD_TOGGLE_FAIL, DOWNLOAD_TOGGLE_REQUEST, DOWNLOAD_TOGGLE_SUCCESS } from "../constants/DownloadFile"

export const downloadFileAction= (element) => async(dispatch) => {
    try {
        dispatch({ type:DOWNLOAD_FILE_REQUEST})

        dispatch({ type: DOWNLOAD_FILE_SUCCESS,payload:element })
    } catch (error) {
     dispatch({ type:DOWNLOAD_FILE_FAIL,payload:error})
    }
} 

export const downloadToggleAction = (toggle) => async(dispatch) => {
    try {
        dispatch({ type:DOWNLOAD_TOGGLE_REQUEST})
        
        dispatch({ type: DOWNLOAD_TOGGLE_SUCCESS,payload:toggle })
    } catch (error) {
     dispatch({ type:DOWNLOAD_TOGGLE_FAIL,payload:error})
    }
} 