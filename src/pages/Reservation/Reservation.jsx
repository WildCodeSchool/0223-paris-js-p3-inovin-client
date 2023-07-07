import { useState, useEffect } from "react";
import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Reservation.scss";

function Reservation() {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const sessionCategory = ["Création", "Dégustation"];

  useEffect(() => {
    axios.get(`http://localhost:8080/sessions/`).then((result) => setSessions(result.data));
    axios.get(`http://localhost:8080/sessions/`).then((result) => setFilteredSessions(result.data));
  }, []);

  const handleFilterCategory = (e) => {
    if (e.target.checked) {
      const newfilter = [...filter, e.target.value];
      setFilter(newfilter);
    } else {
      setFilter((prevFilter) => prevFilter.filter((filter) => filter !== e.target.defaultValue));
    }
  };

  useEffect(() => {
    if (filter.includes("Création")) {
      setFilteredSessions(sessions.filter((session) => session.category === "Création"));
    }
    if (filter.includes("Dégustation")) {
      setFilteredSessions(sessions.filter((session) => session.category === "Dégustation"));
    }
    if (filter.includes("Dégustation") && filter.includes("Création")) {
      setFilteredSessions(sessions);
    }
    if (!filter.includes("Dégustation") && !filter.includes("Création")) {
      setFilteredSessions(sessions);
    }
  }, [filter]);

  return (
    <div className="page-container">
      <div className="map-section">
        <div className="map-container">
          <MapReservation filteredSessions={filteredSessions} />
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
