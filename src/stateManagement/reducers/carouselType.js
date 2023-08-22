import { SET_CAROUSELTYPE_FAIL, SET_CAROUSELTYPE_REQUEST, SET_CAROUSELTYPE_SUCCESS, SET_SLIDETYPE_FAIL, SET_SLIDETYPE_REQUEST, SET_SLIDETYPE_SUCCESS } from "../constants/carouselType"

export const setCarouselTypeReducer = (state = {
	carouselfInfo: {
		type: "IG Story",
		outroSlide: true,
		introSlide: true
	}
}, { type, payload }) => {
	switch (type) {
		case SET_CAROUSELTYPE_REQUEST: return { carouselfInfo: {},
		 isloading: true }
		case SET_CAROUSELTYPE_SUCCESS: return { carouselfInfo: payload,
			 isloading: false }
		case SET_CAROUSELTYPE_FAIL: return { carouselfInfoError: payload,
			 isloading: false }
		default:
			return state
	}
}

export const setSliderTypeReducer = (state = {slide:"multi"}, { type, payload }) => {
	switch (type) {
		case SET_SLIDETYPE_REQUEST: return { slide: {}, 
		isloading: true } 
		case SET_SLIDETYPE_SUCCESS: return { slide: payload,
			 isloading: false }
		case SET_SLIDETYPE_FAIL: return { slideTypeError: payload,
			 isloading: false }
		default:
			return state
	}
}