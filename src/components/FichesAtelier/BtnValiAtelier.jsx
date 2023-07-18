import "./BtnValiAtelier.scss";

import React from "react";

function BtnValiAtelier({ handleSubmit,  }) {
  return <button className="btn" onClick={handleSubmit}>Valider</button>;
}

export default BtnValiAtelier;
