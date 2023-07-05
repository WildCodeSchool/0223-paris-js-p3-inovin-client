import { useState, useEffect } from "react";
import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import axios from "axios";
import "./Reservation.scss";

function Reservation() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/locations/`).then((result) => setLocations(result.data));
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <div className="page-container">
      <div className="map-section">
        <div className="map-container">
          <MapReservation locations={locations} />
        </div>
      </div>
      <div className="text-section">
        <h2>Ateliers disponibles</h2>
        <div className="text-container">
          <span>Choisissez un lieu de dégustation sur la carte</span>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
