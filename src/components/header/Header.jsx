import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { downloadToggleAction } from "../../stateManagement/actions/downloadfileAction";
import { logOutAction, setUserAction } from "../../stateManagement/actions/userAction";
import { auth } from '../googleSignin/config'
import { signOut } from 'firebase/auth'
import { useTranslation } from "react-i18next";
import LoadingBar from "react-top-loading-bar";
import TranslatorDropdown from "../TranslatorDropdown";
const Header = ({ sidebarToggler, setSidebarToggler }) => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();

  // Page Loader
  const [downloadLoding, setDownloadLoding] = useState(0);

  const { user } = useSelector((state) => state.userInfo)
  const handletoggle = () => {
    dispatch(downloadToggleAction({ show: true, hide: false }))
  }
  const handleLogout = (e) => {
    e.preventDefault()
    signOut(auth)
      .then(() => {
        dispatch(logOutAction())
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }
  return (
    <header>
      <LoadingBar
        color='#f11946'
        progress={downloadLoding}
        onLoaderFinished={() => setDownloadLoding(0)}
      />
      <Container fluid>
        <nav>
          <div className="logo">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              className="img-fluid"
            />
            <span>aiCarousel</span>
          </div>
          <ul className="menus">
            <TranslatorDropdown />
            {user ? (
              <li>
                <button className="btn nav_item" onClick={handleLogout}>
                  <span>{user}</span>
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="btn nav_item">
                  <FeatherIcon icon="log-in" size="16" /> <span>{t('login')}</span>
                </Link>
              </li>
            )}


            <li>
              <Link to="/" className="btn btn-primary nav_item">
                <FeatherIcon icon="minus-circle" size="16" />{" "}
                <span>{t('upgrade-to-pro')}</span>
              </Link>
            </li>
            <li>
              <button
                className="btn btn-primary nav_item"
                onClick={handletoggle}
              >
                <FeatherIcon icon="download" size="16" /> <span>{t("download")}</span>
              </button>
            </li>
            <li className="rep__toggler">
              <span
                className="btn nav_item"
                onClick={() => setSidebarToggler(!sidebarToggler)}
              >
                <FeatherIcon icon={!sidebarToggler ? "menu" : "x"} size="24" />
              </span>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
