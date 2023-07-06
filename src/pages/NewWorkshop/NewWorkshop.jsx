import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSession } from "../../services/session";
import "./NewWorkshop.scss";

const NewWorkshop = () => {
  const [workshop, setWorkshop] = useState({});
  const navigate = useNavigate();

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
                <option value="La Cascade">La Cascade</option>
                <option value="La Tour de Carol">La Tour de Carol</option>
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
              <button onClick={handleRegisterClick}>
                Enregistrer l'atelier
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewWorkshop;

ref;
