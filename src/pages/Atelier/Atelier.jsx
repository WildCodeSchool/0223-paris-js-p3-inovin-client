import React from "react";
import "./Atelier.scss";
import logo from "../../assets/logo.svg";
import Oeil from "../../components/Atelier/Oeil";

const atelier = () => {
  return (
    <div className="page-container">
      <header className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <h1 className="title">Atelier dégustation</h1>
      <p className="subtitle">Noter le premier vin</p>
      <h2 className="Oeil">L'Oeil</h2>
      <h3 className="Couleur">Couleur</h3>
      < Oeil />
      <button className="round-button" onClick={() => navigate}>
        {" "}
        Validate
      </button>
      </div>
      
  );
};

export default atelier;
