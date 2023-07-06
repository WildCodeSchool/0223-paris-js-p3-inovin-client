import "./Oeil.scss";
import React, { useState } from "react";

const oeil = () => {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const colors = [
    { text: "Framboise", color: "#d85967" },
    { text: "Cerise", color: "#C84942" },
    { text: "Rubis", color: "#a82d25" },
    { text: "Pourpre", color: "#8e2b49" },
    { text: "Violet", color: "#842463" },
    { text: "Grenat", color: "#6B3750" },
    { text: "Tuilé", color: "#73241F" },
    { text: "Jaune vert", color: "#ECDA86" },
    { text: "Jaune paille", color: "#F1D470" },
    { text: "Or vert", color: "#E0C259" },
    { text: "Or jaune", color: "#CFAB49" },
    { text: "Doré", color: "#C89544" },
    { text: "Ambré", color: "#DA9549" },
    { text: "Roux", color: "#BC813D" },
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
        <div
          key={index}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>{item.text}</p>
          <div
            onClick={() => handleCircleClick(index)}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: item.color,
              margin: "8px",
              cursor: "pointer",
              outline: selectedCircle === index ? "5px solid black" : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default oeil;
