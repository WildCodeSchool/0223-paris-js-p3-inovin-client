import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import "./Reservation.scss";

function Reservation() {
  return (
    <div className="pageContainer">
      <div className="mapContainer">
        <MapReservation />
      </div>
      <div className="textContainer">
        <h2>Ateliers disponibles</h2>
      </div>
    </div>
  );
}

export default Reservation;
