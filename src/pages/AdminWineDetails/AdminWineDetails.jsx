import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWineById } from "../../services/wines";
import BtnBack from "../../components/BtnBack/BtnBack";
import useConfirm from "../../services/useConfirm";
import Confirmbox from "../../components/ConfirmBox/Confirmbox";
import { deleteWine, updateWine } from "../../services/wines";
import "./AdminWineDetails.scss";

const AdminWineDetails = () => {
  const [wine, setWine] = useState({
    wine_img: "",
    wine_name: "",
    region_name: "",
    cepage: "",
    color: "",
    comment: "",
    domain: "",
    manufacture_year: "",
    appellation: "",
  });
  const { confirm, confirmState, onCancel, onConfirm } = useConfirm();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getWineInfos = async (id) => {
      try {
        const wineInfos = await getWineById(id);
        setWine(wineInfos.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getWineInfos(id);
  }, []);

  const handleChange = (e) => {
    setWine((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleDeleteClick = async (wine) => {
    try {
      const isConfirmed = await confirm(
        `Êtes-vous sûr de vouloir supprimer ce vin ?`
      );

      if (isConfirmed) {
        await deleteWine(wine.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick = async (wine) => {
    try {
      const isConfirmed = await confirm(
        `Êtes-vous sûr de vouloir enregistrer les modifications ?`
      );

      if (isConfirmed) {
        await updateWine(wine);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-wine-details">
      {confirmState.show ? (
        <Confirmbox
          text={confirmState.text}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ) : null}
      <BtnBack handleBackClick={() => navigate(`/admin/vins`)} />

      <div className="content">
        <div className="image">
          <img src={wine.wine_img} alt="Bouteille de vin" />
        </div>
        <div className="content-body">
          <label htmlFor="">
            Nom du vin :
            <input
              type="text"
              name="name"
              onChange={(e) => handleChange(e)}
              value={wine.wine_name}
            />
          </label>
          <label htmlFor="">
            Nom du domaine :
            <input
              type="text"
              name="domain"
              onChange={(e) => handleChange(e)}
              value={wine.domain}
            />
          </label>
          <label htmlFor="">
            Année de production :
            <input
              type="text"
              name="manufacture_year"
              onChange={(e) => handleChange(e)}
              value={wine.manufacture_year}
            />
          </label>
          <label htmlFor="">
            Type :
            <input
              type="text"
              name="color"
              onChange={(e) => handleChange(e)}
              value={wine.color}
            />
          </label>
          <label htmlFor="">
            Région :
            <input
              type="text"
              name="region"
              onChange={(e) => handleChange(e)}
              value={wine.region_name}
            />
          </label>
          <label htmlFor="">
            Appellation :
            <input
              type="text"
              name="appellation"
              onChange={(e) => handleChange(e)}
              value={wine.appellation}
            />
          </label>
          <label htmlFor="">
            Cépage :
            <input
              type="text"
              name="cepage"
              onChange={(e) => handleChange(e)}
              value={wine.cepage}
            />
          </label>
          <label htmlFor="" className="comment">
            Description :
            <textarea
              className="comment-input"
              type="text"
              name="comment"
              onChange={(e) => handleChange(e)}
              value={wine.comment}
            />
          </label>
          <div className="content-buttons">
            <button className="btn" onClick={() => handleSaveClick(wine)}>
              Enregistrer les modifications
            </button>
            <button className="btn" onClick={(wine) => handleDeleteClick(wine)}>
              Supprimer le vin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWineDetails;
