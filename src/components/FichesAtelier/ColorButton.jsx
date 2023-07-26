import "./ColorButton.scss";
import React, { useEffect, useState } from "react";

const ColorButton = ({ tags, onChange, name, currentWine }) => {
  const [selectedCircle, setSelectedCircle] = useState(null);

  const handleSliderChange = (id) => {
    const selectedLabel = id;
    onChange(name, selectedLabel);
  };

  useEffect(() => {
    setSelectedCircle(null);
  }, [currentWine]);

  const colors = [
    { text: "Framboise", color: "#d85967", colorfocus: "pink" },
    { text: "Cerise", color: "#C84942", colorfocus: "pink" },
    { text: "Rubis", color: "#a82d25", colorfocus: "pink" },
    { text: "Pourpre", color: "#8e2b49", colorfocus: "pink" },
    { text: "Violet", color: "#842463", colorfocus: "pink" },
    { text: "Grenat", color: "#6B3750", colorfocus: "pink" },
    { text: "Tuilé", color: "#73241F", colorfocus: "pink" },
    { text: "Jaune vert", color: "#ECDA86", colorfocus: "#BC813D" },
    { text: "Jaune paille", color: "#F1D470", colorfocus: "#BC813D" },
    { text: "Or vert", color: "#E0C259", colorfocus: "#BC813D" },
    { text: "Or jaune", color: "#CFAB49", colorfocus: "#ECDA86" },
    { text: "Doré", color: "#C89544", colorfocus: "#ECDA86" },
    { text: "Ambré", color: "#DA9549", colorfocus: "#ECDA86" },
    { text: "Roux", color: "#BC813D", colorfocus: "#ECDA86" },
  ];

  const handleCircleClick = (circleIndex) => {
    setSelectedCircle(circleIndex);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
      }}
    >
      {tags
        ?.filter((e) => {
          return e.category == "Oeil" && e.sub_category == "Couleur";
        })
        .map((item, index) => (
          <div className="colormap" key={index}>
            <p>{item.name}</p>
            <div
              className="circle"
              onClick={() => {
                handleCircleClick(index);
                handleSliderChange(item.id);
              }}
              style={{
                backgroundColor: colors[index].color,
                outline:
                  selectedCircle === index
                    ? `10px solid ${colors[index].colorfocus}`
                    : "none",
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default ColorButton;
