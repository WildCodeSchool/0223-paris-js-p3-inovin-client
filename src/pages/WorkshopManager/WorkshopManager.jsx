import React, { useEffect, useState } from "react";
import useConfirm from "../../services/useConfirm";
import { getAllSessions, deleteSession } from "../../services/session";
import Confirmbox from "../../components/ConfirmBox/Confirmbox";

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
  const { confirm, confirmState, onCancel, onConfirm } = useConfirm();
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

  const handleDeleteClick = async (session) => {
    const date = new Date(session.date);

    try {
      const isConfirmed = await confirm(
        `Etes-vous sure de vouloir supprimer l'atelier ${
          session.category
        } du ${date.toLocaleString("fr-FR", options)} ?`
      );
      if (isConfirmed) {
        await deleteSession(session.id);
        const updatedSessions = [...sessions].filter((e) => e.id != session.id);
        setSessions(updatedSessions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workshopManager">
      {confirmState.show ? (
        <Confirmbox
          text={confirmState.text}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ) : null}

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
                    onClick={() => handleDeleteClick(session)}
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
