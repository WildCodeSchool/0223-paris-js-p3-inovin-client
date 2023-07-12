import React, { useEffect } from 'react';
import './Slider.scss';

function Slider({ name, labels, onChange }) {
  const handleSliderChange = (event) => {
    const selectedLabel = labels[event.target.value - 1].id;
    onChange(name, selectedLabel);
  };



  return (
    <div>
      <datalist id="values">
        {labels.map((label, index) => (
          <option key={index} value={label.id} label={label.name} />
        ))}
      </datalist>
      <input
        type="range"
        id="tasteB"
        name="taste"
        list="values"
        min="1"
        max={labels.length}
        step="1"
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default Slider;

