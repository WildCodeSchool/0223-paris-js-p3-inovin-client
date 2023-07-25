import React from "react";
import "./BtnAdd.scss";

const BtnAdd = ({ handleAddClick, title }) => {
  return (
    <button className="addButton btn" onClick={handleAddClick}>
      {title}
    </button>
  );
};

export default BtnAdd;
