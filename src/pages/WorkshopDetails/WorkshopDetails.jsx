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
  const [users, setUsers] = useState(null);

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
        console.log(wineInfos.data);
      } catch (error) {
        console.error(error);
      }
    };

    getSessionInfos(id);
  }, []);

  const handleAddParticipant = () => {};
  const handleAddWine = () => {};

  const date = new Date(session.date);

  return (
    <div className="workshopDetails">
      <button onClick={() => navigate("/ateliers")} className="backButton">
        Retour
      </button>
      <h2>
        Fiche Atelier {session.category} n° {session.id}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type d'atelier</th>
            <th>Lieu</th>
            <th>Nombre de participants</th>
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
            <td>{+session.max_participants - +session.participants}</td>

            <td className="buttonCell">
              <button className="WMButton">Modifier</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Synthèse des participants</h3>
      {users?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Préférences</th>
              <th>Commentaire</th>
              <th>Gestion</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.comment}</td>
                  <td>{user.comment}</td>

                  <td className="buttonCell">
                    <button className="WMButton">Modifier</button>
                    <button className="WMButton">Supprimer</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>Aucun participant pour le moment</h4>
      )}
      <button className="addButton" onClick={handleAddParticipant}>
        Ajouter un participant
      </button>
      <h3>Liste des vins à présenter</h3>
      {wines?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Cépage</th>
              <th>Année</th>
              <th>Gestion</th>
            </tr>
          </thead>
          <tbody>
            {wines.map((wine) => {
              return (
                <tr>
                  <td>{wine.name}</td>
                  <td>{wine.color}</td>
                  <td>{wine.cepage}</td>
                  <td>{wine.manufacture_year}</td>

                  <td className="buttonCell">
                    <button className="WMButton">Modifier</button>
                    <button className="WMButton">Supprimer</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>Aucun vin à prénsenter pour le moment</h4>
      )}
      <button className="addButton" onClick={handleAddWine}>
        Ajouter un vin
      </button>
    </div>
  );
};

export default WorkshopDetails;
