import React from "react";
import "./Atelier.scss";
import logo from "../../../public/logo.svg";

const atelier = () => {
  return (
    <div className="page-container">
      <header className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="line" />
      </header>
      <h1 className="title">Atelier dégustation</h1>
      <p className="subtitle">Noter le premier vin</p>

      <div className="body-container">
        <p className="Oeil">L'Oeil</p>
        <p className="Nez">Le Nez</p>
        <p className="Bouche">La Bouche</p>
      </div>
    </div>
  );
};

export default atelier;
