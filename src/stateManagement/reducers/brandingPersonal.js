import { SET_BRANDINGTYPE_FAIL, SET_BRANDINGTYPE_REQUEST, SET_BRANDINGTYPE_SUCCESS, SET_COMPANY_INFO_FAIL, SET_COMPANY_INFO_REQUEST, SET_COMPANY_INFO_SUCCESS, SET_PERSONAL_INFO_FAIL, SET_PERSONAL_INFO_REQUEST, SET_PERSONAL_INFO_SUCCESS } from "../constants/brandingPersonal"
import man from '../../components/assets/images/man.jpg'
import logo from '../../components/assets/icons/logo.jpg'
export const setPersonalInfoReducer = (state = {
	personalInfo: {
		name: "Bharat Patil",
		handle:"@bharatpatil",
		isName: true,
		isHandle: true,
		isHeadShoot:true,
		headShoot:man,
		isBranding:true,
		introOutroOnly:true
	}
}, { type, payload }) => {
	switch (type) {
		case SET_PERSONAL_INFO_REQUEST: return { personalInfo: {}, isloading: true }
		case SET_PERSONAL_INFO_SUCCESS: return { personalInfo: payload, isloading: false }
		case SET_PERSONAL_INFO_FAIL: return { personalInfoError: payload, isloading: false }
		default:
			return state
	}
}

export const setCompanyReducer = (state = {
	companyInfo: {
		isWebsite:true,
		website:"www.google.com",
		logo:logo,
		introOutroOnly:true
	}
}, { type, payload }) => {
	switch (type) {
		case SET_COMPANY_INFO_REQUEST: return { companyInfo: {}, isloading: true }
		case SET_COMPANY_INFO_SUCCESS: return { companyInfo: payload, isloading: false }
		case SET_COMPANY_INFO_FAIL: return { companyInfoError: payload, isloading: false }
		default:
			return state
	}
}

export const setBrandingType = (
	state = {brandingType:"personal"}, 
	{ type, payload }) => {
	switch (type) {
		case SET_BRANDINGTYPE_REQUEST: return { brandingType: {}, isloading: true }
		case SET_BRANDINGTYPE_SUCCESS: return { brandingType: payload, isloading: false }
		case SET_BRANDINGTYPE_FAIL: return { brandingTypeError: payload, isloading: false }
		default:
			return state
	}
}