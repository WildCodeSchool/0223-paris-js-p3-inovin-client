import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSession, getLocations } from "../../services/session";
import "./NewWorkshop.scss";
import BtnBack from "../../components/BtnBack/BtnBack";

const NewWorkshop = () => {
  const [workshop, setWorkshop] = useState({});
  const [locations, setLocations] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getLocationsInfos = async () => {
      try {
        const locationsInfos = await getLocations();
        setLocations(locationsInfos.data);
      } catch (error) {}
    };
    getLocationsInfos();
  }, []);

  const handleChange = (event) => {
    let { value, name } = event.target;
    setWorkshop((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleRegisterClick = async () => {
    const result = await postSession(workshop);
    console.log(result.data[0].insertId);

    navigate("/ateliers");
  };

  return (
    <div className="newWorkshop">
      <BtnBack handleBackClick={() => navigate("/ateliers")} />

      <h2>Ajouter un nouvel Atelier</h2>
      <table>
        <thead>
          <tr>
            <th>Date et heure</th>
            <th>Type d'atelier</th>
            <th>Lieu</th>
            <th>Nombre de paticipants</th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                name="date"
                type="datetime-local"
                onChange={handleChange}
              />
            </td>

            <td>
              <select name="category" id="cat-select" onChange={handleChange}>
                <option value="">--Catégorie d'atelier--</option>
                <option value="Création">Création et Dégustation</option>
                <option value="Dégustation">Dégustation</option>
              </select>
            </td>
            <td>
              <select
                name="location"
                id="location-select"
                onChange={handleChange}
              >
                <option value="">--Lieu--</option>
                {locations.length > 0 &&
                  locations.map((location, index) => {
                    return (
                      <option key={index} value={location.id}>
                        {location.place_name}
                      </option>
                    );
                  })}
              </select>
            </td>
            <td>
              <input
                type="number"
                name="max_participants"
                min={0}
                max={15}
                value={workshop.max_participants}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                name="price"
                min={0}
                defaultValue={70}
                onChange={handleChange}
              />
            </td>
            <td className="buttonCell">
              <button onClick={handleRegisterClick} className="btn">
                Enregistrer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewWorkshop;
