import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWineById } from "../../services/wines";

import "./AdminWineDetails.scss";

const AdminWineDetails = () => {
  const [wine, setWine] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getWineInfos = async (id) => {
      try {
        const wineInfos = await getWineById(id);
        setWine(wineInfos.data[0]);
        console.log(wineInfos.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getWineInfos(id);
  }, []);

  const handleChange = (e) => {
    setWine((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div className="admin-wine-details">
      <div className="image">
        <img src={wine?.image} alt="Bouteille de vin" />
      </div>
      <div className="content">
        <div className="content-body">
          <label htmlFor="">
            Nom du vin :
            <input
              type="text"
              name="name"
              onChange={(e) => handleChange(e)}
              value={wine.name}
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
              value={wine.region}
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
        </div>
        <div className="content-footer">
          <button className="btn">Enregistrer les modifications</button>
          <button className="btn">Supprimer le vin</button>
        </div>
      </div>
    </div>
  );
};

export default AdminWineDetails;
