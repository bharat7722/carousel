import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const StatusModal = ({ show, setShow, type, message }) => {
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1500);
  }, [show, setShow]);

  return (
    <>
      {type === "success" && (
        <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Body>
            <button className="btn close__btn--modal" onClick={() => setShow(false)}>
              <FeatherIcon icon="x" size={18} />
            </button>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/images/icons/success.gif" alt="success" className="img-fluid modal__image-icon" />
              <span className="fs-5 fw-semibold">{message ? message : "Success"}</span>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {type === "danger" && (
        <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Body>
            <button className="btn close__btn--modal" onClick={() => setShow(false)}>
              <FeatherIcon icon="x" size={18} />
            </button>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img src="/assets/images/icons/error.gif" alt="success" className="img-fluid modal__image-icon" />
              <span className="fs-5 fw-semibold">{message ? message : "Alert"}</span>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default StatusModal;
