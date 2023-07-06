import { useState, useEffect } from "react";
import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Reservation.scss";

function Reservation() {
  const [locations, setLocations] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/locations/`).then((result) => setLocations(result.data));
    axios.get(`http://localhost:8080/sessions/`).then((result) => setSessions(result.data));
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <div className="page-container">
      <div className="map-section">
        <div className="map-container">
          <MapReservation sessions={locations} />
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
