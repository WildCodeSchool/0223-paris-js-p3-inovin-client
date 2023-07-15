import "./Creation.scss";
import api from "../../services/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
    try {
      await api.post(`recipes/${id}`);
      const result = await api.get(`recipes/session/${id}`);
      console.log(result.data[0].id);
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
      const { wine, note, tag, wine_id } = item;
      if (groupedData.has(wine)) {
        groupedData.get(wine).tags.push(tag);
      } else {
        groupedData.set(wine, { wine, wine_id, note, tags: [tag] });
      }
    });

    setCondensedData(Array.from(groupedData.values()).slice(0, 3));
    // console.log('notes', notes)
  }, [notes]);

  useEffect(() => {
    console.log(condensedData);
  }, [inputValue]);

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
            className="range-creation"
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
            }}
          ></div>
        </div>

        <div className="input-container">
          <input
            className="range-creation"
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
            }}
          ></div>
        </div>
        <div className="input-container">
          <input
            className="range-creation"
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

      {condensedData.map((e) => {
        return (
          <>
            <p>{e.wine}</p>
            <p>id: {e.wine_id}</p>
            <p>note: {e.note}</p>
            {e.tags.map((tag) => (
              <p>{tag}</p>
            ))}
          </>
        );
      })}
      <button onClick={handleClick}>créer la recette</button>
    </div>
  );
}

export default Creation;
