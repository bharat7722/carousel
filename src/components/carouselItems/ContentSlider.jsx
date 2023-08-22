import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import placeholderImage from "../assets/images/placeholder.png";
import axios from "axios";
import Input from "../Input";
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
import Button from "../Button";
import TextArea from "../TextArea";
import StyledSentence from "../RenderTitle";
const ContentSlide = (props) => {
  const [slideSettings, setSlideSettings] = useState({
    type: "textOnly",
    title: true,
    titleValue: "Amazing <c> catchy </c> title goes here ",
    description: true,
    descriptionValue:
      "This text is reserved for a message that will leave viewers you wanting more.",
    imageSearchValue: "",
    uploadedImageValue: "",
    scaleImage: true,
  });
  const [slideType, setslideType] = useState("textOnly");
  const { t } = useTranslation()
  const [image, setimage] = useState(placeholderImage);
  const [file, setfile] = useState(null);
  const { slideCounterInfo } = useSelector((state) => state.slider);
  const [searchTerm, setsearchTerm] = useState("");
  const [images, setImages] = useState([])
  const [background, setbackground] = useState("");

  const { backgroundElement } = useSelector((state) => state.background);
  const { colorPalate } = useSelector((state) => state.colorPalateReducers)
  const { textSize } = useSelector((state) => state.text)
  const { alignment } = useSelector((state) => state.textAlign)
  const { fontFamily } = useSelector((state) => state.fonts)
  const { brandingType } = useSelector((state) => state.branding);
  const { personalInfo } = useSelector((state) => state.brandingPersonal);
  const { companyInfo } = useSelector((state) => state.brandingCompany)
  const { carouselfInfo } = useSelector((state) => state.carouselType)

  const fetchImages = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchTerm}`, {
        headers: {
          'Authorization': 'RBiLiPZ7ihVFrrt1QKIZV8khN5YST0yMO38PXAZikmCz93ecVEq37J9G'
        }
      }
      );
      setImages(response.data.photos);
      console.log(response)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setfile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setimage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const fetchAndConvertToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setimage(reader.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching or converting the image:", error);
    }
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
    setBackground();
  }, [backgroundElement]);

  useEffect(() => {
    setSlideSettings({ ...slideSettings, titleValue: t('slide-title'), descriptionValue: t('slide-desc') })
  }, [t])

  const parts = slideSettings.titleValue.split(/<c>|<\/c>/)
  const showTitle = slideType === 'textOnly' || (slideType === 'textAndImage' && slideSettings.title);
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
            backgroundImage: backgroundElement?.status ? `url(${background})` : "",
            backgroundColor: colorPalate.first // The First Color
          }}
        ></div>
        {
          brandingType === "company" && !companyInfo?.introOutroOnly && (
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
          )
        }
        <div className="slide-content text-white">
          {slideType !== "imageOnly" && (
            <div className="slide__text-wrapper">
              {console.log(slideCounterInfo)}
              {slideCounterInfo?.status && (
                <span
                  className={` slider__counter--box ${alignment === "center" && "mx-auto"
                    }`} // For the slide counter align you can add or remove center class
                  style={{ backgroundColor: colorPalate.second, color: colorPalate.first }}
                >
                  {props.index}
                </span>
              )}
              {slideSettings.title && (slideType === 'textAndImage' || slideType === 'textOnly') ? (
                <div
                  className={`title title-font-${textSize}`}
                  style={{ color: colorPalate.third, fontFamily: fontFamily }}
                >
                 <StyledSentence sentence={slideSettings.titleValue} color={colorPalate.second}/>
                </div>
              ) : null}

              {(slideSettings?.description &&
                (slideType === "textAndImage" ||
                  slideType === "textOnly")) && (
                  <div className={`text description-font-${textSize}`} style={{ color: colorPalate.third, fontFamily: fontFamily }}>
                    {slideSettings.descriptionValue}
                  </div>
                )}
            </div>
          )}
          {(slideType === "imageOnly" || slideType === "textAndImage") && (
            <img
              src={image}
              className="imageContent rounded"
              alt="upload here"
            />
          )}
        </div>
        {
          brandingType === "personal" && !personalInfo?.introOutroOnly && (
            <div className="contentSlide__bottom-data">
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
                    personalInfo?.isName && <h6 className="m-0" style={{ color: colorPalate.third, fontFamily: fontFamily }}>{personalInfo?.name}</h6>
                  }
                  {
                    personalInfo?.isHandle && <p className="m-0 fs-xs" style={{ color: colorPalate.third, fontFamily: fontFamily }}>{personalInfo?.handle}</p>
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>
      {
        props.download ? <div className={"slide_individual_settings"}>
          <div className="top__buttons-wrapper">
            <Button
              name={
                <>
                  <FeatherIcon icon="arrow-left" size={14} /> {t('reorder')}
                </>
              }
              className="btn btn-secondary w-100"
              onClick={() => {
                props.reorderUp();
                props.prev();
              }}
              disabled={props.disableReorderUp}
            />
            <Button
              name={
                <>
                  <FeatherIcon icon="trash-2" size={14} /> {t('delete')}
                </>
              }
              className="btn btn-secondary w-100"
              onClick={props.delete}
            />
            <Button
              name={
                <>
                  {t('duplicate')} <FeatherIcon icon="plus" size={14} />
                </>
              }
              className="btn btn-secondary w-100"
              onClick={props.duplicate}
            />
            <Button
              name={
                <>
                  {t('reorder')} <FeatherIcon icon="arrow-right" size={14} />
                </>
              }
              className="btn btn-secondary w-100"
              onClick={() => {
                props.reorderDown();
                props.next();
              }}
              disabled={props.disableReorderDown}
            />
          </div>
          <div className="configure-title">{t('fss')}</div>
          <div className="configure-container">
            <span className="fs-sm">{t('type')}</span>
            <div className="btn-group w-100">
              <Input
                type="radio"
                value="textOnly"
                id="ftextOnly"
                className="btn-check"
                name="fslideSettings"
                checked={slideType === "textOnly"}
                handleChange={(e) => setslideType(e.target.value)}
              />
              <label className="btn btn__radio-check" htmlFor="ftextOnly">
                {t('textOnly')}
              </label>
              <Input
                type="radio"
                value="textAndImage"
                id="ftextAndImage"
                className="btn-check"
                name="fslideSettings"
                checked={slideType === "textAndImage"}
                handleChange={(e) => setslideType(e.target.value)}
              />
              <label className="btn btn__radio-check" htmlFor="ftextAndImage">
                {t("textandimage")}
              </label>
              <Input
                type="radio"
                value="imageOnly"
                id="fimageOnly"
                className="btn-check"
                name="fslideSettings"
                checked={slideType === "imageOnly"}
                handleChange={(e) => setslideType(e.target.value)}
              />
              <label className="btn btn__radio-check" htmlFor="fimageOnly">
                {t('imageOnly')}
              </label>
            </div>
          </div>
          {slideType === "textOnly" || slideType === "textAndImage" ? (
            <>
              <div className="configure-container">
                <div className="form-check form-switch">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="title"
                    placeholder="Enter Title"
                    name="title"
                    checked={slideSettings.title}
                    handleChange={(e) =>
                      setSlideSettings({
                        ...slideSettings,
                        title: !slideSettings.title,
                      })
                    }
                  />

                  <label className="form-check-label" htmlFor="title">
                    {t('title')}
                  </label>
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    name="titleValue"
                    id="titleValue"
                    className="fs-sm"
                    value={slideSettings.titleValue}
                    handleChange={(e) =>
                      setSlideSettings({
                        ...slideSettings,
                        titleValue: e.target.value,
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
                    id="description"
                    name="description"
                    checked={slideSettings.description}
                    handleChange={(e) =>
                      setSlideSettings({
                        ...slideSettings,
                        description: e.target.checked,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="description">
                    {t('description')}
                  </label>
                </div>
                <div className="form-group">
                  <TextArea
                    className="fs-sm"
                    value={slideSettings.descriptionValue}
                    placeholder="Enter Description"
                    name="descriptionValue"
                    id="descriptionValue"
                    handleChange={(e) =>
                      setSlideSettings({
                        ...slideSettings,
                        descriptionValue: e.target.value,
                      })}
                  />
                </div>
              </div>
            </>
          ) : null}

          {slideType === "imageOnly" || slideType === "textAndImage" ? (
            <>
              <div className="configure-container">
                <span className="fs-sm">{t('image')}</span>
                <form onSubmit={fetchImages}>
                  <Row className="gy-3 gx-2">
                    <Col sm={12} md={6}>
                      <div className="form-group">
                        <Input
                          type="text"
                          name="fimageSearchValue"
                          id="fimageSearchValue"
                          className="fs-sm"
                          placeholder={t('search-image')}
                          value={searchTerm}
                          handleChange={(e) => setsearchTerm(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <button type="submit" className="btn btn-secondary w-100">
                        {t('search')}
                      </button>
                    </Col>
                    {
                      images?.length > 0 && (<Col xs={12}>
                        <div className="searched__images-result">
                          {
                            images && images.length > 0 ? images?.map((image, index) => {
                              return <img
                                src={image.src.medium}
                                onClick={() =>    (image.src.landscape)}
                                alt=""
                                className="img-fluid"
                              />
                            }) : ""
                          }
                        </div>
                      </Col>)
                    }
                    <Col xs={12}>
                      <div className="image__upload--box">
                        <span>
                          <FeatherIcon icon="upload" size={14} /> {t('upload-image')}
                        </span>
                        <Input
                          type="file"
                          id="uploadedImageValue"
                          name="uploadedImageValue"
                          accept="image/*"
                          handleChange={handleFile} // Pass the handleFile function as handleChange prop
                        />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="form-check form-switch">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="scaleImage"
                          name="scaleImage"
                          checked={slideSettings.scaleImage}
                          handleChange={(e) =>
                            setSlideSettings({
                              ...slideSettings,
                              scaleImage: e.target.checked,
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="scaleImage">
                          {t('scale-image')}
                        </label>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </>
          ) : null}
        </div> : null
      }

    </div>
  );
};

export default ContentSlide;
