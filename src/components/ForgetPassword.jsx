import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { auth } from './googleSignin/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import StatusModal from './Modal/StatusModal';

function ForgetPassword({ setPageType }) {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const { t } = useTranslation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setType("success");
      setMessage(t('reset-pass-alert'));
      setShow(true);
    } catch (error) {
      setType("danger");
      setMessage(error.code);
      setShow(true);
    }
  };

  return (
    <form>
      <Row className="g-3">
        <Col xs={12}>
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t('forget-pass-place')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Col>
        <Col xs={12}>
          <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-1">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setPageType("signIn")}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleResetPassword}
              disabled={!email}
            >
              {t('send-email')}
            </button>
          </div>
        </Col>
      </Row>
      <StatusModal show={show} setShow={setShow} message={message} type={type} />
    </form>
  );
}

export default ForgetPassword;
