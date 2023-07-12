import React from 'react';
import './Slider.scss';

function Slider({ name, labels, onChange }) {
  const handleSliderChange = (event) => {
    const selectedLabel = event.target.value;
    onChange(name, selectedLabel);
  };

  return (
    <div>
      <datalist id="values">
        {labels.map((label, index) => (
          <option key={index} value={label} label={label} />
        ))}
      </datalist>
      <input
        type="range"
        id="tasteB"
        name="taste"
        list="values"
        min="1"
        max="4"
        step="1"
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default Slider;

