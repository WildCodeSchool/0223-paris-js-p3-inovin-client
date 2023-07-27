import { useEffect, useState } from "react";
import "./SelectedRecipe.scss";
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import BubbleChart from "../../components/BubbleChart/BubbleChart";

function SelectedRecipe() {
  const [recipe, setRecipe] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedWine, setSelectedWine] = useState(0);

  const [condensedData, setCondensedData] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    api.get(`creations/${id}`).then((result) =>
      setRecipe(
        result.data.map((e) => {
          e.time = new Date(e.date);
          return e;
        })
      )
    );
  }, []);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  useEffect(() => {
    const groupedData = new Map();
    recipe.forEach((item) => {
      const {
        category,
        sub_category,
        wine_img,
        note,
        percent_wine,
        tag,
        wine,
        wine_id,
        place_name,
        time,
        session_img,
      } = item;
      if (groupedData.has(wine)) {
        groupedData.get(wine).tags.push({
          category: category,
          sub_category: sub_category,
          tag: tag,
        });
      } else {
        groupedData.set(wine, {
          wine,
          wine_id,
          wine_img,
          percent_wine,
          note,
          place_name,
          session_img,
          time,
          tags: [{ category: category, sub_category: sub_category, tag: tag }],
        });
      }
    });

    setCondensedData(Array.from(groupedData.values()).slice(0, 3));
  }, [recipe]);

  useEffect(() => {
    setTags([]);
    setTags((prevTags) => {
      let updatedTags = [];

      if (condensedData[0]?.tags && condensedData[0]?.tags.length > 0) {
        updatedTags = updatedTags.concat(
          condensedData[0].tags
            .filter((e) => e.sub_category == "Familles Arômatiques")
            .map((e) => ({
              name: e.tag,
              value: condensedData[0].percent_wine,
              color: e.category === "La Bouche" ? "#9C2B2B" : "#DAAEAE",
            }))
        );
      }

      if (condensedData[1]?.tags && condensedData[1]?.tags.length > 0) {
        updatedTags = updatedTags.concat(
          condensedData[1].tags
            .filter((e) => e.sub_category == "Familles Arômatiques")
            .map((e) => ({
              name: e.tag,
              value: condensedData[1].percent_wine,
              color: e.category === "La Bouche" ? "#9C2B2B" : "#DAAEAE",
            }))
        );
      }

      if (condensedData[2]?.tags && condensedData[2]?.tags.length > 0) {
        updatedTags = updatedTags.concat(
          condensedData[2].tags
            .filter((e) => e.sub_category == "Familles Arômatiques")
            .map((e) => ({
              name: e.tag,
              value: condensedData[2].percent_wine,
              color: e.category === "La Bouche" ? "#9C2B2B" : "#DAAEAE",
            }))
        );
      }

      return [...prevTags, ...updatedTags];
    });
  }, [condensedData]);

  return (
    <div className="selected-recipe">
      <div className="creation-container">
        <h2>{condensedData[0]?.place_name}</h2>
        <p className="date">
          {condensedData[0]?.time.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <img src={condensedData[0]?.session_img} alt="" />
        <p className="legend-title">Famille aromatique</p>
        <div className="legend">
          <div className="circle nose"></div>
          <p>Nez</p>
          <div className="circle mouth"></div>
          <p>Bouche</p>
        </div>
        <BubbleChart data={tags} />
      </div>
      <div className="recipe">
        <div className="wines">
          <p
            className="wine"
            onClick={() => setSelectedWine(0)}
            style={{
              borderBottom: selectedWine == 0 ? "1px solid black" : null,
            }}
          >
            Vin n°1
          </p>
          <p
            className="wine"
            onClick={() => setSelectedWine(1)}
            style={{
              borderBottom: selectedWine == 1 ? "1px solid black" : null,
            }}
          >
            Vin n°2
          </p>
          <p
            className="wine"
            onClick={() => setSelectedWine(2)}
            style={{
              borderBottom: selectedWine == 2 ? "1px solid black" : null,
            }}
          >
            Vin n°3
          </p>
        </div>
        <div className="details-container">
          <div className="wine-img">
            <p> {condensedData[selectedWine]?.wine}</p>
            <p> {condensedData[selectedWine]?.percent_wine}%</p>
            <img
              src={condensedData[selectedWine]?.wine_img}
              alt=""
              onClick={() => nav(`/wines/${condensedData[selectedWine]?.wine_id}`)}
            />
            <p className="note">Note : {condensedData[selectedWine]?.note}/10</p>
          </div>
          <div className="wine-details">
            <h4>Oeil</h4>

            {condensedData[selectedWine]?.tags
              .filter((item) => item.category === "Oeil")
              .map((item) => (
                <p>
                  {item.sub_category} : {item.tag}
                </p>
              ))}

            <h4>Nez</h4>

            {condensedData[selectedWine]?.tags
              .filter((item) => item.category === "Nez" && item.sub_category !== "Familles Arômatiques")
              .map((item) => (
                <p>
                  {item.sub_category} : {item.tag}
                </p>
              ))}

            <h4>Bouche</h4>

            {condensedData[selectedWine]?.tags
              .filter((item) => item.category === "La Bouche" && item.sub_category !== "Familles Arômatiques")
              .map((item) => (
                <p>
                  {item.sub_category} : {item.tag}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedRecipe;
