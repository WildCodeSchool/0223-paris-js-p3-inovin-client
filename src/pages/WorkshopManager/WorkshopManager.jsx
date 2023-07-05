import React from "react";
import "./WorkshopManager.scss";

const WorkshopManager = () => {
  return (
    <div className="workshopManager">
      <h2>Gestion des Ateliers</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type d'atelier</th>
            <th>Lieu</th>
            <th>Nombre de paticipants</th>
            <th>Places restantes</th>
            <th>Gestion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>plop</td>
            <td>plop</td>
            <td>plop</td>
            <td>plop</td>
            <td>plop</td>
            <td>
              <button>Détails</button>
              <button>Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WorkshopManager;
