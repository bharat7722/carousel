import React, { useEffect, useRef, useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Container } from "react-bootstrap";
import IntroSlide from "./IntroSlide";
import OutroSlide from "./OutroSlide";
import ContentSlider from "./ContentSlider";
import SecondContentSlide from "./SecondContentSlide";
import ThirdContentSlide from "./ThirdContentSlide";
import FourthContentSlide from "./FourthContentSlider";
import FifthContentSlide from "./FifthContentSlide";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import DownloadModal from "../Modal/DownloadModal";
import PageLoader from "../PageLoader";
import { useTranslation } from "react-i18next";
import StatusModal from "../Modal/StatusModal";
import { downloadToggleAction } from "../../stateManagement/actions/downloadfileAction";
import DownloadLoader from "../DownloadLoader";
import TwitterPostSlide from "./TwitterPostSlide";
import SecondSlide from "./SingleSlides/SecondSlide";
import FirstSlide from "./SingleSlides/FirstSlide";

function Editor() {

  const originalSlides = [
    { id: 1, component: IntroSlide },
    { id: 2, component: ContentSlider },
    { id: 3, component: SecondContentSlide },
    { id: 4, component: ThirdContentSlide },
    { id: 5, component: FourthContentSlide },
    { id: 6, component: FifthContentSlide },
    { id: 7, component: OutroSlide },
  ];
  const { carouselfInfo } = useSelector((state) => state.carouselType);
  const { downloadModal } = useSelector((state) => state.donwloadToggle);
  const { slide } = useSelector((state => state.sliderT))
  const {templateNo} = useSelector((state) => state.singleTemplate)

  const [slides, setSlides] = useState(originalSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [downloadStart, setdownloadStart] = useState(true);
  const [loading, setloading] = useState(false)
  const [runTime, setrunTime] = useState(0);
  const [show, setShow] = useState(false)
  const [type, settype] = useState("")
  const [message, setmessage] = useState("")
  const swiperRef = useRef(null);
  const { t } = useTranslation()
  const dispatch = useDispatch()

 const handleChangeSlideType = () => {
    if (slide === "single") {
      if(templateNo === '1'){
        setSlides([
          {
            id: 1,
            component: TwitterPostSlide,
          },
        ]);
      }else if(templateNo === '2'){
        setSlides([
          {
            id: 1,
            component: FirstSlide,
          },
        ]);
      }else{
        setSlides([
          {
            id: 1,
            component: SecondSlide,
          },
        ]);
      }
      
    } else {
      setSlides(originalSlides);
    }
  };

  const removeSlide = (slideId) => {
    if (slides?.length <= 3) {
      const alert = t('delete-alert')
      window.alert(alert)
      return
    }
    setSlides((prevSlides) => {
      return prevSlides.filter((slide) => slide.id !== slideId);
    });
  };

  const duplicateSlide = (slideId) => {
    if (slides.length >= 7) {
      const duplicate_alert = t('duplicate-alert')
      window.alert(duplicate_alert);
      return;
    }
    const slideToDuplicate = slides.find((slide) => slide.id === slideId);
    if (slideToDuplicate) {
      const newSlide = {
        id: Math.max(...slides.map((slide) => slide.id)) + 1,
        component: slideToDuplicate.component,
      };
      const slideIndex = slides.findIndex((slide) => slide.id === slideId);
      setSlides((prevSlides) => [
        ...prevSlides.slice(0, slideIndex + 1),
        newSlide,
        ...prevSlides.slice(slideIndex + 1),
      ]);
    }
  };

  const reorderSlide = (currentIndex, newIndex) => {
    if (currentIndex === newIndex) {
      return;
    }

    const newSlides = [...slides];
    const [removedSlide] = newSlides.splice(currentIndex, 1);
    newSlides.splice(newIndex, 0, removedSlide);

    setSlides(newSlides);

    if (currentIndex === activeSlide) {
      setActiveSlide(newIndex);
    } else if (currentIndex < activeSlide && newIndex >= activeSlide) {
      setActiveSlide(activeSlide - 1);
    } else if (currentIndex > activeSlide && newIndex <= activeSlide) {
      setActiveSlide(activeSlide + 1);
    } else if (currentIndex > activeSlide && newIndex === currentIndex) {
      setActiveSlide(newIndex + 1);
    } else if (currentIndex < activeSlide && newIndex === currentIndex + 1) {
      setActiveSlide(newIndex);
    }

    if (currentIndex === slides.length - 2) {
      const newActiveSlide = newIndex >= currentIndex ? activeSlide - 1 : activeSlide;
      setActiveSlide(newActiveSlide);
    }
  };

  const handleToggleIntroSlide = () => {
    setrunTime((pre) => pre + 1);
    if (runTime > 0) {
      if (carouselfInfo?.introSlide) {
        setSlides(originalSlides);
      } else {
        const updatedSlides = originalSlides.slice(1);
        setSlides(updatedSlides);
      }
    }
  };

  const handleToggleOutroSlide = () => {
    setrunTime((prev) => prev + 1);
    if (runTime > 0) {
      if (carouselfInfo?.outroSlide) {
        setSlides(originalSlides);
      } else {
        const updatedSlides = originalSlides.slice(0, -1);
        setSlides(updatedSlides);
      }
    }
  };

  useEffect(() => {
    handleToggleOutroSlide();
  }, [carouselfInfo?.outroSlide]);

  useEffect(() => {
    handleToggleIntroSlide();
  }, [carouselfInfo?.introSlide]);

  const downloadAllSlidesAsPNG = () => {
    dispatch(downloadToggleAction({ show: false, hide: true }));
    setloading(true)
    const promises = slides.map((slide) => {
      const slideId = slide.id.toString();
      const slideElement = document.getElementById(`slide-${slideId}`);
      
      if (slideElement) {
        const individualSettingDiv = slideElement.querySelector('.slide_individual_settings');
        if (individualSettingDiv) {
          individualSettingDiv.style.display = 'none'; 
        }
  
        return html2canvas(slideElement)
          .then((canvas) => {
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `slide-${slideId}.png`;
            link.click();
          })
          .catch((error) => {
            console.error("Error while generating PNG for slide:", slideId, error);
          })
          .finally(() => {
            if (individualSettingDiv) {
              individualSettingDiv.style.display = ''; 
            }
          });
      } else {
        return Promise.reject(new Error(`Slide element not found: slide-${slideId}`));
      }
    });
  
    Promise.all(promises)
    .then(() => {
      setloading(false)
      settype("success")
      const alert = t('download-success-alert')
      setmessage(alert)
      setShow(true)
      const individualSettingDivs = document.querySelectorAll('.slide_individual_settings');
      individualSettingDivs.forEach((div) => {
        div.style.display = '';
      });
    })
    .catch((error) => {
      setloading(false)
      settype("danger")
      setmessage("Error downloading slides:", error)
      setShow(true)
      const individualSettingDivs = document.querySelectorAll('.slide_individual_settings');
      individualSettingDivs.forEach((div) => {
        div.style.display = '';
      });
    });
  };

  
  const downloadAllSlidesAsJPG = () => {
    dispatch(downloadToggleAction({ show: false, hide: true }));
    setloading(true)
    const promises = slides.map((slide, index) => {
      const slideId = slide.id.toString();
      const slideElement = document.getElementById(`slide-${slideId}`);
  
      if (slideElement) {
        const individualSettingDiv = slideElement.querySelector('.slide_individual_settings');
        if (individualSettingDiv) {
          individualSettingDiv.style.display = 'none';
        }
  
        return html2canvas(slideElement)
          .then((canvas) => {
            const dataUrl = canvas.toDataURL("image/jpeg");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `slide-${slideId}.jpg`;
            link.click();
          })
          .catch((error) => {
            console.error("Error while generating JPEG for slide:", slideId, error);
          })
          .finally(() => {
            if (individualSettingDiv) {
              individualSettingDiv.style.display = ''; 
            }
          });
      } else {
        return Promise.reject(new Error(`Slide element not found: slide-${slideId}`));
      }
    });
  
    Promise.all(promises)
    .then(() => {
      setloading(false)
      settype("success")
      const alert = t('download-success-alert')
      setmessage(alert)
      setShow(true)
      const individualSettingDivs = document.querySelectorAll('.slide_individual_settings');
      individualSettingDivs.forEach((div) => {
        div.style.display = '';
      });
    })
    .catch((error) => {
      setloading(false)
      settype("danger")
      setmessage("Error downloading slides:", error)
      setShow(true)
      const individualSettingDivs = document.querySelectorAll('.slide_individual_settings');
      individualSettingDivs.forEach((div) => {
        div.style.display = '';
      });
    });
  };
  const downloadAllSlidesAsPDF = () => {
    dispatch(downloadToggleAction({ show: false, hide: true }));
    setloading(true)
    const pdf = new jsPDF();
  
    const promises = slides.map((slide, index) => {
      const slideId = slide.id.toString();
      const slideElement = document.getElementById(`slide-${slideId}`);
  
      if (slideElement) {
        const individualSettingDiv = slideElement.querySelector('.slide_individual_settings');
        if (individualSettingDiv) {
          individualSettingDiv.style.display = 'none'; 
        }
  
        return html2canvas(slideElement, {
          scale: pdf.internal.scaleFactor, 
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = 296;
            console.info("height",pdfHeight)
            if (index > 0) {
              pdf.addPage();
            }
            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight); 
            setdownloadStart(true);
          })
          .catch((error) => {
            console.error("Error while generating PDF for slide:", slideId, error);
          })
          .finally(() => {
            if (individualSettingDiv) {
              individualSettingDiv.style.display = ''; 
            }
          });
      } else {
        return Promise.reject(new Error(`Slide element not found: slide-${slideId}`));
      }
    });
    Promise.all(promises)
    .then(() => {
      pdf.save("slides.pdf");
      setloading(false)
      settype("success")
      const alert = t('download-success-alert')
      setmessage(alert)
      setShow(true)
      const individualSettingDivs = document.querySelectorAll('.slide_individual_settings');
      individualSettingDivs.forEach((div) => {
        div.style.display = '';
      });
    })
    .catch((error) => {
      setShow(false)
      setShow(false)
      settype("danger")
      setmessage("Error generating PDF:", error)
      const individualSettingDivs = document.querySelectorAll('.slide_individual_settings');
      individualSettingDivs.forEach((div) => {
        div.style.display = '';
      });
    });
  };

  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const nextIndex = activeSlide + 1;
      swiperRef.current.swiper.slideTo(nextIndex);
      setActiveSlide(nextIndex);
    }
  };

  const previousSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const previousIndex = activeSlide - 1;
      swiperRef.current.swiper.slideTo(previousIndex);
      setActiveSlide(previousIndex);
    }
  };

  useEffect(() => {
    handleChangeSlideType();
  }, [slide,templateNo]);

  const renderSlide = (slide, index) => {
    const SlideComponent = slide.component;
    const isActiveSlide = index === activeSlide;
    const isFirstSlide = index === 1;
    const introSlideIndex = slides.findIndex((s) => s.component === IntroSlide);
    const adjustedIndex = introSlideIndex !== -1 ? index : index + 1;
    return (
      <SwiperSlide
        key={slide.id.toString()}
        className={slide.id === activeSlide ? "active-slide sl" : "sl"}
      >
        <div className="editor-slide" id={`slide-${slide.id}`}>
          <SlideComponent
            delete={() => removeSlide(slide.id)}
            duplicate={() => duplicateSlide(slide.id)}
            reorderUp={() => reorderSlide(index, index - 1)}
            reorderDown={() => reorderSlide(index, index + 1)}
            disableReorderUp={isFirstSlide || slides?.length <= 3}
            disableReorderDown={index === slides?.length - 2 || slides?.length <= 3}
            download={downloadStart}
            index={adjustedIndex}
            next={nextSlide}
            prev={previousSlide}
          />
        </div>
      </SwiperSlide>
    );
  };

  return (
    <React.Fragment>
     {loading &&  <DownloadLoader />}
    <div className="content__wrapper--container">
      <Container>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={0}
          centeredSlides={true}
          className="editor__slider"
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          ref={swiperRef}
        >
          {slides.map(renderSlide)}
        </Swiper>
      </Container>
      <DownloadModal modalShow={downloadModal.show} setdownloadStart={setdownloadStart} pdf={downloadAllSlidesAsPDF}
        jpg={downloadAllSlidesAsJPG} png={downloadAllSlidesAsPNG} />
        <StatusModal setShow={setShow} show={show} type={type} message={message} />
    </div>
    </React.Fragment>
  );
}

export default Editor;
