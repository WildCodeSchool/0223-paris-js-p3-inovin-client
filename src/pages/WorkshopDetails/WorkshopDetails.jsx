import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSessionById,
  getUsersBySessionId,
  getWinesBySessionId,
} from "../../services/session";
import "./WorkshopDetails.scss";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const WorkshopDetails = () => {
  const [session, setSession] = useState({});
  const [wines, setWines] = useState();
  const [users, setUsers] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getSessionInfos = async (id) => {
      try {
        const sessionInfos = await getSessionById(id);
        const wineInfos = await getWinesBySessionId(id);
        const userInfos = await getUsersBySessionId(id);
        setSession(sessionInfos.data);
        setWines(wineInfos.data);
        setUsers(userInfos.data);
        console.log(sessionInfos.data);
        console.log(wineInfos.data);
        console.log(userInfos.data);
      } catch (error) {
        console.error(error);
      }
    };

    getSessionInfos(id);
  }, []);

  const date = new Date(session.date);

  return (
    <div className="workshopDetails">
      <button onClick={() => navigate("/ateliers")}>Retour</button>
      <h2>
        Atelier {session.category} n° {session.id}
      </h2>
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
          <tr>
            <td>{date.toLocaleString("fr-FR", options)}</td>
            <td>{session.category}</td>
            <td>{session.place_name}</td>
            <td>{session.participants}</td>
            <td>{session.max_participants - session.participants}</td>

            <td className="buttonCell">
              <button className="WMButton">Modifier</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WorkshopDetails;
