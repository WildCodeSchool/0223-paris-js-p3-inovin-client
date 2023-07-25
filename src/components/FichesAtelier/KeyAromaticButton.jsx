import React, { useState } from "react";
import "./KeyAromaticButton.scss";

const KeyAromaticButton = ({ label, id, onChange, name }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    const selectedLabel = id;
    onChange(name, selectedLabel);
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
