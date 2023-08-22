import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { auth } from "../googleSignin/config";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useDispatch } from "react-redux";
import { setUserAction } from "../../stateManagement/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatusModal from "../Modal/StatusModal";
const SignIn = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false)
  const [type, settype] = useState("")
  const [message, setmessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {t} = useTranslation()
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputValues;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);
        dispatch(setUserAction(user.email))
        settype("success")
        setmessage("User SignIn Successfully")
        setShow(true)
        navigate("/editor")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-in error:', errorCode, errorMessage);
        settype("danger")
        setmessage(errorMessage)
        setShow(true)
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col xs={12}>
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              name="email"
              id="email"
              value={inputValues.email}
              placeholder={t('email-place')}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  email: e.target.value,
                })
              }
            />
          </div>
        </Col>
        <Col xs={12}>
          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder={t('password-place')}
              value={inputValues.password}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  password: e.target.value,
                })
              }
            />
          </div>
        </Col>
        <Col xs={12}>
          <button
            type="submit"
            className="btn btn-primary mx-auto"
            disabled={!inputValues.email || !inputValues.password}
          >
            {t("login")}
          </button>
        </Col>
      </Row>
      <StatusModal show={show} setShow={setShow} type={type} message={message} />
    </form>
  );
};

export default SignIn;
