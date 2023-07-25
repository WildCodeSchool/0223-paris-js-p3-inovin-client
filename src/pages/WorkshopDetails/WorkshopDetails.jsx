import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useConfirm from "../../services/useConfirm";

import {
  getSessionById,
  getUsersBySessionId,
  getWinesBySessionId,
  getRecipesBySessionId,
  deleteUserFromSession,
  deleteWineFromSession,
} from "../../services/session";
import BtnBack from "../../components/BtnBack/BtnBack";
import BtnAdd from "../../components/BtnAdd/BtnAdd";
import "./WorkshopDetails.scss";
import Confirmbox from "../../components/ConfirmBox/Confirmbox";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const WorkshopDetails = () => {
  const { confirm, confirmState, onCancel, onConfirm } = useConfirm();
  const [session, setSession] = useState({});
  const [wines, setWines] = useState({});
  const [users, setUsers] = useState({});
  const [recipes, setRecipes] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSessionInfos = async (id) => {
      try {
        const sessionInfos = await getSessionById(id);
        const wineInfos = await getWinesBySessionId(id);
        const userInfos = await getUsersBySessionId(id);
        console.log(sessionInfos.data);
        setSession(sessionInfos.data);
        setWines(wineInfos.data);
        setUsers(userInfos.data);

        if (sessionInfos.data.category === "Création") {
          const recipesInfos = await getRecipesBySessionId(id);
          setRecipes(recipesInfos.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSessionInfos(id);
    console.log(session);
  }, []);
  const handleDeleteWineClick = async (wine) => {
    try {
      const isConfirmed = await confirm(
        "Voulez vous supprimer cette donnée capitale ?"
      );

      if (isConfirmed) {
        await deleteWineFromSession(session.id, wine.id);
        const updatedWines = [...wines].filter((e) => e.id != wine.id);
        setWines(updatedWines);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUserClick = async (user) => {
    try {
      const isConfirmed = await confirm(
        `Etes-vous sure de vouloir supprimer ${user.firstname} ${user.lastname} de cet atelier ?`
      );
      if (isConfirmed) {
        await deleteUserFromSession(session.id, user.user_id);
        const updatedUsers = [...users].filter(
          (e) => e.user_id != user.user_id
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const date = new Date(session.date);

  return (
    <div className="workshopDetails">
      {confirmState.show ? (
        <Confirmbox
          text={confirmState.text}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ) : null}

      <BtnBack handleBackClick={() => navigate("/ateliers")} />

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
              <button className="WMButton btn">Modifier</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Synthèse des participants</h3>
      {users.length > 0 ? (
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
                <tr key={user.firstname + user.id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.comment}</td>
                  <td>{user.comment}</td>

                  <td className="buttonCell">
                    <button
                      className="WMButton btn"
                      onClick={() => handleSeeUserClick(user.user_id)}
                    >
                      Voir détails
                    </button>
                    <button
                      className="WMButton btn"
                      onClick={() => handleDeleteUserClick(user)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>Aucun participant pour le moment</h4>
      )}
      <BtnAdd
        handleAddClick={() => navigate("users")}
        title={"Ajouter un particpant"}
      />
      <h3>Liste des vins à présenter</h3>
      {wines.length > 0 ? (
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
                <tr key={wine.name + wine.id}>
                  <td>{wine.name}</td>
                  <td>{wine.color}</td>
                  <td>{wine.cepage}</td>
                  <td>{wine.manufacture_year}</td>

                  <td className="buttonCell">
                    <button
                      className="WMButton btn"
                      onClick={() => handleSeeWineClick(user.user_id)}
                    >
                      Voir détails
                    </button>
                    <button
                      className="WMButton btn"
                      onClick={() => handleDeleteWineClick(wine)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>Aucun vin à prénsenter pour le moment</h4>
      )}

      <BtnAdd
        handleAddClick={() => navigate("wines")}
        title={"Ajouter un vin"}
      />

      {session.category === "Création" && (
        <div>
          <h3>Créations</h3>
          {recipes.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Nom de la création</th>
                  <th>Créateur</th>
                  <th>Sélectionnné</th>
                  <th>Gagnant d'un concours</th>
                  <th>Gestion</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => {
                  return (
                    <tr key={recipe.name + recipe.id}>
                      <td>{recipe.name}</td>
                      <td>{recipe.user_id} </td>
                      <td>{recipe.selected_for_context}</td>
                      <td>{recipe.won_contest}</td>
                      <td className="buttonCell">
                        <button className="WMButton btn">Supprimer</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h4>Aucune création à présenter</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkshopDetails;
