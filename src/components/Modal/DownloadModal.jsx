import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { downloadToggleAction } from "../../stateManagement/actions/downloadfileAction";
import { useTranslation } from "react-i18next";

const DownloadModal = ({ modalShow, pdf, png, jpg, setdownloadStart }) => {
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const handleToggleDownloadModal = () => {
    dispatch(downloadToggleAction({ show: false, hide: true }));
  };

  return (
    <Modal centered show={modalShow} onHide={handleToggleDownloadModal}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">{t('download-format')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <button
            className="btn btn-primary w-100 my-1"
            onClick={() => {
              jpg();
              setdownloadStart(false);
            }}
          >
            {t('download-jpg')}
          </button>
          <button
            onClick={() => {
              png();
              setdownloadStart(false);
            }}
            className="btn btn-primary w-100 my-1"
          >
            {t('download-png')}
          </button>
          <button
            className="btn btn-primary w-100 my-1"
            onClick={() => {
              pdf();
              setdownloadStart(false);
            }}
          >
            {t('download-pdf')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DownloadModal;
