import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import placeholderImage from "../assets/images/placeholder.png";
import axios from "axios";
import Input from "../Input";
import { useSelector } from "react-redux";
import wowlywaves from "../assets/images/wave_white.png";
import template from "../assets/images/templates/template1.png";
import template2 from "../assets/images/templates/template2.png";
import template3 from "../assets/images/templates/template3.png";
import template4 from "../assets/images/templates/template4.png";
import template5 from "../assets/images/templates/template5.png";
import template6 from "../assets/images/templates/template6.png";
import template7 from "../assets/images/templates/template7.png";
import template8 from "../assets/images/templates/template8.png";
import template9 from "../assets/images/templates/template9.png";
import template10 from "../assets/images/templates/template10.png";
import socialIcons from "../assets/images/linkedIn.png"
import facebook from '../assets/images/icons/facebook.svg'
import instagram from '../assets/images/icons/instagram.svg'
import twitter from '../assets/images/icons/twitter.svg'
import { useTranslation } from "react-i18next";
import Button from "../Button";
import TextArea from "../TextArea";
const TwitterPostSlide = (props) => {

  const { t } = useTranslation();
  const [image, setimage] = useState(placeholderImage)
  const [file, setfile] = useState(null);
  const [background, setbackground] = useState("");
  const [isProfile, setisProfile] = useState(true)
  const [caroueslType, setcaroueslType] = useState('twitter')
  const [socialIcon, setsocialIcon] = useState(socialIcons)
  const [name, setname] = useState({
    value: "Bharat Bhople",
    status: true
  })
  const [userName, setuserName] = useState({
    value: "bharatpatil@7423",
    status: true
  })
  const [content, setcontent] = useState({
    value: "Be Confident engough to know what you bring to the table, and be willing to eat alone until you find the right table!!",
    status: true
  })
  const { backgroundElement } = useSelector((state) => state.background);
  const { colorPalate } = useSelector((state) => state.colorPalateReducers);
  const { textSize } = useSelector((state) => state.text);
  const { alignment } = useSelector((state) => state.textAlign);
  const { fontFamily } = useSelector((state) => state.fonts);
  const { carouselfInfo } = useSelector((state) => state.carouselType);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setfile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setimage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const backgroundImages = {
    lines: template6,
    bauhaus: template5,
    blobs: template,
    rombos: template2,
    radar: template7,
    topo: template10,
    dots: template9,
    wave: wowlywaves,
    arrows: template4,
    noise: template3,
    dots: template8,
  };

  const setBackground = () => {
    setbackground(backgroundImages[backgroundElement.element] || template);
  };

  const handleSocial = () => {
    switch (caroueslType) {
      case 'twitter':
        setsocialIcon(twitter);
        break;
      case 'facebook':
        setsocialIcon(facebook);
        break;
      case 'instagram':
        setsocialIcon(instagram);
        break;
      case 'linkedin':
        setsocialIcon(socialIcons);
        break;
      default:
        setsocialIcon(socialIcons); 
        break;
    }
  };

  useEffect(() => {
    handleSocial()
  }, [caroueslType])

  useEffect(() => {
    setBackground();
  }, [backgroundElement]);

  useEffect(() => {
    setcontent({...content,value:t('first-slide-content')})
  }, [t])
  
  return (
    <div className="slide-wrapper">
      <div
        className={`slide_container content-slide ${alignment === "center" ? "text-center" : "text-start"
          } ${carouselfInfo.type === "igStories" || carouselfInfo.type === "tikTok"
            ? "slide_container--lg"
            : ""
          }`}
        style={{
          backgroundColor: colorPalate.first,
        }}
        id="download"
      >
        <div
          className="design_element"
          style={{
            backgroundImage: backgroundElement?.status
              ? `url(${background})`
              : "",
            backgroundColor: colorPalate.first, // The First Color
          }}
        ></div>
        <div className="slide-content text-white">
          <div className="twitter__post--container">
            <div className="post__container--header">
              <div className="userDetails__box">
                {
                  isProfile && <div className="userIcon">
                    <img src={image} alt="" className="img-fluid" />
                  </div>
                }
                <div className="userText">
                  {
                    name.status && 
                    <div className="name" style={{ fontFamily: fontFamily }}>{name.value}</div>
                  }
                  {
                    userName.status &&
                     <div className="userName" style={{ fontFamily: fontFamily }}>{userName.value}</div>
                  }
                </div>
              </div>
              <div className="social__icon">
                <img
                  src={socialIcon}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="post__container--body">
              {
                content.status && <p className={`title description-font-${textSize}`} style={{ fontFamily: fontFamily, textAlign: alignment }}>
                  {content.value}
                </p>
              }
            </div>
          </div>
        </div>
      </div>
      {props.download ? (
        <div className={"slide_individual_settings"}>
          <div className="configure-title">{t("linkedin-slide-setting")}</div>
          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="description"
                name="description"
                checked={isProfile}
                handleChange={() => setisProfile((pre) => !pre)}
              />
              <label className="form-check-label" htmlFor="description">
                {t("user-image")}
              </label>
            </div>
            <div className="image__upload--box">
              <span>
                <FeatherIcon icon="upload" size={14} /> {t("upload-image")}
              </span>
              <Input
                type="file"
                id="uploadedImageValue"
                name="uploadedImageValue"
                accept="image/*"
                handleChange={handleFile}
              />
            </div>
          </div>
          <div className="configure-container">
            <div className="btn-group w-100 mt-3">
              {["twitter", "linkedin", "instagram", "facebook"].map((type) => (
                <React.Fragment key={type}>
                  <Input
                    type="radio"
                    name="carouselType"
                    id={type}
                    className="btn-check"
                    checked={caroueslType === type}
                    value={type}
                    handleChange={() => setcaroueslType(type)}
                  />
                  <label className="btn btn__radio-check" htmlFor={type}>
                    {t(type)}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch" 
                id="twitter-name"
                name="twitter-name"
                checked={name.status}
                handleChange={() => setname({ ...name, status: !name.status })}
              />
              <label className="form-check-label" htmlFor="twitter-name">
                {t("name")}
              </label>
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="user-name"
                id="user-name"
                className="fs-sm"
                placeholder="Enter Name"
                value={name.value}
                handleChange={(e) => setname({ ...name, value: e.target.value })}
              />
            </div>
          </div>

          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="user_name"
                name="user_name"
                checked={userName.status}
                handleChange={() => setuserName({ ...userName, status: !userName.status })}
              />

              <label className="form-check-label" htmlFor="user_name">
                {t("user-name")}
              </label>
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="twitter_user_name"
                id="twitter_user_name"
                className="fs-sm"
                placeholder="Enter Username"
                value={userName.value}
                handleChange={(e) => setuserName({ ...userName, value: e.target.value })}
              />
            </div>
          </div>

          <div className="configure-container">
            <div className="form-check form-switch">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="post-content"
                name="post-content"
                checked={content.status}
                handleChange={(e) => setcontent({ ...content, status: !content.status })}
              />
              <label className="form-check-label" htmlFor="post-content">
                {t("post-text")}
              </label>
            </div>
            <div className="form-group">
              <TextArea
                className="fs-sm"
                placeholder="Enter Post Text"
                name="content"
                id="content"
                value={content.value}
                handleChange={(e) => setcontent({ ...content, value: e.target.value })}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TwitterPostSlide;
