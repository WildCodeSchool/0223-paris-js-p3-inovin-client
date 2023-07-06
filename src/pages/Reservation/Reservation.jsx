import { useState, useEffect } from "react";
import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Reservation.scss";

function Reservation() {
  const [locations, setLocations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionFilters, setSessionFilters] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const sessionCategory = ["Création", "Dégustation"];

  const handleFilterCategory = (e) => {
    if (e.target.checked) {
      const newfilter = [...sessionFilters, e.target.value];
      setSessionFilters(newfilter);
    } else {
      setSessionFilters((prevSessionFilter) => prevSessionFilter.filter((filter) => filter !== e.target.defaultValue));
    }
  };

  //

  useEffect(() => {
    console.log(sessionFilters);
  }, [sessionFilters]);

  useEffect(() => {
    if (sessionFilters.includes("Création")) {
      setFilteredSessions(sessions.filter((session) => session.category === "Création"));
    }
    if (sessionFilters.includes("Dégustation")) {
      setFilteredSessions(sessions.filter((session) => session.category === "Dégustation"));
    }
    if (sessionFilters.includes("Dégustation") && sessionFilters.includes("Création")) {
      setFilteredSessions(sessions);
    }
  }, [sessionFilters]);

  useEffect(() => {
    axios.get(`http://localhost:8080/locations/`).then((result) => setLocations(result.data));
    axios.get(`http://localhost:8080/sessions/`).then((result) => setSessions(result.data));
  }, []);

  useEffect(() => {
    console.log(sessions);
  }, [sessions]);

  return (
    <div className="page-container">
      <div className="map-section">
        <div className="map-container">
          <MapReservation sessions={sessions} />
        </div>
      </div>
      <div className="text-section">
        <h2>Ateliers disponibles</h2>
        <div className="checkboxes">
          {sessionCategory.map((e) => {
            return (
              <div key={sessionCategory.indexOf(e)}>
                <input type="checkbox" name="" id="" value={e} onChange={handleFilterCategory} />
                <label htmlFor={e}>{e}</label>
              </div>
            );
          })}
        </div>
        <div className="text-container">
          <span>Choisissez un lieu de dégustation sur la carte</span>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
