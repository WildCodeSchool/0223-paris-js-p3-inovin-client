import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import "./FichesAtelier.scss";
import ColorButton from "../../components/FichesAtelier/ColorButton";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/FichesAtelier/Slider";

const atelier = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    setNavbarVisible(false);
  }, []);

  return (
    <div>
      {navbarVisible && <Navbar />}
      <div className="page-container">
        <header className="logo-container">
          {/* <img src={logo} alt="Logo" className="logo" /> */}
        </header>
        <h1 className="title">Atelier dégustation</h1>
        <p className="subtitle">Noter le premier vin</p>
        <h2 className="Oeil">L'OEIL</h2>
        <h3 className="Couleur">COULEUR</h3>
        <ColorButton />
        <div className="container-oeil">
          <h3 className="Intensite">INTENSITÉ DE LA COULEUR</h3>
          <Slider />
          <h3 className="Fluidité">FLUIDITÉ DES LARMES</h3>
          <Slider />
          <h3 className="Limpidité">LIMPIDITÉ</h3>
          <Slider />
          <h3 className="Brillance">BRILLANCE</h3>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default atelier;
