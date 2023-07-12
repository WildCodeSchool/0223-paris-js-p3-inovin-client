import React, { useState, useEffect } from "react";
import "./FichesAtelier.scss";
import ColorButton from "../../components/FichesAtelier/ColorButton";
import Slider from "../../components/FichesAtelier/Slider";
import KeyAromaticButton from "../../components/FichesAtelier/KeyAromaticButton";

const FichesAtelier = () => {
  const [selectedValue, setSelectedValue] = useState({intensite : "", fludite: ""}); 

  const handleSliderChange = (name, label) => {
    setSelectedValue({...selectedValue, [name]: label});
    console.log(label);
    console.log(selectedValue);
  };

  return (
    <div className="page-container">
      <h1 className="title">Atelier dégustation</h1>
      <p className="subtitle">Noter le premier vin</p>
      <h2 className="oeil">L'OEIL</h2>
      <h3 className="couleur">COULEUR</h3>
      <ColorButton />
      <div className="container-oeil">
        <div className="container-suboeil">
          <h3 className="intensite">INTENSITÉ DE LA COULEUR</h3>
          <Slider
            name="intensite"
            labels={["Pâle", "Claire", "Soutenue", "Intense"]}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-suboeil">
          <h3 className="fluidité">FLUIDITÉ DES LARMES</h3>
          <Slider labels={["Visqueuses", "Épaisses", "Coulantes", "Fluides"]}onChange={handleSliderChange} />
          
          
        </div>
        <div className="container-suboeil">
          <h3 className="limpidité">LIMPIDITÉ</h3>
          <Slider labels={["Trouble", "Floue", "Voilée", "Limpide"]} onChange={handleSliderChange}/>
        </div>
        <div className="container-suboeil">
          <h3 className="brillance">BRILLANCE</h3>
          <Slider labels={["Terne", "Lumineuse", "Étincelante"]} onChange={handleSliderChange}/>
        </div>
      </div>

      <h2 className="nez">LE NEZ</h2>
      <div className="container-nez">
        <div className="container-subnez">
          <h3 className="intensite">INTENSITÉ DES ARÔMES</h3>
          <Slider labels={["Fermé", "Discret", "Aromatique", "Ouvert"]}onChange={handleSliderChange} />
        </div>
        <div className="container-subnez">
          <h3 className="complexite">COMPLEXITÉ</h3>
          <Slider labels={["Douteux", "Simple", "Franc", "Complexe"]}onChange={handleSliderChange} />
        </div>
      </div>
      <h3 className="famillesAromatiques">FAMILLES ARÔMATIQUES</h3>
      <KeyAromaticButton label="Fruité" />
      <KeyAromaticButton label="Floral" />
      <KeyAromaticButton label="Végétal" />
      <KeyAromaticButton label="Boisé" />
      <KeyAromaticButton label="Balsamique" />
      <KeyAromaticButton label="Minéral" />
      <KeyAromaticButton label="Animal" />
      <KeyAromaticButton label="Epicé" />

      <h2 className="bouche">LA BOUCHE</h2>
      <div className="container-bouche">
        <div className="container-subbouche">
          <h3 className="tanins">TANINS</h3>
          <Slider labels={["Âpre", "Charpenté", "Fondu", "Lisse"]}onChange={handleSliderChange} />
        </div>
        <div className="container-subbouche">
          <h3 className="tanins">ACIDITÉ</h3>
          <Slider labels={["Moux", "Frais", "Vif", "Nerveux"]}onChange={handleSliderChange} />
        </div>
        <div className="container-subbouche">
          <h3 className="tanins">ROBE</h3>
          <Slider labels={["Légère", "Fluide", "Charpentée", "Epaisse"]} onChange={handleSliderChange}/>
        </div>
        <div className="container-subbouche">
          <h3 className="tanins">SUCRE</h3>
          <Slider labels={["Sec", "Doux", "Moelleux", "Liquoreux"]} onChange={handleSliderChange}/>
        </div>
        <div className="container-subbouche">
          <h3 className="tanins">ALCOOL</h3>
          <Slider labels={["Faible", "Généreux", "Gras", "Alcooleux"]} onChange={handleSliderChange}/>
        </div>
        <div className="container-subbouche">
          <h3 className="tanins">PERSISTANCE ARÔMATIQUE</h3>
          <Slider labels={["Courte", "Développée", "Longue", "Persistante"]} onChange={handleSliderChange}/>
        </div>
      </div>
      <h3 className="famillesAromatiques">FAMILLES ARÔMATIQUES</h3>
      <button className="key-aromatic">Fruité</button>
      <button className="key-aromatic">Floral</button>
      <button className="key-aromatic">Végétal</button>
      <button className="key-aromatic">Boisé</button>
      <button className="key-aromatic">Balsamique</button>
      <button className="key-aromatic">Minéral</button>
      <button className="key-aromatic">Animal</button>
      <button className="key-aromatic">Epicé</button>
    </div>
  );
};

export default FichesAtelier;
