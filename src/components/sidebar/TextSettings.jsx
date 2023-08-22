import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTextSizeAction, setTextAlignmentAction } from "../../stateManagement/actions/textSizeAction";
import { fontOptions } from "../assets/js/selectBoxOptions";
import { addFontFamilyAction } from "../../stateManagement/actions/fontAction";
import Input from "../Input";
import { useTranslation } from "react-i18next";

const TextSettings = () => {
	const dispatch = useDispatch();
	const { templateNo } = useSelector((state) => state.template);
	const { slide } = useSelector((state => state.sliderT))
	const { t } = useTranslation();
  
	const [textSize, setTextSize] = useState("small");
	const [textAlignment, setTextAlignment] = useState("center");
	const [textFonts, setTextFonts] = useState("combo1");
	
	const {templateNo:tn} = useSelector((state) => state.singleTemplate)
	useEffect(() => {
	  switch (templateNo) {
		case "1":
		  setTextSize("small");
		  setTextAlignment("center");
		  setTextFonts("combo1");
		  break;
		case "2":
		  setTextSize("medium");
		  setTextAlignment("center");
		  setTextFonts("combo2");
		  break;
		case "3":
		  setTextSize("big");
		  setTextAlignment("left");
		  setTextFonts("combo3");
		  break;
		default:
		  setTextSize("small");
		  setTextAlignment("center");
		  setTextFonts("combo1");
		  break;
	  }
	}, [templateNo]);
  
	const handleTextsize = (e) => {
	  dispatch(addTextSizeAction(textSize));
	};
  
	const handleTextAlign = (e) => {
	  dispatch(setTextAlignmentAction(textAlignment));
	};
  
	const handleFont = (e) => {
	  dispatch(addFontFamilyAction(textFonts));
	};

	useEffect(() => {
	  handleTextAlign()
	}, [textAlignment])

	useEffect(() => {
	handleTextsize()
	}, [textSize])
	
	useEffect(() => {
	 handleFont()
	}, [textFonts])
	

	return (
		<div>
			{
				tn === "3" && slide === "single" ? null : <div>
				<span className="fs-sm">{t('size')}</span>
				<div className="btn-group w-100">
					<Input type='radio' id='smallText' value="small" className="btn-check" checked={textSize === "small"} handleChange={(e) => {
						setTextSize(e.target.value);
					}} />
					<label className="btn btn__radio-check" htmlFor="smallText">
						{t('small')}
					</label>
					<Input type='radio' id='mediumText' value="medium" className="btn-check" checked={textSize === "medium"} handleChange={(e) => {
						setTextSize(e.target.value);
					}} />
					<label className="btn btn__radio-check" htmlFor="mediumText">
						{t('medium')}
					</label>
					<Input type='radio' id='bigText' value="big" className="btn-check" checked={textSize === "big"} handleChange={(e) => {
						setTextSize(e.target.value);
					}} />
					<label className="btn btn__radio-check" htmlFor="bigText">
						{t('big')}
					</label>
				</div>
				<p className="helper--text bottom">
					<FeatherIcon icon="alert-circle" size="13" />
					{t('intro-outro-adjust')}
				</p>
			</div>
			}
			{
				tn === "3" && slide === "single" ? null : <div className="mt-3">
				<span className="fs-sm">{t('alignment')}</span>
				<div className="btn-group w-100">
					<Input type='radio' id='leftAlign' value="left" name='textAlignment' className="btn-check" checked={textAlignment === "left"} handleChange={(e) => {
						setTextAlignment(e.target.value);
					}} />
					<label className="btn btn__radio-check" htmlFor="leftAlign">
						{t('left')}
					</label>
					<Input type='radio' id='centerAlign' value="center" name='textAlignment' className="btn-check" checked={textAlignment === "center"} handleChange={(e) => {
						setTextAlignment(e.target.value);
					}} />
					<label className="btn btn__radio-check" htmlFor="centerAlign">
						{t('center')}
					</label>
				</div>
			</div>
			}
			<div className="form-group mt-3">
				<label htmlFor="textFonts" className="fs-sm">
					{t('font')}
				</label>
				<select
					name="textFonts"
					id="textFonts"
					value={textFonts}
					onChange={(e) => setTextFonts(e.target.value)
					}
				>
					{
						fontOptions?.map((item, index) => {
							return <option value={item.value} key={index}>{item.label}</option>
						})
					}
				</select>
			</div>
		</div>
	);
};

export default TextSettings;
