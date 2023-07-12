import React, { useState, useEffect } from "react";
import "./FichesAtelier.scss";
import ColorButton from "../../components/FichesAtelier/ColorButton";
import Slider from "../../components/FichesAtelier/Slider";
import KeyAromaticButton from "../../components/FichesAtelier/KeyAromaticButton";
import api from "../../services/api";
import { useParams } from "react-router-dom";

const FichesAtelier = () => {
  const [selectedValue, setSelectedValue] = useState({
    couleur: "",
    intensiteCouleur: "",
    fluidite: "",
    limpidité: "",
    brillance: "",
    intensiteArome: "",
    complexite: "",
    aromeNez:"",
    tanins: "",
    acidite: "",
    robe: "",
    sucre:"",
    alcool:"",
    persistance: "",
    aromeBouche: ""

  });
  const [wines, setWines] = useState([]);
  const [tags, setTags] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    api.get("tags/wines").then((result) => setTags(result.data));
    api.get(`sessions/${id}/wine`).then((result) => setWines(result.data));
  }, []);

  const handleSliderChange = (name, label) => {
    setSelectedValue({ ...selectedValue, [name]: label });
    console.log(label);
    console.log(selectedValue);
  };

  return (
    <div className="page-container">
      <h1 className="title">Atelier dégustation</h1>
      <p className="subtitle">Noter le premier vin</p>
      <h2 className="oeil">L'OEIL</h2>
      <h3 className="couleur">COULEUR</h3>
      <ColorButton tags={tags} onChange={handleSliderChange} name="couleur" />
      <div className="container-oeil">
        <div className="container-suboeil">
          <h3 className="intensite">INTENSITÉ DE LA COULEUR</h3>
          <Slider
            name="intensiteCouleur"
            labels={tags.filter((e) => {
              return (
                e.category == "Oeil" &&
                e.sub_category == "Intensité de la Couleur "
              );
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-suboeil">
          <h3 className="fluidité">FLUIDITÉ DES LARMES</h3>
          <Slider
            name="fluidite"
            labels={tags.filter((e) => {
              return (
                e.category == "Oeil" && e.sub_category == "Fluidité des Larmes"
              );
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-suboeil">
          <h3 className="limpidité">LIMPIDITÉ</h3>
          <Slider
            name="limpidité"
            labels={tags.filter((e) => {
              return e.category == "Oeil" && e.sub_category == "Limpidité";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-suboeil">
          <h3 className="brillance">BRILLANCE</h3>
          <Slider
            name="brillance"
            labels={tags.filter((e) => {
              return e.category == "Oeil" && e.sub_category == "Brillance";
            })}
            onChange={handleSliderChange}
          />
        </div>
      </div>

      <h2 className="nez">LE NEZ</h2>
      <div className="container-nez">
        <div className="container-subnez">
          <h3 className="intensite">INTENSITÉ DES ARÔMES</h3>
          <Slider
            name="intensiteArome"
            labels={tags.filter((e) => {
              return (
                e.category == "Nez" && e.sub_category == "Intensité des Arômes"
              );
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subnez">
          <h3 className="complexite">COMPLEXITÉ</h3>
          <Slider
            name="complexite"
            labels={tags.filter((e) => {
              return e.category == "Nez" && e.sub_category == "Complexité";
            })}
            onChange={handleSliderChange}
          />
        </div>
      </div>
      <h3 className="famillesAromatiques">FAMILLES ARÔMATIQUES</h3>
      {tags
        .filter(
          (e) => e.category == "Nez" && e.sub_category == "Familles Arômatiques"
        )
        .map((e) => (
          <KeyAromaticButton label={e.name} id={e.id} name='aromeNez' onChange={handleSliderChange}/>
        ))}

      <h2 className="bouche">LA BOUCHE</h2>
      <div className="container-bouche">
        <div className="container-subbouche">
          <h3 className="tanins">TANINS</h3>
          <Slider
            name="tanins"
            labels={tags.filter((e) => {
              return e.category == "La Bouche" && e.sub_category == "Tanins";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subbouche">
          <h3 className="acidité">ACIDITÉ</h3>
          <Slider
            name="acidité"
            labels={tags.filter((e) => {
              return e.category == "La Bouche" && e.sub_category == "Acidité";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subbouche">
          <h3 className="robe">ROBE</h3>
          <Slider
            name="robe"
            labels={tags.filter((e) => {
              return e.category == "La Bouche" && e.sub_category == "Robe";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subbouche">
          <h3 className="sucre">SUCRE</h3>
          <Slider
             name="sucre"
             labels={tags.filter((e) => {
               return e.category == "La Bouche" && e.sub_category == "Sucre";
             })}
             onChange={handleSliderChange}
           />
        </div>
        <div className="container-subbouche">
          <h3 className="alcool">ALCOOL</h3>
          <Slider
            name="alcool"
            labels={tags.filter((e) => {
              return e.category == "La Bouche" && e.sub_category == "Alcool";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subbouche">
          <h3 className="persistance-aromatique">PERSISTANCE ARÔMATIQUE</h3>
          <Slider
           name="persistance"
           labels={tags.filter((e) => {
             return e.category == "La Bouche" && e.sub_category == "Persistance Arômatique";
           })}
           onChange={handleSliderChange}
         />
        </div>
      </div>
      <h3 className="famillesAromatiques">FAMILLES ARÔMATIQUES</h3>
      {tags
        .filter(
          (e) => e.category == "La Bouche" && e.sub_category == "Familles Arômatiques"
        )
        .map((e) => (
          <KeyAromaticButton label={e.name} id={e.id} name='aromeBouche' onChange={handleSliderChange} />
        ))}
    </div>
  );
};

export default FichesAtelier;
