import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { Suspense, useEffect, useState } from 'react'
import { Col, Row, Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTopicAction } from '../../stateManagement/actions/topicAction';
import { setSingleSlideTemplateAction, setTemplateAction } from '../../stateManagement/actions/templateAction'
import { backgroundDesignoptions, singleSlideTemplteOption, templateOptions, topicOptions } from '../assets/js/selectBoxOptions';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import { setBackgroundElement } from '../../stateManagement/actions/backgroundElement';
import { setSlideTypeAction } from '../../stateManagement/actions/carouselType';
const SelectBox = React.lazy(() => import('../SelectBox'));
const AdditionalSettings = React.lazy(() => import('./AdditionalSettings'));
const CarouselTypes = React.lazy(() => import('./Carouseltype'));
const TextSettings = React.lazy(() => import('./TextSettings'));
const ColorPalette = React.lazy(() => import('./ColorPalette'));
function Sidebar({ sidebarToggler }) {
	const [settingInputValue, setSettingInputValue] = useState({
		template: "1",
	});
	const [background, setbackground] = useState({
		element: "wave",
		status: true,
	})
	const [slideType, setSlideType] = useState("multi");
	const [singleTemplateno, setsingleTemplateno] = useState('1')
	const { slide } = useSelector((state => state.sliderT))
	const dispatch = useDispatch()
	const handleBackgroundDesign = () => {
		dispatch(setBackgroundElement({ element: background.element, status: background.status }))
	}
	const { t } = useTranslation();

	const handleSlideTypeChange = (e) => {
		setSlideType(e.target.value);
	};
	const handleSlideChange = () => {
		dispatch(setSlideTypeAction(slideType));
	};
	useEffect(() => {
		handleBackgroundDesign()
	}, [background])

	useEffect(() => {
		handleSlideChange();
	}, [slideType]);
	useEffect(() => {
	  dispatch(setSingleSlideTemplateAction(singleTemplateno))
	}, [singleTemplateno])
	
	return (
		<div
			className={`sidebar__wrapper--container ${sidebarToggler ? "expanded" : ""
				}`}
		>
			<div className="sidebar-section">
				<div className="section_title">
					<h6 className="fw-bold">{t('gese')}</h6>
				</div>
				<Row className="g-2">
					<Col xs={12}>
						<div className="btn-group w-100">
							<Input
								type="radio"
								name="slideType"
								id="single"
								className="btn-check"
								checked={slideType === "single"}
								value="single"
								handleChange={handleSlideTypeChange}
							/>
							<label className="btn btn__radio-check" htmlFor="single">
								{t("single")}
							</label>
							<Input
								type="radio"
								name="slideType"
								id="multi"
								className="btn-check"
								checked={slideType === "multi"}
								value="multi"
								handleChange={handleSlideTypeChange}
							/>
							<label className="btn btn__radio-check" htmlFor="multi">
								{t("multi")}
							</label>
						</div>
					</Col>
					{slide === "single" && (
            <Col xs={12}>
              <div className="form-group">
                <label htmlFor="template">{t("template")}</label>
                <SelectBox
                  selectName="Topic"
                  name="template"
                  options={singleSlideTemplteOption}
                  handleChange={(e) => {
                    setSettingInputValue({
                      ...settingInputValue,
                      template: e.target.value,
                    });
                    dispatch(setSingleSlideTemplateAction(e.target.value));
                  }}
                  id="template"
                />
              </div>
            </Col>
          )}
					<Col xs={12}>
						<div className="form-check form-switch">
							<Input type='checkbox' role="switch" id='backgroundDesign' className="form-check-input" name='backgroundDesign' checked={background.status} handleChange={() => setbackground({ ...background, status: !background.status })} />
							<label className="form-check-label" htmlFor="backgroundDesign">
								{t('background-design')}
							</label>
						</div>
						{background.status && (
							<SelectBox selectName="Background Design" name='backgroundDesignTheme' className="form-select my-2" options={backgroundDesignoptions} handleChange={(e) => setbackground({ ...background, element: e.target.value })} id='backgroundDesignTheme' />
						)}
					</Col>
				</Row>
				<div className="mt-4">
					<Accordion className="carousel__general--settings-accordion">
						{
							slide === "multi" && <Accordion.Item eventKey="0">
							<Accordion.Header>{t('carousel-type')}</Accordion.Header>
							<Accordion.Body>
								<Suspense fallback={null}>
									<CarouselTypes />
								</Suspense>
							</Accordion.Body>
						</Accordion.Item>
						}
						<Accordion.Item eventKey="1">
							<Accordion.Header>{t('color-pallete')}</Accordion.Header>
							<Accordion.Body>
								<Suspense fallback={null}>
									<ColorPalette />
								</Suspense>
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2">
							<Accordion.Header>{t('text')}</Accordion.Header>
							<Accordion.Body>
								<Suspense fallback={null}>
									<TextSettings />
								</Suspense>
							</Accordion.Body>
						</Accordion.Item>
						{
							slide === "multi" && <Accordion.Item eventKey="3">
							<Accordion.Header>{t('additional-setting')}</Accordion.Header>
							<Accordion.Body>
								<Suspense fallback={null}>
									<AdditionalSettings />
								</Suspense>
							</Accordion.Body>
						</Accordion.Item>
						}
					</Accordion>
				</div>
			</div>
		</div>

	)
}

export default Sidebar