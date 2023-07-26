import React, { useState, useEffect } from "react";
import "./FichesAtelier.scss";
import ColorButton from "../../components/FichesAtelier/ColorButton";
import Slider from "../../components/FichesAtelier/Slider";
import KeyAromaticButton from "../../components/FichesAtelier/KeyAromaticButton";
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import NoteSelector from "../../components/FichesAtelier/NoteSelector";
import BtnValiAtelier from "../../components/FichesAtelier/BtnValiAtelier";

const FichesAtelier = () => {
  const [selectedValue, setSelectedValue] = useState({
    couleur: "",
    intensiteCouleur: 27,
    fluidite: 31,
    limpidité: 35,
    brillance: 39,
    intensiteArome: 42,
    complexite: 46,
    aromeNez: [],
    tanins: 58,
    acidite: 62,
    robe: 66,
    sucre: 70,
    alcool: 74,
    persistance: 78,
    aromeBouche: [],
  });
  const [wines, setWines] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentWine, setCurrentWine] = useState(0);

  const { id } = useParams();

  const [note, setNote] = useState(5);
  const [session, setSession] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("tags/wines").then((result) => setTags(result.data));
    api.get(`sessions/${id}/wine`).then((result) => setWines(result.data));
    api.get(`sessions/${id}`).then((result) => setSession(result.data));
  }, []);

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  const handleSliderChange = (name, label) => {
    if (name === "aromeNez" || name === "aromeBouche") {
      if (!selectedValue[name].includes(label)) {
        const newArray = [...selectedValue[name]];
        newArray.push(label);
        setSelectedValue({
          ...selectedValue,
          [name]: newArray,
        });
      } else {
        setSelectedValue({
          ...selectedValue,
          [name]: selectedValue[name].filter((e) => e !== label),
        });
      }
    } else {
      setSelectedValue({ ...selectedValue, [name]: label });
    }
  };

  const handleSubmit = async () => {
    if (
      !Object.values(selectedValue)[0] ||
      !Object.values(selectedValue)[7].length ||
      !Object.values(selectedValue)[14].length
    ) {
      return;
    }
    try {
      console.log({
        wine_id: wines[currentWine]?.wine_id,
        note: note,
      });
      await api.post(`notes/${id}`, {
        wine_id: wines[currentWine]?.wine_id,
        note: note,
      });
      const note_id = await api.get(`notes/user/${wines[currentWine]?.wine_id}/${id}`);

      for (let i = 0; i < Object.values(selectedValue).length; i++) {
        if (Array.isArray(Object.values(selectedValue)[i])) {
          for (let j = 0; j < Object.values(selectedValue)[i].length; j++) {
            await api.post(`notes/noteHasTag`, {
              note_id: note_id.data[0].id,
              tag_id: Object.values(selectedValue)[i][j],
            });
          }
        } else {
          await api.post(`notes/noteHasTag`, {
            note_id: note_id.data[0].id,
            tag_id: Object.values(selectedValue)[i],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setCurrentWine(currentWine + 1);
    setSelectedValue({
      couleur: "",
      intensiteCouleur: 28,
      fluidite: 31,
      limpidité: 35,
      brillance: 39,
      intensiteArome: 42,
      complexite: 46,
      aromeNez: [],
      tanins: 58,
      acidite: 62,
      robe: 66,
      sucre: 70,
      alcool: 74,
      persistance: 78,
      aromeBouche: [],
    });
    window.scrollTo(0, 0);
    if (currentWine == 4) {
      if (session.category == "Dégustation") {
        navigate("/");
      } else {
        navigate(`/creation/${id}`);
      }
    }
  };

  return (
    <div className="page-container">
      <h1 className="title">Atelier dégustation</h1>
      <p className="subtitle">Noter le vin {currentWine + 1}</p>
      <h2 className="oeil">L'OEIL</h2>
      <h3 className="couleur">COULEUR</h3>
      <ColorButton tags={tags} onChange={handleSliderChange} name="couleur" currentWine={currentWine} />
      <div className="container-oeil">
        <div className="container-suboeil">
          <h3 className="intensite">INTENSITÉ DE LA COULEUR</h3>
          <Slider
            name="intensiteCouleur"
            currentWine={currentWine}
            labels={tags.filter((e) => {
              return e.category == "Oeil" && e.sub_category == "Intensité de la Couleur ";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-suboeil">
          <h3 className="fluidité">FLUIDITÉ DES LARMES</h3>
          <Slider
            currentWine={currentWine}
            name="fluidite"
            labels={tags.filter((e) => {
              return e.category == "Oeil" && e.sub_category == "Fluidité des Larmes";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-suboeil">
          <h3 className="limpidité">LIMPIDITÉ</h3>
          <Slider
            currentWine={currentWine}
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
            currentWine={currentWine}
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
            currentWine={currentWine}
            name="intensiteArome"
            labels={tags.filter((e) => {
              return e.category == "Nez" && e.sub_category == "Intensité des Arômes";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subnez">
          <h3 className="complexite">COMPLEXITÉ</h3>
          <Slider
            currentWine={currentWine}
            name="complexite"
            labels={tags.filter((e) => {
              return e.category == "Nez" && e.sub_category == "Complexité";
            })}
            onChange={handleSliderChange}
          />
        </div>
      </div>
      <h3 className="famillesAromatiques">FAMILLES ARÔMATIQUES</h3>
      <div className="container-famillesAromatiques">
        {tags
          .filter((e) => e.category == "Nez" && e.sub_category == "Familles Arômatiques")
          .map((e) => (
            <KeyAromaticButton
              key={e.id}
              label={e.name}
              id={e.id}
              name="aromeNez"
              onChange={handleSliderChange}
              currentWine={currentWine}
            />
          ))}
      </div>
      <h2 className="bouche">LA BOUCHE</h2>
      <div className="container-bouche">
        <div className="container-subbouche">
          <h3 className="tanins">TANINS</h3>
          <Slider
            currentWine={currentWine}
            name="tanins"
            labels={tags.filter((e) => {
              return e.category == "La Bouche" && e.sub_category == "Tanins";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subbouche">
          <h3 className="acidite">ACIDITÉ</h3>
          <Slider
            currentWine={currentWine}
            name="acidite"
            labels={tags.filter((e) => {
              return e.category == "La Bouche" && e.sub_category == "Acidité";
            })}
            onChange={handleSliderChange}
          />
        </div>
        <div className="container-subbouche">
          <h3 className="robe">ROBE</h3>
          <Slider
            currentWine={currentWine}
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
            currentWine={currentWine}
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
            currentWine={currentWine}
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
          className="slidediv"
            currentWine={currentWine}
            name="persistance"
            labels={tags.filter((e) => {
              return e.category == "La Bouche" && e.sub_category == "Persistance Arômatique";
            })}
            onChange={handleSliderChange}
          />
        </div>
      </div>
      <h3 className="famillesAromatiques">FAMILLES ARÔMATIQUES</h3>
      <div className="container-famillesAromatiques">
        {tags
          .filter((e) => e.category == "La Bouche" && e.sub_category == "Familles Arômatiques")
          .map((e) => (
            <KeyAromaticButton
              key={e.id}
              label={e.name}
              id={e.id}
              name="aromeBouche"
              onChange={handleSliderChange}
              currentWine={currentWine}
            />
          ))}
      </div>
      <h2 className="impression">IMPRESSION GÉNÉRALE</h2>
      <div className="container-impression">
        <div className="container-subimpression">
          <NoteSelector setNote={setNote} note={note} />
        </div>
        <div className="container-BtnValiAtelier">
          <BtnValiAtelier handleSubmit={handleSubmit} />
        </div>
        <div className="container-footer"></div>
      </div>
    </div>
  );
};

export default FichesAtelier;
