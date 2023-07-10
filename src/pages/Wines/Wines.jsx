import "./Wines.scss";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Wines({ color }) {
  const [winelist, setWineList] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    api
      .get("wines")
      .then((result) =>
        setWineList(
          color ? result.data.filter((e) => e.color == color) : result.data
        )
      );
  }, [nav]);


  return (
    <div className="ourwines">
      <h1>
        Découvrir nos vins {color && color.toLowerCase() + "s"} partenaires
      </h1>
      <p className="desc">
        Dans les vignobles où le soleil danse, Les ceps s'étirent, tels des bras
        en transe. Le vin, tel un poème, coule dans les veines, Des trésors en
        flacons, des élixirs sans peine.
      </p>
      <div className="wines-container">
        {winelist.map((e) => {
          return (
            <div className="wine" key={e.id}>
              <img src={e.image} onClick={() => nav(`/wines/${e.id}`)} />
              <p>
                {e.name}, {e.manufacture_year}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wines;
