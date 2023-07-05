import React from "react";
import "./NewWorkshop.scss";

const NewWorkshop = () => {
  return (
    <div className="newWorkshop">
      <h2>Ajouter un nouvel Atelier</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
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
              <input name="date" type="date" />
            </td>
            <td>
              <input type="time" name="time" id="" />
            </td>
            <td>
              <select name="category" id="cat-select">
                <option value="">--Catégorie d'atelier--</option>
                <option value="creation">Création et Dégustation</option>
                <option value="degustation">Dégustation</option>
              </select>
            </td>
            <td>
              <select name="location" id="locattion-select">
                <option value="">--Lieu--</option>
                <option value="1">La Cascade</option>
                <option value="2">La Tour de Carol</option>
              </select>
            </td>
            <td>
              <input type="number" name="participantsNumber" min={0} max={15} />
            </td>
            <td>
              <input type="number" name="price" min={0} defaultValue={70} />
            </td>
            <td className="buttonCell">
              <button>Enregistrer l'atelier</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewWorkshop;
