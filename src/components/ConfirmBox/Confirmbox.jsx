import React from "react";
import "./ConfirmBox.scss";

const Confirmbox = ({ text, onCancel, onConfirm }) => {
  return (
    <div className="confirmbox-bg">
      <div className="confirmbox">
        <div className="confirmbox-content">
          <p>{text}</p>
        </div>
        <div className="confirmbox-buttons">
          <button onClick={onConfirm} className="confirmbox-buttons__confirm">
            Confirmer
          </button>
          <button onClick={onCancel} className="confirmbox-buttons__cancel">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmbox;
