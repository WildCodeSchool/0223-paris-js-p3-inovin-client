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

  const handleChange = () => {};

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
              onChange={(e) => handleChange(e)}
              value={wine.name}
            />
          </label>
          <label htmlFor="">
            Nom du domaine :
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              value={wine.domain}
            />
          </label>
          <label htmlFor="">
            Année de production :
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              value={wine.manufacture_year}
            />
          </label>
          <label htmlFor="">
            Région :
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              value={wine.region}
            />
          </label>
          <label htmlFor="">
            Année de production :
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              value={wine.manufacture_year}
            />
          </label>
        </div>
        <div className="content-footer"></div>
      </div>
    </div>
  );
};

export default AdminWineDetails;
