import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import placeholderImage from "../assets/images/placeholder.png";
import axios from "axios";
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
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import StyledSentence from "../RenderTitle";
function ThirdContentSlide(props) {
  const [slideSettings, setSlideSettings] = useState({
    type: "textOnly",
    title: true,
    titleValue: "Amazing catchy title goes here",
    description: true,
    descriptionValue:
      "This text is reserved for a message that will leave viewers you wanting more.",
    imageSearchValue: "",
    uploadedImageValue: "",
    scaleImage: true,
  });
  const [image, setimage] = useState(placeholderImage);
  const [file, setfile] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [images, setImages] = useState([])
  const [background, setbackground] = useState("")
  const { slideCounterInfo } = useSelector((state) => state.slider);
  const {colorPalate} = useSelector((state) => state.colorPalateReducers)
  const { backgroundElement } = useSelector((state) => state.background);
  const {textSize} = useSelector((state) => state.text)
  const {alignment} = useSelector((state) => state.textAlign)
  const {fontFamily} = useSelector((state) => state.fonts)
  const { brandingType } = useSelector((state) => state.branding);
  const { personalInfo } = useSelector((state) => state.brandingPersonal);
  const { companyInfo } = useSelector((state) => state.brandingCompany)
  const { carouselfInfo } = useSelector((state) => state.carouselType)
  
  const { t } = useTranslation()
  const handleFile = (e) => {
    const file = e.target.files[0];
    setfile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setimage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

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
    setBackground()
  }, [backgroundElement])

  useEffect(() => {
    setSlideSettings({...slideSettings,titleValue:t('slide-title'),descriptionValue:t('slide-desc')})
  }, [t])
  return (
    <div className="slide-wrapper">
      <div
        className={`slide_container content-slide ${
          alignment === "center" ? "text-center" : "text-start"
        } ${
          carouselfInfo.type === "igStories" || carouselfInfo.type === "tikTok"
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
          {slideSettings?.type !== "imageOnly" && (
            <div className="slide__text-wrapper">
              {slideCounterInfo?.status && (
                <span
                className={` slider__counter--box ${alignment === "center" && "mx-auto"
              }`}
                  style={{ backgroundColor: colorPalate.second,color:colorPalate.first }}
                >
                  {props.index}
                </span>
              )}
              {( slideSettings.title &&
                (slideSettings?.type === "textAndImage" ||
                slideSettings?.type === "textOnly")) && (
                <div className={`title title-font-${textSize}`} style={{color:colorPalate.third, fontFamily:fontFamily}}>
                <StyledSentence sentence={slideSettings.titleValue} color={colorPalate.second}/></div>
              )}
              {( slideSettings.description &&
                (slideSettings?.type === "textAndImage" ||
                   slideSettings?.type === "textOnly")) && (
                <div className={`title description-font-${textSize}`} style={{color:colorPalate.third,fontFamily:fontFamily}}>{slideSettings.descriptionValue}</div>
              )}
            </div>
          )}
          {(slideSettings?.type === "imageOnly" ||
            slideSettings?.type === "textAndImage") && (
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
                personalInfo?.isName && <h6 className="m-0" style={{color:colorPalate.third,fontFamily:fontFamily}}>{personalInfo?.name}</h6>
              }
              {
                personalInfo?.isHandle && <p className="m-0 fs-xs" style={{color:colorPalate.third,fontFamily:fontFamily}}>{personalInfo?.handle}</p>
              }
            </div>
          </div>
        </div>
          )
        }
      </div>

      {
        props.download && <div className="slide_individual_settings">
        <div className="top__buttons-wrapper">
        <Button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => {
                props.reorderUp();
                props.prev();
              }}
              disabled={props.disableReorderUp}
              name={<><FeatherIcon icon="arrow-left" size={14} /> {t('reorder')}</>}
            />

            <Button
              type="button"
              className="btn btn-secondary w-100"
              onClick={props.delete}
              name={<><FeatherIcon icon="trash-2" size={14} /> {t('delete')}</>}
            />

            <Button
              type="button"
              className="btn btn-secondary w-100"
              onClick={props.duplicate}
              name={<>{t('duplicate')} <FeatherIcon icon="plus" size={14} /></>}
            />

            <Button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => {
                props.reorderDown();
                props.next();
              }}
              disabled={props.disableReorderDown}
              name={<>{t('reorder')} <FeatherIcon icon="arrow-right" size={14} /></>}
            />
        </div>
        <div className="configure-title">{t('third-slide-setting')}</div>
        <div className="configure-container">
          <span className="fs-sm">{t('type')}</span>
          <div className="btn-group w-100">
            <Input
              type="radio"
              className="btn-check"
              name="tslideSettings"
              id="ttextOnly"
              value="textOnly"
              autoComplete="true"
              checked={slideSettings.type === "textOnly"}
              handleChange={(e) =>
                setSlideSettings({ ...slideSettings, type: e.target.value })
              }
            />
            <label className="btn btn__radio-check" htmlFor="ttextOnly">
              {t('textOnly')}
            </label>

            <Input
              type="radio"
              className="btn-check"
              name="tslideSettings"
              id="ttextAndImage"
              value="textAndImage"
              autoComplete="true"
              checked={slideSettings.type === "textAndImage"}
              handleChange={(e) =>
                setSlideSettings({ ...slideSettings, type: e.target.value })
              }
            />
            <label className="btn btn__radio-check" htmlFor="ttextAndImage">
              {t('textandimage')}
            </label>

            <Input
              type="radio"
              className="btn-check"
              name="tslideSettings"
              id="timageOnly"
              value="imageOnly"
              autoComplete="true"
              checked={slideSettings.type === "imageOnly"}
              handleChange={(e) =>
                setSlideSettings({ ...slideSettings, type: e.target.value })
              }
            />
            <label className="btn btn__radio-check" htmlFor="timageOnly">
              {t('imageOnly')}
            </label>
          </div>
        </div>

        {slideSettings.type === "textOnly" ||
        slideSettings.type === "textAndImage" ? (
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
                  checked={slideSettings.title === true}
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
                  checked={slideSettings.description === true}
                  handleChange={(e) =>
                    setSlideSettings({
                      ...slideSettings,
                      description: !slideSettings.description,
                    })
                  }
                />
                <label className="form-check-label" htmlFor="description">
                  {t('slide-desc')}
                </label>
              </div>
              <div className="form-group">
                <TextArea
                  name="descriptionValue"
                  id="descriptionValue"
                  className="fs-sm"
                  placeholder="Enter Description"
                  value={slideSettings.descriptionValue}
                  handleChange={(e) =>
                    setSlideSettings({
                      ...slideSettings,
                      descriptionValue: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </>
        ) : null}

        {slideSettings.type === "imageOnly" ||
        slideSettings.type === "textAndImage" ? (
          <>
            <div className="configure-container">
              <span className="fs-sm">{t('image')}</span>
              <form onSubmit={fetchImages}>
                <Row className="gy-3 gx-2">
                  <Col sm={12} md={6}>
                    <div className="form-group">
                      <Input
                        type="text"
                        name="imageSearchValue"
                        id="imageSearchValue"
                        className="fs-sm"
                        placeholder="Search...(photos provied by Pexels.com)"
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
                      images && images.length > 0 ? images?.map((image)=>{
                        return  <img
                        src={image.src.medium}
                        placeholder={t('search-image')}
                        onClick={() => fetchAndConvertToBase64(image.src.landscape)}
                        alt=""
                        className="img-fluid"
                      />
                      })  : ""
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
                        value={slideSettings.uploadedImageValue}
                        handleChange={(e) => handleFile(e)}
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
                        checked={slideSettings.scaleImage === true}
                        handleChange={(e) =>
                          setSlideSettings({
                            ...slideSettings,
                            scaleImage: !slideSettings.scaleImage,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="scaleImage">
                       {t('scale-search')}
                      </label>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </>
        ) : null}
      </div>
      }
    </div>
  );
}

export default ThirdContentSlide;
