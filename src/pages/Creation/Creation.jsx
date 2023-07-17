import "./Creation.scss";
import api from "../../services/api";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function Creation() {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [condensedData, setCondensedData] = useState([]);
  const [inputValue, setInputValue] = useState({
    wine1: 70,
    wine2: 15,
    wine3: 15,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const nav = useNavigate();

  const handleChange = (e) => {
    const sum = +inputValue.wine1 + +inputValue.wine2 + +inputValue.wine3;

    if (sum - +inputValue[e.target.name] + +e.target.value > 100) {
      return;
    }
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async () => {
    if (+inputValue.wine1 + +inputValue.wine2 + +inputValue.wine3 < 100) {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
      return;
    }
    try {
      nav("/profilepage");
      await api.post(`recipes/${id}`);
      const result = await api.get(`recipes/session/${id}`);
      await api.post("creations/", [
        {
          recipeId: result.data[0].id,
          wineId: condensedData[0].wine_id,
          percent: inputValue.wine1,
        },
        {
          recipeId: result.data[0].id,
          wineId: condensedData[1].wine_id,
          percent: inputValue.wine2,
        },
        {
          recipeId: result.data[0].id,
          wineId: condensedData[2].wine_id,
          percent: inputValue.wine3,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    api.get(`notes/${id}`).then((result) => setNotes(result.data));
  }, []);

  useEffect(() => {
    const groupedData = new Map();
    notes.forEach((item) => {
      const { wine, note, tag, wine_id, category } = item;
      if (groupedData.has(wine)) {
        groupedData.get(wine).tags.push({ category: category, tag: tag });
      } else {
        groupedData.set(wine, {
          wine,
          wine_id,
          note,
          tags: [{ category: category, tag: tag }],
        });
      }
    });

    setCondensedData(Array.from(groupedData.values()).slice(0, 3));
  }, [notes]);

  useEffect(() => {
    console.log(notes);
  }, [condensedData]);

  return (
    <div className="creation">
      <h1>Atelier création</h1>
      <div className="wines">
        <div className="wine">
          <p>Vin 1</p>
          <p>{inputValue.wine1}%</p>
        </div>
        <div className="wine">
          <p>Vin 2</p>
          <p>{inputValue.wine2}%</p>
        </div>
        <div className="wine">
          <p>Vin 3</p>
          <p>{inputValue.wine3}%</p>
        </div>
      </div>
      <div className="inputs">
        <div className="input-container">
          <input
            className={
              notes[0]?.color == "Rouge"
                ? "range-creation range-creation-red"
                : "range-creation range-creation-yellow"
            }
            type="range"
            min="0"
            max="100"
            step="5"
            value={inputValue.wine1}
            name="wine1"
            onChange={handleChange}
          />
          <div
            className="input-bg"
            style={{
              width: inputValue.wine1 + "%",
              backgroundColor:
                notes[0]?.color == "Rouge" ? "#C95B5B" : "#EBD68C",
            }}
          ></div>
        </div>

        <div className="input-container">
          <input
            className={
              notes[0]?.color == "Rouge"
                ? "range-creation range-creation-red"
                : "range-creation range-creation-yellow"
            }
            type="range"
            min="0"
            max="100"
            step="5"
            value={inputValue.wine2}
            name="wine2"
            onChange={handleChange}
          />
          <div
            className="input-bg"
            style={{
              width: inputValue.wine2 + "%",
              backgroundColor:
                notes[0]?.color == "Rouge" ? "#C95B5B" : "#EBD68C",
            }}
          ></div>
        </div>
        <div className="input-container">
          <input
            className={
              notes[0]?.color == "Rouge"
                ? "range-creation range-creation-red"
                : "range-creation range-creation-yellow"
            }
            type="range"
            min="0"
            max="100"
            step="5"
            value={inputValue.wine3}
            name="wine3"
            onChange={handleChange}
          />
          <div
            className="input-bg"
            style={{
              width: inputValue.wine3 + "%",
              backgroundColor:
                notes[0]?.color == "Rouge" ? "#C95B5B" : "#EBD68C",
            }}
          ></div>
        </div>
      </div>
      <div className="wines">
        <div className="wine">
          <p>Soit {(+inputValue.wine1 / 100) * 75} cL</p>
          <p>sur 75cL</p>
        </div>
        <div className="wine">
          <p>Soit {(+inputValue.wine2 / 100) * 75} cL</p>
          <p>sur 75cl</p>
        </div>
        <div className="wine">
          <p>Soit {(+inputValue.wine3 / 100) * 75} cL</p>
          <p>sur 75cl</p>
        </div>
      </div>
      <p className="error" style={{ color: errorMessage ? "red" : "white" }}>
        Le total des vins doit faire 100%
      </p>
      <button onClick={handleClick} className={notes[0]?.color == "Rouge" ? "btn btn-red" : "btn btn-yellow"}>Valider la recette</button>
    </div>
  );
}

export default Creation;
