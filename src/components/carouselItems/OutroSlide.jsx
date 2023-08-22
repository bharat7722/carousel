import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import wowlywaves from "../assets/images/wave_white.png";
import template from '../assets/images/templates/template1.png'
import template2 from '../assets/images/templates/template2.png'
import template3 from '../assets/images/templates/template3.png'
import template4 from '../assets/images/templates/template4.png'
import template5 from '../assets/images/templates/template5.png'
import template6 from '../assets/images/templates/template6.png'
import template7 from '../assets/images/templates/template7.png'
import template8 from '../assets/images/templates/template8.png'
import template9 from '../assets/images/templates/template9.png'
import template10 from '../assets/images/templates/template10.png'
import { useTranslation } from "react-i18next";
import TextArea from "../TextArea";
import Input from "../Input";
import Button from "../Button";
import StyledSentence from "../RenderTitle";
const OutroSlide = (props) => {
  const inputRef = useRef(null);
  const [outroInputValues, setOutroInputValues] = useState({
    subtitle: true,
    subTitleValue: "And you will read this last",
    title: true,
    titleValue: "You will read <span>this</span> first",
    description: true,
    descriptionValue: "Then you will read this.",
    callToAction: true,
    callToActionValue: "",
  });
  const [background, setbackground] = useState("")
  const { brandingType } = useSelector((state) => state.branding);
  const { personalInfo } = useSelector((state) => state.brandingPersonal);
  const { backgroundElement } = useSelector((state) => state.background);
  const { textSize } = useSelector((state) => state.text)
  const { alignment } = useSelector((state) => state.textAlign)
  const { fontFamily } = useSelector((state) => state.fonts)
  const { companyInfo } = useSelector((state) => state.brandingCompany)
  const { colorPalate } = useSelector((state) => state.colorPalateReducers)
  const { carouselfInfo } = useSelector((state) => state.carouselType)

  const { t } = useTranslation()
  const [title, settitle] = useState({
    status: true,
    value: "And you will read this first",
  });

  const [subTitle, setsubTitle] = useState({
    status: true,
    value: "You will read <i>this</i> last",
  });

  const [description, setdescription] = useState({
    status: true,
    value: "Then you will read this.",
  });

  const [callAction, setcallAction] = useState({
    status: true,
    value: "Call to Action",
  });

  const handleItalicInsertion = () => {
    const inputElement = inputRef.current;
    const startPos = inputElement.selectionStart;
    const endPos = inputElement.selectionEnd;
    const newText = "<i></i>";

    const updatedText =
      outroInputValues.titleValue.substring(0, startPos) +
      newText +
      outroInputValues.titleValue.substring(endPos);
    setOutroInputValues({ ...outroInputValues, titleValue: updatedText });
  };

  const handleColorInsertion = () => {
    const inputElement = inputRef.current;
    const startPos = inputElement.selectionStart;
    const endPos = inputElement.selectionEnd;
    const newText = "<c></c>";

    const updatedText =
      outroInputValues.titleValue.substring(0, startPos) +
      newText +
      outroInputValues.titleValue.substring(endPos);
    setOutroInputValues({ ...outroInputValues, titleValue: updatedText });
  };


  const backgroundImages = {
    lines: template6,
    bauhaus: template5,
    blobs: template,
    rombos:template2,
    radar: template7,
    topo: template10,
    dots:template9,
    wave: wowlywaves,
    arrows: template4,
    noise: template3,
    dots: template8,
  };

  const setBackground = () => {
    setbackground(backgroundImages[backgroundElement.element] || template);
  };

  useEffect(() => {
    setBackground()
  }, [backgroundElement])

  useEffect(() => {
    settitle({ ...title, value: t('outro-slide-title') })
    setdescription({ ...description, value: t('outro-slide-desc') })
    setsubTitle({ ...subTitle, value: t('outro-slide-subtitle') })
    setcallAction({ ...callAction, value: t('calltoaction') })
  }, [t])
  const parts = title.value.split(/<c>|<\/c>/)
  return (
    <div className="slide-wrapper">
      <div
        className={`slide_container intro-slide ${alignment === "center" ? "text-center"
          : "text-start"}
         ${carouselfInfo.type === "igStories" || carouselfInfo.type === "tikTok"
            ? "slide_container--lg"
            : ""
          }`
        }
        style={{
          backgroundColor: colorPalate?.first,
        }}
      >
        <div
          className="design_element"
          style={{
            backgroundImage: backgroundElement?.status ? `url(${background})` : "",
          }}
        ></div>
        {brandingType === "company" && (
          <div className="company__details-wrapper">
            <div className="logo">
              <img
                src={companyInfo?.logo}
                alt="logo"
                className="img-fluid"
              />
            </div>
            {
              companyInfo?.isWebsite && <div className="website__name" style={{ color: "#fff" }}>
                {companyInfo?.website}
              </div>
            }
          </div>
        )}
        <div className="slide-content intro-content text-white">
          {subTitle?.status && (
            <div className="subtitle" style={{
              color: colorPalate.third,
              fontFamily: fontFamily
            }}>
              {subTitle?.value}
            </div>
          )}
          {title?.status && (
            <div
              className="title"
              style={{ color: colorPalate.third, fontSize: "56px", fontFamily: fontFamily }}
            >
              <StyledSentence sentence={title.value} color={colorPalate.second}/>
            </div>
          )}
          {description?.status && (
            <div
              className="text"
              style={{ color: colorPalate.third, fontSize: "22px", fontFamily: fontFamily }}
            >
              {description?.value}
            </div>
          )}
          {callAction?.status && (
            <div className="call_to_action--button">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: colorPalate.second, color: colorPalate.first }}
              >
                {callAction?.value}
              </button>
            </div>
          )}
        </div>
        {brandingType === "personal" && (
          <div className="contentSlide__bottom-data d-flex align-items-center justify-content-between gap-2">
            <div className="branding_data d-flex align-items-center gap-2">
              {
                personalInfo?.isHeadShoot && <img
                  src={personalInfo?.headShoot}
                  alt="branding"
                  className="rounded-circle"
                />
              }
              <div>
                {
                  personalInfo?.isName && <h6 className="m-0" style={{ color: colorPalate.third }}>{personalInfo?.name}</h6>
                }
                {
                  personalInfo?.isHandle && <p className="m-0 fs-xs" style={{ color: colorPalate.third }}>{personalInfo?.handle}</p>
                }
              </div>
            </div>
          </div>
        )}
      </div>
      {
        props.download && <div className="slide_individual_settings">
          <div className="top__buttons-wrapper">
            <Button
              type="button"
              className="btn btn-secondary w-100"
              onClick={props.delete}
              name={<><FeatherIcon icon="trash-2" size={14} /> {t('delete')}</>}
            />
          </div>
          <div className="configure-title">{t('outro-slide-setting')}</div>
          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="subtitle"
                name="subtitle"
                checked={subTitle.status}
                handleChange={() =>
                  setsubTitle({
                    ...subTitle,
                    status: !subTitle.status,
                  })
                }
              />
              <label className="form-check-label" htmlFor="subtitle">
                {t('subtitle')}
              </label>
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="subTitleValue"
                id="subTitleValue"
                className="fs-sm"
                value={subTitle.value}
                handleChange={(e) =>
                  setsubTitle({
                    ...subTitle,
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="title"
                name="title"
                checked={title.status}
                handleChange={() =>
                  settitle({
                    ...title,
                    status: !title.status,
                  })
                }
              />
              <label className="form-check-label" htmlFor="title">
                {t('title')}
              </label>
            </div>
            <div className="form-group">
              <div className="mxboxarea">
                <div className="setting__box  hasButtons">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleItalicInsertion}
                  >
                    <FeatherIcon icon="code" size={16} strokeWidth={3} />
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleColorInsertion}
                  >
                    <FeatherIcon icon="droplet" size={16} strokeWidth={3} />
                  </button>
                </div>
                <TextArea
                  name="titleValue"
                  id="titleValue"
                  className="fs-sm"
                  inputRef={inputRef}
                  value={title.value}
                  handleChange={(e) =>
                    settitle({
                      ...title,
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="description"
                name="description"
                checked={description.status}
                handleChange={() =>
                  setdescription({
                    ...description,
                    status: !description.status,
                  })
                }
              />
              <label className="form-check-label" htmlFor="title">
                {t('description')}
              </label>
            </div>
            <div className="form-group">
              <TextArea
                name="descriptionValue"
                id="descriptionValue"
                className="fs-sm"
                value={outroInputValues.descriptionValue}
                handleChange={(e) =>
                  setdescription({
                    ...description,
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="callToAction"
                name="callToAction"
                checked={callAction.status}
                handleChange={() =>
                  setcallAction({
                    ...callAction,
                    status: !callAction.status,
                  })
                }
              />
              <label className="form-check-label" style={{ color: colorPalate.first }} htmlFor="callToAction">
                {t('calltoaction')}
              </label>
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="callToActionValue"
                id="callToActionValue"
                className="fs-sm"
                placeholder="e.g. 'Visit us at www..'"
                value={callAction.value}
                handleChange={(e) =>
                  setcallAction({
                    ...callAction,
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default OutroSlide;
