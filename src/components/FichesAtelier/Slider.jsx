import React from "react";
import "./Slider.scss";

function Slider() {
  return (
    <div>
      <label htmlFor="tempB"></label>
      <br />
      <input type="range" id="tempB" name="temp" list="values" max="75" />

      <datalist id="values">
        <option value="0" label="Pâle" />
        <option value="25" label="Claire" />
        <option value="50" label="Soutenue" />
        <option value="75" label="Intense" />
      </datalist>
    </div>
  );
}
export default Slider;
