import React from "react";
import { useEffect ,useState} from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Home = () => {
  const [languageToggler, setLanguageToggler] = useState("en");
  const [offset, setOffset] = useState(0);
  const {t,i18n} = useTranslation()
  
  const changeLanguageHandler = () => {
    i18n.changeLanguage(languageToggler);
  }

  useEffect(() => {
	changeLanguageHandler()
  }, [languageToggler])
  
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing__app-wrapper">
      <div className={`navbar ${offset > 10 && "is__scrolled"}`}>
        <Container>
          <nav className="nav">
            <Link to="" className="logo">
              <img
                src="/assets/images/0-logo_1c4d7abc-08ad-41e3-bfcd-b0f37c1df43c.png"
                alt="logo"
                className="img-fluid"
              />
            </Link>
            <div className="menus">
              <button
                className={`btn ${languageToggler === "en" && "active"}`}
                onClick={() => setLanguageToggler("en")}
              >
                EN <span>US</span>
              </button>
              <button
                className={`btn ${languageToggler === "es" && "active"}`}
                onClick={() => setLanguageToggler("es")}
              >
                ES <span>ES</span>
              </button>
              <button
                className={`btn ${languageToggler === "fr" && "active"}`}
                onClick={() => setLanguageToggler("fr")}
              >
                FR <span>FR</span>
              </button>
            </div>
          </nav>
        </Container>
      </div>

      <div className="header">
        <Container>
          <Row>
            <Col md={12} lg={8} className="mx-auto">
              <div className="text-center">
                <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
                  <h5 className="m-0 fw-light">{t('carousel-m-g')}</h5>
                  <div className="badge bg-secondary rounded-pill">
                    {t('for-l-i-t')}
                  </div>
                </div>
                <h1>{t('create-fast')}</h1>
                <h5 className="m-0">
                  {t('crafting')}
                </h5>
                <div className="d-flex align-items-center justify-content-center gap-2 my-4">
                  <Link to="editor" className="btn btn-primary">
                    {t('cc')}
                  </Link>
                  <Link to="editor" className="btn btn-secondary">
                    {t('signup')}
                  </Link>
                </div>
                <p>
                 {t('agree')}{" "}
                  <Link to="">{t('pp')}</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <section>
        <Container>
          <Row className="align-items-center gy-5">
            <Col md={12} lg={6}>
              <div className="section__title">
                <h2>{t('wwd')}</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                ut voluptate saepe non laborum quia omnis. Dignissimos similique
                optio, voluptate iste porro itaque, asperiores aliquam ducimus
                maxime ad iure nulla harum mollitia neque molestiae sapiente
                nesciunt voluptatibus! Mollitia veritatis odio nam illum.
                Ratione ab voluptatem voluptas? Hic delectus dolore in.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                ut voluptate saepe non laborum quia omnis. Dignissimos similique
                optio, voluptate iste porro itaque, asperiores aliquam ducimus
                maxime ad iure nulla harum mollitia neque molestiae sapiente
                nesciunt voluptatibus! Mollitia veritatis odio nam illum.
                Ratione ab voluptatem voluptas? Hic delectus dolore in.
              </p>
            </Col>
            <Col md={12} lg={6}>
              <img src="/images/b1.png" alt="about" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <div className="section__title">
            <h2>{t('ft')}</h2>
          </div>
          <Row className="gy-4">
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">🤗</div>
                <h5>{t('no-design')}</h5>
                <p className="m-0">
                  {t('user-friendly')}
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">📏</div>
                <h5>{t('ar')}</h5>
                <p className="m-0">
                  {t('save-time')}
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">🎨</div>
                <h5>{t('pcf')}</h5>
                <p className="m-0">
                 {t('create-har')}
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">🛠️</div>
                <h5>{t('fct')}</h5>
                <p className="m-0">
                  {t('pct')}
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">💾</div>
                <h5>{t('save-load')}</h5>
                <p className="m-0">
                 {t('personalize')}
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">📱</div>
                <h5>{t('for-link')}</h5>
                <p className="m-0">
                  {t('create-link')}
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">💸</div>
                <h5>{t('mfu')}</h5>
                <p className="m-0">
                  {t('awr')}
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <div className="features__card">
                <div className="icon">🌟</div>
                <h5>{t('high-quality')}</h5>
                <p className="m-0">
                 {t('depending')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-secondary">
        <Container>
          <div className="text-center">
            <h2 className="bigger__text">
              {t('start-today')} 🎨✨
            </h2>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
              <Link to="editor" className="btn btn-primary">
                {t('cc')}
              </Link>
              <Link to="editor" className="btn btn-secondary">
                {t("signup")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="section__title text-center">
            <h2>{t('faq')}</h2>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {t('wsm')}
              </Accordion.Header>
              <Accordion.Body>
               {t('fa')}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                {t('sah')}
              </Accordion.Header>
              <Accordion.Body>
                {t('sat')}
                <div>
                  {t('sa1')}
                </div>
                <div>
                  {t('sa2')}
                </div>
                <div>
                 {t('sac')}
                </div>
                <div>{t('sad')}</div>
                <div>
                  {t('sae')}
                </div>
                <div>
                  {t('saq')}
                </div>
                <div>
                 {t('sag')}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
               {t('tah')}
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  {t('taa')}
                </div>
                <div>
                {t('tab')}
                </div>
                <div>
                 {t('tac')}
                </div>
                <div>
                 {t('tad')}
                </div>
                <div>
                  {t('tae')}
                </div>
                <div>
                  {t('taf')}
                </div>
                <div>
                  {t('tag')}
                </div>
                <div>
                {t('tah1')}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                {t('fah')}
              </Accordion.Header>
              <Accordion.Body>
                {t('fat')}
                <div>
                  {t('faa')}
                </div>
                <div>
                  {t('fab')}
                </div>
                <div>
                  {t('fac')}
                </div>
                <div>
                  {t('fad')}
                </div>
                <div>
                  {t('fae')}
                </div>
                <div>
                  {t('faf')}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                {t('fourthtitle')}
              </Accordion.Header>
              <Accordion.Body>
                {t('fourthdesc')}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>

      <footer>
        <Container>
          <p className="m-0">
            &copy; {t('rs')} {""}
            <a href="https://erience.co/" target="_blank" rel="noreferrer">Erience</a>
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
