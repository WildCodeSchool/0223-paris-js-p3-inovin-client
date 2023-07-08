import { useState, useEffect } from "react";
import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Reservation.scss";

function Reservation() {
  const sessionCategory = ["Création", "Dégustation"];
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [clickedLocation, setClickedLocation] = useState({
    id: "",
    name: "",
  });
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedButtonId, setSelectedButtonId] = useState("");

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

  const handleClickSession = (date) => {
    setSelectedSessionId(date);
  };

  useEffect(() => {
    console.log("selectedSessionId", selectedSessionId);
  }, [selectedSessionId]);

  // useEffect(() => {
  //   console.log(filteredSessions);
  // }, [filteredSessions]);

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
            <div className="session-list">
              <span
                className={
                  filter.length === 0 || filter.includes("Dégustation") ? "session-title" : "session-title-hidden"
                }
              >
                Ateliers Dégustation
              </span>
              {filteredSessions
                .filter((session) => session.id === clickedLocation.id && session.category === "Dégustation")
                .map((session, index) => {
                  const options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  };
                  const date = new Date(session.date);
                  return (
                    <div
                      key={session.date}
                      className={session.date === selectedSessionId ? "session-selected" : "session"}
                      onClick={() => handleClickSession(session.date)}
                    >
                      {date.toLocaleString("fr-FR", options)}
                    </div>
                  );
                })}
            </div>
            <div className="session-list">
              <span
                className={
                  (filter.length === 0 || filter.includes("Création") ? "session-title" : "session-title-hidden",
                  clickedLocation.id ? "session-title" : "session-title-hidden")
                }
              >
                Ateliers Création
              </span>
              {filteredSessions
                .filter((session) => session.id === clickedLocation.id && session.category === "Création")
                .map((session, index) => {
                  const options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  };
                  const date = new Date(session.date);
                  return (
                    <div
                      key={session.date}
                      className={session.date === selectedSessionId ? "session-selected" : "session"}
                      onClick={() => handleClickSession(session.date)}
                    >
                      {date.toLocaleString("fr-FR", options)}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="button"> Réserver</div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
