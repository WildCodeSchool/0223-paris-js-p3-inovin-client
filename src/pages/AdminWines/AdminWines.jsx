import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWines } from "../../services/wines";
import BtnBack from "../../components/BtnBack/BtnBack";
import BtnAdd from "../../components/BtnAdd/BtnAdd";
import Confirmbox from "../../components/ConfirmBox/Confirmbox";
import useConfirm from "../../services/useConfirm";
import { deleteWine } from "../../services/wines";
import "./AdminWines.scss";

const AdminWines = () => {
  const { confirm, confirmState, onCancel, onConfirm } = useConfirm();
  const [wines, setWines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getWines = async () => {
      try {
        const response = await getAllWines();
        setWines(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getWines();
  }, []);

  const handleDeleteWineClick = async (wine) => {
    try {
      const isConfirmed = await confirm(`Êtes-vous sûr.e de vouloir supprimer le vin ${wine.name} ?`);

      if (isConfirmed) {
        await deleteWine(wine.id);
        const updatedWines = [...wines].filter((e) => e.id != wine.id);
        setWines(updatedWines);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-wines">
      {confirmState.show ? <Confirmbox text={confirmState.text} onConfirm={onConfirm} onCancel={onCancel} /> : null}

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
                    <button className="WMButton btn" onClick={() => navigate(`${wine.id}`)}>
                      Voir détails
                    </button>
                    <button className="WMButton btn" onClick={() => handleDeleteWineClick(wine)}>
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
      <BtnAdd handleAddClick={() => navigate("new")} title={"Ajouter un vin"} />
    </div>
  );
};

export default AdminWines;
