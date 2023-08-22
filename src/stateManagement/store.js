import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { textAliginment, textSizeReducer } from "./reducers/textSizeReducer"
import { customeFontFamilyReducer, fontFamilyReducer, setCustomeFontFamilyReducer } from "./reducers/fontReducer"
import { getFontFamilyAction } from "./actions/fontAction"
import { singleSlideTemplateReducer, templateReducer } from "./reducers/templateReducer"
import { downloadFileReducer, downloadModalToggle } from "./reducers/downloadFileReducer"
import { colorPalateReducer } from "./reducers/themeReducer"
import { slideCounterReducer } from "./reducers/sliderCounter"
import { setCarouselTypeReducer, setSliderTypeReducer } from "./reducers/carouselType"
import { setBackgroundElementReducer } from "./reducers/backgroundElement"
import { setBrandingType, setCompanyReducer, setPersonalInfoReducer } from "./reducers/brandingPersonal"
import { userReducer } from "./reducers/userReducer"
import { getLanguageResultReducer, setLanguageReducer } from "./reducers/languageReducer"
import { topicReducer } from "./reducers/topicReducer"
const rootReducer = combineReducers({
	text:textSizeReducer,
	fonts:fontFamilyReducer,
	font:getFontFamilyAction,
	template:templateReducer,
	singleTemplate:singleSlideTemplateReducer,
	download:downloadFileReducer,
	colorPalateReducers:colorPalateReducer,
	slider:slideCounterReducer,
	carouselType:setCarouselTypeReducer,
	sliderT:setSliderTypeReducer,
	donwloadToggle:downloadModalToggle,
	textAlign:textAliginment,
	background:setBackgroundElementReducer,
	brandingPersonal:setPersonalInfoReducer,
	brandingCompany:setCompanyReducer,
	branding:setBrandingType,
	custom:customeFontFamilyReducer,
	customeFont:setCustomeFontFamilyReducer,
	userInfo:userReducer,
	lanuage:setLanguageReducer,
	translated:getLanguageResultReducer,
	topics:topicReducer
})
 
const userInfoFromLocalStore = localStorage.getItem("logedUser")
? JSON.parse(localStorage.getItem("logedUser"))  
: undefined;

const initial = {
	userInfo:{
	user:userInfoFromLocalStore
}
} 

const store = createStore(rootReducer, initial, composeWithDevTools(applyMiddleware(thunk)))

export default store;