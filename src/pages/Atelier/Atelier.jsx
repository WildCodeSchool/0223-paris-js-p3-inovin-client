import React from "react";
import "./Atelier.scss";
import Oeil from "../../components/FichesAtelier/Oeil";

const atelier = () => {
  return (
    <div className="page-container">
      <h1 className="title">Atelier dégustation</h1>
      <p className="subtitle">Noter le premier vin</p>
      <h2 className="Oeil">L'Oeil</h2>
      <h3 className="Couleur">COULEUR</h3>
      <Oeil />
      <div className="container-oeil">
        <h3 className="Intensite">INTENSITÉ DE LA COULEUR</h3>
        <h3 className="Fluidité">FLUIDITÉ DES LARMES</h3>
        <h3 className="Limpidité">LIMPIDITÉ</h3>
        <h3 className="Brillance">BRILLANCE</h3>{" "}
      </div>
    </div>
  );
};

export default atelier;
