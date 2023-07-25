import React, { useEffect, useState } from "react";
import "./Slider.scss";

function Slider({ name, labels, onChange, currentWine }) {
  const handleSliderChange = (event) => {
    setSelectedTag(event.target.value)
    const selectedLabel = labels[event.target.value - 1].id;
    onChange(name, selectedLabel);
  };
const [selectedTag, setSelectedTag] = useState(1)
useEffect(() => {
setSelectedTag(1)}, [currentWine])

  return (
    <div>
      <datalist id="values">
        {labels.map((label, index) => (
          <option key={index} value={label.id} label={label.name} />
        ))}
      </datalist>
      <input
        className="input-slider"
        type="range"
        id="tasteB"
        name="taste"
        list="values"
        min="1"
        max={labels.length}
        step="1"
        onChange={handleSliderChange}
        value={selectedTag}
      />
    </div>
  );
}

export default Slider;
