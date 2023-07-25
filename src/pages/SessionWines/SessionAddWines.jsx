import { useEffect, useState } from "react";

import "./SessionAddWines.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWinesBySessionId,
  postWineHasSession,
} from "../../services/session";
import { getAllWines } from "../../services/wines";

export const SessionAddWines = () => {
  const [wines, setWines] = useState([]);
  const [selectedWines, setSelectedWines] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getWines = async (id) => {
      try {
        const selectedWinesInfos = await getWinesBySessionId(id);
        const winesInfos = await getAllWines();
        setSelectedWines(selectedWinesInfos.data);
        setWines(winesInfos.data);
      } catch (error) {
        console.error(error);
      }
    };
    getWines(id);
  }, []);

  const handleAddClick = async (event, wine) => {
    try {
      await postWineHasSession(id, wine.id);
      event.target.disabled = true;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="winesForSession">
      <button
        onClick={() => navigate(`/ateliers/${id}`)}
        className="backButton"
      >
        Retour
      </button>
      {wines?.length > 0 && selectedWines ? (
        <div>
          <h2>Vins disponible</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Domaine</th>
                <th>Type</th>
                <th>Gestion</th>
              </tr>
            </thead>
            <tbody>
              {wines.map((wine) => {
                return (
                  <tr key={wine.id}>
                    <td>{wine.id}</td>
                    <td>{wine.name}</td>
                    <td>{wine.domain}</td>
                    <td>{wine.color}</td>
                    <td className="buttonCell">
                      <button
                        className="manageButton"
                        onClick={(event) => handleAddClick(event, wine)}
                        disabled={
                          selectedWines.some(
                            (selectedWine) => selectedWine.id === wine.id
                          )
                            ? true
                            : false
                        }
                      >
                        Ajouter
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Aucun Vin</p>
      )}
    </div>
  );
};
