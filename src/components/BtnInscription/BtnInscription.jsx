import "./BtnInscription.scss";

import React from "react";

function BtnInscription({ type }) {
  return <button className="Btn-Inscription">S'inscrire à un atelier {type}</button>;
}

export default BtnInscription;
