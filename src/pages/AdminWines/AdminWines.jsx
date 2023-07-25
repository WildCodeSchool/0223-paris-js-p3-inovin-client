import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWines } from "../../services/wines";
import BtnBack from "../../components/BtnBack/BtnBack";
import "./AdminWines.scss";

const AdminWines = () => {
  const [wines, setWines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getWines = async () => {
      try {
        const response = await getAllWines();
        setWines(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getWines();
  }, []);
  return (
    <div className="admin-wines">
      <BtnBack handleBackClick={() => navigate(`/`)} />

      <h2>Vins enregistrés</h2>
      {wines.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Nom</th>
              <th>Domaine</th>
              <th className="headerManager">Gestion</th>
            </tr>
          </thead>
          <tbody>
            {wines?.map((wine) => {
              return (
                <tr key={wine.id}>
                  <td>{wine.id}</td>
                  <td>{wine.color}</td>
                  <td>{wine.name}</td>
                  <td>{wine.domain}</td>
                  <td className="buttonCell">
                    <button
                      className="WMButton btn"
                      onClick={() => handleSeeWineClick(wine.id)}
                    >
                      Voir détails
                    </button>
                    <button
                      className="WMButton btn"
                      onClick={() => handleDeleteWineClick(wine)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Aucun vin enregistré dans la base de données</p>
      )}
    </div>
  );
};

export default AdminWines;
