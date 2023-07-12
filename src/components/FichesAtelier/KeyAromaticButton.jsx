import React, { useState } from "react";
import "./KeyAromaticButton.scss";

const KeyAromaticButton = ({ label }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      className={`key-aromatic ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default KeyAromaticButton;
