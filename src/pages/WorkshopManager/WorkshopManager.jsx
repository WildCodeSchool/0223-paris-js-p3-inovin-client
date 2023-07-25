import React, { useEffect, useState } from "react";
import {
  getAllSessions,
  getSessionById,
  deleteSession,
} from "../../services/session";
import "./WorkshopManager.scss";
import { useNavigate } from "react-router-dom";
import BtnBack from "../../components/BtnBack/BtnBack";
import BtnAdd from "../../components/BtnAdd/BtnAdd";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const WorkshopManager = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getSessions = async () => {
      try {
        const result = await getAllSessions();

        let sessions = result.data;
        sessions.sort((a, b) => a.id - b.id);

        setSessions(sessions);
      } catch (error) {
        console.error(error);
      }
    };
    getSessions();
  }, []);

  const handleDetailsClick = async (id) => {
    navigate(`${id}`);
  };
  const handleDeleteClick = async (id) => {
    try {
      deleteSession(id);
      const updatedSessions = [...sessions].filter((e) => e.id != id);

      setSessions(updatedSessions);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="workshopManager">
      <BtnBack handleBackClick={() => navigate("/")} />
      <h2>Gestion des Ateliers</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type d'atelier</th>
            <th>Lieu</th>
            <th>Nombre de paticipants</th>
            <th>Places restantes</th>
            <th>Gestion</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => {
            const date = new Date(session.date);
            return (
              <tr key={index} className="ateliers">
                <td>{date.toLocaleString("fr-FR", options)}</td>
                <td>{session.category}</td>
                <td>{session.place_name}</td>
                <td>{session.participants}</td>
                <td>{session.max_participants - session.participants}</td>

                <td className="buttonCell">
                  <button
                    onClick={() => handleDetailsClick(session.id)}
                    className="WMButton btn"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() => handleDeleteClick(session.id)}
                    className="WMButton btn"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <BtnAdd
        handleAddClick={() => navigate("new")}
        title={"Ajouter un atelier"}
      />
    </div>
  );
};

export default WorkshopManager;
