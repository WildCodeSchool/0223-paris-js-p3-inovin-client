import React, { useEffect, useState } from "react";
import { getAllSessions } from "../../services/session";
import "./WorkshopManager.scss";

const getSessions = async () => {
  try {
    let result = await getAllSessions();
    result = result.data;
    console.log("await", result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
const WorkshopManager = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const getSessions = async () => {
      try {
        const result = await getAllSessions();
        setSessions(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSessions();
  }, []);
  useEffect(() => {
    console.log("result", sessions);
  }, [sessions]);

  return (
    <div className="workshopManager">
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
              <tr key={index}>
                <td>{date.toLocaleString("fr-FR", options)}</td>
                <td>{session.category}</td>
                <td>{session.location}</td>
                <td>{session.participants}</td>
                <td>{session.max_participants - session.participants}</td>

                <td className="buttonCell">
                  <button>Détails</button>
                  <button>Supprimer</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button">Ajouter un atelier</button>
    </div>
  );
};

export default WorkshopManager;
