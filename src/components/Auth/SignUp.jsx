import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { auth } from "../googleSignin/config";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { useTranslation } from "react-i18next";
import Input from "../Input";
import StatusModal from "../Modal/StatusModal";
const SignUp = ({setPageType}) => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false)
  const [type, settype] = useState("")
  const [message, setmessage] = useState("")

  const {t} = useTranslation()
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = inputValues;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const translatedMessage = t('signup-success-alert');
        setmessage(translatedMessage)
        settype("success")
        setShow(true)
        setPageType("signIn")
      })
      .catch((error) => {
        const errorCode = error.code;
        setmessage(errorCode)
        settype("danger")
        setShow(true)
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col xs={12}>
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <Input
              type="email"
              name="email"
              id="email"
              value={inputValues.email}
              placeholder={t('email-place')}
              handleChange={(e) =>
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
            <Input
              type="password"
              name="password"
              id="password"
              required
              placeholder={t('password-place')}
              value={inputValues.password}
              handleChange={(e) =>
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
            {t('signup')}
          </button>
        </Col>
      </Row>
      <StatusModal setShow={setShow} show={show} type={type} message={message} />
    </form>
  );
};

export default SignUp;
