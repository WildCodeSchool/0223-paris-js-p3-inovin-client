import React, { useEffect, useState } from "react";
import "./KeyAromaticButton.scss";

const KeyAromaticButton = ({ label, id, onChange, name, currentWine }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    const selectedLabel = id;
    onChange(name, selectedLabel);
  };

  useEffect(() => {
    setIsSelected(false);
  }, [currentWine])

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
