import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapReservation from "../../components/MapReservation/MapReservation";
import React from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Reservation.scss";
import SessionList from "../../components/SessionList/SessionList";
import api from "../../services/api";

function Reservation() {
  const sessionCategory = ["Création", "Dégustation"];
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [clickedLocation, setClickedLocation] = useState({});
  const [validationIsClicked, setValidationIsClicked] = useState(false);
  const [registeredSessions, setRegisteredSessions] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/sessions/`).then((result) => setSessions(result.data));
    axios.get(`http://localhost:8080/sessions/`).then((result) => setFilteredSessions(result.data));
    api.get(`/sessions/user`).then((result) => setRegisteredSessions(result.data));
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

  const handleClickReservation = async (id) => {
    try {
      await api.post(`/sessions/${id}/register`);
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
    setValidationIsClicked(true);
  };

  const handleClickRegisterAgain = () => {
    setValidationIsClicked(false);
    setClickedLocation({});
    setFilter([]);
    setSelectedSessionId("");
    setFilteredSessions(sessions);
    setError(null);
  };

  const handleClickBackToProfile = () => {
    navigate("/profilepage");
  };

  return (
    <div className="reservation-page-container">
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
              registeredSessions={registeredSessions}
            />
            <SessionList
              filteredSessions={filteredSessions}
              clickedLocation={clickedLocation}
              sessionCategory="Création"
              selectedSessionId={selectedSessionId}
              setSelectedSessionId={setSelectedSessionId}
              registeredSessions={registeredSessions}
            />
          </div>
          <div
            className={selectedSessionId ? "button" : "button-hidden"}
            onClick={() => handleClickReservation(selectedSessionId)}
          >
            Réserver
          </div>
        </div>
      </div>
      <div className={validationIsClicked ? "popup-div-section" : "popup-div-section-hidden"}>
        <div className="popup-div">
          {error === "Allready registered" ? (
            <>
              {" "}
              <h2> Vous avez déjà reservé cet Atelier </h2>
              <div className="button" onClick={handleClickRegisterAgain}>
                Réserver une autre atelier
              </div>
            </>
          ) : (
            <>
              <h2> Vous avez bien réservé l'atelier</h2>
              <div className="button-container">
                <div className="button" onClick={handleClickRegisterAgain}>
                  Réserver une autre atelier
                </div>
                <div className="button" onClick={handleClickBackToProfile}>
                  Revenir à votre Profil
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
