import { useState, useEffect } from "react";
import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Reservation.scss";
import SessionList from "../../components/SessionList/SessionList";
import { postRegistration } from "../../services/session";

function Reservation() {
  const sessionCategory = ["Création", "Dégustation"];
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [clickedLocation, setClickedLocation] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/sessions/`).then((result) => setSessions(result.data));
    axios.get(`http://localhost:8080/sessions/`).then((result) => setFilteredSessions(result.data));
  }, []);

  useEffect(() => {
    console.log(sessions);
  }, [sessions]);

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

  const handleClickReservation = async (id) => {
    postRegistration(id);
  };

  return (
    <div className="page-container">
      <div className="map-section">
        <div className="map-container">
          <MapReservation filteredSessions={filteredSessions} setClickedLocation={setClickedLocation} />
        </div>
      </div>
      <div className="text-section">
        <div className="text-section-title">
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
        </div>
        <div className="text-section-sessions">
          <div className={!clickedLocation.id ? "text-container" : "text-container-hidden"}>
            <span>Choisissez un lieu de dégustation sur la carte</span>
          </div>
          <div className={clickedLocation.id ? "session-list-container" : "session-list-container-hidden"}>
            <h1 className="session-title">{clickedLocation.name}</h1>
            <img src={clickedLocation.image} alt="toto" />
            <SessionList
              filteredSessions={filteredSessions}
              clickedLocation={clickedLocation}
              sessionCategory="Dégustation"
              selectedSessionId={selectedSessionId}
              setSelectedSessionId={setSelectedSessionId}
            />
            <SessionList
              filteredSessions={filteredSessions}
              clickedLocation={clickedLocation}
              sessionCategory="Création"
              selectedSessionId={selectedSessionId}
              setSelectedSessionId={setSelectedSessionId}
            />
          </div>
          <div className="button" onClick={() => handleClickReservation(selectedSessionId)}>
            Réserver
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
