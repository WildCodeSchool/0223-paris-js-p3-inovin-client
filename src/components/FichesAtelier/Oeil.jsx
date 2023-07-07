import "./Oeil.scss";
import React, { useState } from "react";

const oeil = () => {
  const [selectedCircle, setSelectedCircle] = useState(null);
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
      {colors.map((item, index) => (
        <div className="colormap" key={index}>
          <p>{item.text}</p>
          <div
            className="circle"
            onClick={() => handleCircleClick(index)}
            style={{
              backgroundColor: item.color,
              outline:
                selectedCircle === index
                  ? `5px solid ${item.colorfocus}`
                  : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default oeil;
