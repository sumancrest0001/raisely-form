import React from 'react';
import classes from './messageModal.module.css';

const messageModal = ({ onClose, children }) => {
  return (
    <>
      <div className={classes.Backdrop} onClick={onClose} />
      <div className={classes.MessageModal}>
        <h2>An Error Occurred!</h2>
        <p>{children}</p>
        <div className={classes.Actions}>
          <button type="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </>
  );
};

export default messageModal;
