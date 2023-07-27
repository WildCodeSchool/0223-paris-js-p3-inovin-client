import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSession, getLocations } from "../../services/session";
import "./NewWorkshop.scss";
import BtnBack from "../../components/BtnBack/BtnBack";

const NewWorkshop = () => {
  const [workshop, setWorkshop] = useState({ price: 70 });
  const [locations, setLocations] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const getLocationsInfos = async () => {
      try {
        const locationsInfos = await getLocations();
        console.log(locationsInfos.data);
        setLocations(locationsInfos.data);
      } catch (error) {}
    };
    getLocationsInfos();
  }, []);

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };
  const handleChange = (event) => {
    let { value, name } = event.target;
    setWorkshop((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleRegisterClick = async () => {
    const result = await postSession({
      ...workshop,
      ["date"]: `${date} ${time}`,
    });
    navigate("/ateliers");
  };

  return (
    <div className="newWorkshop">
      <BtnBack handleBackClick={() => navigate("/ateliers")} />

      <h2>Ajouter un nouvel Atelier</h2>
      <div className="content">
        <div className="content-location">
          <label htmlFor="">Lieu :</label>
          <select name="location" id="location-select" onChange={handleChange}>
            <option value="">-- Lieu --</option>
            {locations.length > 0 &&
              locations.map((location, index) => {
                return (
                  <option key={index} value={location.id}>
                    {location.place_name}
                  </option>
                );
              })}
          </select>
          {locations && workshop.location ? (
            <img src={locations[workshop.location - 1].image} alt="" />
          ) : null}
        </div>
        <div className="content-body">
          <label htmlFor="">
            Date :
            <input
              name="date"
              type="date"
              onChange={handleChangeDate}
              className="input"
              value={date}
            />
          </label>

          <label htmlFor="" className="time">
            Heure :
            <input
              name="time"
              type="time"
              onChange={handleChangeTime}
              className="input"
              value={time}
            />
          </label>
          <label htmlFor="">
            Catégorie :
            <select name="category" id="cat-select" onChange={handleChange}>
              <option value="">-- Catégorie d'atelier --</option>
              <option value="Création">Création et Dégustation</option>
              <option value="Dégustation">Dégustation</option>
            </select>
          </label>
          <label htmlFor="">
            Nombre maximum de participants :
            <input
              type="number"
              name="max_participants"
              min={0}
              max={15}
              value={workshop.max_participants}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label htmlFor="">
            Prix :
            <input
              type="number"
              name="price"
              min={0}
              value={workshop.price}
              onChange={handleChange}
              className="input"
            />
          </label>
          <div className="confirm">
            <button
              onClick={handleRegisterClick}
              className="btn"
              disabled={
                date &&
                time &&
                workshop.price &&
                workshop.max_participants &&
                workshop.location &&
                workshop.category
                  ? false
                  : true
              }
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWorkshop;
