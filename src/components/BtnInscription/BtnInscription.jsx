import "./BtnInscription.scss";

import React from "react";

function BtnInscription({ type }) {
  return <button className="btn">S'inscrire à un atelier {type}</button>;
}

export default BtnInscription;
