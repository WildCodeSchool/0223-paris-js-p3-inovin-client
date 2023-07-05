import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import "./Reservation.scss";

function Reservation() {
  return (
    <div className="pageContainer">
      <div className="mapSection">
        <div className="mapContainer">
          <MapReservation />
        </div>
      </div>
      <div className="textSection">
        <h2>Ateliers disponibles</h2>
        <span>Choisissez un lieu de dégustation sur la carte</span>
      </div>
    </div>
  );
}

export default Reservation;
