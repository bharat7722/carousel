import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCarouselTypeAction, setSlideTypeAction } from "../../stateManagement/actions/carouselType";
import Input from "../Input";
import { t } from "i18next";

const CarouselTypes = () => {
  const { slide } = useSelector((state) => state.sliderT);
  const dispatch = useDispatch();

  const [carouselType, setCarouselType] = useState({
    type: "linkedIn",
    introSlide: true,
    outroSlide: true,
  });

  const [slideType, setSlideType] = useState("multi");

  const handleCarouselType = () => {
    dispatch(setCarouselTypeAction(carouselType));
  };

  useEffect(() => {
    handleCarouselType();
  }, [carouselType]);

  const handleCarouselTypeChange = (type) => {
    setCarouselType({ ...carouselType, type });
  };

  return (
    <div>

      <p className="helper--text bottom">
        <FeatherIcon icon="alert-circle" size="13" /> {t("toggle-between")}
      </p>
      <div className="btn-group w-100 mt-3">
        {["linkedIn", "igFeed", "igStories", "tikTok"].map((type) => (
          <React.Fragment key={type}>
            <Input
              type="radio"
              name="carouselType"
              id={type}
              className="btn-check"
              checked={carouselType.type === type}
              value={type}
              handleChange={() => handleCarouselTypeChange(type)}
            />
            <label className="btn btn__radio-check" htmlFor={type}>
              {t(type)}
            </label>
          </React.Fragment>
        ))}
      </div>
      <p className="helper--text bottom">
        <FeatherIcon icon="alert-circle" size="13" />{" "}
        {t(
          carouselType.type === "linkedIn"
            ? "linkedin-desc"
            : carouselType.type === "igFeed"
            ? "ig-feed-desc"
            : carouselType.type === "igStories"
            ? "ig-story-desc"
            : "tik-tok-desc"
        )}
      </p>
      {slide === "multi" && (
        <div className="mt-3">
          <div className="form-check form-switch">
            <Input
              type="checkbox"
              role="switch"
              id="introSlide"
              className="form-check-input"
              checked={carouselType.introSlide}
              handleChange={() =>
                setCarouselType({ ...carouselType, introSlide: !carouselType.introSlide })
              }
            />
            <label className="form-check-label" htmlFor="introSlide">
              {t("isIntro")}
            </label>
          </div>
          <div className="form-check form-switch">
            <Input
              type="checkbox"
              role="switch"
              id="outroSlide"
              className="form-check-input"
              checked={carouselType.outroSlide}
              handleChange={() =>
                setCarouselType({ ...carouselType, outroSlide: !carouselType.outroSlide })
              }
            />
            <label className="form-check-label" htmlFor="outroSlide">
              {t("isOutro")}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselTypes;
